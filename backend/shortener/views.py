from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.parsers import JSONParser
from rest_framework import permissions

from django.shortcuts import redirect

from .models import Link, get_sentinel_user
from .serializers import LinkSerializer


from url_cleaner import UrlCleaner


# View for interacting with individual links
class LinkView(APIView):
    http_method_names = ["get", "post", "delete"]
    permission_classes = (permissions.AllowAny,)
    parser_classes = [JSONParser]

    # Create a new shortlink
    def post(self, request, id=-1):

        # Return existing link if one exists
        existing_links = Link.objects.filter(link=request.data["link"])
        if len(existing_links) > 0:
            serializer = LinkSerializer(existing_links[0])
            return JsonResponse(serializer.data)

        # Create new link if there is no existing lin
        # If the request is anonymous, use the anon user, otherwise use request user
        if request.user.is_authenticated:
            request.data["owner"] = request.user.id
        else:
            request.data["owner"] = get_sentinel_user()

        if request.data["link"]:
            cleaner = UrlCleaner()
            clean_link = cleaner.clean(request.data["link"])
            request.data["link"] = clean_link

        serializer = LinkSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)

        # Return an error if a new valid link cannot be created
        return JsonResponse(serializer.errors, status=400)

    # Travel to an existing shortlink
    def get(self, request, id=-1):
        # Try to find the existing shortlink in the database
        try:
            link = Link.objects.get(id=id)
        # If it doesn't exist, return to the home page
        except Link.DoesNotExist:
            return redirect("/")

        serializer = LinkSerializer(link)
        return redirect(serializer.data["link"])

    # Delete link
    def delete(self, request, id=-1):
        # Check for link existence
        try:
            link = Link.objects.get(id=id)
        except Link.DoesNotExist:
            return JsonResponse({}, status=404)

        # Check if link is owned by the user, or is owned by the public (anon)
        if link.owner.id in [request.user.id, get_sentinel_user()]:
            link.delete()
            serializer = LinkSerializer(link)
            return JsonResponse(serializer.data, status=204)

        else:
            return JsonResponse({}, status=403)


# View for interacting with lists of links
class LinkListView(APIView, PageNumberPagination):
    serializer_class = LinkSerializer
    page_size = 5
    page_size_query_param = "page_size"
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        user_arr = [get_sentinel_user()]
        if request.user.is_authenticated:
            user_arr.append(request.user.id)

        entity = Link.objects.filter(owner__in=user_arr)

        results = self.paginate_queryset(entity, request, view=self)
        serializer = LinkSerializer(results, many=True)
        return self.get_paginated_response(serializer.data)

    def post(self, request):
        self.get(request)

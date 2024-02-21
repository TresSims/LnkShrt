from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.parsers import JSONParser

from django.shortcuts import redirect

from .models import Link
from .serializers import LinkSerializer


# View for interacting with individual links
class LinkView(APIView):
    http_method_names = ["get", "post", "delete"]

    # Create a new shortlink
    def post(self, request, id=-1):
        data = JSONParser().parse(request)

        # Return existing link if one exists
        existing_links = Link.objects.filter(link=data["link"])
        if len(existing_links) > 0:
            serializer = LinkSerializer(existing_links[0])
            return JsonResponse(serializer.data)

        # Create new link if there is no existing link
        serializer = LinkSerializer(data=data)
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
        try:
            link = Link.objects.get(id=id)
            link.delete()
        except Link.DoesNotExist:
            return JsonResponse({}, status=404)

        serializer = LinkSerializer(link)
        return JsonResponse(serializer.data, status=204)


# View for interacting with lists of links
class LinkListView(APIView, PageNumberPagination):
    serializer_class = LinkSerializer
    page_size = 5
    page_size_query_param = "page_size"

    def get(self, request):
        entity = Link.objects.all()
        results = self.paginate_queryset(entity, request, view=self)
        serializer = LinkSerializer(results, many=True)
        return self.get_paginated_response(serializer.data)

    def post(self, request):
        get(request)

from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser

from django.shortcuts import redirect

from .models import Link
from .serializers import LinkSerializer


# View for interacting with individual links
class LinkView(APIView):
    http_method_names = ["get", "post", "delete"]

    # Create a new shortlink
    def post(self, request):
        data = JSONParser().parse(request)["params"]

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
    def get(self, request, id):
        # Try to find the existing shortlink in the database
        try:
            link = Link.objects.get(id=id)
        # If it doesn't exist, return to the home page
        except Link.DoesNotExist:
            return redirect("/")

        serializer = LinkSerializer(link)
        return redirect(serializer.data["link"])

    # Delete link
    def delete(self, request, id):
        try:
            link = Link.objects.get(id=id)
            link.delete()
        except Link.DoesNotExist:
            return JsonResponse({}, status=404)

        serializer = LinkSerializer(link)
        return JsonResponse(serializer.data, status=204)


# View for interacting with lists of links
class LinkListView(APIView):

    def get(self, request):
        page = abs(int(request.GET["page"]))
        results_per_page = abs(int(request.GET["length"]))

        if page < 1:
            page = 1

        if results_per_page < 1:
            results_per_page = 1

        first_result = (page - 1) * results_per_page
        last_result = page * results_per_page

        links = Link.objects.all()
        size = links.count()
        results = links[first_result:last_result]
        serializer = LinkSerializer(results, many=True)
        response = {"size": size, "data": serializer.data}

        return JsonResponse(response, status=200, safe=False)

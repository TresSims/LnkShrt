from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser

from django.shortcuts import redirect

from .models import Link
from .serializers import LinkSerializer


class LinkView(APIView):
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
    def get(self, request):
        # Try to find the existing shortlink in the database
        try:
            link = Link.objects.get(id=request.GET["link"])
        # If it doesn't exist, return to the home page
        except Link.DoesNotExist:
            return redirect("/")

        serializer = LinkSerializer(link)
        return redirect(serializer.data["link"])

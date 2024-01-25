import json
from rest_framework.response import Response
from rest_framework.views import APIView

from django.shortcuts import redirect

from .models import link


class LinkView(APIView):
    # Create a new shortlink
    def post(self, request):
        # Decode the post requests (required becaue Axsio is weird)
        data = json.loads(request.body.decode())
        long_link = data["params"]["link"]

        # Return an existing link if the long link is already in the databse
        link_entries = link.objects.filter(long_link=long_link)
        if len(link_entries) > 0:
            return Response({"link": link_entries[0].id})

        # Add new long link to database and return shortlink key
        link_entry = link(long_link=long_link)
        link_entry.save()
        id = link_entry.id
        return Response({"link": id})

    # Travel to an existing shortlink
    def get(self, request):
        # Try to find the existing shortlink in the database
        try:
            link_entry = link.objects.get(id=request.GET["link"])
            response = redirect(link_entry.long_link)
        # If it doesn't exist, return to the home page
        except link.DoesNotExist:
            response = redirect("/")

        return response

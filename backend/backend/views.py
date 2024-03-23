from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.http import JsonResponse
from django.shortcuts import redirect

from . import serializers


class NewUserView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = serializers.NewUserSerializer(
            data=self.request.data, context={"request": self.request}
        )
        serializer.is_valid(raise_exception=True)

        return JsonResponse({"response": "User was created"}, status=201)


class LogoutView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        request.auth.delete()
        return JsonResponse({"response": "Successfully logged out"}, status=200)


class ManageUserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    http_method_names = ["post", "delete"]

    # Update password
    def post(self, request, format=None):
        serializer = serializers.UpdatePasswordSerializer(
            data=self.request.data, context={"request", self.request}
        )
        serializer.is_valid(raise_exception=True)

        request.user.set_password(serializer.validated_data["password"])

        # Invalidate existing login tokens for user
        tokens = Token.objects.filter(user=request.user)
        for token in tokens:
            token.delete()

        return redirect("/login")

    # Remove User
    def delete(self, request, format=None):
        request.user.delete()
        return JsonResponse({"response": "User deleted."}, status=204)

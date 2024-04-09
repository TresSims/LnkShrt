from rest_framework import permissions
from rest_framework.views import APIView
from django.contrib.sessions.models import Session
from django.http import JsonResponse
from django.shortcuts import redirect
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth import login

from . import serializers


class SetCsrfView(APIView):
    permission_classes = (permissions.AllowAny,)

    @method_decorator(ensure_csrf_cookie)
    def get(self, request, format=None):
        return JsonResponse({"response": "csrf token in header"})


class NewUserView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = serializers.NewUserSerializer(
            data=self.request.data, context={"request": self.request}
        )
        serializer.is_valid(raise_exception=True)

        return JsonResponse({"response": "User was created"}, status=201)


class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = serializers.LoginSerializer(
            data=self.request.data, context={"request": self.request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        login(request, user)

        return JsonResponse({"response": "user was logged in"}, status=202)


class LogoutView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        Session.objects.filter(session_key=request.session.session_key).delete()
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
        request.user.save()

        return redirect("/login")

    # Remove User
    def delete(self, request, format=None):
        request.user.delete()
        return JsonResponse({"response": "User deleted."}, status=204)

from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import serializers


class LoginSerializer(serializers.Serializer):
    username = serializers.EmailField(label="Username", write_only=True)
    password = serializers.CharField(
        label="Password",
        style={"input_type": "password"},
        trim_whitespace=False,
        write_only=True,
    )

    def validate(self, attrs):
        username = attrs.get("username")
        password = attrs.get("password")

        if username and password:
            user = authenticate(
                request=self.context.get("request"), username=username, password=password
            )

            if not user:
                msg = "Incorrect username or password"
                raise serializers.ValidationError(msg, code="authorization")

        else:
            msg = "username and password both required"
            raise serializers.ValidationError(msg, code="authorization")

        attrs["user"] = user
        return attrs


class NewUserSerializer(serializers.Serializer):
    username = serializers.EmailField(label="Username", write_only=True)
    password = serializers.CharField(
        label="Password",
        style={"input_type": "password"},
        trim_whitespace=False,
        write_only=True,
    )

    def validate(self, attrs):
        username = attrs.get("username")
        password = attrs.get("password")

        if username and password:
            try:
                user = User.objects.get(username=username)
                msg = "user already exists"
                raise serializers.ValidationError(msg, code="authorization")
            except User.DoesNotExist:
                pass

            user = User.objects.create_user(username, username, password)
            user.save()

            attrs["user"] = user
            return attrs

        else:
            msg = "username and password both required"
            raise serializers.ValidationError(msg, code="authorization")


class UpdatePasswordSerializer(serializers.Serializer):
    password = serializers.CharField(
        label="Password",
        style={"input_type": "password"},
        trim_whitespace=False,
        write_only=True,
    )

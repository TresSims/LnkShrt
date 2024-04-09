from django.db import models
from django.contrib.auth import get_user_model
from django.conf import settings


def get_sentinel_user():
    return get_user_model().objects.get_or_create(username="anon")[0].id


class Link(models.Model):
    link = models.URLField(blank=False)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET(get_sentinel_user),
        default=get_sentinel_user,
    )

    def __str__(self):
        return f"{self.id} -> {self.link}"

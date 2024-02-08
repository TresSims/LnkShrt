from django.db import models


class Link(models.Model):
    link = models.URLField(blank=False)

    def __str__(self):
        return f"{self.id} -> {self.link}"

from django.db import models


class link(models.Model):
    long_link = models.URLField()

    def __str__(self):
        return f"{self.id} -> {self.long_link}"

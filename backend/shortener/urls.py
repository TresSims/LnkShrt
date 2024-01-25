from django.urls import path

from .views import LinkView

urlpatterns = [
    path("", LinkView.as_view()),
]

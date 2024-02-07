from django.urls import path

from .views import LinkView, LinkListView

urlpatterns = [
    path("", LinkView.as_view()),
    path("list/", LinkListView.as_view())
]

from django.urls import path
from .views import *

urlpatterns = [
    path('countries/', CountryListCreateView.as_view(), name='Country-Create-list'),
    path('CountrySearch/', CountrySearchView.as_view(), name='Country-Search')
]

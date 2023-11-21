from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import generics, status
from rest_framework.response import Response
from searchbar.pagination import CustomPagination
from .serializers import CountrySerializer
from .models import Country

class CountryListCreateView(generics.ListCreateAPIView):
    queryset = Country.objects.all().filter(is_active=True).order_by('-id')
    serializer_class = CountrySerializer
    pagination_class = CustomPagination


class CountrySearchView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            search_term = request.query_params.get('search_term', '').strip()
            print(search_term)
            # Only proceed if the search term is not empty
            if search_term:
                countries = Country.objects.filter(
                    name__istartswith=search_term)
                serializer = CountrySerializer(countries, many=True)
                # Check if results are empty and handle accordingly
                if not countries.exists():
                    return Response({"message": "No matching countries found for the provided search term."}, status=status.HTTP_404_NOT_FOUND)
                return Response(serializer.data)
            # Handle the case where the search term is empty
            return Response({"message": "Please provide a search term"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Handle any other exceptions
            return Response({"message": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

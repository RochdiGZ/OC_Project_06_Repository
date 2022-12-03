from rest_framework import generics
from django_filters import rest_framework as filters

from backend.movies.models import Genre
from backend.movies.serializers import GenreSerializer
from backend.api.v1.titles.pagination import TitleSetPagination
from .filters import GenreFilterSet


class GenreListView(generics.ListAPIView):
    """
    This endpoint is the entry point of the **OCMovies API** to browse the
    available genres.

    The get a list of movies filtered by genre, identify those of interest
    for you and use them to filter movies on the
    [main titles entry point here](/api/v1/titles/).

    """

    http_method_names = ['get']
    queryset = Genre.objects.order_by('name')
    serializer_class = GenreSerializer
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = GenreFilterSet
    pagination_class = TitleSetPagination

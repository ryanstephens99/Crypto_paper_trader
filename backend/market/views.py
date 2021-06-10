from django.shortcuts import render
from rest_framework import viewsets
from .serializers import CurrencySerializer, MarketPointSerializer
from .models import Currency, MarketPoint

class CurrencyView(viewsets.ModelViewSet):
    serializer_class = CurrencySerializer
    queryset = Currency.objects.all()
    # print(queryset)


class MarketPointView(viewsets.ModelViewSet):
    serializer_class = MarketPointSerializer
    queryset = MarketPoint.objects.all()[:100]

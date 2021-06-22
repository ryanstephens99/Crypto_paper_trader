from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from .serializers import CurrencySerializer, MarketPointSerializer
from .models import Currency, MarketPoint
from datetime import datetime

class CurrencyView(viewsets.ModelViewSet):
    serializer_class = CurrencySerializer
    queryset = Currency.objects.all()
    # print(queryset)


class MarketPointView(viewsets.ModelViewSet):
    # serializer_class = MarketPointSerializer
    # test_set = MarketPoint.objects.filter(timestamp__date = datetime(2015, 3, 4))
    # print(test_set)
    # print("here")
    # print(MarketPoint.objects.all()[:0])

    # queryset = MarketPoint.objects.all()[:100]

    def list(self, request):
        print(request.__dict__)
        queryset = MarketPoint.objects.all()[:100]
        # test_set = MarketPoint.objects.filter(timestamp__date=datetime(2021, 1, 2))
        # print(test_set.count())
        print(queryset[0].__dict__['timestamp'].date())
        serializer = MarketPointSerializer(queryset, many=True)
        return Response(serializer.data)

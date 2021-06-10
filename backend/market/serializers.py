from rest_framework import serializers
from .models import Currency, MarketPoint

class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = ('name', 'symbol')

class MarketPointSerializer(serializers.ModelSerializer):
    exchange_to = CurrencySerializer()
    exchange_from = CurrencySerializer()
    class  Meta:
        model = MarketPoint
        fields = ('price', 'timestamp', 'exchange_to', 'exchange_from')

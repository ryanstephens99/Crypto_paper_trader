import pandas
import os, sys

sys.path.append(
    os.path.join(os.path.dirname(__file__), 'backend')
)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
from django.conf import settings

from market.models import MarketPoint, Currency
import csv
from datetime import datetime
from django.utils.timezone import make_aware


def run():
    btc = Currency.objects.filter(symbol='btc').first()
    usd = Currency.objects.get(symbol='usd')
    MarketPoint.objects.filter(exchange_from=usd, exchange_to=btc).delete()
    data_file = pandas.read_csv('/Users/ryanstephens/Documents/personal projects/Crypto_paper_trader/exchange_data/gemini_BTCUSD_2020_1min.csv', skiprows=2)
    for index, row in data_file.iterrows():
        price = (row['High'] + row['Low'])/2
        time = make_aware(datetime.fromtimestamp(row['Unix Timestamp']/1000))
        market_point = MarketPoint.objects.create(exchange_to=btc,
                                                  exchange_from=usd,
                                                  price=price,
                                                  timestamp=time)
        market_point.save()


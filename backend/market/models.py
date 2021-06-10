from django.db import models

class Currency(models.Model):
    name = models.CharField(max_length=50)
    symbol = models.CharField(max_length=10)

    def __str__(self):
        return self.name
class MarketPoint(models.Model):
    exchange_to = models.ForeignKey(Currency, related_name="to", on_delete=models.CASCADE, null=True)
    exchange_from = models.ForeignKey(Currency, related_name="frm", on_delete=models.CASCADE, null=True)
    price = models.DecimalField(max_digits=12, decimal_places=5)
    timestamp = models.DateTimeField()

    def __str__(self):
        return self.exchange_from.symbol + "_" + self.exchange_to.symbol + "_" + str(self.timestamp)

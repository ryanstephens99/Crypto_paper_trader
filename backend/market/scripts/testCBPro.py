from coinbase.wallet.client import Client
import cbpro

from datetime import datetime

client = Client("wfTp4975e2m4E38J", "VJ4AWYcaJZsFGnUERJglPc2oIofarg1u")

# user =  client.get_current_user()

# user = client.get_user('df0a766a-aa75-5412-9a66-93098f31a612')

# accounts = client.get_accounts()

# for account in accounts['data']:
#     if float(account['balance']['amount']) != 0.0:
#         print(account['balance'])


public_client = cbpro.PublicClient()
# products = public_client.get_products()

prices = public_client.get_product_historic_rates('btc-usd')
for price in prices:
    # print(price)
    avg = sum(price[1:5])/4
    rounded = round(avg, 2)
    print(datetime.fromtimestamp(price[0]), rounded)


# method to draw price at given time



# hour based chart draw every 10 
# seconds from start of minute 0, 10, 20, 30, 40, 50

# day based chart draw every 5 minutes

# week based chart draw every 30 minutes

# month based chart draw every 2 hours

# year based chart draw every day at 7pm




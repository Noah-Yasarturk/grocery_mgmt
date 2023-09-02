import psycopg2
import yaml 
import pandas as pd

# Get connection info
env = 'dev'
P = 'D:/Database/grocery_db/sens.yml'
PG_INFO = {}
with open(P) as y:
   PG_INFO = yaml.load(y, Loader=yaml.Loader)

PG_INFO = PG_INFO['database'][env]
print(PG_INFO)


with psycopg2.connect(
   database=PG_INFO['db'], user=PG_INFO['username'], password=PG_INFO['password'], host=PG_INFO['host'], port=PG_INFO['port']
) as conn:
   q = "SELECT * FROM information_schema.tables LIMIT 10"
   df = pd.read_sql(q, conn)
   print(df)
'''
This code will enable us to run SQL queries to our RDS instance.

Format:
{
    "query": "sql query"
}
'''
import json

def lambda_handler(event, context):
    # TODO implement
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }

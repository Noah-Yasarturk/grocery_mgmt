'''
Run request to database

Args:
{"query": "SQL"}


Return:
{
    'statusCode': 200,
    'rds_response': results
}
'''
import os
import pymysql 
import logging
import sys
import pandas as pd


logger = logging.getLogger()


def lambda_handler(event, context):

    # Handle event
    print(f"Context: {context}")
    print(f"Event received: {event}")
    resp =  validate_params(event)
    if 'statusCode' in resp.keys():
        return resp
    
    # Connect
    query = event['query']
    first_word = query.split()[0].upper().strip()
    results = []
    conn = connect_to_rds()
    with conn.cursor() as cursor:

        # Execute query
        print(f"Executing query: {query}")
        cursor.execute(query)
        # Handle SELECTs
        if first_word == 'SELECT':
            df = pd.read_sql(query, conn)
            results = df.to_json(orient='records')

        # Handle CREATEs
        elif first_word == 'CREATE':
            results = cursor.rowcount

        # Handle INSERTs
        elif first_word == 'INSERT':
            results = cursor.rowcount

        # Handle unaccepted query types
        else:
            print(f"Unacceptable query type: {first_word}")
            return {
                'statusCode': 400,
                'rds_response': 'INVALID_QUERY'
            }
    conn.commit()
    return  {
            'statusCode': 200,
            'rds_response': results
        }


def validate_params(event):
    # Confirm that "query" is the only key
    for k in event.keys():
        if k != 'query':
            print(f"Received invalid param: {k}")
            return {
                'statusCode': 400,
                'body': 'Invalid params. Only query allowed'
            }
    return event



def connect_to_rds():
    # Connect to RDS
    user_name = os.environ['USER_NAME']
    password = os.environ['PASSWORD']
    rds_host = os.environ['RDS_HOST']
    db_name = os.environ['DB_NAME']
    try:
        conn = pymysql.connect(host=rds_host, user=user_name, passwd=password, database=db_name, connect_timeout=5)
    except pymysql.MySQLError as e:
        print("ERROR: Unexpected error: Could not connect to MySQL instance.")
        print(e)
        sys.exit()
    print("SUCCESS: Connection to RDS MySQL instance succeeded")
    return conn
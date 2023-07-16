import json
import os
import pymysql 
import logging
import sys

def lambda_handler(event, context):
    # Handle event
    print(f"Context: {context}")
    print(f"Event received: {event}")
    resp =  validate_params(event)
    if 'statusCode' in resp.keys():
        return resp
    
    logger = logging.getLogger()

    # rds settings
    user_name = os.environ['USER_NAME']
    password = os.environ['PASSWORD']
    rds_host = os.environ['RDS_HOST']
    # db_name = os.environ['DB_NAME']

    try:
        conn = pymysql.connect(host=rds_host, user=user_name, passwd=password, connect_timeout=5)
    except pymysql.MySQLError as e:
        logger.error("ERROR: Unexpected error: Could not connect to MySQL instance.")
        logger.error(e)
        sys.exit()


    logger.info("SUCCESS: Connection to RDS MySQL instance succeeded")
    query = event['query']
    first_word = query.split()[0].upper()
    results = []
    with conn.cursor() as cursor:
        cursor.execute(query)
        # Handle SELECTs
        if first_word == 'SELECT':
            results = cursor.fetchall()

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
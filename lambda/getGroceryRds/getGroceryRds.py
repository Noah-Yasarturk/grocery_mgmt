import json
import os
import pymysql 
import logging
import sys


logger = logging.getLogger()


def lambda_handler(event, context):

    # Handle event
    logger.info(f"Context: {context}")
    logger.info(f"Event received: {event}")
    resp =  validate_params(event)
    if 'statusCode' in resp.keys():
        return resp
    
    # Connect
    query = event['query']
    first_word = query.split()[0].upper().strip()
    results = []
    with connect_to_rds().cursor() as cursor:

        # Execute query
        logger.info(f"Executing query: {query}")
        cursor.execute(query)
        # Handle SELECTs
        if first_word == 'SELECT':
            results = cursor.fetchall()
        # Handle CREATEs
        elif first_word == 'CREATE':
            results = cursor.rowcount

        # Handle unaccepted query types
        else:
            logger.error(f"Unacceptable query type: {first_word}")
            return {
                'statusCode': 400,
                'rds_response': 'INVALID_QUERY'
            }

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
        logger.error("ERROR: Unexpected error: Could not connect to MySQL instance.")
        logger.error(e)
        sys.exit()
    logger.info("SUCCESS: Connection to RDS MySQL instance succeeded")
    return conn
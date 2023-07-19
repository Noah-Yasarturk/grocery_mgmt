''' Create a new grocery store

Args:
{
    "store_name": "Publix", 
    "location": "place"
}

Returns:
* {"statusCode":201,"body":"Store created"}
* {"statusCode":400,"body":"Require store_name and location"}

'''

import json
import boto3

SQL_KEYWORDS = ['ADD', 'ADD CONSTRAINT', 'ALL', 'ALTER', 'ALTER COLUMN', 'ALTER TABLE', 'AND', 'ANY', 'AS', 'ASC', 'BACKUP DATABASE', 'BETWEEN', 'CASE', 'CHECK', 'COLUMN', 'CONSTRAINT',
'CREATE', 'CREATE DATABASE', 'CREATE INDEX', 'CREATE OR REPLACE VIEW', 'CREATE TABLE', 'CREATE PROCEDURE', 'CREATE UNIQUE INDEX', 'CREATE VIEW', 
'DATABASE', 'DEFAULT', 'DELETE', 'DESC', 'DISTINCT', 'DROP', 'DROP COLUMN', 'DROP CONSTRAINT', 'DROP DATABASE', 'DROP DEFAULT', 'DROP INDEX', 'DROP TABLE', 'DROP VIEW', 'EXEC', 'EXISTS', 
'FOREIGN KEY', 'FROM', 'FULL OUTER JOIN', 'GROUP BY', 'HAVING', 'IN', 'INDEX', 'INNER JOIN', 'INSERT INTO', 'INSERT INTO SELECT', 'IS NULL', 'IS NOT NULL', 'JOIN', 'LEFT JOIN', 'LIKE', 
'LIMIT', 'NOT', 'NOT NULL', 'OR', 'ORDER BY', 'OUTER JOIN', 'PRIMARY KEY', 'PROCEDURE', 'RIGHT JOIN', 'ROWNUM', 'SELECT', 'SELECT DISTINCT', 'SELECT INTO', 'SELECT TOP', 'SET', 'TABLE', 
'TOP', 'TRUNCATE TABLE', 'UNION', 'UNION ALL', 'UNIQUE', 'UPDATE', 'VALUES', 'VIEW', 'WHERE']

VALID_KEYS =  ['store_name', 'location']

def lambda_handler(event, context):
    # Validate params
    print(f"event: {event}")
    print(f"context: {context}")
    resp = validate_params(event)
    if "statusCode" in resp.keys(): return resp

    # Write store 
    lambda_client = boto3.client('lambda')
    q = f"""
    INSERT INTO STORE (STORE_NAME, LOC, CREATED_AT, UPDATED_AT)
    VALUES ('{event['store_name']}', '{event['location']}',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)

    """
    payload = {"query": q}
    print(f"Invoking getGroceryRds with {payload}")
    rds_response = lambda_client.invoke(
            FunctionName='getGroceryRds',
            InvocationType='Event',
            Payload=json.dumps(payload),
    )
    print(rds_response)
    # TODO: process rds_response - return

    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }


def validate_params(event: dict):
    ''' Confirm we receive event properly '''
    # Make sure we have required params
    for k in VALID_KEYS:
        if not k in event.keys():
            return {
                "statusCode": 400,
                "body":"Require store_name and location"
            }
    
    # Make sure there's no SQL keyqords
    for key, value in event.items():
        for k in SQL_KEYWORDS:
            if k in value:
                return {
                    "statusCode": 400,
                    "body":"SQL injection not allowed"
                }

    return event



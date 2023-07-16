import json

def lambda_handler(event, context):
   print(f"Event received: {event}")
   resp =  validate_params(event)
   if 'statusCode' in resp.keys():
       return resp 
   # Proceed with query
   return  {
        'statusCode': 200,
        'body': 'Success'
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
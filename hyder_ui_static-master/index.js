console.log('Loading function');
const AWS = require('aws-sdk');
AWS.config.update({region: 'ap-south-1'});
const dynamo = new AWS.DynamoDB({apiVersion: '2012-08-10'});


exports.handler = (event, context, callback) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    let dbParams = {'TableName':'Product'};

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers':'*',
            'Access-Control-Allow-Methods':'*',
            'Access-Control-Allow-Origin':'*'
        },
    });
    switch (event.httpMethod) {
        case 'DELETE':
            removeItem(JSON.parse(event.body),dbParams);
            dynamo.deleteItem(dbParams, done);
            break;
            
        case 'GET':
            
            dynamo.scan(dbParams, done);
            break;
            
        case 'POST':
            let currentProduct = JSON.parse(event.body);
            dbParams.Item = buildItem(currentProduct);
            dynamo.putItem(dbParams, done);
            break;
        case 'PUT':
            let updatingProduct = JSON.parse(event.body);
            updateItem(updatingProduct, dbParams);
            dynamo.updateItem(dbParams, done);
            break;
        default:
            done(new Error(`Unsupported http request method "${event.httpMethod}"`));
    }
};

function buildItem(currentProduct){
    return {
           "ProductId": {
             S: currentProduct.ProductId
            }, 
           "ProductName": {
             S: currentProduct.ProductName
            }, 
           "Cost": {
             S: currentProduct.Cost
            }, 
           "Sku": {
             S: currentProduct.Sku
            }, 
           "ExpirationDate": {
             S: currentProduct.ExpirationDate
            }
          };
}

function updateItem(updatingItem, params){
    params.ExpressionAttributeNames= {
   "#PN": "ProductName",
   "#PR": "Cost",
   "#SKU": "Sku",
   "#EXPD": "ExpirationDate"
  };
  params.ExpressionAttributeValues= {
   ":n": {
     S: (updatingItem.ProductName?updatingItem.ProductName:'')
    }, 
   ":c": {
     S: (updatingItem.Cost?updatingItem.Cost:'')
    },
    ":s": {
     S: (updatingItem.Sku?updatingItem.Sku:'')
    },
    ":e": {
     S: (updatingItem.ExpirationDate?updatingItem.ExpirationDate:'')
    }
  };
  params.Key= {
   "ProductId": {
     S: updatingItem.ProductId
    }
  };
  params.ReturnValues= "ALL_NEW";
  params.UpdateExpression= "SET #PN = :n, #PR = :c, #SKU = :s, #EXPD = :e";
 }
 
 
 
 
 
 
 
 
 
 function removeItem(toBeRemoved, params){
  params.Key = {
   "ProductId": {
     S: toBeRemoved.ProductId
    }
  };
 }
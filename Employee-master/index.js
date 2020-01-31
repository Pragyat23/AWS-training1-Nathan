
console.log('Starting to process data');

const doc = require('aws-sdk');
doc.config.update({region:'us-east-2'});
const dynamo = new doc.DynamoDB({apiVersion: '2012-08-10'});
let dbParams = {'TableName':'Emp'};

exports.handler = (event, context, callback) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*'
        },
    });

    switch (event.httpMethod) {
        case 'DELETE':
            dbParams.Key = RemoveItem(JSON.parse(event.body));
            
            dynamo.deleteItem(dbParams, done);
            break;
        case 'GET':
            dynamo.scan(dbParams, done);
            break;
        case 'POST':
            let currentEmp= JSON.parse(event.body);
            dbParams.Item = buildItem(currentEmp);
            dynamo.putItem(dbParams, done);
            break;
        case 'PUT':
            let updatingEmp= JSON.parse(event.body);
            updateItem(updatingEmp,dbParams)
            dynamo.updateItem(dbParams, done);
            break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }

};

function buildItem(currentEmp){
    return  {
            "EmpId" : { N: currentEmp.EmpId},
             "Name":{S: currentEmp.Name},
             "Gender":{S: currentEmp.Gender},
             "Email":{S: currentEmp.Email}
         };
}
    


function RemoveItem(toremove,params){
    return {
      "EmpId" : { S: toremove.EmpId }
    };
}
function updateItem (updateEmp,params){
    
    params.ExpressionAttributeNames ={
        
    }
    
}
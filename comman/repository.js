/**
 * Alll the database operation functions
 */
 const AWS = require('aws-sdk')
 const dynamoDb = new AWS.DynamoDB.DocumentClient()


const inserData = async (tableName, data) => {
    // const params = {
    //     TableName: tableName,
    //     Item: data
    // }
    // dynamoDb.put(params, (err) => {
    //     // if (err) {
    //     //     console.log(err);
    //     // }
    //     // const response = {
    //     //     statusCode: 200,
    //     //     body: JSON.stringify(params.Item),
    //     // }
        
    // })

    try {
        const params = {
            TableName: tableName,
            Item: data
        }
        const response = await dynamoDb.put(params)
        return response
    } catch(err) {
        throw err
    }
}

module.exports = {
    inserData
}
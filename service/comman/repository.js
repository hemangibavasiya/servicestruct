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
    //     if (err) {
    //         console.log(err);
    //     }
    //     const response = {
    //         statusCode: 200,
    //         body: JSON.stringify(params.Item),
    //     }
        
    // })

    try {
        const params = {
            TableName: tableName,
            Item: data
        }
        dynamoDb.put(params, (err) => {
            if (err) {
                console.log(err);
            }
            return Promise.resolve({
                statusCode: 200,
                body: JSON.stringify(params.Item),
            })  
            
        })
        // const response = await dynamoDb.put(params)
        // console.log('response of table', response)
        // return response
    } catch(err) {
        console.log(err, 'db err')
        throw err
    }
}

module.exports = {
    inserData
}
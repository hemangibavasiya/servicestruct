/**
 * Alll the database operation functions
 */
const AWS = require('aws-sdk')
const dynamoDb = new AWS.DynamoDB.DocumentClient()

/**
 * 
 * @param {String} tableName 
 * @param {Json} data 
 * @returns Inserted details
 */
const inserData = async (tableName, data) => {
    try {
        const params = {
            TableName: tableName,
            Item: data
        }
        const response = new Promise(function (resolve, reject) {
            dynamoDb.put(params, (err) => {
                if (err) {
                    reject(Error(err))
                } else {
                    resolve({
                        data: JSON.stringify(params.Item),
                    })
                }
            })
        })
        return response
    } catch (err) {
        console.log(err, 'db err')
        throw err
    }
}

module.exports = {
    inserData
}
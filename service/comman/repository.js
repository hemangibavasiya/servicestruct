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
const insertData = async (tableName, data) => {
    try {
        const params = {
            TableName: tableName,
            Item: data
        }
        const response = await new Promise(function (resolve, reject) {
            dynamoDb.put(params, (err) => {
                if (err) {
                    return reject(Error(err))
                } else {
                                            

                    return resolve(
                        params.Item
                    )
                }
            })
        })
        return response
        // return dynamoDb.put(params).promise().then(
        //     result => {
        //         console.log(result)
        //         result.Item
        //     } 
        // )
    } catch (err) {
        console.log(err, 'db err')
        throw err
    }
}

const list = async (tableName) => {
    try {
        const params = {
            TableName: tableName
        }
        const response = await new Promise(function (resolve, reject) {
            dynamoDb.scan(params, (err, result) => {
                if (err) {
                    return reject(Error(err))
                } else {
                    return resolve(
                        result.Items
                    )
                }
            })
        })
        return response
    } catch (error) {
        throw error
    }
}

const viewRecordBasedOnQuery = async (tableName, id) => {
    try {
        const params = {
            TableName: tableName,
            Key: {
                id
            }
        }
        return await dynamoDb.get(params).promise().then(result => result.Item)
    } catch (error) {
        throw error
    }
}

const removeRecord = async (tableName, id) => {
    try {
        const params = {
            TableName: tableName,
            Key: {
                id
            }
        }
        const response =  await dynamoDb.delete(params).promise().then(result => result)
        if(!!response) {
            return true
        } else {
            return false
        }
    } catch (error) {
        throw error
    }
}

module.exports = {
    insertData,
    list,
    viewRecordBasedOnQuery,
    removeRecord
}
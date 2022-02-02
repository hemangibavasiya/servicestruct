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
        console.log('--------------------params',params)
        const response = new Promise(function (resolve, reject) {
            dynamoDb.put(params, (err) => {
                if (err) {
                    console.log('error---------------', err)
                    reject(Error(err))
                } else {
                                            console.log('is in resolve function')

                    resolve({
                        data: JSON.stringify(params.Item),
                    })
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
        console.log(tableName)
        const params = {
            TableName: tableName
        }
        return dynamoDb.scan(params).promise().then(result => result.Items)
    } catch (error) {
        throw error
    }
}

const viewRecordBasedOnQuery = async (tableName, query) => {
    try {
        const params = {
            TableName: tableName,
            key: {
                query
            }
        }
        return dynamoDb.get(params).promise().then(result => result.Item)
    } catch (error) {
        throw error
    }
}

const removeRecord = async (tableName, query) => {
    try {
        const params = {
            TableName: tableName,
            key: {
                query
            }
        }
        return dynamoDb.delete(params).promise()
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
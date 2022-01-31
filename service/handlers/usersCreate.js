const UserTable = process.env.USER_TABLE
const { insertData } = require('../comman/repository')

const insertUserDetails = async (event, context, callback) => {
    const response = new Promise(async function (resolve, reject) {
        try {
            const data = JSON.parse(event.body);
            const response = await insertData(UserTable, data)
            resolve({ statusCode: 200, body: response.data })
        } catch (err) {
            reject(err)
        }

    })
    return response
}

module.exports = {
    insertUserDetails
}
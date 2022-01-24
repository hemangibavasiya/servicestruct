const UserTable = process.env.USER_TABLE
const { inserData } = require('../comman/repository')

const insertUserDetails = async (event, context, callback) => {
    const response  = new Promise(function (resolve, reject) {
        const data = JSON.parse(event.body);
        const response = await inserData(UserTable, data)
        resolve({ statusCode: 200, body: response.data })
    })
    return response
}

module.exports = {
    insertUserDetails
}
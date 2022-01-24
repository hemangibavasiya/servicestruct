const UserTable = process.env.USER_TABLE
const { inserData } = require('../comman/repository')

const insertUserDetails = async  (event, context, callback) => {
    const data = JSON.parse(event.body);
  
    const items = {
        id: data.id,
        name: data.name
    }
    const response = await inserData(UserTable, items)

    const finalResponse = {
        statusCode: 200,
        body: JSON.stringify(response),
    }
    callback(null, finalResponse);
      // const params = {
    //     TableName: UserTable,
    //     Item: {
    //         id: data.id,
    //         name: data.name
    //     }
    // }
    // dynamoDb.put(params, (err) => {
    //     if (err) {
    //         console.log(err);
    //     }
    //     const response = {
    //         statusCode: 200,
    //         body: JSON.stringify(params.Item),
    //     };
    //     callback(null, response);
    // });
}

module.exports = {
    insertUserDetails
}
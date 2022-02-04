const { graphql } = require("graphql")
const { schema } = require("../schema/demoTableSchema")

const main = async (event, context, callback) => {
   return await new Promise(async (resolve, reject) => {
       await graphql(schema, JSON.parse(event.body).query).then(
            result => {
                  return resolve({ statusCode: 200, body: JSON.stringify(result) },
                error =>  reject({ errorMessage: error })
                )}
        ) 
    })
}

module.exports = {
    main
}
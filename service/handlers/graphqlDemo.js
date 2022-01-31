const { graphql } = require("graphql")
const { schema } = require("../schema/demoTableSchema")

const main = (event, context, callback) => {
    return new Promise(async (resolve, reject) => {
        graphql(schema, event.body).then(
            result => resolve({ status: 200, body: JSON.stringify(result) },
                error => reject({ errorMessage: error })
            ))
    })
}

module.exports = {
    main
}
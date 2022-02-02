const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLBoolean } = require("graphql");
const { list, viewRecordBasedOnQuery, removeRecord } = require("../comman/repository");
const uuid = require('uuid');
const { addProductData } = require("../comman/validators");


const tableType = new GraphQLObjectType({
    name: process.env.Table_Name,
    Item: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        quantity: { type: new GraphQLNonNull(GraphQLInt) },
        createdAt: { type: new GraphQLNonNull(GraphQLString) }
    }
})

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            listRecords: {
                type: new GraphQLList(tableType),
                resolve: (parent, args) => list(process.env.Table_Name)
            },
            viewRecord: {
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                type: tableType,
                resolve: (parent, args) => viewRecordBasedOnQuery(process.env.Table_Name, args.id)
            }
        }
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            createRecord: {
                args: {
                    name: { type: new GraphQLNonNull(GraphQLString) },
                    quantity: { type: new GraphQLNonNull(GraphQLInt) }
                },
                // args['createdAt']: Date.now(),
                // args['id']: uuid.v1(),
                type: tableType,
                // Object.assign(args, {'createdAt': Date.now(), id: uuid.v1()})
                resolve: (parent, args) => addProductData(process.env.Table_Name, args )
            },
            removeDetails: {
                args: {
                    id: { type: new GraphQLNonNull(GraphQLString) }
                },
                type: GraphQLBoolean,
                resolve: (parent, args) => removeRecord(process.env.tableType, args.id)
            }
        }
    })
})

module.exports = {
    schema
}

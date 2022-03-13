const { gql } = require("apollo-server-express");

module.exports = gql`
    extend type Query {
        greeting: String
    }
    extend type Mutation {
        googleAuth(idToken: String): successInfo
    }
    type successInfo {
        message: String
        success: Boolean
    }
`;
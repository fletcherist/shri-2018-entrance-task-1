const GraphQLDate = require('graphql-date');

const query = require('./query');
const mutation = require('./mutation');

module.exports = function resolvers () {
  return {
    Query: query,

    Mutation: mutation,

    Event: {
      /* @bug: missed return here */
      users (event) {
        return event.getUsers();
      },
      /* @bug: missed return here */
      room (event) {
        return event.getRoom();
      },
    },

    Date: GraphQLDate
  };
};

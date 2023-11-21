const { ApolloServer } = require("apollo-server");
const { importSchema } = require("graphql-import");
const EtherDataSource = require("./datasource/ethDatasource");
const typeDefs = importSchema("./schema.graphql");

require("dotenv").config();

const resolvers = {
  Query: {
    // Query to get ether balance by address
    etherBalanceByAddress: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.etherBalanceByAddress(),

    // Query to get total supply of ether
    totalSupplyOfEther: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.totalSupplyOfEther(),

    // Query to get latest ethereum price
    latestEthereumPrice: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getLatestEthereumPrice(),

    // Query to get block confirmation time
    blockConfirmationTime: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(),
  }),
});

server.timeout = 0;
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

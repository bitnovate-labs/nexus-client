import { API } from "aws-amplify";

// Configure Amplify to use the EC2 GraphQL endpoint
API.configure({
  aws_appsync_graphqlEndpoint: "https://46.137.202.243:80/graphql",
  aws_appsync_region: "us-west-2", // Replace with your region
  aws_appsync_authenticationType: "API_KEY", // Or other authentication method
});

// Example GraphQL query call
const fetchData = async () => {
  const response = await API.graphql({
    query: yourGraphQLQuery,
  });
  console.log(response);
};

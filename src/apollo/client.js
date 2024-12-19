import { ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";

const uploadLink = createUploadLink({
  // uri: "http://localhost:4000/graphql",
  uri: import.meta.env.VITE_GRAPHQL_URI,
  // uri: "http://nexus-server.ap-southeast-1.elasticbeanstalk.com/graphql",
  credentials: "include",
  headers: {
    apikey: import.meta.env.VITE_SUPABASE_ANON_KEY, // Replace with your Supabase anon key
  },
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
    credentials: "include",
  };
});

const client = new ApolloClient({
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "network-only",
    },
    query: {
      fetchPolicy: "network-only",
    },
  },
});

export { client };

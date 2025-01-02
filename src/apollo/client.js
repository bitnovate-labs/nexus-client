import { ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";

const uploadLink = createUploadLink({
  uri: import.meta.env.VITE_API_URL,
  // uri: "http://localhost:4000/graphql",
  // uri: "http://nexus-server-ccf2d00yt-timothys-projects-8a13be46.vercel.app/graphql",
  // uri: import.meta.env.VITE_GRAPHQL_URI,
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

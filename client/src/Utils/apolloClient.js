import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import store from "../Redux/store";
import { clearUser } from "../Redux/Slices/userSlice";

// Create an HTTP link
const httpLink = new HttpLink({
  uri: "http://localhost:8000/graphql",
});

// Create an error link to handle authentication errors
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ extensions }) => {
      if (extensions.code === "UNAUTHENTICATED") {
        // Token expired or is invalid
        localStorage.removeItem("authToken");
        //remove token and user from from the redux state
        store.dispatch(clearUser());
      }
    });
  }

  if (networkError) {
    console.error("Network error:", networkError);
  }
});

// Create an authorization link
const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("authToken");

  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });

  return forward(operation);
});

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink.concat(httpLink)]),
  cache: new InMemoryCache(),
});

export default client;

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { useDispatch } from "react-redux";
import { clearUser } from "../Redux/Slices/userSlice";

// Create a ClientContext to provide the client instance
const ClientContext = createContext(null);

export const ClientProvider = ({ children }) => {
  const [client, setClient] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
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
            // Remove user from Redux store
            dispatch(clearUser());
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
      console.log(token);
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : "",
        },
      });
      return forward(operation);
    });

    // Create Apollo Client
    const newClient = new ApolloClient({
      link: from([errorLink, authLink.concat(httpLink)]),
      cache: new InMemoryCache(),
    });

    setClient(newClient);
  }, [dispatch]); // Re-create client if dispatch changes (e.g., on logout)

  return (
    <ClientContext.Provider value={client}>{children}</ClientContext.Provider>
  );
};

// Hook to use the Apollo Client
export const useClient = () => {
  return useContext(ClientContext);
};

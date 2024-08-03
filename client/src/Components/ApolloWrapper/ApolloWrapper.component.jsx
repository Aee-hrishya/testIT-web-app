import React from "react";
import { useClient } from "../../Hooks/useClient";
import { ApolloProvider } from "@apollo/client";
import App from "../../App";

const ApolloWrapper = () => {
  const client = useClient();
  if (!client) return <div>Loading....</div>;
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

export default ApolloWrapper;

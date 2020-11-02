// App Component
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import { BrowserRouter, HashRouter, Route, Switch } from "react-router-dom";
import SongCreateForm from "./components/SongCreateForm";
import SongDetail from "./components/SongDetail";
import SongList from "./components/SongList";

// Setup Apollo Client
// This will look at endpoint /graphql
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          songs: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});

const App = () => {
  return (
    <div className={"container"}>
      <ApolloProvider client={client}>
        <HashRouter>
          <Switch>
            <Route path={"/"} component={() => <div>Home</div>} exact />
            <Route path={"/songs"} component={SongList} exact />
            <Route path={"/songs/new"} component={SongCreateForm} />
            <Route path={"/songs/:id"} component={SongDetail} />
          </Switch>
        </HashRouter>
      </ApolloProvider>
    </div>
  );
};

export default App;

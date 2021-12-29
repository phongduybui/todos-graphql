import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import { GlobalStyle } from './styled';
import { loggedInUser } from '../../graphql/vars';
import RootRoutes from '../../routes';
import 'react-toastify/dist/ReactToastify.css';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_SERVER_URI,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          tasks: {
            // keyArgs: ['filter', 'order_by'],
            // keyArgs: false,
            // merge(existing = [], incoming) {
            //   console.log('Merge: ', {
            //     existing,
            //     incoming,
            //     combined: [...existing, ...incoming.tasks],
            //   });
            //   return [...existing, ...incoming.tasks];
            // },
            // read(existing, options) {
            //   console.log('Read:', { existing, options });
            //   const endIndex = options.args?.offset + options.args?.limit;
            //   return existing && existing.slice(options.args?.offset, endIndex);
            // },
          },
        },
      },
    },
  }),

  headers: {
    Authorization: `Bearer ${loggedInUser()?.token}`,
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <RootRoutes />
      <ToastContainer theme="colored" />
    </ApolloProvider>
  );
}

export default App;

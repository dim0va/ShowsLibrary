import {QueryClient, setLogger} from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {queries: {staleTime: Infinity}},
});

// Mute query logs
// These will fire in addition to errors being thrown which is annoying.
setLogger({
  error: () => {},
  log: () => {},
  warn: () => {},
});

export default queryClient;

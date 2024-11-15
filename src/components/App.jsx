import Home from './Home';
import { AppProvider } from '../lib/context';

export default function App() {
  return (
    <AppProvider>
      <Home />
    </AppProvider>
  );
}

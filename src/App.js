// Importamos css global 
import { Provider } from 'react-redux';
import './App.css';
import generateStore from './redux/store/store';
// import generateStore, { store } from './redux/store/store';
import { AppRouter } from './routers/AppRouter';

const App = () => {
  let store = generateStore();
  return (
    // Router Commponente de la libreria react-router-dom
    <Provider store={store}>
      <AppRouter />
    </Provider>

  );
}

export default App;

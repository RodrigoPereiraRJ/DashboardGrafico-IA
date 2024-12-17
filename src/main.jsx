import React from 'react';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Error404 from './Componentes/Error404.jsx';
import './styles/Main.sass';
import { Provider } from 'react-redux';
import store, { persistor } from './Redux/store';
import Meusgraficos from './Componentes/Meusgraficos.jsx'
import { PersistGate } from 'redux-persist/integration/react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error404 />
  },
  {
    path: 'MeusGraficos',
    element: <Meusgraficos />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>


    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>

    </PersistGate>




  </React.StrictMode>
);

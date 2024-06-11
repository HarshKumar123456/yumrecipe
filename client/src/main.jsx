import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


import App from './App.jsx';
import "../src/index.css";
import SearchPage from './pages/SearchPage.jsx';
import RecipePage from './pages/RecipePage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <>Sorry !!!!!!!!!!</>,
  },
  {
    path: "/search/:searchKeyword",
    element: <SearchPage />,
  },
  {
    path: "/recipe/:recipeId",
    element: <RecipePage />,
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
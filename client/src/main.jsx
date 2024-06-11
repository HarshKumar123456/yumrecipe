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
import SignUpPage from './pages/SignUpPage.jsx';
import SignInPage from './pages/SignInPage.jsx';
import { AuthProvider } from './context/auth.jsx';
import MyRecipesPage from './pages/MyRecipesPage.jsx';
import CRUDRecipePage from './pages/CRUDRecipePage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <>Sorry !!!!!!!!!! Page Not Found</>,
  },
  {
    path: "/search/:searchKeyword",
    element: <SearchPage />,
  },
  {
    path: "/recipe/:recipeId",
    element: <RecipePage />,
  },
  {
    path: "/recipe/:recipeId/:actions",
    element: <CRUDRecipePage />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/my-recipes",
    element: <MyRecipesPage />,
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import AuthProvider from './components/context/AuthContext';
import ProtectedRoute from './shared/ProtectedRoute';
import { Page } from './utils/constants';
import AuthPage from './components/auth/AuthPage';
import { theme } from './utils/theme';
import ReviewIndex from './pages/chinese/reviews/ReviewIndex';
import WordPackIndex from './pages/chinese/word-packs/WordPackIndex';
import StatisticsIndex from './pages/chinese/statistics/StatisticsIndex';

const { ToastContainer } = createStandaloneToast();

const router = createBrowserRouter([
  {
    path: Page.REGISTER,
    element: <AuthPage />,
  },
  {
    path: Page.LOGIN,
    element: <AuthPage />,
  },
  {
    path: Page.REVIEWS,
    element: <ProtectedRoute><ReviewIndex /></ProtectedRoute>,
  },
  {
    path: Page.WORD_PACKS,
    element: <ProtectedRoute><WordPackIndex /></ProtectedRoute>,
  },
  {
    path: Page.STATISTICS,
    element: <ProtectedRoute><StatisticsIndex /></ProtectedRoute>,
  },
  {
    path: '/',
    element: <Navigate to={Page.LOGIN} />,
  },
]);

const rootElement = document.getElementById('root') as HTMLElement;

if (rootElement) {
  ReactDOM
    .createRoot(rootElement)
    .render(
      <React.StrictMode>
        <ChakraProvider theme={theme}>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
          <ToastContainer />
        </ChakraProvider>
      </React.StrictMode>,
    );
}

import * as React from 'react'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import theme from '../theme'
import Home from './pages/Home';
import Movies from './pages/movies/Movies';
import Shows from './pages/shows/Shows';
import Search from './pages/search/Search'
import DetailsPage from './pages/DetailsPage';
import { AuthProvider } from './context/AuthProvider';
import { WacthList } from './pages/WacthList';
import ProtectedRoutes from './components/routes/ProtectedRoutes';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: '/',
        element:<Home/>,
      },

      {
        path: '/movies',
        element: <Movies/>
      },
      {
        path: '/shows',
        element: <Shows/>
      },
      {
        path: '/search',
        element: <Search/>
      },
      {
        path: '/:type/:id',
        element: <DetailsPage/>
      },
      {
        path: '/watchlist',
        element: (
          <ProtectedRoutes>
            <WacthList/>
          </ProtectedRoutes>
        )
      }
    ]
  }
])

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <AuthProvider>
      <RouterProvider router={router} />
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
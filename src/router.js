import { createBrowserRouter } from 'react-router-dom'

import App from './App'
import Login from './pages/login'

export default router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <Login />,
  },
])

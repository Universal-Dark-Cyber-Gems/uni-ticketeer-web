import './App.css';
import { RouterProvider, createBrowserRouter} from 'react-router-dom'
import Home from './Screens/Home';
import IndexLayout from './Screens/IndexLayout';
import Events from './Screens/Events';
import About from './Screens/About';
import AuthLayout from './Screens/AuthScreens/AuthLayout';
import Login from './Screens/AuthScreens/Login';
import SignUp from './Screens/AuthScreens/SignUp';
import DashboardLayout from './Screens/DashboardScreens/DashboardLayout';
import Dashboard from './Screens/DashboardScreens/Dashboard';
import DashEvent from './Screens/DashboardScreens/DashEvent';
import DashWallet from './Screens/DashboardScreens/DashWallet';
import {register} from 'swiper/element/bundle'
import Error from './Screens/Error';
import ViewEventStats from './Screens/DashboardScreens/ViewEventStats';

register();


function App() {

  const router = createBrowserRouter([
    {
    path: "/",
    element: <IndexLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "events",
        element: <Events />
      },
      {
        path: "about",
        element: <About />
      }
    ]},
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
        path: "login",
        element: <Login />
        },
        {
          path: "signup",
          element: <SignUp />
        }
    ]},
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />
        },
       {
         path: "events",
         element: <DashEvent />
       },
       {
         path: "wallet",
         element: <DashWallet />
       },
       {
        path: "event/details",
        element: <ViewEventStats />
       }
      ]
    }
  ])
  return (
      <RouterProvider router={router} />
  );
}

export default App;

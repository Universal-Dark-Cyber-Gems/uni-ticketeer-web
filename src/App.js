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
import EventLayout from './Screens/DashboardScreens/EventLayout';
import CreateEvent from './Screens/DashboardScreens/CreateEvent';
import EditEvent from './Screens/DashboardScreens/EditEvent';
import ViewEventTickets from './Screens/DashboardScreens/ViewEventTickets';
import Settings from './Screens/DashboardScreens/Settings';
import AuthWrapper from './Screens/AuthWrapper';

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
      element: <AuthWrapper><DashboardLayout /></AuthWrapper>,
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
        path: "event",
        element: <EventLayout />,
        children: [
          {
            path: 'details',
            element: <ViewEventStats />
          },
          {
            path: 'create',
            element: <CreateEvent />
          },
          {
            path: 'edit',
            element: <EditEvent />
          },
          {
            path: 'tickets',
            element: <ViewEventTickets />
          }]
        },
        {
          path: "settings",
          element: <Settings />
        }
      ]
    }
  ])
  return (
      <RouterProvider router={router} />
  );
}

export default App;

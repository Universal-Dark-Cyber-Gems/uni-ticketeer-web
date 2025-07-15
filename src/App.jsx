import './App.css';
import { Outlet, RouterProvider, createBrowserRouter} from 'react-router-dom'
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
import Error from './Screens/NotFound';
import ViewEventStats from './Screens/DashboardScreens/ViewEventStats';
import EventLayout from './Screens/DashboardScreens/EventLayout';
import CreateEvent from './Screens/DashboardScreens/CreateEvent';
import EditEvent from './Screens/DashboardScreens/EditEvent';
import ViewEventTickets from './Screens/DashboardScreens/ViewEventTickets';
import Settings from './Screens/DashboardScreens/Settings';
import AuthWrapper from './Screens/AuthWrapper';
import EditTicket from './Screens/DashboardScreens/EditTicket';
import ViewOrganiserTicket from './Screens/DashboardScreens/ViewOrganiserTicket'
import Cart from './Screens/DashboardScreens/Cart'
import { UserProvider } from './contexts/UserContext';
import { ScreenLoaderProvider } from './contexts/ScreenLoaderContext';
import { CartProvider } from './contexts/CartContext';

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
      element: (
        <AuthWrapper>
          <UserProvider>
            <ScreenLoaderProvider>
              <CartProvider>
                <DashboardLayout />
              </CartProvider>
            </ScreenLoaderProvider>
          </UserProvider>
        </AuthWrapper>
      ),
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
            path: 'details/:id',
            element: <ViewEventStats />
          },
          {
            path: 'create',
            element: <CreateEvent />
          },
          {
            path: 'edit/:id',
            element: <EditEvent />
          },
          {
            path: 'tickets/:id',
            element: <ViewEventTickets />
          },
          {
            path: ':eventname/tickets/edit/:eventid/:ticketid',
            element: <EditTicket />
          },
          {
            path: ':eventname/organiser/view/ticket/:ticketid',
            element: <ViewOrganiserTicket />
          }]
        },
        {
          path: "cart",
          element: <Cart />
        },
        {
          path: "verify"
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

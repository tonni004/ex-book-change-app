import React, { Suspense, lazy, useEffect } from "react";
import { useLocation, useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./Header/Header";
import NavigatePanel from "./NavigatePanel";
import { Container } from "./Container/Container";
// import WelcomeScreen from "./WelcomeScreen";
import { Loader } from "./Loader/Loader";
import { unsubscribe } from "../api-functions/api-functions";
import PrivateRoute from "../routes/PrivateRoutes";
import PublicRoute from "../routes/PublicRoutes";
import { getIsAuthenticated } from "../redux/auth/auth-selectors";
import { ToastContainer } from 'react-toastify';

const Home = lazy(() => import("../pages/HomePage"));
const Login = lazy(() => import("../pages/LoginPage"));
const Register = lazy(() => import("../pages/RegisterPage"));
const UserProfile = lazy(() => import("../pages/ProfilePage"));
const OtherUsersProfile = lazy(() => import('../pages/OtherUsersProfilePage'))
const Search = lazy(() => import("../pages/SearchPage"));
const Message = lazy(() => import('../pages/MessagePage'));
const Chat = lazy(() => import('../pages/ChatPage'));
const NotFound = lazy(() => import('../pages/NotFound'));


export default function App() {
  const location = useLocation();
  const IsAuthenticated = useSelector(getIsAuthenticated);

  useEffect(() => {
    unsubscribe();
  }, [])


  const element = useRoutes([
    {
      path: '/',
      element: <PublicRoute><Home /></PublicRoute>,
    },
    {
      path: '/login',
      element: <PublicRoute><Login /></PublicRoute>,
    },
    {
      path: '/register',
      element: <PublicRoute><Register /></PublicRoute>,
    },
    {
      path: "/message",
      element: <PrivateRoute><Message /></PrivateRoute>,
    },
    {
      path: "/message/:userChatID",
      element: <PrivateRoute><Chat /></PrivateRoute>,
    },
    {
      path: "/profile",
      element: <PrivateRoute><UserProfile /></PrivateRoute>,
    },
    {
      path: "/profile/:userNickname",
      element: <PrivateRoute><OtherUsersProfile /></PrivateRoute>,
    },
    {
      path: '/search',
      element: <PrivateRoute><Search /></PrivateRoute>,
    },
    {
      path: "*",
      element: <NotFound />,
    }
  ]);
  if (!element) return null;

  return (
    <Suspense fallback={<Loader />}>
      <>
        {/* {console.log(showWelcomeScreen)}
          {showWelcomeScreen && <WelcomeScreen />} */}
        <Container IsAuthenticated={IsAuthenticated}>
          <Header />
          {React.cloneElement(element, { key: location.pathname })}
          <ToastContainer />
        </Container>
        <NavigatePanel />
      </>

    </Suspense>
  );
}


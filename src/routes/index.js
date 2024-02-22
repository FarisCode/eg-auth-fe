import Home from '../pages/Home/Home';
import SignUp from '../pages/SignUp/SignUp';
import SignIn from '../pages/SignIn/SignIn';
import Auth from '../pages/Auth/Auth';
import Error from '../pages/Error/Error';

const routes = [
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
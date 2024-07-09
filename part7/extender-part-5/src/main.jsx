import ReactDOM from "react-dom/client";
import App from "./App";
import { store } from "./redux/store";
import { Provider, useDispatch } from "react-redux";
//react router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./NotFound/ErrorPage";
import SignUp from "./components/SignUp";
import SingleUser from "./components/SingleUser";
import AllUsers from "./components/AllUsers";
//for the single user
import { fetchUser } from "./redux/reducers/userSlice";
//test not with redux

// https://stackoverflow.com/questions/75383036/is-there-a-way-to-use-react-redux-dispatch-inside-the-loader-function-of-react-r

const Index = () => {
  const dispatch = useDispatch();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
    },
    {
      path: "users/:userId",
      element: <SingleUser />,
      errorElement: <ErrorPage />,
      loader: ({ params }) => {
        return dispatch(fetchUser(params.userId));
      },
    },
    {
      path: "/users",
      element: <AllUsers />,
    },
  ]);
  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* <App /> */}
    <Index />
  </Provider>
);

import React from "react";
import Home from "./Components/Home/Home";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Layout from "./Components/Layout/Layout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import InverseProtectedRoute from "./Components/InverseProtectedRoute/InverseProtectedRoute";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

export default function App() {
  let routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element:<InverseProtectedRoute><Register/></InverseProtectedRoute> },
        { path: "register", element: <InverseProtectedRoute><Register/></InverseProtectedRoute> },
        { path: "login", element: <InverseProtectedRoute><Login/></InverseProtectedRoute> },
        { path: "home", element: <ProtectedRoute><Home/></ProtectedRoute> },
      ],
    },
  ]);
  return (
    <>
      <RecoilRoot>
        <RouterProvider router={routes}></RouterProvider>
      </RecoilRoot>
    </>
  );
}

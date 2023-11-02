import { useRoutes } from "react-router-dom";
import Layout from "./layout";
import Home from "./page/home";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import LayoutAdmin from "./layout/LayoutAdmin";
import Dashboard from "./page/admin";
import Login from "./page/admin/Login";

function App() {
  const routes = [
    {
      path: "/",
      element: <Layout />,
      children: [{ index: true, element: <Home /> }],
    },
    {
      path: "/admin",
      element: <LayoutAdmin />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "login", element: <Login /> },
      ],
    },
  ];
  return (
    <>
      {useRoutes(routes)}

      <ToastContainer />
    </>
  );
}

export default App;

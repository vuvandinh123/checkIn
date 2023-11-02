import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Login from "../page/admin/Login";

const LayoutAdmin = () => {
  const [checkAuth, setCheckAuth] = useState(false);
  useEffect(() => {
      localStorage.getItem('auth') ? setCheckAuth(true) : setCheckAuth(false);
  },[])
  const [user, setUser] = useState( null);
  if (!checkAuth) {
    return <Login setCheckAuth={setCheckAuth} setUser={setUser} />;
  }
  return (
    <div>
      <h1 className="text-center text-2xl font-bold my-3">QUẢN LÝ THÀNH VIÊN</h1>
      <Outlet />
    </div>
  );
};

export default LayoutAdmin;

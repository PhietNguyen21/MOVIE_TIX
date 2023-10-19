import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { USER_LOGIN } from "../../types/configType";
import { toast } from "react-toastify";

const CheckoutTemplate = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // PRIVATE ROUTE
  useEffect(() => {
    const isLoggedIn = JSON.parse(localStorage.getItem(USER_LOGIN));
    if (!isLoggedIn) {
      toast.info("Bạn phải đăng nhập trước");
      navigate("/user/login");
    }
  }, [navigate]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default CheckoutTemplate;

import React from "react";
import "./Loading.css";
import { LoadingOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
const Loading = () => {
  const { isLoading } = useSelector((state) => state.LoadingReducer);

  return (
    <>
      {isLoading === true ? (
        <div className="loading">
          <img src="/image/logoTixLoading.png" alt="imgLoading" />
        </div>
      ) : (
        ""
      )}
    </>
  );

  //     return (
  //     {

  //     }
  //   );
};

export default Loading;

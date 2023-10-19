import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Popup from "reactjs-popup";

import styleContent from "./ModalTrailer.module.css";
import { CloseCircleOutlined } from "@ant-design/icons";
function ModalTrailer({ film, show, handleClose, handleShow }) {
  const showTrailer = () => {
    handleShow();
  };
  //   console.log(film.trailer);
  return (
    <Popup
      contentStyle={{ border: "none", padding: "0" }}
      trigger={<button className="btn-trailer"> Trailer </button>}
      modal
      nested
    >
      {(close) => (
        <div className={styleContent["modal"]}>
          <CloseCircleOutlined
            onClick={() => {
              close();
            }}
            style={{
              position: "absolute",
              top: "-4%",
              right: "-1%",
              color: "red",
              fontSize: "30px",
            }}
          />

          <div className="content">
            {" "}
            <iframe
              width="100%"
              height="315"
              src={film.trailer}
              title="YouTube video player"
            ></iframe>
          </div>
        </div>
      )}
    </Popup>
  );
}

export default ModalTrailer;

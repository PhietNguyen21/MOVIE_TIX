import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

function ModalDatLaiVe({ show, handleClose, handleShow, param }) {
  const navigate = useNavigate();

  return (
    <>
      <Button hidden variant="primary" onClick={handleShow}></Button>

      <Modal size="lg" backdrop="static" show={show} onHide={handleClose}>
        <Modal.Body>
          <span>
            Đã hết thời gian giữ ghế. Vui lòng thực hiện đơn hàng trong thời hạn
            5 phút.
          </span>
          <button
            onClick={() => {
              //   navigate(`/checkout/${param}`);
              handleClose();
              window.location.reload(); //ep tai lai trang
            }}
            className="text-orange-500 ml-3 text-xl"
          >
            Đặt vé lại
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalDatLaiVe;

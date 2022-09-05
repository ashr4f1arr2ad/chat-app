import React from "react";
import "./Modal.css";

function Modal({ setOpenModal }) {
  return (
    <div className="modal">
        <div className="modalContainer">
            <div className="titleCloseBtn">
                <button
                onClick={() => {
                    setOpenModal(false);
                }}
                >
                X
                </button>
            </div>
            <div>
                <input placeholder="Enter User Name"/>
            </div>
        </div>
    </div>
  );
}

export default Modal;
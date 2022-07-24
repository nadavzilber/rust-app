import React from "react";
import '../style.css';

export const Modal = ({show, close, children}) => {
    let modalClassName = 'modal'
    if (show) modalClassName+= ' show-modal'
    return (
        <div className={modalClassName}>
            <div className="modal-content">
                <span className="close-modal" onClick={close}>&times;</span>
                {children}
            </div>
        </div>
    )
}
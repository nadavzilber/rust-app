import React from 'react';
import { useTimeout } from './useTimeout';

const delay = 4000 //ms

export const Toast = ({close, status, children}) => {
    useTimeout(close, delay);

    return (
        <div className={`toast ${status}-toast`}>
            <div className="toast__text">{children}</div>
            <p onClick={close} className="toast__close-btn">&times;</p>
        </div>
    );
};

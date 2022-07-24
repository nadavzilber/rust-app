import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';

import { ToastContext } from './ToastContext';
import { Toast } from './Toast';
import './style.css'

// Create a random ID
function generateUEID() {
    let first = (Math.random() * 46656) | 0;
    let second = (Math.random() * 46656) | 0;
    first = ('000' + first.toString(36)).slice(-3);
    second = ('000' + second.toString(36)).slice(-3);

    return first + second;
}

export const ToastProvider = (props) => {
    const [toasts, setToasts] = useState([]);
    const open = (status, content, cb) => {
        setToasts((currentToasts) => [
            ...currentToasts,
            { id: generateUEID(), status, content, cb },
        ])};
    const close = (id, cb) => {
        console.log('running cb')
        setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id))
        cb()
    };
    const contextValue = useMemo(() => ({ open }), []);

    return (
        <ToastContext.Provider value={contextValue}>
            {props.children}

            {createPortal(
                <div className="toasts-wrapper">
                    {toasts.map((toast) => (
                        <Toast
                            status={toast.status}
                            key={toast.id}
                            close={() => close(toast.id, toast.cb)}>
                            {toast.content}
                        </Toast>
                    ))}
                </div>,
                //document.body
                document.getElementById('root')
            )}
        </ToastContext.Provider>
    );
};

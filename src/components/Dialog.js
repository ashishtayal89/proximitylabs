import React from 'react';
import "./Dialog.css";

export default function Dialog({ closeDialog, children }) {
    return (
        <div className="dialogContainer">
            <div className="content">
                <div className="close">
                    <div className="button" onClick={closeDialog}>X</div>
                </div>
                <div className="dialog">
                    {children}
                </div>
            </div>
        </div>
    )
}

import React from 'react';

import Card from "../UI/Card/Card";

import './Popup.css';

const Popup = (props) => {
    return (
        <div className="popup">
            <Card>
                <div className="popup-header">Error!</div>
                <div className="popup-content">{props.message}</div>
                <div className="popup-footer">
                    <button onClick={props.onClose}>Ok</button>
                </div>
            </Card>
        </div>
    );
};

export default Popup;
import React from 'react';

import "./ResetButton3.css";

export const ResetButton = ({ resetBoard }) => {
    return (
        <button className="reset-btn" onClick={resetBoard}>Reset</button>
    )
}

import React from 'react';
import WarningIcon from '../../assets/images/warning.png';
import '../../assets/css/Warning.css';

import { Button } from "@material-ui/core/";

export default function WarningMessage(props) {
    const { message, setMessage } = props;
    return (
            <div className="warning-box">
                <div className="warning-box__icon">
                    <img src={WarningIcon} alt="warning-img" />
                </div>
                <hr className="warning-box__hr" />
                <div className="warning-box__message">
                    <h4>Warning!</h4>
                    <h5>{message}</h5>
                </div>
                <div className="warning-box__close">
                    <Button variant="contained" color="primary" fullWidth onClick={() => setMessage(false)}>Continute</Button>
                </div>
            </div>
    )
}
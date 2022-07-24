import React from 'react';
import skull from "../assets/white-skull.png";
import safe from "../assets/safe.png";

const Email = ({content}) => {
    const {status, to, from} = content
    return <div className='email'>
        <div className='email-section-title'>From:</div>
        <p>{from.name} {from.email}</p>
        <div className='email-section-title'>To:</div>
        <p>{to.name} {to.email}</p>
        <img src={status === 'CLICKED' ? skull : safe} className='email-status-icon'/>
        <div className='email-status'>Status: {status}</div>
    </div>
}

export default Email
import React from "react";
import '../style.css'

export const TooltipLabel = ({htmlFor, tooltip, children}) => {
    const className = tooltip ? 'label-tooltip' : ''
    return (
        <label className={className} htmlFor={htmlFor}>
            {children}
            {tooltip && <p className='tooltip-text'>{tooltip}</p>}
        </label>
    )
}
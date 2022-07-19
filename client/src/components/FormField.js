import React, {forwardRef} from "react"

const labelStyle = {
    margin: '10px 0 5px 0',
    // fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '15px',
};

const inputStyle = {
    margin: '5px 0 10px 0',
    padding: '5px',
    border: '1px solid #bfbfbf',
    borderRadius: '3px',
    boxSizing: 'border-box',
    width: '100%'
};

const FormField = forwardRef(({label, type, isRequired=false}, ref) => {
    return (
        <div>
            <label style={labelStyle} >{label}</label>
            <input ref={ref} type={type} style={inputStyle} required={isRequired}/>
        </div>
    );
});

export default FormField
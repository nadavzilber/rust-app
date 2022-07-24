import React, {forwardRef} from "react"
import '../style.css'

const FormField = forwardRef(({label, type, isRequired=false}, ref) => {
    return (
        <div>
            <label className='form-field-label'>{label}</label>
            <input ref={ref} type={type} required={isRequired}/>
        </div>
    );
});

export default FormField
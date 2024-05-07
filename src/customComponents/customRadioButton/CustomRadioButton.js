import {RadioButton} from 'primereact/radiobutton'
import React from 'react'

const CustomRadioButton = ({label, name, value, isChecked, handleChange, children, childClass}) => {
    return (
        <div
            className='form-check form-check-custom form-check-solid'
            style={{fontFamily: 'Manrope', fontWeight: 600}}
        >
            {/* <input className='form-check-input' type='radio' value='' id='flexRadioDefault' /> */}
            <RadioButton
                inputId='ingredient2'
                name={name}
                value={value}
                onChange={handleChange}
                checked={isChecked}
            />
            {label ? (
                <label htmlFor='ingredient2' className='ms-3'>
                    {label}
                </label>
            ) : (
                <div className={`ms-3 ${childClass}`}> {children}</div>
            )}
        </div>
    )
}

export default CustomRadioButton

import React from 'react'
import {Checkbox} from 'primereact/checkbox'

const CustomCheckbox = ({
    onChange = null,
    checked = null,
    name = null,
    value = null,
    disable = false,
}) => {
    return (
        <span style={{width: 'fit-content'}}>
            <Checkbox
                onChange={onChange}
                checked={checked}
                name={name}
                value={value}
                disabled={disable}
            ></Checkbox>
        </span>
    )
}

export default CustomCheckbox

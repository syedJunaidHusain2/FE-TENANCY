import React from 'react'
import {fontsFamily} from '../../assets/fonts/fonts'

const CustomNoData = ({label, className}) => {
    return (
        <div
            className={`text-center fw-bold text-cmGrey700 ${className}`}
            style={{fontFamily: fontsFamily.manrope}}
        >
            {label}
        </div>
    )
}

export default CustomNoData

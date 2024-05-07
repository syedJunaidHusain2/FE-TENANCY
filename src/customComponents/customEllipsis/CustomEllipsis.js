import React, {Children} from 'react'
import {fontsFamily} from '../../assets/fonts/fonts'

const CustomEllipsis = ({text, style, children, width = '80px', className}) => {
    return (
        <div
            data-toggle='tooltip'
            data-placement='left'
            title={text}
            style={{
                fontFamily: fontsFamily.manrope,
                whiteSpace: 'nowrap',
                fontSize: '12px',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                cursor: 'pointer',
                width,
                ...style,
            }}
            className={`text-cmGrey800 ${className}`}
        >
            {children}
        </div>
    )
}

export default CustomEllipsis

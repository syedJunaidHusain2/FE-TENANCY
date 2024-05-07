import React from 'react'
import {KTSVG} from '../../_metronic/helpers'

const CustomEditIcon = ({onClick, svgClassName = 'w-35px h-35px'}) => {
    return (
        <KTSVG
            path='/media/icons/duotune/art/EditIcon.svg'
            className='cursor-pointer'
            onClick={onClick}
            svgClassName={svgClassName}
        />
    )
}

export default CustomEditIcon

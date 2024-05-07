import React from 'react'

export const ARROW_DIRECTION = {
    right: 'right',
    left: 'left',
    up: 'up',
    down: 'down',
}

const CustomArrow = ({arrowDirection = ARROW_DIRECTION.right, onClick}) => {
    return (
        <div
            className={`pi pi-angle-${arrowDirection} fs-2 text-cmGrey700 cursor-pointer`}
            onClick={onClick}
        />
    )
}

export default CustomArrow

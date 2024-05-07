import React from 'react'

export const LINK_SIZE = {
    small: '14px',
    large: '16px',
}

const CustomLink = ({label, linkSize = LINK_SIZE.small, onClick, icon, className}) => {
    return (
        <div
            className= {`cursor-pointer text-cmBlue-Crayola text-decoration-underline ${className}`}
            style={{fontSize: linkSize, fontWeight: 700, width: 'fit-content'}}
            onClick={onClick}
        >
            {icon ? <i className={`text-cmBlue-Crayola ${icon} me-2`} /> : null}
            <span> {label}</span>
        </div>
    )
}

export default CustomLink

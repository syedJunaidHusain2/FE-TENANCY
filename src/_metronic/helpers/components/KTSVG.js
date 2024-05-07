import React from 'react'
import SVG from 'react-inlinesvg'
import {toAbsoluteUrl} from '../AssetHelpers'

const KTSVG = ({
    className = '',
    path,
    svgClassName = 'mh-50px',
    svgStyle = '',
    onClick = null,
    height = null,
    width = null,
}) => {
    return (
        <span className={`svg-icon ${className}`} onClick={onClick}>
            <SVG src={toAbsoluteUrl(path)} className={svgClassName} height={height} width={width} style={{...svgStyle}} />
        </span>
    )
}

export {KTSVG}

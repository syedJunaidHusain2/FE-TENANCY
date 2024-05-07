import React from 'react'

const FirstCapital = ({label}) => {
    return <>{label.charAt(0).toUpperCase() + label.slice(1)}</>
}

export default FirstCapital

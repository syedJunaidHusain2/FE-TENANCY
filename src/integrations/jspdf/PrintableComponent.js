import React from 'react'

const PrintableComponent = React.forwardRef(({children, html = null, id = 'printToBe'}, ref) => {
    return (
        <div ref={ref} id={id}>
            {html ? <div dangerouslySetInnerHTML={{__html: html}} /> : children}
        </div>
    )
})

export default PrintableComponent

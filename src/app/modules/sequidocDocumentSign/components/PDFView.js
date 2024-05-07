import React, {useEffect, useRef} from 'react'

const PDFView = () => {
    const containerRef = useRef(null)

    useEffect(() => {
        const container = containerRef.current
        let PSPDFKit
        ;(async function () {
            PSPDFKit = await import('pspdfkit')
            await PSPDFKit.load({
                container,
                document: '/sample.pdf',
                baseUrl: `${window.location.protocol}//${window.location.host}/`,
            })
        })()
        return () => PSPDFKit && PSPDFKit.unload(container)
    }, [])

    return (
        <>
            <div ref={containerRef} style={{height: '100vh'}} />
            <style global jsx>
                {`
                    * {
                        margin: 0;
                        padding: 0;
                    }
                `}
            </style>
        </>
    )
}

export default PDFView

import React, {forwardRef, useImperativeHandle, useRef} from 'react'
import {useReactToPrint} from 'react-to-print'
import SampleReact from './PrintableComponent'
import Html2Pdf from 'js-html2pdf'

const PrintOrDownloadPDF = forwardRef(
    ({fileName = 'Sample.pdf', htmlToDownload = null, id = 'printToBe', children}, ref) => {
        const componentRef = useRef(null)

        useImperativeHandle(
            ref,
            () => {
                return {
                    downloadPdf: handleDownload,
                    print: handlePrint,
                }
            },
            []
        )

        const handlePrint = useReactToPrint({
            content: () => componentRef.current,
        })
        const handleDownload = useReactToPrint({
            content: () => componentRef.current,
            print: async (printIframe) => {
                const document = printIframe.contentDocument
                if (document) {
                    const html = document.getElementById(id)
                    const exporter = new Html2Pdf(html, {
                        margin: [0, 0, 0, 0],
                        filename: fileName,
                        image: {type: 'png', quality: 1},
                        html2canvas: {logging: true, dpi: 500, letterRendering: true},
                        jsPDF: {unit: 'mm', format: 'a4', orientation: 'portrait'},
                    })
                    exporter.getPdf(true)
                }
            },
        })

        return (
            <div>
                <div style={{display: 'none'}}>
                    <SampleReact ref={componentRef} id={id} html={htmlToDownload}>
                        {children}
                    </SampleReact>
                </div>
            </div>
        )
    }
)

export default PrintOrDownloadPDF

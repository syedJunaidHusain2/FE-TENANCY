import React, {useEffect, useState} from 'react'
import {PDFDocument} from 'pdf-lib'
import {Document, Page} from 'react-pdf'
import * as pdfjs from 'pdfjs-dist'
import CustomButton, {BUTTON_TYPE} from '../../../../../customComponents/customButtton/CustomButton'
import SignatureModal from './SignatureModal'

const DisplayPdf = ({url}) => {
    const [coordinates, setCoordinates] = useState([])
    const [manipulatedPdf, setManipulatedPdf] = useState(url)
    const [openSignatureModal, setOpenSignatureModal] = useState(false)
    const [pageNumber, setpageNumber] = useState(1)
    const [signatureData, setSignatureData] = useState('')

    const targetText = 'Simple'

    useEffect(() => {
        extractTextCoordinates()
    }, [])

    const extractTextCoordinates = async () => {
        const loadingTask = pdfjs.getDocument(url)

        try {
            const pdf = await loadingTask.promise
            const numPages = pdf.numPages

            const coordinatesArray = []

            for (let pageNum = 1; pageNum <= numPages; pageNum++) {
                const page = await pdf.getPage(pageNum)
                const textContent = await page.getTextContent()
                // const foundtextData = textItem?.str?.split(' ')
                // const foundtextIndex = foundtextData?.indexOf(searchText)

                textContent.items.forEach((item) => {
                    if (item.str.includes(targetText)) {
                        coordinatesArray.push({
                            x: item.transform[4],
                            y: item.transform[5],
                            page,
                        })
                    }
                })
            }

            setCoordinates(coordinatesArray)
        } catch (error) {
            console.error('Error extracting text coordinates:', error)
        }
    }

    async function addSignatureToPDF(signUrl) {
        // const pdfDocc = await PDFDocument.create()
        const existingPdfBytes = await fetch(manipulatedPdf).then((res) => res.arrayBuffer())
        const pdfDocc = await PDFDocument.load(existingPdfBytes)
        const pages = pdfDocc.getPages()
        const firstPage = pages[0]
        // const pages = pdfDoc.addPage()
        const png = await pdfDocc.embedPng(signUrl)
        firstPage.drawImage(png, {
            x: coordinates[0]?.x,
            y: coordinates[0]?.y,
            width: 100,
            height: 50,
        })
        const pdfBytesData = await pdfDocc.saveAsBase64()
        // Download or display the modified PDF
        const modifiedPdf = `data:application/pdf;base64,${pdfBytesData}`
        setManipulatedPdf(modifiedPdf)
    }

    const onDocumentSucess = ({numPages}) => {
        setpageNumber(numPages)
    }

    const handleSignatureModal = () => {
        setOpenSignatureModal(!openSignatureModal)
    }

    return (
        <div className='overflow-auto'>
            <div
                className='mx-auto mb-10'
                style={{
                    width: 'fit-content',
                    height: '65vh',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                }}
            >
                <Document file={manipulatedPdf} onLoadSuccess={onDocumentSucess}>
                    {Array.from(new Array(pageNumber), (no, index) => (
                        <Page
                            key={`page_${index + 1}`}
                            pageNumber={index + 1}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                        />
                    ))}
                </Document>
            </div>
            <div className='text-end'>
                <CustomButton
                    buttonLabel='Add Signature'
                    buttonType={BUTTON_TYPE.disabled}
                    onClick={handleSignatureModal}
                />
            </div>

            {openSignatureModal ? (
                <SignatureModal
                    open={openSignatureModal}
                    handleClose={handleSignatureModal}
                    signatureData={signatureData}
                    setSignatureData={setSignatureData}
                    addSignatureToPDF={addSignatureToPDF}
                />
            ) : null}
        </div>
    )
}

export default DisplayPdf

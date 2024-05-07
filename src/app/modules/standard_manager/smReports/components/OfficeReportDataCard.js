/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'

const OfficeReportDataCard = ({
    line1Heading,
    line2Heading,
    line3Heading,
    line1Content,
    line2Content,
    line3Content,
    line1SubHeading,
    line2SubHeading,
    line3SubHeading,
}) => {
    return (
        <div
            className={`card w-sm-350px w-100 shadow-sm`}
            style={{fontFamily: 'Manrope', borderRadius: '12px'}}
        >
            {/* begin::Body */}
            <div className='card-body py-5'>
                <div className='px-5'>
                    {/* Line 1 */}
                    <div className='d-flex  align-items-center '>
                        <div
                            className='w-100px text-cmGrey600'
                            style={{
                                fontWeight: '600',
                                fontSize: '12px',
                                fontFamily: 'Manrope',
                            }}
                        >
                            {line1Heading}
                        </div>
                        <div
                            className='w-sm-75 d-flex flex-wrap justify-content-evenly text-cmBlack'
                            style={{fontWeight: '600', fontSize: '14px'}}
                        >
                            <div> {line1Content}</div>
                            <div className='cmGrey800'>{line1SubHeading}</div>
                        </div>
                    </div>
                    <hr className='border-cmGrey600 border-dashed' />
                    {/* Line 1 ends */}

                    {/* Line 2 */}
                    <div className='d-flex  align-items-center '>
                        <div
                            className='w-100px text-cmGrey600'
                            style={{
                                fontWeight: '600',
                                fontSize: '12px',
                                fontFamily: 'Manrope',
                            }}
                        >
                            {line2Heading}
                        </div>
                        <div
                            className='w-sm-75 w-100 d-flex flex-wrap justify-content-evenly text-cmBlack'
                            style={{fontWeight: '600', fontSize: '14px'}}
                        >
                            <div> {line2Content}</div>
                            <div className='cmGrey800'>{line2SubHeading}</div>
                        </div>
                    </div>
                    <hr className='border-cmGrey600 border-dashed' />
                    {/* Line 2 ends*/}

                    {/* Line 3 */}
                    <div className='d-flex  align-items-center '>
                        <div
                            className='w-100px text-cmGrey600'
                            style={{
                                fontWeight: '600',
                                fontSize: '12px',
                                fontFamily: 'Manrope',
                            }}
                        >
                            {line3Heading}
                        </div>
                        <div
                            className='w-sm-75 w-100 d-flex flex-wrap justify-content-evenly text-cmBlack'
                            style={{fontWeight: '600', fontSize: '14px'}}
                        >
                            <div> {line3Content}</div>
                            <div className='cmGrey800'>{line3SubHeading}</div>
                        </div>
                    </div>

                    {/* Line 3 ends */}
                </div>
            </div>
            {/* end::Body */}
        </div>
    )
}

export {OfficeReportDataCard}

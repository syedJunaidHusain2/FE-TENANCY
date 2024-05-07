/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'

const OfficeLeaderCard = ({
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
                    <div className='d-flex align-items-center py-0 my-0'>
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
                            className='w-75 d-flex align-items-center justify-content-between text-cmGrey800'
                            style={{fontWeight: '600', fontSize: '12px'}}
                        >
                            {/* <div>
                <img
                  className='avatar'
                  src=''
                  alt='avatar'
                  style={{height: '24px', width: '24px'}}
                />
              </div> */}
                            <div> {line1Content}</div>
                            <div className='text-cmBlue-Crayola'>{line1SubHeading}</div>
                        </div>
                    </div>
                    <hr className='border-cmGrey600 border-dashed my-2' />
                    {/* Line 1 ends */}

                    {/* Line 2 */}
                    <div className='d-flex align-items-center py-0 my-0'>
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
                            className='w-75 d-flex align-items-center justify-content-between text-cmGrey800'
                            style={{fontWeight: '600', fontSize: '12px'}}
                        >
                            {/* <div>
                <img
                  className='avatar'
                  src=''
                  alt='avatar'
                  style={{height: '24px', width: '24px'}}
                />
              </div> */}
                            <div> {line2Content}</div>
                            <div className='text-cmBlue-Crayola'>{line2SubHeading}</div>
                        </div>
                    </div>
                    <hr className='border-cmGrey600 border-dashed my-2' />
                    {/* Line 2 ends*/}

                    {/* Line 3 */}
                    <div className='d-flex align-items-center py-0 my-0'>
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
                            className='w-75 d-flex align-items-center justify-content-between text-cmGrey800'
                            style={{fontWeight: '600', fontSize: '12px'}}
                        >
                            {/* <div>
                <img
                  className='avatar'
                  src=''
                  alt='avatar'
                  style={{height: '24px', width: '24px'}}
                />
              </div> */}
                            <div> {line3Content}</div>
                            <div className='text-cmBlue-Crayola'>{line3SubHeading}</div>
                        </div>
                    </div>

                    {/* Line 3 ends */}
                </div>
            </div>
            {/* end::Body */}
        </div>
    )
}

export {OfficeLeaderCard}

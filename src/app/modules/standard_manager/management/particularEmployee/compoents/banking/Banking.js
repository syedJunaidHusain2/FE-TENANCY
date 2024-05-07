import React, {useState} from 'react'
import ComingSoonImage from '../../../../../../../customComponents/customComingSoon/ComingSoonImage'
import CustomLoader from '../../../../../../../customComponents/customLoader/CustomLoader'

const Banking = ({bankingData}) => {
    const [loading, setLoading] = useState(false)
    return (
        <>
            <div className='card shadow h-auto' style={{fontFamily: 'Manrope', fontSize: '14px'}}>
                <div className='py-5 card w-100'>
                    <CustomLoader full visible={loading} />
                    {/* <div className='ms-11 form-check ml-12px d-flex form-switch form-switch-sm form-check-custom form-check-solid my-3'></div> */}
                    <div className='d-flex mx-10 align-items-center justify-content-between '>
                        <div
                            className='text-cmGrey900 '
                            style={{fontWeight: 700, fontSize: '16px'}}
                        >
                            Banking Info
                        </div>
                    </div>
                    <div className='border-bottom border-cmGrey300 mt-5' />
                    <>
                        <div className=''>
                            {/* first line */}
                            <div
                                className='d-sm-flex justify-content-evenly py-5 px-sm-20 px-10'
                                style={{fontWeight: 600}}
                            >
                                <div className='d-flex gap-10 w-sm-25'>
                                    <div className='text-cmGrey600 text-nowrap'> Name of Bank:</div>
                                    <div className='text-cmgrey900 text-nowrap'>
                                        {bankingData?.name_of_bank ?? '-'}
                                    </div>
                                </div>

                                <div className='w-sm-25'></div>
                            </div>
                            {/* Second line */}
                            <div
                                className='d-sm-flex justify-content-evenly py-5 px-sm-20 px-10 bg-cmGrey100'
                                style={{fontWeight: 600}}
                            >
                                <div className='d-flex gap-10 w-sm-25 '>
                                    <div className='text-cmGrey600 text-nowrap'>
                                        {' '}
                                        Routing Number:
                                    </div>{' '}
                                    <div className='text-cmgrey900 text-nowrap'>
                                        {bankingData?.routing_no ?? '-'}
                                    </div>
                                </div>

                                <div className='w-sm-25'></div>
                            </div>
                            {/* Third line */}
                            <div
                                className='d-sm-flex justify-content-evenly py-5 px-sm-20 px-10'
                                style={{fontWeight: 600}}
                            >
                                <div className='d-flex gap-10 w-sm-25 '>
                                    <div className='text-cmGrey600 text-nowrap'>
                                        {' '}
                                        Account Number:
                                    </div>{' '}
                                    <div className='text-cmgrey900 text-nowrap'>
                                        {bankingData?.account_no ?? '-'}
                                    </div>
                                </div>

                                <div className='w-sm-25'></div>
                            </div>
                            {/* Fourth line */}
                            <div
                                className='d-sm-flex justify-content-evenly py-5 px-sm-20 px-10 bg-cmGrey100'
                                style={{fontWeight: 600}}
                            >
                                <div className='d-flex gap-10 w-sm-25 '>
                                    <div className='text-cmGrey600 text-nowrap'>
                                        {' '}
                                        Type of Account:
                                    </div>{' '}
                                    <div className='text-cmgrey900 text-nowrap'>
                                        {bankingData?.type_of_account ?? '-'}
                                    </div>
                                </div>

                                <div className='w-sm-25'></div>
                            </div>
                        </div>
                    </>
                    {/* </div> */}
                </div>
            </div>
        </>
    )
}

export default Banking

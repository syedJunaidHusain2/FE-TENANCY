import React from 'react'
import {useNavigate} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'

const ParticularApprovalHistory = () => {
    const naviagte = useNavigate()
    return (
        <div
            className='bg-cmwhite pb-20'
            style={{
                marginTop: '-15px',
                borderRadius: '0 10px 10px 10px',
                fontFamily: 'Manrope',
                fontSize: '14px',
            }}
        >
            <div className='ps-10 py-5 cursor-pointer ' onClick={() => naviagte(-1)}>
                <i className='bi bi-box-arrow-left fs-1 text-cmGrey600 text-hover-dark cursor-pointer'></i>
            </div>
            {/* Tab starts */}
            <div style={{fontSize: '14px', fontFamily: 'Manrope'}}>
                <div
                    className='bg-cmGrey300 py-5 text-cmGrey900 ps-10'
                    style={{fontFamily: 'Manrope', fontSize: '16px', fontWeight: '600'}}
                >
                    PD001 -Payroll Dispute
                </div>

                <div className=''>
                    {/* Line 1 */}
                    <div className='bg-cmwhite py-5 text-cmGrey900 px-sm-20 d-flex flex-wrap px-sm-0 px-5'>
                        <div className='d-flex flex-wrap align-items-center gap-5 w-sm-50 '>
                            <div className='text-cmGrey800' style={{fontWeight: '700'}}>
                                Employee Name:
                            </div>
                            <div>
                                <img
                                    src={toAbsoluteUrl('/media/avatars/300-1.jpg')}
                                    className='avatar'
                                    style={{width: '30px', height: '30px'}}
                                    alt='img'
                                />
                            </div>
                            <div className='text-cmGrey900' style={{fontWeight: '600'}}>
                                Adan Lauzon
                            </div>
                        </div>
                        <div className='d-flex flex-wrap gap-5 w-sm-50'>
                            <div className='text-cmGrey800' style={{fontWeight: '700'}}>
                                Request ID:
                            </div>
                            <div className='text-cmGrey900' style={{fontWeight: '600'}}>
                                PD001{' '}
                            </div>
                        </div>
                    </div>
                    {/* Line 2 */}
                    <div className='stripRow py-5 text-cmGrey900 px-sm-20 d-flex flex-wrap px-sm-0 px-5'>
                        <div className='d-flex flex-wrap gap-5 w-sm-50 '>
                            <div className='text-cmGrey800' style={{fontWeight: '700'}}>
                                Office Location:
                            </div>
                            <div className='text-cmGrey900' style={{fontWeight: '700'}}>
                                Tennessee
                            </div>
                        </div>
                        <div className='d-flex flex-wrap gap-5 w-sm-50'>
                            <div className='text-cmGrey800' style={{fontWeight: '700'}}>
                                Request Date:
                            </div>
                            <div className='text-cmGrey900' style={{fontWeight: '600'}}>
                                08/10/2022
                            </div>
                        </div>
                    </div>
                    {/* Line 3 */}
                    <div className='bg-cmwhite py-5 text-cmGrey900 px-sm-20 d-flex flex-wrap px-sm-0 px-5'>
                        <div className='d-flex flex-wrap gap-5 w-sm-50 '>
                            <div className='text-cmGrey800' style={{fontWeight: '700'}}>
                                Disputed Amount:
                            </div>
                            <div className='text-cmGrey900' style={{fontWeight: '700'}}>
                                $ 1,840
                            </div>
                        </div>
                        <div className='d-flex flex-wrap gap-5 w-sm-50 '>
                            <div className='text-cmGrey800 text-nowrap' style={{fontWeight: '700'}}>
                                Disputed Period:
                            </div>
                            <div className='text-cmGrey900' style={{fontWeight: '600'}}>
                                12/12/2022
                            </div>
                        </div>
                    </div>
                    {/* Line 4 */}
                    <div className='stripRow py-5 text-cmGrey900 px-sm-20 d-flex flex-wrap px-sm-0 px-5'>
                        <div className='d-flex flex-wrap gap-5 w-sm-50 '>
                            <div className='text-cmGrey800' style={{fontWeight: '700'}}>
                                Dispute Over:
                            </div>
                            <div className='text-cmGrey900' style={{fontWeight: '700'}}>
                                M1 Payment
                            </div>
                        </div>
                        <div className='d-flex flex-wrap gap-5 w-sm-50'>
                            <div className='text-cmGrey800' style={{fontWeight: '700'}}>
                                Customer PID:
                            </div>
                            <div
                                className='text-cmGrey900 text-decoration-underline'
                                style={{fontWeight: '600'}}
                            >
                                <span className='me-2 '>T7290</span> <span>Jennifer Brown</span>
                            </div>
                        </div>
                    </div>
                    {/* Line 5 */}
                    <div className='bg-cmwhite py-5 text-cmGrey900 px-sm-20 px-sm-0 px-5'>
                        <div className='d-flex flex-wrap gap-5 '>
                            <div className='text-cmGrey800' style={{fontWeight: '700'}}>
                                Description:
                            </div>
                            <div className='text-cmGrey900' style={{fontWeight: '700'}}>
                                Jennifer Brown Missing M1 Payment. Please Check
                            </div>
                        </div>
                    </div>
                    {/* Line 6 */}
                    <div className='stripRow py-5 text-cmGrey900 px-sm-20 px-sm-0 px-5'>
                        <table
                            className='table table-borderless  w-sm-25'
                            style={{fontSize: '14px'}}
                        >
                            <tr className=''>
                                <td className='text-cmGrey800 py-1' style={{fontWeight: 700}}>
                                    Attachments:
                                </td>
                                <td
                                    className='text-cmGrey900 text-decoration-underline py-1'
                                    style={{fontWeight: 700}}
                                >
                                    Screenshot.jpg
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td
                                    className='text-cmGrey900 text-decoration-underline py-1'
                                    style={{fontWeight: 700}}
                                >
                                    Bills.jpg
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td
                                    className='text-cmGrey900 text-decoration-underline py-1'
                                    style={{fontWeight: 700}}
                                >
                                    M1missing.jpg
                                </td>
                            </tr>
                        </table>
                    </div>
                    {/* Line 7 */}
                    <div className='bg-cmwhite py-5 text-cmGrey900 px-sm-20 px-sm-0 px-5'>
                        <div className='d-flex flex-wrap gap-5 '>
                            <div className='text-cmGrey800' style={{fontWeight: '700'}}>
                                Notes:
                            </div>
                            <div className='text-cmGrey900' style={{fontWeight: '700'}}>
                                To come....
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Tab ends */}
        </div>
    )
}

export default ParticularApprovalHistory

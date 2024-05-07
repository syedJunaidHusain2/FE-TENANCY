import React from 'react'
import {formattedNumberFields} from '../../../../../../helpers/CommonHelpers'

const ComissionsCard = ({cardData}) => {
    return (
        <div
            className={`bg-cmwhite my-0 card py-5 px-8 w-100 h-md-300px shadow-sm`}
            style={{
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: '500',
                fontFamily: 'Manrope',
            }}
        >
            {/* Begins body */}

            {/* Heading */}
            <div className=' d-flex flex-wrap align-items-center gap-5 mb-5'>
                <div className='text-cmGrey900' style={{fontWeight: '700'}}>
                    Commission
                </div>
                {/* <div
          className='text-cminfo text-decoration-underline cursor-pointer'
          style={{fontWeight: '600'}}
        >
          View report
        </div> */}
            </div>
            {/* Data */}
            <div className='card-body my-0 p-0'>
                <table className=' w-100 table text-cmGrey600' style={{fontWeight: '600'}}>
                    <tbody>
                        <tr>
                            <td className='pb-1'>Total Accounts</td>
                            <td className='pb-1'>{cardData?.total_account}</td>
                        </tr>
                        <tr>
                            <td className='pb-1'>Commission Earned</td>
                            <td className='pb-1'>
                                {formattedNumberFields(cardData?.commission_earnings, '$')}
                            </td>
                        </tr>
                        <tr>
                            <td className='pb-1'>M1 Paid</td>
                            <td className='pb-1'>
                                {formattedNumberFields(cardData?.m1_paid, '$')}
                            </td>
                        </tr>
                        <tr>
                            <td className='pb-1'>M2 Paid</td>
                            <td className='pb-1'>
                                {formattedNumberFields(cardData?.m2_paid, '$')}
                            </td>
                        </tr>
                        <tr>
                            <td className='pb-1'>Advances</td>
                            <td className='pb-1'>
                                {formattedNumberFields(cardData?.advances, '$')}
                            </td>
                        </tr>
                        <tr>
                            <td className='pb-1'>Clawbacked Accounts</td>
                            <td className='pb-1'>{cardData?.clawback_account}</td>
                        </tr>
                        <tr>
                            <td className='pb-1'>Total Due</td>
                            <td className='pb-1'>
                                {formattedNumberFields(cardData?.total_due, '$')}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ComissionsCard

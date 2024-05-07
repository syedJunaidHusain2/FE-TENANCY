import React from 'react'
import {useSelector} from 'react-redux'
import {getCompanySettingSelector} from '../../../../../../../redux/selectors/SettingsSelectors'
import {formattedNumberFields} from '../../../../../../../helpers/CommonHelpers'

const EarningTable = ({tableData}) => {
    const companySetting = useSelector(getCompanySettingSelector)

    return (
        <div>
            <table
                className='table text-cmGrey500 w-100'
                style={{fontWeight: '600', fontSize: '12px'}}
            >
                <tbody>
                    <tr>
                        <td className='pb-5'>Total Accounts</td>
                        <td className='pb-5 text-cmBlack' style={{fontFamily: 'Manrope'}}>
                            {tableData?.total_account}
                        </td>
                    </tr>
                    <tr>
                        <td className='pb-5'>
                            <span className='px-3 py-0 me-2' style={{backgroundColor: '#63EAC1'}} />
                            <span>Commission</span>
                        </td>
                        <td className='pb-5 text-cmBlack' style={{fontFamily: 'Manrope'}}>
                            {formattedNumberFields(tableData?.commission, '$')}
                        </td>
                    </tr>
                    {companySetting?.overrides && (
                        <tr>
                            <td className='pb-5'>
                                <span
                                    className='px-3 py-0 me-2'
                                    style={{backgroundColor: '#6078EC'}}
                                />
                                <span>Overrides</span>
                            </td>
                            <td className='pb-5 text-cmBlack' style={{fontFamily: 'Manrope'}}>
                                {formattedNumberFields(tableData?.overrides, '$')}
                            </td>
                        </tr>
                    )}
                    <tr>
                        <td>
                            <span className='px-3 py-0 me-2' style={{backgroundColor: '#FFE16A'}} />
                            <span>Other Item</span>
                        </td>
                        <td className='text-cmBlack' style={{fontFamily: 'Manrope'}}>
                            {formattedNumberFields(tableData?.other_item, '$')}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default EarningTable

// import React from 'react'
// import {useSelector} from 'react-redux'
// import {getCompanySettingSelector} from '../../../../../../../redux/selectors/SettingsSelectors'
// import {formattedNumberFields} from '../../../../../../../helpers/CommonHelpers'

// const EarningTable = ({tableData}) => {
//     const companySetting = useSelector(getCompanySettingSelector)

//     return (
//         <div>
//             <table
//                 className='table text-cmGrey500 w-100'
//                 style={{fontWeight: '600', fontSize: '12px'}}
//             >
//                 <tbody>
//                     {' '}
//                     {/* Add a tbody element here */}
//                     <tr>
//                         <td className='pb-5'>Total Accounts</td>
//                         <td className='pb-5 text-cmBlack' style={{fontFamily: 'Manrope'}}>
//                             {tableData?.total_account}
//                         </td>
//                     </tr>
//                     <tr>
//                         <td className='pb-5'>
//                             <span className='px-3 py-0' style={{backgroundColor: '#63EAC1'}} />{' '}
//                             <span>Commission</span>
//                         </td>
//                         <td className='pb-5 text-cmBlack' style={{fontFamily: 'Manrope'}}>
//                             {formattedNumberFields(tableData?.commission, '$')}
//                         </td>
//                     </tr>
//                     {companySetting?.overrides ? (
//                         <tr>
//                             <td className='pb-5'>
//                                 <span className='px-3 py-0' style={{backgroundColor: '#6078EC'}} />{' '}
//                                 <span>Overrides</span>
//                             </td>
//                             <td className='pb-5 text-cmBlack' style={{fontFamily: 'Manrope'}}>
//                                 {formattedNumberFields(tableData?.overrides, '$')}
//                             </td>
//                         </tr>
//                     ) : null}
//                     <tr>
//                         <td className=''>
//                             <span className='px-3 py-0' style={{backgroundColor: '#FFE16A'}} />{' '}
//                             <span>Other Item</span>
//                         </td>
//                         <td className=' text-cmBlack' style={{fontFamily: 'Manrope'}}>
//                             {formattedNumberFields(tableData?.other_item, '$')}
//                         </td>
//                     </tr>
//                 </tbody>
//             </table>
//         </div>
//     )
// }

// export default EarningTable

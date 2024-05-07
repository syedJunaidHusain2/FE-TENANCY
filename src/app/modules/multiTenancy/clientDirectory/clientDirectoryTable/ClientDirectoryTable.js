import React from 'react'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomFilterButton from '../../../../../customComponents/customFilterButton/CustomFilterButton'
import {formattedNumberFields} from '../../../../../helpers/CommonHelpers'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../customComponents/customButtton/CustomButton'
import Pagination from '../../../admin/sequidocs/component/Pagination'
import {useNavigate} from 'react-router-dom'

const ClientDirectoryTable = () => {
    const naviagte = useNavigate()
    return (
        <div className='bg-cmwhite shadow-sm' style={{borderRadius: 10}}>
            <div className='d-flex justify-content-between px-sm-10 px-5 py-5'>
                <div>
                    <CustomInput type={INPUT_TYPE.search} />
                </div>
                <div>
                    <CustomFilterButton />
                </div>
            </div>
            <div className='table-responsive'>
                <table className='table' style={{fontSize: '14px', verticalAlign: 'baseline'}}>
                    <thead>
                        <tr
                            className='text-cmGrey800 bg-cmGrey300'
                            style={{fontWeight: 700, lineHeight: '21px'}}
                        >
                            <td className='p-5 ps-sm-10'>Client ID</td>
                            <td className='p-5'>Name</td>
                            <td className='p-5'>Admins</td>
                            <td className='p-5'>Users</td>
                            <td className='p-5'>Total Sales</td>
                            <td className='p-5'>Billing Amount</td>
                            <td className='p-5'>Status</td>
                            <td className='p-5'></td>
                        </tr>
                    </thead>
                    <tbody className='text-cmGrey600' style={{fontSize: '16px', fontWeight: 600}}>
                        <tr>
                            <td className='p-5 ps-sm-10'>267400</td>
                            <td className='p-5'>
                                <div className='d-flex align-items-center flex-wrap gap-2'>
                                    <div
                                        className='text-cmGrey900 text-decoration-underline cursor-pointer'
                                        style={{fontSize: 18, fontWeight: 700}}
                                        onClick={() => naviagte('/company-onboarding/client-overview')}
                                    >
                                        Flex Power
                                    </div>
                                    <div className='badge rounded-pill bg-cmOrange bg-opacity-10 px-5 text-cmOrange'>
                                        Solar
                                    </div>
                                </div> 
                            </td>
                            <td className='p-5'>600</td>
                            <td className='p-5'>729</td>
                            <td className='p-5'>{formattedNumberFields(12321.53)}</td>
                            <td className='p-5 text-cmGrey800'>
                                {formattedNumberFields(12321.53)}
                            </td>
                            <td className='p-5 text-cmSuccess' style={{fontWeight: 700}}>
                                Paid
                            </td>
                            <td className='p-5'>
                                <CustomButton
                                    buttonType={BUTTON_TYPE.primaryBorder}
                                    buttonLabel='Invoice'
                                    buttonSize={BUTTON_SIZE.small}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Pagination />
        </div>
    )
}

export default ClientDirectoryTable

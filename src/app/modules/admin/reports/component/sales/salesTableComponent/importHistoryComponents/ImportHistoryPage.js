import React from 'react'
import {fontsFamily} from '../../../../../../../../assets/fonts/fonts'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../../../customComponents/customInputs/customInput/CustomInput'
import {KTSVG} from '../../../../../../../../_metronic/helpers'
import {useNavigate} from 'react-router-dom'
import Pagination from '../../../../../sequidocs/component/Pagination'

const ImportHistoryPage = () => {
    const navigate = useNavigate()
    return (
        <div style={{fontFamily: fontsFamily.manrope, fontSize: 14}}>
            <div
                className='d-flex justify-content-between gap-5 flex-wrap bg-cmwhite shadow-sm ps-5 pe-2 py-2 align-items-center mb-10'
                style={{fontWeight: 600, borderRadius: 10}}
            >
                <div className='text-cmGrey900'>
                    <KTSVG
                        path='/media/icons/duotune/art/back-square.svg'
                        svgClassName='w-25px h-25px cursor-pointer'
                        onClick={() => navigate(-1)}
                        className='me-3'
                    />
                    <span>Import History</span>
                </div>
                <div>
                    <CustomInput type={INPUT_TYPE.search} />
                </div>
            </div>
            {/* Table begins */}
            <div className='table-responsive bg-cmwhite shadow-sm' style={{borderRadius: 10}}>
                <table className='table text-cmGrey800' style={{fontWeight: 600, fontSize: 14}}>
                    <thead>
                        <tr
                            className='text-cmGrey800 bg-cmGrey400'
                            style={{fontSize: 12, fontWeight: 800}}
                        >
                            <th></th>
                            <th className='py-5 text-nowrap'>Date & Time</th>
                            <th className='py-5 text-nowrap'>File Name</th>
                            <th className='py-5 text-center text-nowrap'>Total Sales</th>
                            <th className='py-5 text-center text-nowrap'>New Sales</th>
                            <th className='py-5 text-center text-nowrap'>Updated Sales</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='text-cmGrey700 stripRow'>
                            <td></td>
                            <td className='py-5 text-nowrap'>03/07/21 5:23am</td>
                            <td className='text-cmBlue-Crayola text-nowrap'>
                                <KTSVG
                                    path='/media/icons/duotune/art/document-download.svg'
                                    svgClassName='w-20x h-20px cursor-pointer'
                                    svgStyle={{width: '20px', height: '20px'}}
                                    onClick={() => navigate(-1)}
                                    className='me-1'
                                />
                                <span className='text-decoration-underline'>
                                    Sale_sheet_12/10/2023.xlsx
                                </span>
                            </td>
                            <td className='py-5 text-center text-nowrap'>409</td>
                            <td className='py-5 text-center text-nowrap'>13</td>
                            <td className='py-5 text-center text-nowrap'>15</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Pagination />
        </div>
    )
}

export default ImportHistoryPage

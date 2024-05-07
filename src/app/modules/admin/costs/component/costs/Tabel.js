/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import RedirectToEmployeeProfile from '../../../../../../customComponents/redirectToEmployeeProfile/RedirectToEmployeeProfile'
import CustomImage from '../../../../../../customComponents/customImage/CustomImage'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomEllipsis from '../../../../../../customComponents/customEllipsis/CustomEllipsis'
import {fontsFamily} from '../../../../../../assets/fonts/fonts'
import {getValidDate} from '../../../../../../constants/constants'
import {TABLE_BORDER, formattedNumberFields} from '../../../../../../helpers/CommonHelpers'
import Pagination from '../../../sequidocs/component/Pagination'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'

const ReconciliationTabel = ({
    className,
    onSearchChange,
    tableData,
    activePage,
    onPageChange,
    loading,
}) => {
    const [search, setSearch] = useState('')

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
        onSearchChange(e.target.value)
    }

    return (
        <>
            <div className={`card mt-8 ${className} shadow-sm`}>
                <div className='py-0 px-0 mx-0'>
                    <div
                        className='bg-white h-auto'
                        style={{fontSize: '14px', fontFamily: 'Manrope'}}
                    >
                        <div className='w-100 mt-4 ms-7 mb-3 d-flex flex-wrap justify-content-between'>
                            <div
                                className=' mb-2 d-flex flex-row mt-2'
                                id='kt_chat_contacts_header'
                            >
                                <div
                                    style={{borderRadius: '20px'}}
                                    className='w-md-325px mb-1 me-sm-12'
                                    id='kt_chat_contacts_header'
                                >
                                    <form
                                        className='position-relative'
                                        // style={{background: '#F5F5F5', borderRadius: '90px'}}
                                        autoComplete='off'
                                    >
                                        {/* Costs Search Input */}
                                        <CustomInput
                                            type={INPUT_TYPE.search}
                                            name='search'
                                            onChange={handleSearchChange}
                                            value={search}
                                        />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='table-responsive overflow-auto' style={{position: 'relative'}}>
                        <CustomLoader full visible={loading} />
                        <table className='table'>
                            <thead className={TABLE_BORDER}>
                                <tr
                                    className='bg-cmGrey300 text-cmGrey900'
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: 700,
                                        fontFamily: 'Manrope',
                                        lineHeight: '21px',
                                    }}
                                >
                                    <th className='min-w-200px p-5'>Employee</th>
                                    <th className='min-w-150px p-5'>Requested on</th>
                                    <th className='min-w-200px p-5'>Approved by</th>
                                    <th
                                        className='min-w-150px p-5'
                                        data-toggle='tooltip'
                                        data-placement='left'
                                        title='Value is higher than expected '
                                    >
                                        Amount
                                    </th>
                                    <th
                                        data-toggle='tooltip'
                                        data-placement='left'
                                        title='bonuses, advances, incentives                    '
                                        className='min-w-150px p-5'
                                    >
                                        Cost Head
                                    </th>
                                    <th className='min-w-150px p-5'>Description</th>
                                </tr>
                            </thead>
                            <tbody className={TABLE_BORDER}>
                                {tableData?.data?.length > 0 ? (
                                    <>
                                        {tableData?.data?.map((item) => (
                                            <tr
                                                key={item?.id}
                                                className='stripRow'
                                                style={{
                                                    fontWeight: 600,
                                                    fontSize: '14px',
                                                    fontFamily: 'Manrope',
                                                }}
                                            >
                                                <td
                                                    className='p-3 text-cmGrey800'
                                                    style={{
                                                        textDecoration: 'underline',
                                                        fontFamily: 'Manrope',
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    <RedirectToEmployeeProfile
                                                        employeeId={item?.emp_id}
                                                    >
                                                        <CustomImage
                                                            src={item?.emp_img}
                                                            className='avatar me-3'
                                                        />
                                                        {item?.emp_name}
                                                    </RedirectToEmployeeProfile>
                                                </td>
                                                <td className='p-5 text-cmGrey600'>
                                                    {getValidDate(item?.requested_on) ?? '-'}
                                                </td>
                                                <td className='p-5 text-cmGrey600'>
                                                    {item?.approved_by ?? '-'}
                                                </td>

                                                <td className='p-5 text-cmGrey900'>
                                                    {formattedNumberFields(item?.amount)}
                                                </td>
                                                <td className='p-5 text-cmGrey600'>
                                                    {item?.cost_tracking}
                                                </td>
                                                <td className='p-5'>
                                                    <CustomEllipsis
                                                        className={'text-cmGrey500'}
                                                        style={{
                                                            fontFamily: fontsFamily.manrope,
                                                            whiteSpace: 'nowrap',
                                                            fontSize: '14px',
                                                            width: '200px',
                                                            fontWeight: '600',
                                                        }}
                                                        text={item?.description ?? '-'}
                                                    >
                                                        {item?.description ?? '-'}
                                                    </CustomEllipsis>
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={11}
                                            style={{
                                                textAlign: 'center',
                                                fontFamily: 'Manrope',
                                                fontWeight: '500',
                                                fontSize: 14,
                                                paddingTop: 20,
                                                paddingBottom: 20,
                                            }}
                                        >
                                            No data found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <Pagination
                        page={activePage}
                        totalPages={tableData?.last_page}
                        setPage={(changedPage) => onPageChange(changedPage)}
                    />
                </div>
            </div>
        </>
    )
}

export default ReconciliationTabel

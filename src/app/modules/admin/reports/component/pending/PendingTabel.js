/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import Pagination from '../../../../../../app/modules/admin/sequidocs/component/Pagination'
import {TABLE_BORDER, formattedNumberFields} from '../../../../../../helpers/CommonHelpers'
import RedirectToEmployeeProfile from '../../../../../../customComponents/redirectToEmployeeProfile/RedirectToEmployeeProfile'
import {getValidDate} from '../../../../../../constants/constants'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../customComponents/customInputs/customInput/CustomInput'
import PendingInstallFilter from '../../../filters/PendingInstallFilter'
import { CustomSortSvg } from '../../../../../../_metronic/helpers/components/CustomSortSVG'

const initialFilter = {
    filter_install: '',
    filter_closer_setter: '',
    filter_age_of_account: '',
    filter_show_only_account: '',
}

const CrawbackTabel = ({
    className,
    reportData,
    onSearchChange,
    loading,
    onPageChange,
    activePage,
    handleFilterApply,
    searchVal,
    onPress,
    sortingOrder,
    sortValue,
}) => {
    const [search, setSearch] = useState('')

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
        onSearchChange(e.target.value)
    }
    const onApplyFilter = (filters) => {
        setSearch(null)
        handleFilterApply(filters)
    }
    const onResetFilter = (filters) => {
        setSearch(null)
        handleFilterApply(null)
    }

    return (
        <>
            <div className={`mt-6 ${className}`} style={{borderRadius: 10}}>
                <CustomLoader full visible={loading} />
                <div className='shadow-sm py-0 px-0 mx-0'>
                    <div
                        className='bg-cmwhite h-auto'
                        style={{fontSize: '14px', fontFamily: 'Manrope', borderRadius: 10}}
                    >
                        <div className='p-5 d-flex flex-wrap justify-content-between'>
                            <div
                                className=' mb-2 d-flex flex-row mt-2'
                                id='kt_chat_contacts_header'
                            >
                                <div
                                    style={{borderRadius: '20px'}}
                                    className='mb-1 me-sm-12 mx-auto'
                                    id='kt_chat_contacts_header'
                                >
                                    <form
                                        className='position-relative'
                                        style={{background: '#F5F5F5', borderRadius: '90px'}}
                                        autoComplete='off'
                                    >
                                        {/* Pending Installs Table Search Input */}
                                        <CustomInput
                                            type={INPUT_TYPE.search}
                                            onChange={handleSearchChange}
                                            value={searchVal}
                                        />
                                    </form>
                                </div>
                            </div>
                            <PendingInstallFilter
                                initialFilter={initialFilter}
                                onApplyFilter={(updatedFilter) => onApplyFilter(updatedFilter)}
                                resetFilter={onResetFilter}
                            />
                        </div>
                    </div>
                    <div className='table-responsive'>
                        <table className='table' style={{tableLayout: 'fixed', width: '100%'}}>
                            <thead className={TABLE_BORDER}>
                                <tr
                                    className='text-cmGrey900 bg-cmGrey300'
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        fontFamily: 'Manrope',
                                    }}
                                >
                                    <th className='text-nowrap p-5'>PID</th>
                                    <th className='text-nowrap p-5'>Customer</th>
                                    <th className='text-nowrap p-5'> Closer</th>
                                    <th className='text-nowrap p-5'>Installer</th>
                                    <th className='text-nowrap p-5'>
                                        <div className='d-flex'>
                                            KW
                                            <CustomSortSvg
                                                sortingOrder={
                                                    sortValue === 'kw' ? sortingOrder : null
                                                }
                                                onClick={() => onPress('kw')}
                                            />
                                        </div>
                                    </th>
                                    <th className='text-nowrap p-5'>M1</th>
                                    {/* <th className='text-nowrap p-5'>Status</th> */}
                                    <th className='text-nowrap p-5'>
                                        <div className='d-flex'>
                                            Gross acc. value
                                            <CustomSortSvg
                                                sortingOrder={
                                                    sortValue === 'gross_account_value'
                                                        ? sortingOrder
                                                        : null
                                                }
                                                onClick={() => onPress('gross_account_value')}
                                            />
                                        </div>
                                    </th>
                                    <th className='text-nowrap p-5'>
                                        <div className='d-flex'>
                                            EPC
                                            <CustomSortSvg
                                                sortingOrder={
                                                    sortValue === 'epc' ? sortingOrder : null
                                                }
                                                onClick={() => onPress('epc')}
                                            />
                                        </div>
                                    </th>
                                    <th className='text-nowrap p-5'>
                                        <div className='d-flex'>
                                            Net EPC
                                            <CustomSortSvg
                                                sortingOrder={
                                                    sortValue === 'net_epc' ? sortingOrder : null
                                                }
                                                onClick={() => onPress('net_epc')}
                                            />
                                        </div>
                                    </th>
                                    <th className='text-nowrap p-5'> Dealer Fee % | $</th>
                                    <th className='text-nowrap p-5'>
                                        <div className='d-flex'>
                                            Total $
                                            <CustomSortSvg
                                                sortingOrder={
                                                    sortValue === 'amount' ? sortingOrder : null
                                                }
                                                onClick={() => onPress('amount')}
                                            />
                                        </div>
                                    </th>
                                    <th className='text-nowrap p-5'>
                                        <div className='d-flex'>
                                            Age<label style={{color: 'gray'}}>(days)</label>
                                            <CustomSortSvg
                                                sortingOrder={
                                                    sortValue === 'age_days' ? sortingOrder : null
                                                }
                                                onClick={() => onPress('age_days')}
                                            />
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className={TABLE_BORDER}>
                                {reportData?.data?.length > 0 ? (
                                    <>
                                        {reportData?.data?.map((item, i) => (
                                            <tr
                                                className={`text-cmGrey700 stripRow `}
                                                style={{
                                                    color: '#757575',
                                                    fontSize: '14px',
                                                    fontFamily: 'Manrope',
                                                }}
                                                key={i}
                                            >
                                                <td width={'100px'} className='p-5 '>
                                                    {item?.pid ?? '-'}
                                                </td>
                                                <td className='p-5' width={'150px'}>
                                                    {item?.customer_name ?? '-'}
                                                </td>

                                                <td
                                                    className='p-5'
                                                    width={'100px'}
                                                    style={{
                                                        textDecoration: 'underline',
                                                        color: '#424242',
                                                        fontFamily: 'Manrope',
                                                    }}
                                                >
                                                    <RedirectToEmployeeProfile
                                                        employeeId={item?.closer_id}
                                                    >
                                                        {item?.closer ?? '-'}
                                                    </RedirectToEmployeeProfile>
                                                </td>

                                                <td
                                                    className='p-5'
                                                    width={'100px'}
                                                    style={{color: '#616161'}}
                                                >
                                                    {item?.install_partner ?? '-'}
                                                </td>

                                                <td className='p-5' width={'100px'}>
                                                    {formattedNumberFields(item?.kw, '')}{' '}
                                                </td>

                                                <td className='p-5' width={'120px'}>
                                                    {getValidDate(item?.m1_date, 'MM/DD/YYYY') ??
                                                        '-'}
                                                </td>

                                                {/* Gary sir told that for hide */}

                                                {/* <td className='p-5'>
                                                    <button
                                                        style={{
                                                            width: '82px',
                                                            fontSize: '14px',
                                                            height: '32px',
                                                            background: 'rgba(96, 120, 236, 0.1)',
                                                            border: 'none',
                                                            borderRadius: '6px',
                                                            fontFamily: 'Manrope',
                                                            color: '#6078EC',
                                                        }}
                                                    >
                                                        {item?.m2_status}
                                                    </button>
                                                </td> */}

                                                <td className='p-5' width={'150px'}>
                                                    ${item?.gross_account_value ?? '0'}
                                                </td>
                                                <td className='p-5 ' width={'100px'}>
                                                    {formattedNumberFields(item?.epc, '')}
                                                </td>
                                                <td className='p-5' width={'100px'}>
                                                    {formattedNumberFields(item?.net_epc, '')}
                                                </td>
                                                <td className='p-5' width={'1750px'}>
                                                    {`${(item?.dealer_fee_percentage * 100).toFixed(
                                                        2
                                                    )}%` ?? '0'}
                                                    <b> | </b>
                                                    {formattedNumberFields(
                                                        item?.dealer_fee_amount,
                                                        '$'
                                                    )}
                                                </td>
                                                <td
                                                    width={'120px'}
                                                    className='p-5'
                                                    style={{
                                                        color: '#212121',
                                                        fontFamily: 'Manrope',
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    ${item?.amount ?? '0'}
                                                </td>
                                                <td className='p-5' width={'120px'}>
                                                    {item?.age_days}
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
                    {reportData?.data?.length > 0 ? (
                        <Pagination
                            page={activePage && activePage}
                            totalPages={reportData?.last_page}
                            setPage={(changedPage) => onPageChange(changedPage)}
                        />
                    ) : null}
                </div>
            </div>
        </>
    )
}

export default CrawbackTabel

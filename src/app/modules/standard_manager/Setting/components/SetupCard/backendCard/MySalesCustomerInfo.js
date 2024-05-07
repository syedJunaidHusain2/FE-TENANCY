import {useState, useEffect} from 'react'

import {toAbsoluteUrl} from '../../../../../../../_metronic/helpers'
import clsx from 'clsx'

import Pagination from '../../../../../../../app/modules/admin/sequidocs/component/Pagination'
import {Item1} from '../../../../../../../_metronic/partials/content/activity/Item1'
// import ViewCostomer from './ViewCostomer'
import CustomLoader from '../../../../../../../customComponents/customLoader/CustomLoader'
import ViewCostomer from '../../../../../admin/reports/component/sales/ViewCostomer'
import {formattedNumberFields} from '../../../../../../../helpers/CommonHelpers'
import {Link} from 'react-router-dom'
import SalesReportFilter from '../../../../../admin/filters/salesReportFilter'
import {salesReportFilterService} from '../../../../../../../services/Services'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../../customComponents/customInputs/customInput/CustomInput'
import {getValidDate} from '../../../../../../../constants/constants'
import {CustomSortSvg} from '../../../../../../../_metronic/helpers/components/CustomSortSVG'
const initialFilter = {
    status_filter: '',
    installer_filter: '',
    date_filter: '',
}
const MySalesCustomerInfo = ({
    reportData,
    onSearchChange,
    loading,
    headerFilterChnage,
    onPageChange,
    activePage,
    applyFilter,
    resetFilter,
    onPress,
    sortValue,
    sortingOrder,
}) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedId, setSelectedId] = useState(null)
    const [btn, setBtn] = useState(false)
    const [tableData, setTableData] = useState(null)
    const [search, setSearch] = useState('')

    useEffect(() => {
        setTableData(reportData)
    })
    const handleSearchChange = (e) => {
        setSearch(e.target.value)
        onSearchChange(e.target.value)
    }

    return (
        <>
            <div
                className={`card shadow mt-7`}
                style={{fontFamily: 'Manrope', borderRadius: '10px'}}
            >
                <CustomLoader full visible={loading} />
                <div className='card-body py-0 px-0 mx-0'>
                    <div
                        className='card bg-white h-auto'
                        style={{fontSize: '14px', fontFamily: 'Manrope'}}
                    >
                        <div className=' mt-4 mx-sm-7 mb-3 d-sm-flex flex-wrap justify-content-between align-items-center'>
                            {/* customer info */}
                            <div
                                style={{
                                    fontFamily: 'Manrope',
                                    fontWeight: '700',
                                    fontSize: '17px',
                                }}
                                className='mx-sm-0 ps-sm-0 ps-5 text-cmGrey900'
                            >
                                Customer Info
                            </div>
                            <div className='d-flex gap-10 flex-wrap align-items-center'>
                                {/* Search form */}
                                <div
                                    style={{borderRadius: '20px'}}
                                    className='w-md-300px w-75 mx-sm-0 mx-auto mb-1'
                                >
                                    <form
                                        className='position-relative'
                                        style={{borderRadius: '90px'}}
                                        autoComplete='off'
                                    >
                                        {/* Customer Info table Search Input */}
                                        <CustomInput
                                            type={INPUT_TYPE.search}
                                            name='search'
                                            onChange={handleSearchChange}
                                            value={search}
                                        />
                                    </form>
                                </div>
                                <SalesReportFilter
                                    initialFilter={initialFilter}
                                    onApplyFilter={(updatedFilter) => {
                                        setSearch('')
                                        applyFilter(updatedFilter)
                                    }}
                                    resetFilter={resetFilter}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='table-responsive shadow-none overflow-auto'>
                        <table className='table'>
                            <thead>
                                <tr
                                    className=' text-cmGrey800 bg-cmGrey300'
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: '800',
                                        fontFamily: 'Manrope',
                                    }}
                                >
                                    <th className='text-nowrap p-5'>PID</th>
                                    <th className='text-nowrap p-5'>Installer</th>
                                    <th className='text-nowrap p-5'>Customer</th>
                                    <th className='text-nowrap p-5'>State</th>
                                    <th className='text-nowrap p-5'>Closer</th>
                                    <th className='text-nowrap p-5'>Setter</th>
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
                                    <th className='text-nowrap p-5'>Status</th>
                                    <th className='text-nowrap p-5'>Cancel</th>
                                    <th className='text-nowrap p-5'>M1</th>
                                    <th className='text-nowrap p-5'>M2</th>
                                    <th className='text-nowrap p-5'>
                                        <div className='d-flex'>
                                            Adders
                                            <CustomSortSvg
                                                sortingOrder={
                                                    sortValue === 'adders' ? sortingOrder : null
                                                }
                                                onClick={() => onPress('adders')}
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
                                    <th className='text-nowrap p-5 text-nowrap'>
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
                                    <th className='text-nowrap p-5'>Dealer Fee % | $</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData?.data?.length > 0 ? (
                                    <>
                                        {tableData?.data?.map((item, i) => (
                                            <tr
                                                key={item?.pid}
                                                className={`${
                                                    (i + 1) % 2 === 0 ? 'bg-cmbg' : ''
                                                } text-cmGrey700`}
                                                style={{
                                                    fontWeight: '500',
                                                    fontSize: '14px',
                                                    fontFamily: 'Manrope',
                                                }}
                                            >
                                                <td className='p-5 text-nowrap text-cmGrey800'>
                                                    {item?.pid}
                                                </td>

                                                <td className='p-5 text-nowrap'>
                                                    {item?.installer}
                                                </td>

                                                <td
                                                    className='p-5 text-nowrap text-decoration-underline engage-demos-toggle cursor-pointer'
                                                    id='kt_engage_demos_toggle2'
                                                    data-bs-placement='left'
                                                    data-bs-dismiss='click'
                                                    data-bs-trigger='hover'
                                                    style={{fontWeight: '600'}}
                                                    onClick={() => {
                                                        setModalOpen(true)
                                                        setSelectedId({
                                                            id: item?.pid,
                                                            name: item?.customer_name,
                                                        })
                                                    }}
                                                >
                                                    {item?.customer_name}
                                                </td>

                                                <td className='p-5 text-nowrap'>{item?.state}</td>
                                                <td className='p-5 text-nowrap'>
                                                    {item?.closer ?? '-'}
                                                </td>

                                                <td className='p-5 text-nowrap'>{item?.setter}</td>

                                                <td className='p-5 text-nowrap'>{item?.kw}</td>

                                                <td className='p-5 text-nowrap'>
                                                    {item?.status ?? '-'}
                                                </td>
                                                <td className='p-5 text-nowrap text-cmError'>
                                                    {getValidDate(item?.date_cancelled ?? '-')}
                                                </td>

                                                <td className='p-5 text-nowrap'>
                                                    {item?.m1_date == null
                                                        ? '-'
                                                        : getValidDate(item?.m1_date)}
                                                </td>
                                                <td className='p-5 text-nowrap'>
                                                    {getValidDate(item?.m2_date)}
                                                </td>
                                                <td className='p-5 text-nowrap'>
                                                    {formattedNumberFields(item?.adders, '$')}
                                                </td>
                                                <td className='p-5 text-nowrap'>
                                                    {formattedNumberFields(item?.epc, '')}
                                                </td>
                                                <td className='p-5 text-nowrap'>
                                                    {formattedNumberFields(item?.net_epc, '')}
                                                </td>
                                                <td className='p-5 text-nowrap'>
                                                    <span>
                                                        {item?.dealer_fee_percentage
                                                            ? formattedNumberFields(
                                                                  item?.dealer_fee_percentage,
                                                                  '%'
                                                              )
                                                            : null}
                                                        | {formattedNumberFields(item?.dealer_fee)}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={15}
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
                    {tableData?.data?.length > 0 ? (
                        <Pagination
                            page={activePage && activePage}
                            totalPages={tableData?.last_page}
                            setPage={(changedPage) => onPageChange(changedPage)}
                        />
                    ) : null}
                </div>
            </div>
            <ViewCostomer open={modalOpen} onClose={() => setModalOpen(false)} id={selectedId} />
        </>
    )
}

export default MySalesCustomerInfo

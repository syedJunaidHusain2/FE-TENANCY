import React, {useState, useCallback, useEffect} from 'react'
import clsx from 'clsx'
import {KTSVG} from '../../../../../../_metronic/helpers'
import debounce from 'lodash.debounce'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import {getAdminReportService} from '../../../../../../services/Services'
import {Link, useNavigate} from 'react-router-dom'
import Pagination from '../../../sequidocs/component/Pagination'
import {
    TABLE_BORDER,
    formattedNumberFields,
    getBooleanValue,
} from '../../../../../../helpers/CommonHelpers'
import RedirectToEmployeeProfile from '../../../../../../customComponents/redirectToEmployeeProfile/RedirectToEmployeeProfile'
// import Edit from '../../../../sequidocs/Icon/edit.png'
import Edit from '../../../sequidocs/Icon/edit.png'
import CustomCheckbox from '../../../../../../customComponents/customCheckbox/CustomCheckbox'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomEditIcon from '../../../../../../customComponents/customIcons/CustomEditIcon'
import {
    CURRENT_HOST,
    HOST_SERVERS,
    getValidDate,
    SHOW_BASED_ON_HOST,
} from '../../../../../../constants/constants'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'
import ExcelImportModal from './salesTableComponent/ExcelImportModal'
import CustomLink from '../../../../../../customComponents/customButtton/CustomLink'
import CustomTooltip from '../../../../../../customComponents/customTooltip/CustomTooltip'
import {CustomSortSvg} from '../../../../../../_metronic/helpers/components/CustomSortSVG'
let CheckBoxTitle = [
    {name: 'Closed', isChecked: false},
    {name: 'M1', isChecked: false},
    {name: 'M2', isChecked: false},
]
const ReconciliationTabel = ({
    params,
    setParams,
    selectedLocation,
    className,
    headerFilterChnage,
}) => {
    const [reportData, setReportData] = useState(null)
    const [open, setOpen] = useState(false)
    const [cstype, setCsType] = useState('')
    const navigate = useNavigate()
    const [checkBoxValue, setCheckBoxValue] = useState([
        {name: 'Closed', isChecked: false},
        {name: 'M1', isChecked: false},
        {name: 'M2', isChecked: false},
    ])

    const [loading, setLoading] = useState(false)
    const [closerSetterObj, setCloserSetterObj] = useState({})
    const [searchText, setSearchText] = useState(params?.search)
    const [openImportExcel, setOpenImportExcel] = useState(false)
    const [sortValue, setSortValue] = useState(null)
    const [sortingOrder, setSortingOrder] = useState(null)

    const handleOpenImportExcel = () => {
        setOpenImportExcel(!openImportExcel)
    }

    const openParticularType = (type) => {
        navigate(type)
    }

    const ReportApi = (page) => {
        setLoading(true)
        getAdminReportService({
            ...params,
            office_id: selectedLocation,
            page,
            sort: sortValue,
            sort_val: sortingOrder,
        })
            .then((res) => {
                setReportData(res?.data)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        ReportApi(params?.page)
    }, [sortValue, sortingOrder])

    useEffect(() => {
        if (
            params?.office_id &&
            (params?.filter != 'custom' ||
                (params?.filter == 'custom' && params?.start_date && params?.end_date))
        ) {
            ReportApi(params?.page)
        }
    }, [
        params?.start_date,
        params?.end_date,
        params?.filter,
        params?.office_id,
        params?.search,
        params?.m1,
        params?.m2,
        params?.closed,
    ])

    useEffect(() => {
        if (params?.office_id) {
            ReportApi(params?.page)
        }
    }, [params?.page])
    useEffect(() => {
        let m1Index = CheckBoxTitle.indexOf(params?.m1)
    }, [])

    const handleSearchChange = (e) => {
        delaySave(e?.target?.value)
        setSearchText(e?.target?.value)
    }
    const delaySave = useCallback(
        debounce((val) => {
            setParams({
                search: val,
                page: 1,
            })
            setLoading(true)
        }, 500),
        [params]
    )

    const headerFilterChange = (e) => {
        headerFilterChnage(e?.target?.value, getBooleanValue(e?.target?.checked))
    }

    return (
        <>
            <div className={`card shadow mt-12 ${className}`}>
                <CustomLoader full visible={loading} />

                <div className='card-body shadow-none py-0 px-0 mx-0'>
                    <div
                        className='card bg-white h-auto'
                        style={{fontSize: '14px', fontFamily: 'Manrope'}}
                    >
                        {/* <div className=' m-5 d-flex flex-wrap align-items-center justify-content-between'> */}
                        <div className='d-flex flex-wrap gap-sm-5 gap-2 align-items-center justify-content-between m-5'>
                            <label
                                className=' text-cmGrey900'
                                style={{
                                    fontWeight: '600',
                                    fontSize: '17px',
                                }}
                            >
                                Customer Info
                            </label>

                            <div style={{borderRadius: '20px'}}>
                                <CustomInput
                                    type={INPUT_TYPE.search}
                                    name='search'
                                    onChange={handleSearchChange}
                                    value={searchText}
                                />
                            </div>

                            <div
                                style={{borderRadius: '20px', alignItems: 'center'}}
                                className='w-md-325px'
                            >
                                <div className='d-flex flex-wrap gap-6'>
                                    <div className='d-flex align-items-center gap-2'>
                                        <CustomCheckbox
                                            onChange={headerFilterChange}
                                            value={'closed'}
                                            checked={params?.closed == '1'}
                                        />
                                        <span className='text-cmGrey700'>Closed</span>
                                    </div>
                                    <div className='d-flex align-items-center gap-2'>
                                        <CustomCheckbox
                                            onChange={headerFilterChange}
                                            value={'m1'}
                                            checked={params?.m1 == '1'}
                                        />
                                        <span className='text-cmGrey700'>M1</span>
                                    </div>
                                    <div className='d-flex align-items-center gap-2'>
                                        <CustomCheckbox
                                            onChange={headerFilterChange}
                                            value={'m2'}
                                            checked={params?.m2 == '1'}
                                        />
                                        <span className='text-cmGrey700'>M2</span>
                                    </div>
                                </div>
                            </div>

                            <div className='d-flex flex-center flex-wrap gap-5'>
                                <CustomLink
                                    label={'Import History'}
                                    onClick={() => navigate('import-history')}
                                />

                                <CustomButton
                                    buttonLabel='Import'
                                    buttonType={BUTTON_TYPE.secondary}
                                    buttonSize={BUTTON_SIZE.small}
                                    onClick={handleOpenImportExcel}
                                />

                                <CustomButton
                                    buttonLabel='Add Sale'
                                    buttonSize={BUTTON_SIZE.small}
                                    onClick={() => navigate('add-sales')}
                                />
                            </div>
                            {/* </div> */}
                        </div>
                    </div>
                    <div className='table-responsive shadow-none overflow-auto'>
                        <table className='table'>
                            <thead className={TABLE_BORDER}>
                                <tr
                                    className=' bg-cmGrey300 text-cmGrey900 '
                                    style={{
                                        fontSize: '12px',
                                        fontWeight: 700,
                                        fontFamily: 'Manrope',
                                    }}
                                >
                                    <th className='text-nowrap p-6 '>PID</th>
                                    <th className='text-nowrap p-6'>Customer</th>
                                    <th className='text-nowrap p-6'>Source</th>
                                    <th className='text-nowrap p-6'>Status</th>
                                    <th className='text-nowrap p-6'>
                                        <div className='d-flex'>
                                            State
                                            <CustomSortSvg
                                                sortingOrder={
                                                    sortValue === 'state' ? sortingOrder : null
                                                }
                                                onClick={() => {
                                                    setSortValue('state')
                                                    setSortingOrder(
                                                        sortValue !== 'state'
                                                            ? 'asc'
                                                            : sortingOrder === 'asc'
                                                            ? 'desc'
                                                            : 'asc'
                                                    )
                                                    setParams({
                                                        page: 1,
                                                    })
                                                }}
                                            />
                                        </div>
                                    </th>
                                    <th className='text-nowrap p-6'>Rep Name</th>
                                    <th className='text-nowrap p-6'>
                                        <div className='d-flex'>
                                            KW
                                            <CustomSortSvg
                                                sortingOrder={
                                                    sortValue === 'kw' ? sortingOrder : null
                                                }
                                                onClick={() => {
                                                    setSortValue('kw')
                                                    setSortingOrder(
                                                        sortValue !== 'kw'
                                                            ? 'asc'
                                                            : sortingOrder === 'asc'
                                                            ? 'desc'
                                                            : 'asc'
                                                    )
                                                    setParams({
                                                        page: 1,
                                                    })
                                                }}
                                            />
                                        </div>
                                    </th>
                                    <th className='text-nowrap p-6'>
                                        <div className='d-flex'>
                                            M1
                                            <CustomSortSvg
                                                sortingOrder={
                                                    sortValue === 'm1' ? sortingOrder : null
                                                }
                                                onClick={() => {
                                                    setSortValue('m1')
                                                    setSortingOrder(
                                                        sortValue !== 'm1'
                                                            ? 'asc'
                                                            : sortingOrder === 'asc'
                                                            ? 'desc'
                                                            : 'asc'
                                                    )
                                                    setParams({
                                                        page: 1,
                                                    })
                                                }}
                                            />
                                        </div>
                                    </th>
                                    <th className='text-nowrap p-6'>
                                        <div className='d-flex'>
                                            M2
                                            <CustomSortSvg
                                                sortingOrder={
                                                    sortValue === 'm2' ? sortingOrder : null
                                                }
                                                onClick={() => {
                                                    setSortValue('m2')
                                                    setSortingOrder(
                                                        sortValue !== 'm2'
                                                            ? 'asc'
                                                            : sortingOrder === 'asc'
                                                            ? 'desc'
                                                            : 'asc'
                                                    )
                                                    setParams({
                                                        page: 1,
                                                    })
                                                }}
                                            />
                                        </div>
                                    </th>
                                    <th className='text-nowrap p-6'>
                                        <div className='d-flex'>
                                            EPC
                                            <CustomSortSvg
                                                sortingOrder={
                                                    sortValue === 'epc' ? sortingOrder : null
                                                }
                                                onClick={() => {
                                                    setSortValue('epc')
                                                    setSortingOrder(
                                                        sortValue !== 'epc'
                                                            ? 'asc'
                                                            : sortingOrder === 'asc'
                                                            ? 'desc'
                                                            : 'asc'
                                                    )
                                                    setParams({
                                                        page: 1,
                                                    })
                                                }}
                                            />
                                        </div>
                                    </th>
                                    <th className='text-nowrap p-6'>Net EPC</th>
                                    <th className='text-nowrap p-6'>
                                        <div className='d-flex'>
                                            Adders
                                            <CustomSortSvg
                                                sortingOrder={
                                                    sortValue === 'adders' ? sortingOrder : null
                                                }
                                                onClick={() => {
                                                    setSortValue('adders')
                                                    setSortingOrder(
                                                        sortValue !== 'adders'
                                                            ? 'asc'
                                                            : sortingOrder === 'asc'
                                                            ? 'desc'
                                                            : 'asc'
                                                    )
                                                    setParams({
                                                        page: 1,
                                                    })
                                                }}
                                            />
                                        </div>
                                    </th>
                                    <th className='text-nowrap p-6'>
                                        <div className='d-flex'>
                                            Total Commission
                                            <CustomSortSvg
                                                sortingOrder={
                                                    sortValue === 'total_commission'
                                                        ? sortingOrder
                                                        : null
                                                }
                                                onClick={() => {
                                                    setSortValue('total_commission')
                                                    setSortingOrder(
                                                        sortValue !== 'total_commission'
                                                            ? 'asc'
                                                            : sortingOrder === 'asc'
                                                            ? 'desc'
                                                            : 'asc'
                                                    )
                                                    setParams({
                                                        page: 1,
                                                    })
                                                }}
                                            />
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className={TABLE_BORDER}>
                                {reportData?.data?.length > 0 ? (
                                    <>
                                        {reportData &&
                                            reportData?.data?.map((item, index) => (
                                                <tr
                                                    key={index}
                                                    className={` text-cmGrey700 stripRow `}
                                                    style={{
                                                        height: '40px',
                                                        fontSize: '14px',
                                                        fontFamily: 'Manrope',
                                                    }}
                                                >
                                                    <td className='text-nowrap p-5'>
                                                        {item?.alertcentre_status ? (
                                                            <div className='d-flex'>
                                                                <Link
                                                                    style={{
                                                                        cursor: 'pointer',
                                                                        textDecoration: 'underline',
                                                                        fontWeight: 700,
                                                                        alignItems: 'center',
                                                                    }}
                                                                    className='text-cmGrey800'
                                                                    to={`customer-Info?pid=${item?.pid}`}
                                                                    state={{pid: item?.pid}}
                                                                >
                                                                    {item?.pid}
                                                                </Link>
                                                                {SHOW_BASED_ON_HOST.showSalesReportAlertCenterIcon ? (
                                                                    <Link
                                                                        style={{
                                                                            cursor: 'pointer',
                                                                            textDecoration:
                                                                                'underline',
                                                                            fontWeight: 700,
                                                                            alignItems: 'center',
                                                                        }}
                                                                        className='text-cmGrey800'
                                                                        to={`/alert-center/alerts?alertType=sales&page=1&search=&allSearchTerm=`}
                                                                        state={{pid: item?.pid}}
                                                                    >
                                                                        <CustomTooltip title='Alert Center'>
                                                                            <i
                                                                                className='bi bi-exclamation-triangle ms-2 text-cmBlue-Crayola'
                                                                                style={{
                                                                                    fontSize: 15,
                                                                                }}
                                                                            />
                                                                        </CustomTooltip>
                                                                    </Link>
                                                                ) : (
                                                                    ''
                                                                )}
                                                            </div>
                                                        ) : (
                                                            <Link
                                                                style={{
                                                                    cursor: 'pointer',
                                                                    textDecoration: 'underline',
                                                                    fontWeight: 700,
                                                                }}
                                                                className='text-cmGrey800'
                                                                // to='customer-Info'
                                                                to={`customer-Info?pid=${item?.pid}`}
                                                                state={{pid: item?.pid}}
                                                            >
                                                                {item?.pid}
                                                            </Link>
                                                        )}
                                                    </td>

                                                    <td className='text-nowrap p-5'>
                                                        {item?.customer_name}
                                                    </td>
                                                    <td className='text-nowrap p-5'>
                                                        {item?.data_source_type ?? '-'}
                                                    </td>
                                                    <td className='text-nowrap p-5'>
                                                        {item?.mark_account_status_name ?? '-'}
                                                    </td>

                                                    <td className='text-nowrap p-5'>
                                                        {item?.state}
                                                    </td>

                                                    <td className='text-nowrap p-5'>
                                                        <label className='d-flex'>
                                                            <RedirectToEmployeeProfile
                                                                employeeId={
                                                                    item?.closer1_detail?.id
                                                                }
                                                            >
                                                                <label style={{color: '#7239EA'}}>
                                                                    (C)
                                                                </label>
                                                                {item?.closer1_detail?.first_name ??
                                                                    '-'}{' '}
                                                                {item?.closer1_detail?.last_name ??
                                                                    '-'}
                                                            </RedirectToEmployeeProfile>
                                                        </label>
                                                        <label className='d-flex'>
                                                            <RedirectToEmployeeProfile
                                                                employeeId={
                                                                    item?.setter1_detail?.id
                                                                }
                                                            >
                                                                <label style={{color: '#004CE8'}}>
                                                                    (S)
                                                                </label>
                                                                {item?.setter1_detail?.first_name ??
                                                                    '-'}{' '}
                                                                {item?.setter1_detail?.last_name ??
                                                                    '-'}
                                                            </RedirectToEmployeeProfile>
                                                        </label>
                                                    </td>

                                                    <td className='text-nowrap p-5'>
                                                        {formattedNumberFields(item?.kw, '')}
                                                    </td>

                                                    <td className='text-nowrap p-5'>
                                                        <span
                                                            className={
                                                                Number(item?.total_m1 ?? 0) < 0
                                                                    ? 'bi bi-exclamation-triangle text-cmError me-2'
                                                                    : ''
                                                            }
                                                        ></span>
                                                        <div className='fw-bold'>
                                                            {formattedNumberFields(
                                                                item?.total_m1,
                                                                '$'
                                                            )}{' '}
                                                        </div>
                                                        <div>
                                                            {' '}
                                                            {getValidDate(item?.m1_date) ?? '-'}
                                                        </div>
                                                    </td>

                                                    <td className='text-nowrap p-5'>
                                                        <span
                                                            className={
                                                                Number(item?.total_m2 ?? 0) < 0
                                                                    ? 'bi bi-exclamation-triangle text-cmError me-2'
                                                                    : ''
                                                            }
                                                        ></span>
                                                        <div className='fw-bold'>
                                                            {formattedNumberFields(
                                                                item?.total_m2,
                                                                '$'
                                                            )}
                                                        </div>
                                                        <div>
                                                            {' '}
                                                            {getValidDate(item?.m2_date) ?? '-'}
                                                        </div>
                                                    </td>

                                                    <td
                                                        className='text-nowrap p-5'
                                                        style={{color: '#212121'}}
                                                    >
                                                        {formattedNumberFields(item?.epc) ?? '-'}
                                                    </td>

                                                    <td className='text-nowrap p-5'>
                                                        {formattedNumberFields(item?.net_epc, '')}
                                                    </td>

                                                    <td
                                                        className='text-nowrap p-5 text-center'
                                                        style={{color: '#212121'}}
                                                    >
                                                        {item?.adders
                                                            ? formattedNumberFields(item?.adders)
                                                            : '-'}
                                                    </td>

                                                    <td
                                                        className='text-nowrap p-5'
                                                        style={{
                                                            color: '#212121',
                                                            fontFamily: 'Manrope',
                                                        }}
                                                    >
                                                        {formattedNumberFields(
                                                            item?.total_commission,
                                                            '$'
                                                        )}
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
                            page={params?.page}
                            setPage={(changedPage) => {
                                setParams({
                                    page: Number(changedPage),
                                })
                            }}
                            totalPages={reportData?.last_page}
                        />
                    ) : null}
                </div>
            </div>
            {openImportExcel ? (
                <ExcelImportModal open={openImportExcel} handleClose={handleOpenImportExcel} />
            ) : null}
        </>
    )
}

export default ReconciliationTabel

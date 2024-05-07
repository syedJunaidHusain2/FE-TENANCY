import React, {useEffect, useState, useCallback, useRef} from 'react'
import {KTSVG} from '../../../../../../_metronic/helpers'
import DatePicker from 'react-datepicker'
import CustomDatePicker from '../../../../../../customComponents/customInputs/customDatePicker/CustomDatePicker'
import {
    DEFAULT_DATE_FORMAT,
    REPORTS_DURATION_DROPDOWN_LIST,
    getValidDate,
} from '../../../../../../constants/constants'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import {
    downloadCsvFileService,
    oneTimePaymentHistoryService,
} from '../../../../../../services/Services'
import moment from 'moment'
import debounce from 'lodash.debounce'
import Pagination from '../../../sequidocs/component/Pagination'
import {TABLE_BORDER, formattedNumberFields} from '../../../../../../helpers/CommonHelpers'
import CustomImage from '../../../../../../customComponents/customImage/CustomImage'
import {CSVLink} from 'react-csv'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import CustomButton, {
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'
import {BUTTON_SIZE} from '../../../../../../customComponents/customButtton/CustomButton'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomDropdown from '../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import RedirectToEmployeeProfile from '../../../../../../customComponents/redirectToEmployeeProfile/RedirectToEmployeeProfile'

const OneTimePaymentHistory = ({handleShowHistory}) => {
    const [historyData, setHistoryData] = useState(null)

    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState('all_status')
    const [filter, setFilter] = useState('this_year')
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [search, setSearch] = useState(null)
    const [searchTerm, setSearchTerm] = useState(null)
    const [page, setPage] = useState(1)
    const [csvData, setCsvData] = useState([])
    const csvLink = useRef()
    useEffect(() => {
        const body = {
            id: 4,
            status: status,
            filter: filter,
        }
        if (search) body.search = search
        if (filter == 'custom') {
            body.start_date = getValidDate(startDate, 'yyyy-MM-DD')
            body.end_date = getValidDate(endDate, 'yyyy-MM-DD')
        }
        if (
            filter != 'custom' ||
            (filter == 'custom' &&
                moment(startDate).isValid() &&
                moment(endDate).isValid() &&
                startDate <= endDate)
        ) {
            setLoading(true)
            oneTimePaymentHistoryService(body)
                .then((res) => setHistoryData(res.data))
                .finally(() => setLoading(false))
        }
    }, [status, filter, startDate, endDate, search])

    const resetState = useCallback(() => {
        setPage(1)
        setSearch(null)
        setSearchTerm(null)
    }, [])

    const onChangeFilter = (data) => {
        resetState()
        setLoading(data == 'custom' ? false : true)
        if (!(data == 'custom')) {
            setStartDate(null)
            setEndDate(null)
        }
        setFilter(data)
    }

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
        delaySaveToDb(e.target.value)
    }
    const delaySaveToDb = useCallback(
        debounce((val) => {
            setSearch(val)
        }, 500),
        []
    )

    const downloadCsvFile = () => {
        setLoading(true)
        downloadCsvFileService(4)
            .then((res) => {
                setCsvData(res)
                setTimeout(() => {
                    csvLink.current.link.click()
                }, 1000)
                CustomToast.success('Downloaded Successfully')
            })
            .finally(() => {
                setLoading(false)
            })
    }
    return (
        <div style={{position: 'relative'}}>
            <CustomLoader full visible={loading} />
            <div
                className='bg-cmwhite shadow mb-2'
                style={{fontFamily: 'Manrope', fontWeight: '600', borderRadius: '10px'}}
            >
                {/* heading */}
                <div className='d-flex align-items-center gap-10 px-10 py-5'>
                    <div
                        className='bi bi-box-arrow-left fs-1 text-cmGrey600 text-hover-dark cursor-pointer'
                        onClick={handleShowHistory}
                    />
                    <div className='text-cmGrey900' style={{fontWeight: '600', fontSize: '16px'}}>
                        One-time Payment History
                    </div>
                </div>
                <hr className='text-cmGrey600 m-0  ' />

                <div className='d-flex align-items-center flex-wrap gap-10 p-5'>
                    {/* searchbar */}
                    <form
                        className='position-relative '
                        style={{borderRadius: '90px'}}
                        autoComplete='off'
                    >
                        <CustomInput
                            type={INPUT_TYPE.search}
                            name='search'
                            onChange={handleSearch}
                            value={searchTerm}
                        />
                    </form>
                    {/* Range select */}
                    <div>
                        <CustomDropdown
                            value={filter}
                            showClear={false}
                            searching={false}
                            options={REPORTS_DURATION_DROPDOWN_LIST}
                            valueKey='value'
                            displayKey='name'
                            onChange={(e) => onChangeFilter(e.target.value)}
                        />
                    </div>
                    {/* date selector */}
                    {filter == 'custom' && (
                        <div className='d-flex align-items-center flex-row flex-wrap'>
                            <div
                                style={{background: '#F5F5F5', borderRadius: '6px'}}
                                className='form-group d-flex flex-row'
                            >
                                <CustomDatePicker
                                    placeholderText={'Start Date'}
                                    name='startDate'
                                    value={startDate}
                                    onChange={(event) => setStartDate(event.target.value)}
                                    maxDate={new Date()}
                                />
                            </div>
                            <label className='m-4 ms-6 me-6' style={{color: '#757575'}}>
                                to
                            </label>
                            <div
                                style={{
                                    background: '#F5F5F5',
                                    overflow: 'hidden',
                                    borderRadius: '6px',
                                }}
                                className='form-group  d-flex flex-row'
                            >
                                <CustomDatePicker
                                    placeholderText={'End Date'}
                                    name='startDate'
                                    value={endDate}
                                    onChange={(event) => setEndDate(event?.target?.value)}
                                    maxDate={new Date()}
                                    minDate={startDate}
                                />
                            </div>
                        </div>
                    )}
                    {/* Status */}
                    <div>
                        <CustomDropdown
                            showClear={false}
                            value={status}
                            searching={false}
                            options={[
                                {name: 'All Status', value: 'all_status'},
                                {name: 'Success', value: 'success'},
                                {name: 'Pending', value: 'pending'},
                                {name: 'Failed', value: 'failed'},
                            ]}
                            onChange={(e) => setStatus(e.target.value)}
                        />
                    </div>
                </div>
                <div className='table-responsive shadow-none overflow-auto'>
                    <table className='table'>
                        <thead className={TABLE_BORDER}>
                            <tr
                                className='bg-cmGrey300 text-cmGrey900'
                                style={{
                                    fontSize: '14px',
                                    fontWeight: '700',
                                    fontFamily: 'Manrope',
                                }}
                            >
                                <th className='min-w-200px p-5 text-nowrap'>Date & Time</th>
                                <th className='min-w-150px p-5 text-nowrap'>Employee</th>
                                <th className='min-w-150px p-5 text-nowrap'>Description</th>
                                <th className='min-w-150px p-5 text-nowrap'>TXN. ID</th>
                                <th className='min-w-150px p-5 text-nowrap'>Status</th>
                                <th className='min-w-150px p-5 text-nowrap'>Amount</th>
                            </tr>
                        </thead>
                        <tbody className={TABLE_BORDER}>
                            {historyData?.data?.length > 0 ? (
                                <>
                                    {historyData?.data?.map((item, i) => (
                                        <tr
                                            style={{
                                                fontWeight: '600',
                                                fontSize: '14px',
                                                fontFamily: 'Manrope',
                                            }}
                                        >
                                            <td className='p-5 text-nowrap text-cmGrey900'>
                                                {getValidDate(
                                                    item?.cost_date,
                                                    `${DEFAULT_DATE_FORMAT} hh:mm`
                                                )}
                                            </td>
                                            <td
                                                className='p-5 text-decoration-underline text-nowrap text-cmGrey800 cursor-pointer'
                                                style={{fontWeight: '700'}}
                                            >
                                                <RedirectToEmployeeProfile
                                                    employeeId={item?.user_id}
                                                >
                                                    <CustomImage
                                                        src={item?.user_data?.image}
                                                        className='avatar me-3'
                                                    />{' '}
                                                    {item?.user_data?.first_name}{' '}
                                                    {item?.user_data?.last_name}
                                                </RedirectToEmployeeProfile>
                                            </td>
                                            <td className='p-5 text-nowrap text-cmGrey500'>
                                                {item?.description}{' '}
                                            </td>
                                            <td className='p-5 text-nowrap text-cmGrey700'>
                                                {item?.txn_id}{' '}
                                            </td>
                                            <td className='p-5 text-nowrap'>{item?.status} </td>
                                            <td
                                                className='p-5 text-nowrap text-cmGrey900'
                                                style={{fontWeight: '700'}}
                                            >
                                                {formattedNumberFields(item?.amount)}
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            ) : (
                                <tr>
                                    <td
                                        colSpan={6}
                                        style={{
                                            textAlign: 'center',
                                            fontFamily: 'Manrope',
                                            fontWeight: '500',
                                            fontSize: 14,
                                            paddingTop: 20,
                                            paddingBottom: 20,
                                        }}
                                    >
                                        No payment history
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {historyData?.data?.length > 0 ? (
                <Pagination
                    page={page}
                    totalPages={historyData?.last_page}
                    setPage={(changedPage) => setPage(changedPage)}
                />
            ) : null}
            <div className='text-center mt-10'>
                <CustomButton
                    buttonType={BUTTON_TYPE.primary}
                    buttonLabel='Download CSV'
                    onClick={downloadCsvFile}
                />
                <CSVLink
                    data={csvData}
                    filename={`${getValidDate(new Date())}PaymentHistory.csv`}
                    className=''
                    ref={csvLink}
                    // target='_blank'
                />
            </div>
        </div>
    )
}

export default OneTimePaymentHistory

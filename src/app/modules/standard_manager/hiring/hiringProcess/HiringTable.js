import {useCallback, useEffect, useState} from 'react'

// import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers'
import clsx from 'clsx'

import {KTSVG} from '../../../../../_metronic/helpers'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import {getHiringProgressListService} from '../../../../../services/Services'
import Pagination from '../../../admin/sequidocs/component/Pagination'
import CustomLoader from '../../../../../customComponents/customLoader/CustomLoader'
import {getValidDate} from '../../../../../constants/constants'
import CustomDatePicker from '../../../../../customComponents/customInputs/customDatePicker/CustomDatePicker'
import RedirectToEmployeeProfile from '../../../../../customComponents/redirectToEmployeeProfile/RedirectToEmployeeProfile'
import CustomImage from '../../../../../customComponents/customImage/CustomImage'
import {TABLE_BORDER} from '../../../../../helpers/CommonHelpers'
import {CustomSortSvg} from '../../../../../_metronic/helpers/components/CustomSortSVG'

// import Select from '../../Icon/select.png'
// import ViewCostomer from './ViewCostomer'

const HiringTable = ({getCardData, selectedLocation}) => {
    const [open, setOpen] = useState(false)
    const [btn, setBtn] = useState(false)
    const [value, setValue] = useState()
    const [tableData, setTableData] = useState([])
    // const [startDate, setStartDate] = useState(moment().add(-30, 'day').toDate())
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [sortValue, setSortValue] = useState(null)
    const [sortingOrder, setSortingOrder] = useState(null)

    const startDateChange = (e) => {
        setPage(1)
        if (moment(e).format('YYYY-MM-DD') > moment(endDate).format('YYYY-MM-DD')) {
            setEndDate(null)
        }

        setStartDate(e)
    }

    const endDateChange = (e) => {
        setPage(1)
        setEndDate(e)
    }

    // const startDateChange = (e) => {
    //     if (moment(e).format('yyyy-MM-DD') > moment(endDate).format('yyyy-MM-DD')) {
    //         setEndDate(null)
    //     }
    //     setStartDate(e)
    // }
    // const endDateChange = (e) => {
    //     setEndDate(e)
    // }

    useEffect(() => {
        hiringListApi()
    }, [
        selectedLocation,
        startDate && startDate <= endDate ? endDate : null,
        endDate && startDate <= endDate ? startDate : null,
        page,
        sortValue,
        sortingOrder
    ])

    const hiringListApi = () => {
        if (selectedLocation) {
            const data = {
                from_date: startDate ? getValidDate(startDate, 'YYYY-MM-DD') : null,
                to_date: endDate ? getValidDate(endDate, 'YYYY-MM-DD') : null,
                order_by: 'DESC',
                page: page,
                office_id: selectedLocation,
                sort: sortValue,
                sort_val: sortingOrder,
            }
            setLoading(true)
            getHiringProgressListService(data)
                .then((res) => {
                    setTableData(res?.data)
                    getCardData(res)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }

    const checkZeroColumn = useCallback((col1, col2, col3) => {
        let colArr = [col1, col2, col3]
        return colArr.every((item) => item == 0)
    }, [])

    return (
        <>
            <div
                className={`card shadow-sm mt-7`}
                style={{fontFamily: 'Manrope', position: 'relative'}}
            >
                <CustomLoader full visible={loading} />
                <div className='card-body shadow-none py-0 px-0 mx-0'>
                    <div
                        className='card bg-white h-auto px-2 '
                        style={{fontSize: '14px', fontFamily: 'Manrope'}}
                    >
                        <div className='mt-2 mx-sm-7 py-3 mb-2 d-sm-flex flex-wrap justify-content-between align-items-center'>
                            {/* Hiring Progress*/}
                            <div
                                style={{
                                    fontFamily: 'Manrope',
                                    fontWeight: '700',
                                    fontSize: '16px',
                                }}
                                className='text-cmGrey900 mb-2 '
                            >
                                Hiring Progress
                            </div>

                            {/* search date */}
                            <div className=' d-sm-flex flex-row flex-wrap align-items-center'>
                                <div
                                    style={{
                                        borderRadius: '6px',
                                    }}
                                    className='form-group mx-auto'
                                >
                                    {/* <DatePicker
                    className='border-0 bg2 fw-bold text-cmGrey900'
                    placeholderText={'End Date'}
                    onChange={(event) => {
                      setEndDate(moment(event).format('YYYY-MM-DD'))
                    }}
                    name='startDate'
                    dateFormat='YYYY-MM-DD'
                    clearIcon={false}
                    calendarIcon={false}
                    value={endDate}
                  /> */}
                                    <CustomDatePicker
                                        value={startDate}
                                        placeholder='Start Date'
                                        name='startDate'
                                        onChange={(event) => startDateChange(event.target.value)}
                                        maxDate={new Date()}
                                    />
                                </div>
                                <label className='text-cmGrey600 mx-3  ' style={{fontWeight: 500}}>
                                    to
                                </label>

                                <div
                                    style={{
                                        borderRadius: '6px',
                                    }}
                                    className='form-group mx-auto'
                                >
                                    {/* <DatePicker
                    className='border-0 bg2 fw-bold text-cmGrey900'
                    placeholderText={'End Date'}
                    onChange={(event) => {
                      setEndDate(moment(event).format('YYYY-MM-DD'))
                    }}
                    name='startDate'
                    dateFormat='YYYY-MM-DD'
                    clearIcon={false}
                    calendarIcon={false}
                    value={endDate}
                  /> */}
                                    <CustomDatePicker
                                        value={endDate}
                                        placeholder='End Date'
                                        name='startDate'
                                        onChange={(event) => endDateChange(event.target.value)}
                                        maxDate={new Date()}
                                        minDate={startDate}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='table-responsive shadow-none overflow-auto'>
                        <table className='table '>
                            <thead className={TABLE_BORDER}>
                                <tr
                                    className='bg-cmGrey300 text-cmGrey900'
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        fontFamily: 'Manrope',
                                    }}
                                >
                                    <th className='text-nowrap p-5 text-start'>Name</th>
                                    <th className='text-nowrap p-5'>
                                        <div className='d-flex'>
                                            Active Leads
                                            <CustomSortSvg
                                                sortingOrder={
                                                    sortValue === 'active_lead'
                                                        ? sortingOrder
                                                        : null
                                                }
                                                onClick={() => {
                                                    setSortValue('active_lead')
                                                    setSortingOrder(
                                                        sortValue !== 'active_lead' ? 'asc' : sortingOrder === 'asc' ? 'desc' : 'asc'
                                                    )
                                                    setPage(1)
                                                }}
                                            />
                                        </div>
                                    </th>
                                    <th className='text-nowrap p-5'>Rejected</th>
                                    <th className='text-nowrap p-5'>
                                        <div className='d-flex'>
                                            Hired
                                            <CustomSortSvg
                                                sortingOrder={
                                                    sortValue === 'hired' ? sortingOrder : null
                                                }
                                                onClick={() => {
                                                    setSortValue('hired')
                                                    setSortingOrder(
                                                        sortValue !== 'hired' ? 'asc' : sortingOrder === 'asc' ? 'desc' : 'asc'
                                                    )
                                                    setPage(1)
                                                }}
                                            />
                                        </div>
                                    </th>
                                    <th className='text-nowrap p-5'>Last Hired</th>
                                    <th className='text-nowrap p-5'>
                                        <div className='d-flex'>
                                            Conversion Rate
                                            <CustomSortSvg
                                                sortingOrder={
                                                    sortValue === 'conversion_rate'
                                                        ? sortingOrder
                                                        : null
                                                }
                                                onClick={() => {
                                                    setSortValue('conversion_rate')
                                                    setSortingOrder(
                                                        sortValue !== 'conversion_rate' ? 'asc' : sortingOrder === 'asc' ? 'desc' : 'asc'
                                                    )
                                                    setPage(1)
                                                }}
                                            />
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className={TABLE_BORDER}>
                                {tableData?.data?.length > 0 &&
                                    tableData?.data?.map((item, i) => {
                                        return (
                                            <tr
                                                key={item?.id}
                                                style={{
                                                    height: '40px',
                                                    fontSize: '14px',
                                                    fontFamily: 'Manrope',
                                                    fontWeight: '500',
                                                }}
                                                className={`text-cmGrey700 stripRow`}
                                            >
                                                <td
                                                    className='p-5 text-nowrap text-cmGrey800'
                                                    style={{
                                                        fontWeight: '600',
                                                        textDecoration: 'underline',
                                                    }}
                                                >
                                                    <RedirectToEmployeeProfile
                                                        employeeId={item?.id}
                                                    >
                                                        <CustomImage
                                                            src={item?.image}
                                                            className='avatar me-3'
                                                        />{' '}
                                                        {item?.name ?? '-'}
                                                    </RedirectToEmployeeProfile>
                                                </td>
                                                <td className='p-5 text-nowrap '>
                                                    {item?.active_lead ?? '-'}
                                                </td>

                                                <td className='p-5 text-nowrap '>
                                                    {item?.rejected ?? '-'}
                                                </td>
                                                <td className='p-5 text-nowrap '>
                                                    {item?.hired ?? '-'}
                                                </td>

                                                <td className='p-5 text-nowrap '>
                                                    {item?.last_hired
                                                        ? getValidDate(item?.last_hired)
                                                        : '-'}
                                                </td>
                                                <td className='p-5 text-nowrap'>
                                                    {item?.conversion_rate ?? '-'}%
                                                </td>
                                            </tr>
                                        )
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {tableData?.data?.length > 0 ? (
                <Pagination
                    setPage={(pg) => {
                        setPage(pg)
                    }}
                    page={tableData?.current_page}
                    totalPages={tableData?.last_page}
                />
            ) : null}
        </>
    )
}

export default HiringTable

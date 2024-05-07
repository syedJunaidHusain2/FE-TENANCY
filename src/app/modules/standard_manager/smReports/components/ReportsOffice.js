import DatePicker from 'react-datepicker'
import clsx from 'clsx'
import moment from 'moment'
import React, {useState, useEffect, useMemo, useCallback} from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'
import {OfficeReportCards} from './OfficeReportCards'
import {OfficeReportDataCard} from './OfficeReportDataCard'
import {OfficeLeaderCard} from './OfficeLeaderCard'
import EmployeePerformance from './EmployeePerformance'
import {EmployeePerformanceChart} from './EmployeePerformanceChart'
import CustomReportsHeader from '../customs/CustomReportsHeader'
import {getManagerReportService, officeBYUserIDSerices} from '../../../../../services/Services'
import CustomLoader from '../../../../../customComponents/customLoader/CustomLoader'
import debounce from 'lodash.debounce'
import {formattedNumberFields} from '../../../../../helpers/CommonHelpers'
import {getValidDate} from '../../../../../constants/constants'
import useOfficeLocation from '../../../../../hooks/useOfficeLocation'

const ReportsOffice = () => {
    const [reportData, setReportData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [tableLoading, setTableLoading] = useState(false)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [filter, setFilter] = useState('this_year')
    const [userByOfficeData, setUserByOffceData] = useState([])
    const [repId, setRepId] = useState(null)
    const [stateList, selectedLocation, setSelectedLocation] = useOfficeLocation()
    const [page, setPage] = useState(1)
    const [sortValue, setSortValue] = useState(null)
    const [sortingOrder, setSortingOrder] = useState(null)

    useEffect(() => {
        const body = {
            search: searchTerm,
            office_id: selectedLocation,
            filter: filter,
            user_id: repId,
            page: page,
            sort: sortValue,
            sort_val: sortingOrder,
        }

        if (
            filter === 'custom' &&
            moment(startDate, 'YYYY-MM-DD').isValid() &&
            moment(endDate, 'YYYY-MM-DD').isValid()
        ) {
            body.start_date = moment(startDate, 'YYYY-MM-DD').format('YYYY-MM-DD')
            body.end_date = moment(endDate, 'YYYY-MM-DD').format('YYYY-MM-DD')
        }

        if (
            (selectedLocation && filter !== 'custom') ||
            (filter === 'custom' &&
                moment(startDate, 'YYYY-MM-DD').isValid() &&
                moment(endDate, 'YYYY-MM-DD').isValid() &&
                moment(startDate).isSameOrBefore(moment(endDate, 'YYYY-MM-DD')))
        ) {
            setLoading(true)
            getManagerReportService(body)
                .then((res) => {
                    setReportData(res.data)
                })
                .finally(() => {
                    setLoading(false)
                    setTableLoading(false)
                })
        }
    }, [
        selectedLocation,
        filter,
        sortValue,
        sortingOrder,
        endDate,
        startDate,
        searchTerm,
        repId,
        page,
    ])

    useEffect(() => {
        if (selectedLocation) {
            officeBYUserIDSerices(selectedLocation).then((res) => {
                const modifiedRes = res?.data?.map((item) => ({
                    ...item,
                    name: `${item?.first_name} ${item?.last_name}`,
                }))
                setUserByOffceData(modifiedRes)
            })
        }
    }, [selectedLocation])
    const onChangeFilter = (data) => {
        setPage(1)
        setLoading(data == 'custom' ? false : true)
        setFilter(data)
    }
    const onLocationChange = (loc) => {
        setPage(1)
        setLoading(true)
        setSelectedLocation(loc)
    }
    const changeStartDate = (start) => {
        setPage(1)
        setStartDate(moment(start).format('YYYY-MM-DD'))
    }

    const changeEndDate = (end) => {
        setPage(1)
        setEndDate(moment(end).format('YYYY-MM-DD'))
    }

    const handleLocationChange = (e) => {
        delaySaveToDb(e)
    }
    const delaySaveToDb = useCallback(
        debounce((val) => {
            setPage(1)
            setTableLoading(true)
            setSearchTerm(val)
        }, 500),
        []
    )

    const bestWeekValue = useMemo(() => {
        if (Array.isArray(reportData?.best_week?.week)) return '-'
        let dates =
            reportData && reportData?.best_week?.week != 0
                ? reportData?.best_week?.week?.split(',')
                : null
        return dates
            ? `${getValidDate(dates?.[0], 'DD MMM')} - ${getValidDate(dates?.[1], 'DD MMM')}`
            : '-'
    }, [reportData?.best_week])

    return (
        <>
            <div style={{position: 'relative'}}>
                <CustomLoader full visible={loading} />

                {/* Top Filter header */}
                <CustomReportsHeader
                    stateList={stateList}
                    selectedLocation={selectedLocation}
                    onChangeDate={(date) => onChangeFilter(date)}
                    onLocationChange={(loc) => onLocationChange(loc)}
                    onStartDateChange={(start) => changeStartDate(start)}
                    onEndDateChange={(end) => changeEndDate(end)}
                    userByOfficeData={userByOfficeData}
                    setRepId={setRepId}
                    repId={repId}
                />
                {/* Filter Header ends */}

                {/* Top cards */}
                <div className='d-flex flex-wrap mx-auto my-10 gap-8'>
                    <OfficeReportCards
                        // heading='#5'
                        content='Office Ranking'
                        className='col-sm '
                        background='#FDDCEA'
                        smallTitle={reportData?.office_name ?? '-'}
                        heading={reportData?.office_ranking ?? '0'}
                    />
                    <OfficeReportCards
                        heading={reportData?.total_rep ?? '0'}
                        content='Total Reps'
                        className='col-sm '
                        background='#D7F9EF'
                    />
                    <OfficeReportCards
                        heading={reportData?.total_manager ?? '0'}
                        content='Managers'
                        className='col-sm '
                        background='#FFF4DE'
                    />
                    <OfficeReportCards
                        heading={reportData?.total_closer ?? '0'}
                        content='Closer'
                        className='col-sm '
                        background='#E1D3FF'
                    />
                    <OfficeReportCards
                        heading={reportData?.total_setter ?? '0'}
                        content='Setters'
                        className='col-sm '
                        background='#E1E9FF'
                    />
                    {/* <OfficeReportCards
                        heading={reportData?.total_junior_setter ?? '0'}
                        content='Junior'
                        className='col-sm '
                        background='#FFE2C7'
                    /> */}
                </div>
                {/* Top cards ends */}

                {/* Chart begins */}
                <div>
                    <EmployeePerformanceChart
                        className='card-xl-stretch mb-5 mb-xl-8'
                        reportData={reportData}
                        head={filter}
                    />
                </div>
                {/* Chart ends */}

                {/* Middle Card Ends */}
                <div className='d-flex flex-wrap justify-content-center mx-auto my-10 gap-10 '>
                    <OfficeReportDataCard
                        line1Heading='Total Accounts:'
                        line1Content={formattedNumberFields(reportData?.total_account, '')}
                        line2Heading='Total Revenue:'
                        line2Content={formattedNumberFields(reportData?.total_revenue, '$')}
                        line3Heading='Total KW:'
                        line3Content={formattedNumberFields(reportData?.total_kw, '')}
                    />
                    <OfficeReportDataCard
                        line1Heading='Best Day:'
                        line1Content={formattedNumberFields(reportData?.best_day?.dayKw, 'KW')}
                        line1SubHeading={getValidDate(reportData?.best_day?.day, 'DD MMMM')}
                        line2Heading='Best Week:'
                        line2Content={formattedNumberFields(reportData?.best_week?.amount, 'KW')}
                        line3Heading='Best Month:'
                        line2SubHeading={bestWeekValue}
                        line3Content={formattedNumberFields(reportData?.best_month?.amount, 'KW')}
                        line3SubHeading={reportData?.best_month?.month}
                    />
                    <OfficeLeaderCard
                        line1Heading='Top Team:'
                        line1Content={reportData?.best_team?.team_name ?? '-'}
                        line2Heading='Top Setter:'
                        line2Content={reportData?.best_setter?.setter_name ?? '-'}
                        line3Heading='Top Closer:'
                        line3Content={reportData?.best_closer?.closer_name ?? '-'}
                        line1SubHeading={(reportData?.best_team?.total_kw ?? '-') + 'KWs'}
                        line2SubHeading={(reportData?.best_setter?.total_kw ?? '-') + 'KWs'}
                        line3SubHeading={(reportData?.best_closer?.total_kw ?? '-') + 'KWs'}
                    />
                </div>
                {/* Middle Card Ends */}

                {/* Table Starts */}
                <div className='m-4 mx-auto my-10 '>
                    <EmployeePerformance
                        EmployeeData={reportData?.employee_performance}
                        loading={tableLoading}
                        onSearchChange={(text) => handleLocationChange(text)}
                        page={page}
                        setPage={setPage}
                        sortingOrder={sortingOrder}
                        sortValue={sortValue}
                        onPress={(item) => {
                            setSortValue(item)
                            setSortingOrder(
                                sortValue !== item ? 'asc' : sortingOrder === 'asc' ? 'desc' : 'asc'
                            )
                            setPage(1)
                        }}
                    />
                </div>
                {/* Table Ends */}
            </div>
        </>
    )
}

export default ReportsOffice

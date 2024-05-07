import React, {useState, useEffect, useCallback} from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import Doughnut from './Doughnut'
import Accounts from './Accounts'
import Contracts from './Contracts'
import Avg from './Avg'
import Corporate from './Corporate'

import Tabel from './Tabel'
import ViewCostomer from './ViewCostomer'
import {
    exportCostDataService,
    getAdminCostGraphService,
    getAdminCostReportService,
} from '../../../../../../services/Services'
import debounce from 'lodash.debounce'

import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import CommanTopbarforReports from '../../../reports/component/company/CommanTopbarforReports'
import useOfficeLocation from '../../../../../../hooks/useOfficeLocation'
import {getValidDate} from '../../../../../../constants/constants'
import {
    downloadAnyFileHelper,
    getErrorMessageFromResponse,
} from '../../../../../../helpers/CommonHelpers'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'

export default function Costs() {
    const [filter, setFilter] = useState('this_year')
    const [graphData, setGraphData] = useState(null)
    const [ReportData, setReportData] = useState(null)
    const [officeList, selectedLocation, setSelectedLocation] = useOfficeLocation()
    const [loading, setLoading] = useState(true)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [page, setPage] = useState(1)
    const [tableLoading, setTableLoading] = useState(false)
    const [corporateLoading, setCorporateLoading] = useState(false)
    const [filterData, setFilterData] = useState(null)

    useEffect(() => {
        const body = {
            filter: filter,
            search: '',
            office_id: selectedLocation,
        }
        if (filter == 'custom' && startDate && endDate) {
            body.start_date = moment(startDate).format('YYYY-MM-DD')
            body.end_date = moment(endDate).format('YYYY-MM-DD')
        }
        if (
            selectedLocation &&
            (filter != 'custom' || (filter == 'custom' && startDate && endDate))
        ) {
            setLoading(true)
            getAdminCostGraphService(body)
                .then((res) => {
                    setGraphData(res.data)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
        //Report
    }, [selectedLocation, filter, startDate, endDate])

    useEffect(() => {
        const body = {
            search: searchTerm,
            filter: filter,
            office_id: selectedLocation,
            page: page,
            ...filterData,
        }
        if (filter == 'custom' && moment(startDate).isValid() && moment(endDate).isValid()) {
            body.start_date = startDate
            body.end_date = endDate
        }
        // if (filter != 'custom' || (filter == 'custom' && startDate && endDate)) {
        if (
            selectedLocation &&
            (filter != 'custom' ||
                (filter == 'custom' &&
                    moment(startDate).isValid() &&
                    moment(endDate).isValid() &&
                    startDate <= endDate))
        ) {
            setLoading(true)
            getReport(body)
        }
    }, [selectedLocation, filter, endDate, startDate, searchTerm, page, filterData])

    const getReport = useCallback((body) => {
        setTableLoading(true)
        setCorporateLoading(true)
        getAdminCostReportService(body)
            .then((res) => {
                setReportData(res.data)
            })
            .finally(() => {
                setLoading(false)
                setTableLoading(false)
                setCorporateLoading(false)
            })
    }, [])
    const handleLocationChange = (e) => {
        delaySaveToDb(e)
    }
    const delaySaveToDb = useCallback(
        debounce((val) => {
            setLoading(true)
            setSearchTerm(val)
        }, 500),
        []
    )

    const changeFilter = (val) => {
        setLoading(val != 'custom')
        if (val != 'custom') {
            if (startDate) setStartDate(null)
            if (endDate) setEndDate(null)
        }
        setFilter(val)
    }
    const onLocationChange = (loc) => {
        setLoading(true)
        setSelectedLocation(loc)
    }
    const changeStartDate = (start) => {
        setStartDate(moment(start).format('YYYY-MM-DD'))
    }
    const changeEndDate = (end) => {
        setEndDate(moment(end).format('YYYY-MM-DD'))
    }

    const handleFilterApply = (filter) => {
        // const body = {
        //     employee_id: filter?.employee,
        //     cost_tracking_id: filter?.cost_Head,
        //     approved_by: filter?.approved_By,
        //     requested_on: getValidDate(filter?.requested_On, 'MM-DD-YYYY'),
        // }
        // getReport(body)
        setPage(1)
        // setSearchText('')
        // setSearchVal('')
        setFilterData(filter)
    }
    const handleResetFilter = () => {
        setPage(1)

        setFilterData(null)
    }
    const onExportCostData = useCallback(() => {
        setLoading(true)
        const body = {
            location: selectedLocation,
            filter: filter,
        }
        exportCostDataService(body)
            .then((res) => {
                const fileName = `Costs Reports - ${moment(new Date()).format(
                    'DD MMM YY hh:mm'
                )}.csv`
                downloadAnyFileHelper(res, fileName)
                CustomToast.success('File Downloaded Successfully')
            })
            .catch((err) => {
                CustomToast.success(getErrorMessageFromResponse(err))
            })
            .finally(() => {
                setLoading(false)
            })
    }, [selectedLocation, filter])
    return (
        <div>
            <CommanTopbarforReports
                filter={filter}
                officeList={officeList}
                onChangeFilter={(loc) => {
                    changeFilter(loc)
                }}
                selectedLocation={selectedLocation}
                onLocationChange={(loc) => onLocationChange(loc)}
                onStartDateChange={(start) => changeStartDate(start)}
                onEndDateChange={(end) => changeEndDate(end)}
                handleExport={onExportCostData}
            />
            <div className='row align-items-center' style={{position: 'relative'}}>
                <CustomLoader full visible={loading} />

                <div className='shadow-sm col-sm mt-10 w-100 bg-white rounded fw-bold'>
                    <label className='p-4 avg' style={{fontSize: '14px'}}>
                        Cost Tracking
                    </label>
                    <div style={{marginTop: -50}} className='d-flex justify-content-center'>
                        <Doughnut doughnutData={graphData?.cost_tracking} />
                    </div>
                    <div className='bord' style={{marginTop: '-5pc'}}></div>
                    <div className='d-flex justify-content-between flex-wrap'>
                        <Accounts accountData={graphData?.cost_tracking} />
                    </div>
                </div>
                <div className='col-sm'>
                    <Contracts contractData={graphData?.contracts} />
                </div>
                <div className='col-sm'>
                    <Avg avgData={graphData} />
                </div>
            </div>
            <Corporate
                ReportData={ReportData}
                onApplyFilter={(filter) => handleFilterApply(filter)}
                loading={corporateLoading}
                onResetFilter={handleResetFilter}
            />
            <Tabel
                onSearchChange={(text) => handleLocationChange(text)}
                tableData={ReportData?.list_data}
                activePage={page}
                onPageChange={(val) => setPage(val)}
                loading={tableLoading}
            />
            <ViewCostomer />
        </div>
    )
}

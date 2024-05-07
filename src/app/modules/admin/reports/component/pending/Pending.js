import {useState, useEffect, useCallback} from 'react'
import debounce from 'lodash.debounce'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import Card from './Card'
import PendingTabel from './PendingTabel'
import {
    exportAdminPendingInstallReportService,
    getAdminPendingInsatllReportService,
} from '../../../../../../services/Services'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import CommanTopbarforReports from '../company/CommanTopbarforReports'
import useOfficeLocation from '../../../../../../hooks/useOfficeLocation'
import {
    downloadAnyFileHelper,
    getErrorMessageFromResponse,
} from '../../../../../../helpers/CommonHelpers'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'

export default function Pending() {
    const [officeList, selectedLocation, setSelectedLocation] = useOfficeLocation()
    const [loading, setLoading] = useState(true)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [filter, setFilter] = useState('this_year')
    const [searchTerm, setSearchTerm] = useState('')
    const [searchVal, setSearchVal] = useState('')
    const [tableLoading, setTableLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [reportData, setReportData] = useState(null)
    const [tablefilter, setTableFilter] = useState(null)
    const [sortValue, setSortValue] = useState(null)
    const [sortingOrder, setSortingOrder] = useState(null)

    useEffect(() => {
        const body = {
            filter: filter,
            search: searchTerm,
            office_id: selectedLocation,
            page: page,
            ...tablefilter,
            sort: sortValue,
            sort_val: sortingOrder,
        }
        if (filter == 'custom' && moment(startDate).isValid() && moment(endDate).isValid()) {
            body.start_date = moment(startDate).format('yyyy-MM-DD')
            body.end_date = moment(endDate).format('yyyy-MM-DD')
        }

        if (
            selectedLocation &&
            (filter != 'custom' ||
                (filter == 'custom' &&
                    moment(startDate).isValid() &&
                    moment(endDate).isValid() &&
                    startDate <= endDate))
        ) {
            setTableLoading(true)
            setLoading(true)
            getAdminPendingInsatllReportService(body)
                .then((res) => {
                    setReportData(res)
                })
                .catch(() => {})
                .finally(() => {
                    setLoading(false)
                    setTableLoading(false)
                })
        }
    }, [selectedLocation, sortValue, sortingOrder, endDate, filter, startDate, searchTerm, tablefilter, page])

    const handleSearchChange = (e) => {
        setSearchVal(e)
        delaySaveToDb(e)
    }
    const delaySaveToDb = useCallback(
        debounce((val) => {
            setTableLoading(true)
            setSearchTerm(val)
            setPage(1)
        }, 500),
        []
    )
    const onPageChange = (selectedPage) => {
        setPage(selectedPage)
    }

    const changeFilter = (val) => {
        setPage(1)
        setLoading(val != 'custom')
        if (val != 'custom') {
            if (startDate) setStartDate(null)
            if (endDate) setEndDate(null)
        }
        setFilter(val)
    }
    const onLocationChange = (loc) => {
        setPage(1)
        setLoading(true)
        setSelectedLocation(loc)
    }
    const changeStartDate = (start) => {
        setStartDate(moment(start).format('YYYY-MM-DD'))
    }
    const changeEndDate = (end) => {
        setEndDate(moment(end).format('YYYY-MM-DD'))
    }

    const onExportPendingData = useCallback(() => {
        setLoading(true)
        const body = {
            office_id: selectedLocation,
            filter: filter,
        }
        exportAdminPendingInstallReportService(body)
            .then((res) => {
                const fileName = `Pending Insatll Report- ${moment(new Date()).format(
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

    const handleFilterApply = (filter) => {
        setPage(1)
        setSearchTerm('')
        setSearchVal('')
        setTableFilter(filter)
    }

    return (
        <div style={{position: 'relative'}}>
            <CustomLoader full visible={loading} />
            <CommanTopbarforReports
                officeList={officeList}
                onChangeFilter={(loc) => {
                    changeFilter(loc)
                }}
                filter={filter}
                selectedLocation={selectedLocation}
                onLocationChange={(loc) => onLocationChange(loc)}
                onStartDateChange={(start) => changeStartDate(start)}
                onEndDateChange={(end) => changeEndDate(end)}
                handleExport={onExportPendingData}
            />
            <Card CardData={reportData?.header} />
            <PendingTabel
                reportData={reportData?.data}
                onSearchChange={(text) => handleSearchChange(text)}
                loading={tableLoading}
                onPageChange={(selectedPage) => onPageChange(selectedPage)}
                activePage={page}
                handleFilterApply={handleFilterApply}
                searchVal={searchVal}
                sortValue={sortValue}
                sortingOrder={sortingOrder}
                onPress={(item) => {
                    setSortValue(item)
                    setSortingOrder(
                        sortValue !== item ? 'asc' : sortingOrder === 'asc' ? 'desc' : 'asc'
                    )
                    setPage(1)
                }}
            />
        </div>
    )
}

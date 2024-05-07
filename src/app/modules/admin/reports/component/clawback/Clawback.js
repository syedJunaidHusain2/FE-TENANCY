import React, {useState, useEffect, useMemo, useCallback} from 'react'
import debounce from 'lodash.debounce'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import Card from './Card'
import CrawbackTabel from './CrawbackTabel'
import {
    exportAdminClawBackReportService,
    getAdminClawBackReportService,
} from '../../../../../../services/Services'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import CommanTopbarforReports from '../company/CommanTopbarforReports'
import useOfficeLocation from '../../../../../../hooks/useOfficeLocation'
import {
    downloadAnyFileHelper,
    getErrorMessageFromResponse,
} from '../../../../../../helpers/CommonHelpers'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'

export default function Clawback() {
    const [clawBack, setClawBackData] = useState()
    const [loading, setLoading] = useState(true)
    const [officeList, selectedLocation, setSelectedLocation] = useOfficeLocation()
    const [filter, setFilter] = useState('this_year')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [tableLoading, setTableLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [sortValue, setSortValue] = useState(null)
    const [sortingOrder, setSortingOrder] = useState(null)

    useEffect(() => {
        const body = {
            filter: filter,
            search: searchTerm,
            office_id: selectedLocation,
            page: page,
            sort: sortValue,
            sort_val: sortingOrder,
        }
        if (filter == 'custom' && moment(startDate).isValid() && moment(endDate).isValid()) {
            body.start_date = moment(startDate).format('MM-DD-YYYY')
            body.end_date = moment(endDate).format('MM-DD-YYYY')
        }

        if (
            selectedLocation &&
            (filter != 'custom' ||
                (filter == 'custom' &&
                    moment(startDate).isValid() &&
                    moment(endDate).isValid() &&
                    startDate <= endDate))
        ) {
            setLoading(true)
            getAdminClawBackReportService(body)
                .then((res) => {
                    setClawBackData(res)
                })
                .catch(() => {})
                .finally(() => {
                    setLoading(false)
                    setTableLoading(false)
                })
        }
    }, [selectedLocation, sortValue, sortingOrder, endDate, filter, startDate, searchTerm, page])

    const handleLocationChange = (e) => {
        delaySaveToDb(e)
    }
    const delaySaveToDb = useCallback(
        debounce((val) => {
            setTableLoading(true)
            setPage(1)
            setSearchTerm(val)
        }, 500),
        []
    )

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
    const onPageChange = (selectedPage) => {
        setPage(selectedPage)
    }

    const onExportClawbackData = useCallback(() => {
        setLoading(true)
        const body = {
            office_id: selectedLocation,
            filter: filter,
        }
        exportAdminClawBackReportService(body)
            .then((res) => {
                const fileName = `Clawback Reports - ${moment(new Date()).format(
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
        <div style={{position: 'relative'}}>
            <CustomLoader full visible={loading} />
            <CommanTopbarforReports
                officeList={officeList}
                onChangeFilter={(loc) => {
                    changeFilter(loc)
                }}
                filter={filter}
                onLocationChange={(loc) => onLocationChange(loc)}
                onStartDateChange={(start) => changeStartDate(start)}
                onEndDateChange={(end) => changeEndDate(end)}
                selectedLocation={selectedLocation}
                handleExport={onExportClawbackData}
            />
            <Card cardData={clawBack} />
            <CrawbackTabel
                clawBackData={clawBack?.data}
                onSearchChange={(text) => handleLocationChange(text)}
                loading={tableLoading}
                onPageChange={(selectedPage) => onPageChange(selectedPage)}
                activePage={page}
                onPress={(item) => {
                    setSortValue(item)
                    setSortingOrder(
                        sortValue !== item ? 'asc' : sortingOrder === 'asc' ? 'desc' : 'asc'
                    )
                    setPage(1)
                }}
                sortingOrder={sortingOrder}
                sortValue={sortValue}
            />
        </div>
    )
}

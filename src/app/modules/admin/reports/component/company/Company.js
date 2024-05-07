import React, {useState, useEffect} from 'react'
import {KTSVG} from '../../../../../../_metronic/helpers'
import clsx from 'clsx'
import Select from '../../Icon/select.png'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import Calendar from '../../Icon/calendar.png'
import Card from './Crad'
import Chart from './Chart'
import CommanTopbarforReports from './CommanTopbarforReports'
import {
    getAdminCompanyReportService,
    getAdminCompanyGraphService,
} from '../../../../../../services/Services'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'

import {ComapanyChart} from './ComapanyChart'
import useOfficeLocation from '../../../../../../hooks/useOfficeLocation'
import {getErrorMessageFromResponse} from '../../../../../../helpers/CommonHelpers'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
export default function Company() {
    const [value, setValue] = useState()
    const [loading, setLoading] = useState(true)
    const [reportData, setReportData] = useState()
    const [graphData, setGraphData] = useState()
    const [officeList, selectedLocation, setSelectedLocation] = useOfficeLocation()
    const [filter, setFilter] = useState('this_year')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    useEffect(() => {
        let body = {
            filter: filter?.toLocaleLowerCase(),
            office_id: selectedLocation,
        }
        if (filter == 'custom' && moment(startDate).isValid() && moment(endDate).isValid()) {
            body.start_date = startDate
            body.end_date = endDate
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
            getAdminCompanyReportService(body).then((res) => {
                setReportData(res.data)
            })

            //Graph
            getAdminCompanyGraphService(body)
                .then((res) => {
                    setGraphData(res.data)
                })
                .catch((e) => {
                    CustomToast.error(getErrorMessageFromResponse(e))
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [selectedLocation, filter, startDate, endDate])

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
    return (
        <div style={{position: 'relative'}}>
            <CustomLoader full visible={loading} />
            <div className='mb-10'>
                <CommanTopbarforReports
                    filter={filter}
                    officeList={officeList}
                    onChangeFilter={(loc) => {
                        changeFilter(loc)
                    }}
                    onLocationChange={(loc) => onLocationChange(loc)}
                    selectedLocation={selectedLocation}
                    onStartDateChange={(start) => changeStartDate(start)}
                    onEndDateChange={(end) => changeEndDate(end)}
                    notToExport={true}
                />
            </div>
            {/* <Chart /> */}
            <ComapanyChart graphData={graphData?.[0]} />
            <Card cardData={reportData} />
        </div>
    )
}

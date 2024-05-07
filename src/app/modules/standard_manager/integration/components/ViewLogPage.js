import React, {useCallback, useEffect, useState} from 'react'
import {fontsFamily} from '../../../../../assets/fonts/fonts'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../customComponents/customInputs/customInput/CustomInput'
import {KTSVG} from '../../../../../_metronic/helpers'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import Pagination from '../../../admin/sequidocs/component/Pagination'
import CustomButton, {BUTTON_TYPE} from '../../../../../customComponents/customButtton/CustomButton'
import {getIntegrationLogsService} from '../../../../../services/Services'
import {getValidDate} from '../../../../../constants/constants'
import CustomLoader from '../../../../../customComponents/customLoader/CustomLoader'
import {debounce} from 'lodash'
import CustomDatePicker from '../../../../../customComponents/customInputs/customDatePicker/CustomDatePicker'
import CustomLink from '../../../../../customComponents/customButtton/CustomLink'

const ViewLogPage = () => {
    const naviagte = useNavigate()
    const [logsData, setLogsData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [selectedDate, setSelectedDate] = useState(null)
    const [activePage, setActivePage] = useState(1)

    const location = useLocation()

    useEffect(() => {
        const date = getValidDate(selectedDate, 'YYYY-MM-DD') ?? null
        const body = {
            date: date,
            crm_id: location?.state?.id,
            page: activePage,
        }
        getIntegrationLogsService(body)
            .then((res) => setLogsData(res?.data))
            .finally(() => setLoading(false))
    }, [selectedDate, activePage])

    const handleDateFilterChange = (e) => {
        setLoading(true)
        setSelectedDate(e.target.value)
    }
    const onChangePage = (val) => {
        setActivePage(val)
    }

    return (
        <div
            className=''
            style={{fontSize: 14, fontFamily: fontsFamily.manrope, position: 'relative'}}
        >
            <CustomLoader full visible={loading} />

            <div
                className='bg-cmwhite shadow-sm d-flex align-itmes-center justify-content-between py-2 ps-5 pe-2 mb-10'
                style={{borderRadius: 10}}
            >
                <div className='d-flex flex-center gap-2'>
                    <KTSVG
                        svgStyle={{width: '24px', height: '24px'}}
                        path='/media/icons/duotune/art/back-square.svg'
                        className='cursor-pointer'
                        onClick={() => naviagte(-1)}
                    />
                    <div className='text-cmGrey900' style={{fontWeight: 600}}>
                        {location?.state?.name} | View log
                    </div>
                </div>
                <div>
                    <CustomDatePicker value={selectedDate} onChange={handleDateFilterChange} />
                    {/* <CustomInput
                        type={INPUT_TYPE.search}
                        placeholder='Search by  date'
                        onChange={handleLocationChange}
                        value={searchText}
                    /> */}
                </div>
            </div>
            {/* Table starts */}
            <div className='table-responsive shadow-sm overflow-auto' style={{borderRadius: 10}}>
                <table className='table' style={{borderRadius: 10}}>
                    <thead>
                        <tr
                            className='bg-cmGrey300 text-cmGrey900'
                            style={{
                                fontSize: '12px',
                                fontWeight: '800',
                                fontFamily: fontsFamily.manrope,
                            }}
                        >
                            <th></th>
                            <th className='p-5 text-nowrap'>Date & Time</th>
                            <th className='p-5 text-nowrap text-center'>Total Records</th>
                            <th className='p-5 text-nowrap text-center'>New Records</th>
                            <th className='p-5 text-nowrap text-center'>Updated Records</th>
                            <th className='p-5 text-nowrap text-center'>Contacts Pushed</th>
                            <th className='p-5 text-nowrap text-center'>Errors</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {logsData?.data?.length > 0 ? (
                            <>
                                {logsData?.data?.map((item, i) => (
                                    <tr
                                        key={item.id}
                                        className='text-cmGrey700 stripRow '
                                        style={{
                                            fontSize: '14px',
                                            fontWeight: 600,
                                        }}
                                    >
                                        <td></td>
                                        <td className='p-5'>
                                            {' '}
                                            {getValidDate(item?.week_date, 'MM/DD/YYYY hh:mm a')}
                                        </td>
                                        <td className='p-5 text-nowrap text-center'>
                                            {item?.no_of_records ?? '-'}
                                        </td>
                                        <td className='p-5 text-nowrap text-center'>
                                            {item?.new_records ?? '-'}
                                        </td>
                                        <td className='p-5 text-nowrap text-center'>
                                            {item?.updated_records ?? '-'}
                                        </td>
                                        <td className={`p-5 text-nowrap text-center`}>
                                            {item?.contact_pushed ?? '-'}
                                        </td>
                                        <td className='p-5 text-center text-cmError'>
                                            {item?.errors ?? '-'}
                                        </td>
                                        <td className='p-5 text-nowrap text-center '>
                                            {item?.log_file_name ? (
                                                <a
                                                    href={item?.log_file_name}
                                                    rel='noreferrer'
                                                    target='_blank'
                                                >
                                                    <CustomLink label={'Raw Log'} />
                                                </a>
                                            ) : (
                                                'No Raw File'
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </>
                        ) : (
                            <tr key='no-data'>
                                <td
                                    colSpan={8}
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
                {
                    <Pagination
                        page={activePage}
                        totalPages={logsData?.last_page}
                        setPage={onChangePage}
                    />
                }
            </div>
        </div>
    )
}

export default ViewLogPage

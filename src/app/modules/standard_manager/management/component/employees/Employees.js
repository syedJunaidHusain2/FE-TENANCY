import React, {useEffect, useState, useCallback} from 'react'
import EmployeesTable from './EmployeesTable'
import {
    exportEmployeeDataService,
    getEmployeeListService,
} from '../../../../../../services/Services'
import {useDispatch} from 'react-redux'
import {getUsedStateAction} from '../../../../../../redux/actions/SettingActions'
import debounce from 'lodash.debounce'
import useOfficeLocation from '../../../../../../hooks/useOfficeLocation'
import CustomDropdown from '../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomButton, {
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'
import moment from 'moment'
import {
    downloadAnyFileHelper,
    getErrorMessageFromResponse,
} from '../../../../../../helpers/CommonHelpers'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'

export default function Employees() {
    const dispatch = useDispatch()
    const [officeList, selectedLocation, setSelectedLocation] = useOfficeLocation('')
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(null)
    const [searchText, setSearchText] = useState(null)
    const [searchTextValue, setSearchTextValue] = useState('')
    const [employeeData, setEmployeeData] = useState([])
    const [positionData, setPositionData] = useState(null)

    useEffect(() => {
        dispatch(getUsedStateAction())
    }, [])

    const onChangeLocation = (e) => {
        setPage(1)
        setSearchText('')
        setSearchTextValue('')
        const value = e?.target?.value || ''
        setSelectedLocation(value)
    }

    useEffect(() => {
        getEmployeeData(page)
    }, [page, searchText, selectedLocation])

    useEffect(() => {
        if (page != 1) {
            setPage(1)
        } else {
            getEmployeeData(1)
        }
    }, [searchText])

    const getEmployeeData = useCallback(
        (pgNo) => {
            if (selectedLocation) {
                setLoading(true)
                getEmployeeListService(
                    {filter: searchText, office_id: selectedLocation},
                    {page: pgNo}
                )
                    .then((res) => {
                        setPositionData(res?.position)
                        setTotalPages(res?.data?.last_page)
                        setEmployeeData(res?.data?.data)
                    })
                    .catch(() => {
                        setPositionData(null)
                        setEmployeeData([])
                    })
                    .finally(() => {
                        setLoading(false)
                    })
            }
        },
        [searchText, selectedLocation]
    )

    const onSearch = (e) => {
        setSearchTextValue(e.target.value)
        delaySaveToDb(e.target.value)
    }

    const delaySaveToDb = useCallback(
        debounce((val) => {
            setSearchText(val)
        }, 500),
        []
    )
    const onExportEmployeeData = useCallback(() => {
        setLoading(true)
        const body = {
            office_id: selectedLocation,
            filter: searchText,
        }
        exportEmployeeDataService(body)
            .then((res) => {
                const fileName = `Employee Reports - ${moment(new Date()).format(
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
    }, [searchText, selectedLocation])
    return (
        <div
            style={{
                boxShadow:
                    'rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
            }}
        >
            <div
                className='bg-cmwhite card'
                style={{
                    borderRadius: '0 10px 10px 10px',
                }}
            >
                <div
                    className='h-auto bg-cmwhite'
                    style={{
                        fontSize: '14px',
                        fontFamily: 'Manrope',
                        borderRadius: '0 10px 10px 10px',
                    }}
                >
                    <div className='w-100  px-6 pt-6 d-flex flex-wrap justify-content-between'>
                        <div
                            className=' mb-2 d-flex gap-2 flex-row mt-2 ms-1 align-items-center'
                            id='kt_chat_contacts_header'
                        >
                            <label
                                style={{
                                    fontFamily: 'Manrope',
                                    fontWeight: '700',
                                    fontSize: '17px',
                                }}
                                className='text-cmGrey900'
                            >
                                Office:
                            </label>
                            <CustomDropdown
                                onChange={onChangeLocation}
                                options={officeList}
                                value={selectedLocation || ''}
                                showClear={false}
                            />
                        </div>
                        <div
                            // className='w-md-250px mb-1'
                            id='kt_chat_contacts_header'
                        >
                            <div className='position-relative d-flex gap-5' autoComplete='off'>
                                {/* Employee Table Search Input */}
                                <CustomInput
                                    type={INPUT_TYPE.search}
                                    name='search'
                                    onChange={onSearch}
                                    value={searchTextValue}
                                />
                                <div>
                                    <CustomButton
                                        buttonType={BUTTON_TYPE.disabled}
                                        buttonLabel='Export'
                                        onClick={onExportEmployeeData}
                                        padding={'py-3'}
                                        icon={'pi pi-file-export'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-50 mx-auto my-5'>
                        <div className='d-flex flex-wrap justify-content-between align-items-center'>
                            <div className='d-flex gap-3 align-items-center'>
                                <div className='text-cmGrey800' style={{fontWeight: 700}}>
                                    Setters :
                                </div>
                                <div
                                    className='text-cmBlue-Crayola'
                                    style={{fontWeight: 700, fontSize: '16px'}}
                                >
                                    {positionData?.Setter}
                                </div>
                            </div>
                            <div className='d-flex gap-3 align-items-center'>
                                <div className='text-cmGrey800' style={{fontWeight: 700}}>
                                    Closers :
                                </div>
                                <div
                                    className='text-cmBlue-Crayola'
                                    style={{fontWeight: 700, fontSize: '16px'}}
                                >
                                    {positionData?.Closer}
                                </div>
                            </div>

                            <div className='d-flex gap-3 align-items-center'>
                                <div className='text-cmGrey800' style={{fontWeight: 700}}>
                                    Managers :
                                </div>
                                <div
                                    className='text-cmBlue-Crayola'
                                    style={{fontWeight: 700, fontSize: '16px'}}
                                >
                                    {positionData?.Manager}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=''>
                <EmployeesTable
                    employeeData={employeeData}
                    loading={loading}
                    totalPages={totalPages}
                    page={page}
                    setPage={setPage}
                />
            </div>
        </div>
    )
}

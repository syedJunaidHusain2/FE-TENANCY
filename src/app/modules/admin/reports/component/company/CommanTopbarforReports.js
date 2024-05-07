import React, {useState} from 'react'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import {REPORTS_DURATION_DROPDOWN_LIST} from '../../../../../../constants/constants'
import CustomDatePicker from '../../../../../../customComponents/customInputs/customDatePicker/CustomDatePicker'
import CustomDropdown from '../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import {useLocation} from 'react-router-dom'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'

const CommanTopbarforReports = ({
    params,
    filter,
    officeList,
    selectedLocation,
    onChangeFilter,
    onLocationChange,
    onStartDateChange,
    onEndDateChange,
    handleExport,
    notToExport,
}) => {
    const [custom, setCustom] = useState(1)
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [maxDate, setMaxDate] = useState(new Date())

    const filterChange = (e) => {
        setCustom(e.target.value)
        onChangeFilter(e.target.value)
    }
    const locationChange = (e) => {
        onLocationChange(e.target.value)
    }
    const startDateChnage = (e) => {
        if (moment(e).format('yyyy-MM-DD') > moment(endDate).format('yyyy-MM-DD')) {
            setEndDate(null)
        }

        setStartDate(e)
        onStartDateChange(moment(e).format('yyyy-MM-DD'))
    }
    const endDateChnage = (e) => {
        setEndDate(e)
        onEndDateChange(moment(e).format('yyyy-MM-DD'))
    }

    return (
        <div
            className='bg-cmwhite card'
            style={{
                borderRadius: '0px 10px 10px 10px',
                boxShadow:
                    'rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
            }}
        >
            <div className=''>
                <div
                    className='bg-cmwhite '
                    style={{
                        fontSize: '14px',
                        fontFamily: 'Manrope',
                        borderRadius: '0px 10px 10px 10px',
                    }}
                >
                    <div className='ms-4 me-5 py-5 d-sm-flex flex-wrap align-items-center justify-content-between '>
                        <div className='d-flex flex-wrap align-items-center gap-sm-10 '>
                            <div className=' mb-2 mt- d-flex flex-row gap-5 align-items-center mt-2'>
                                <label
                                    style={{
                                        fontFamily: 'Manrope',
                                        fontWeight: 'bold',
                                        fontSize: '15px',
                                    }}
                                    className='text-cmGrey900'
                                >
                                    Location:
                                </label>

                                <CustomDropdown
                                    showClear={false}
                                    value={selectedLocation}
                                    onChange={locationChange}
                                    options={officeList}
                                />
                            </div>
                            <div
                                className='w-sm-175px mx-auto'
                                style={{
                                    fontFamily: 'Manrope',
                                }}
                            >
                                <CustomDropdown
                                    searching={false}
                                    placeholder='Select range'
                                    value={filter}
                                    onChange={filterChange}
                                    showClear={false}
                                    options={REPORTS_DURATION_DROPDOWN_LIST}
                                />
                            </div>
                        </div>
                        {custom == 'custom' && (
                            <div className='d-flex align-items-center flex-row flex-wrap'>
                                <div
                                    style={{background: '#F5F5F5', borderRadius: '6px'}}
                                    className='form-group d-flex flex-row'
                                >
                                    <CustomDatePicker
                                        placeholderText={'Start Date'}
                                        name='startDate'
                                        // value={startDate}
                                        onChange={(event) => startDateChnage(event.target.value)}
                                        maxDate={maxDate}
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
                                        // value={endDate}
                                        onChange={(event) => endDateChnage(event?.target?.value)}
                                        maxDate={maxDate}
                                        minDate={startDate}
                                    />
                                </div>
                            </div>
                        )}
                        {!notToExport ? (
                            <div>
                                <CustomButton
                                    buttonType={BUTTON_TYPE.disabled}
                                    buttonLabel='Export'
                                    onClick={handleExport}
                                    padding={'py-3'}
                                    icon={'pi pi-file-export'}
                                />
                            </div>
                        ) : (
                            <></>
                        )}
                        {/* <div className=' me-sm-8 text-center mt-sm-0 mt-5'>
              <a
                href=''
                className={'btn btn-sm btn-flex fw-bold bg-cmGrey100 text-cmGrey600'}
                data-kt-menu-trigger='click'
                data-kt-menu-placement='bottom-end'
                style={{
                  fontSize: '14px',
                  fontFamily: 'Manrope',
                  width: '99px',
                }}
              >
                <KTSVG
                  path='/media/icons/duotune/general/gen031.svg'
                  className='me-3 svg-icon-6 svg-icon-muted me-1'
                />
                Export
              </a>
            </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommanTopbarforReports

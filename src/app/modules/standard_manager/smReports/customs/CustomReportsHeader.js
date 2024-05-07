import moment from 'moment'
import React, {useState} from 'react'
import {REPORTS_DURATION_DROPDOWN_LIST} from '../../../../../constants/constants'
import CustomDatePicker from '../../../../../customComponents/customInputs/customDatePicker/CustomDatePicker'
import {KTSVG} from '../../../../../_metronic/helpers'
import CustomAutoCompleteDropdown from '../../../../../customComponents/customInputs/customAutoCompleteDropdown/CustomAutoCompleteDropdown'
import CustomDropdown from '../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomButton, {BUTTON_TYPE} from '../../../../../customComponents/customButtton/CustomButton'

const CustomReportsHeader = ({
    stateList,
    selectedLocation,
    onChangeDate,
    onLocationChange,
    onStartDateChange,
    onEndDateChange,
    userByOfficeData,
    setRepId,
    repId,
    handleExport,
    isExport,
}) => {
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [custom, setCustom] = useState('this_year')

    const DateChange = (e) => {
        setCustom(e.target.value)
        onChangeDate(e.target.value)
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
        <div className='card'>
            <div
                className='w-100 d-flex flex-wrap gap-sm-0 gap-3 mx-sm-0 mx-auto justify-content-between align-items-center bg-white py-5 px-5'
                style={{
                    borderRadius: '0px 10px 10px 10px',
                    boxShadow:
                        'rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
                }}
            >
                {/* Hiring Progress*/}
                <div className='d-flex align-items-center gap-5'>
                    <div
                        className='text-center text-cmGrey800 mx-sm-0 mx-auto'
                        style={{
                            fontFamily: 'Manrope',
                            fontWeight: '600',
                            fontSize: '17px',
                        }}
                    >
                        Location
                    </div>

                    <div>
                        <CustomDropdown
                            options={stateList}
                            value={selectedLocation}
                            onChange={locationChange}
                            showClear={false}
                        />
                    </div>
                </div>

                {/* Search tab */}
                <div
                    style={{borderRadius: '20px'}}
                    className='w-sm-250px w-75 mx-sm-0 mx-auto mb-1 me-sm-12'
                    id='kt_chat_contacts_header'
                >
                    <form
                        className='position-relative'
                        style={{borderRadius: '10px'}}
                        autoComplete='off'
                    >
                        <KTSVG
                            path='/media/icons/duotune/general/gen021.svg'
                            className='svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 ms-3 translate-middle-y'
                        />
                        <CustomDropdown
                            options={userByOfficeData}
                            valueKey='id'
                            placeholder='All Reps'
                            displayKey='name'
                            dropdownIcon={'bi bi-search'}
                            value={repId}
                            onChange={(e) => setRepId(e.target.value)}
                        />
                    </form>
                </div>

                {/* DropDown */}
                <div className='mx-sm-0 mx-auto'>
                    <CustomDropdown
                        options={REPORTS_DURATION_DROPDOWN_LIST}
                        onChange={DateChange}
                        value={custom}
                        searching={false}
                        showClear={false}
                    />
                    {/* <select
                    className='form-select form-select-solid border-0 bg-cmGrey100 text-cmGrey800 cursor-pointer'
                    onChange={DateChange}
                    style={{fontWeight: 600, fontFamily: 'Manrope'}}
                >
                    {REPORTS_DURATION_DROPDOWN_LIST?.map((item) => (
                        <option style={{fontWeight: 600}} value={item?.value} key={item?.value}>
                            {item?.name}
                        </option>
                    ))}
                </select> */}
                </div>
                {/* search date */}
                {custom == 'custom' && (
                    <div className='d-sm-flex flex-wrap align-items-center my-sm-0 my-5 text-center'>
                        <div
                            style={{
                                // overflow: 'hidden',
                                // borderRadius: '6px',
                                width: '135px',
                            }}
                            className='form-group fw-bold d-flex flex-row mx-auto bg-cmGrey100'
                        >
                            {/* <label className='mt-3'>
              <i className='bi bi-calendar-week fs-4 me-3 pt-2 mt-4 ms-3'></i>
            </label>
            <DatePicker
              className='border-0 bg2 text-cmGrey800 fw-bold'
              placeholderText={'Start Date'}
              onChange={(event) => startDateChnage(event)}
              name='startDate'
              dateFormat='YYYY-MM-DD'
              clearIcon={false}
              calendarIcon={false}
              value={startDate}
            /> */}
                            <CustomDatePicker
                                name='startDate'
                                placeholderField='Start date'
                                value={startDate}
                                onChange={(event) => startDateChnage(event.target.value)}
                                maxDate={new Date()}
                            />
                        </div>
                        <label className=' ms-6 me-6 text-cmGrey600' style={{fontWeight: '500'}}>
                            to
                        </label>
                        <div
                            style={{
                                // overflow: 'hidden',
                                // borderRadius: '6px',
                                width: '135px',
                            }}
                            className='form-group bg-cmGrey100 d-flex flex-row mx-auto'
                        >
                            {/* <label className='mt-3'>
              <i className='bi bi-calendar-week fs-4 me-3 pt-2 mt-4 ms-3'></i>
            </label>
            <DatePicker
              className='border-0 bg2 fw-bold'
              placeholderText={'End Date'}
              onChange={(event) => endDateChnage(event)}
              name='startDate'
              dateFormat='YYYY-MM-DD'
              clearIcon={false}
              calendarIcon={false}
              value={endDate}
            /> */}
                            <CustomDatePicker
                                name='startDate'
                                value={endDate}
                                onChange={(event) => endDateChnage(event.target.value)}
                                maxDate={new Date()}
                                minDate={startDate}
                            />
                        </div>
                    </div>
                )}
                {isExport ? (
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

                {/* Export */}
                {/* <div className='text-center'>
        <a
          href='/'
          className={clsx('btn btn-sm btn-flex fw-bold text-cmGrey600 bg-cmGrey100')}
          data-kt-menu-trigger='click'
          data-kt-menu-placement='bottom-end'
          style={{
            fontSize: '14px',
            fontFamily: 'Manrope',
            width: '99px',
            height: '43px',
            fontWeight: '600',
          }}
        >
          <KTSVG
            path='/media/icons/duotune/general/gen031.svg'
            className='me-3 svg-icon-6 svg-icon-muted me-1'
          />
          Export
        </a>
        <a className='me-0'>
          <button
            style={{
              fontSize: '14px',
              fontStyle: '600',
            }}
            className='btn btn-sm btn-icon mt-2 btn-bg-white btn-active-color-primary'
          >
            <i
              style={{marginTop: '-6px'}}
              className='bi ms-4 bi-three-dots-vertical text-cmGrey800 fs-3'
            ></i>
          </button>
        </a>
      </div> */}
            </div>
        </div>
    )
}

export default CustomReportsHeader

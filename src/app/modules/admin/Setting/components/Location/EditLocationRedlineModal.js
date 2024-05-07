import React, {useCallback, useEffect, useMemo, useState} from 'react'
import CustomModal from '../../../../../../customComponents/customModal/CustomModal'
import {fontsFamily} from '../../../../../../assets/fonts/fonts'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'
import _ from 'lodash'
import {TabView, TabPanel} from 'primereact/tabview'
import moment from 'moment'
import CustomDatePicker from '../../../../../../customComponents/customInputs/customDatePicker/CustomDatePicker'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../customComponents/customInputs/customInput/CustomInput'
import {
    formattedNumberFields,
    getLocationRedlineHelper,
} from '../../../../../../helpers/CommonHelpers'
import {getValidDate} from '../../../../../../constants/constants'
import ViewLocationRedlineChanges from './ViewLocationRedlineChanges'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import CustomLink from '../../../../../../customComponents/customButtton/CustomLink'
import CustomDelete from '../../../../../../customComponents/customIcons/CustomDelete'

const EditLocationRedlineModal = ({
    onSavePress,
    redline_data = [],
    locationData,
    show,
    handleClose,
}) => {
    const [redlineData, setRedlineData] = useState(redline_data ?? [])
    const [toggleView, setToggleView] = useState(false)

    const closeToggle = () => {
        setToggleView(false)
    }

    useEffect(() => {
        const data = redline_data?.map((item) => ({
            ...item,
            edit: false,
        }))
        setRedlineData(data)
    }, [redline_data])

    const onEditPress = useCallback(
        (index) => {
            const data = [...redlineData]
            data[index].edit = true
            setRedlineData(data)
        },
        [redlineData]
    )

    const onEditSavePress = useCallback(
        (index) => {
            const data = [...redlineData]

            if (
                data?.[index]?.redline_max &&
                Number(data?.[index]?.redline_max) < Number(data?.[index]?.redline_standard)
            )
                return CustomToast.error('Max redline should be greater than standard redline')
            if (
                data?.[index]?.redline_min &&
                Number(data?.[index]?.redline_min) > Number(data?.[index]?.redline_standard)
            )
                return CustomToast.error('Min redline should be less than standard redline')
            data[index].edit = false
            setRedlineData(data)
        },
        [redlineData]
    )

    const onDeletePress = useCallback(
        (index) => {
            const data = redlineData?.filter((item, ind) => ind != index)
            setRedlineData(data)
        },
        [redlineData]
    )

    const handleSave = useCallback(() => {
        const isFilledData = redlineData.map((item) =>
            item?.redline_standard && item?.effective_date ? true : false
        )
        const isValidData = redlineData.map((item) => item?.edit)
        if (isValidData.includes(true)) {
            return CustomToast.error('Please save redline data')
        }
        if (isFilledData.includes(false)) {
            return CustomToast.error('Please fill empty data')
        }
        onSavePress(redlineData)
    }, [onSavePress, redlineData])

    const updadteRedline = useCallback(() => {}, [])

    const currentRedline = useMemo(() => {
        const data = getLocationRedlineHelper(locationData)?.current
        return data
    }, [locationData])
    return (
        <CustomModal
            show={show}
            onHide={handleClose}
            title={`Edit Location Redline - ${locationData?.state} | ${locationData?.general_code} `}
            maxWidth='1000'
        >
            <div
                style={{
                    fontSize: 14,
                    fontFamily: fontsFamily.manrope,
                }}
                className='px-sm-15 px-5 mx-auto'
            >
                <div
                    style={{
                        fontWeight: 600,
                    }}
                >
                    <div className='d-flex justify-content-between align-items-center mb-5'>
                        <div className='d-flex align-items-center gap-3'>
                            <div className='text-cmGrey900'>Current Redline</div>
                            <div className='text-cmGrey700'>
                                since{' '}
                                {currentRedline?.effective_date
                                    ? getValidDate(currentRedline?.effective_date)
                                    : ' -'}
                            </div>

                            <CustomLink label={'Audit log'} onClick={() => setToggleView(true)} />
                        </div>
                    </div>
                    {/* min max standard */}
                    <div className='row align-items-center text-center'>
                        <div className='col-sm d-flex flex-center gap-3  '>
                            <div className='text-cmGrey600'>Min</div>
                            <div className='text-cmGrey800' style={{fontSize: 16}}>
                                {currentRedline?.redline_min
                                    ? formattedNumberFields(currentRedline?.redline_min)
                                    : '-'}
                            </div>
                        </div>

                        <div className='col-sm d-flex flex-center gap-3'>
                            <div className='text-cmGrey600 required'>Standard</div>
                            <div className='text-cmGrey800' style={{fontSize: 16}}>
                                {currentRedline?.redline_standard
                                    ? formattedNumberFields(currentRedline?.redline_standard)
                                    : '-'}
                            </div>
                        </div>

                        <div className='col-sm d-flex flex-center gap-3'>
                            <div className='text-cmGrey600'>Max</div>
                            <div className='text-cmGrey800' style={{fontSize: 16}}>
                                {currentRedline?.redline_max
                                    ? formattedNumberFields(currentRedline?.redline_max)
                                    : '-'}
                            </div>
                        </div>
                    </div>
                    <hr />
                </div>

                <div
                    className='d-flex justify-content-between align-items-center mb-5'
                    style={{
                        fontWeight: 600,
                    }}
                >
                    <div className='text-cmGrey900'>Other Redlines</div>
                </div>
                {/* Header ends */}
                <div>
                    <TabView>
                        <TabPanel header='Past'>
                            <CommonRedlineTable
                                type='past'
                                redlineData={redlineData}
                                setRedlineData={setRedlineData}
                                onEditPress={onEditPress}
                                onDeletePress={onDeletePress}
                                onEditSavePress={onEditSavePress}
                            />
                        </TabPanel>
                        <TabPanel header='Upcoming'>
                            <CommonRedlineTable
                                type='upcoming'
                                redlineData={redlineData}
                                updateRedline={updadteRedline}
                                onEditPress={onEditPress}
                                onDeletePress={onDeletePress}
                                onEditSavePress={onEditSavePress}
                                setRedlineData={setRedlineData}
                            />
                        </TabPanel>
                    </TabView>
                </div>
                <div className='d-flex flex-center gap-10 w-75 mx-auto'>
                    <div className=''>
                        <CustomButton
                            buttonType={BUTTON_TYPE.error}
                            buttonLabel='Cancel'
                            onClick={handleClose}
                            buttonSize={BUTTON_SIZE.normal}
                        />
                    </div>
                    <div className=''>
                        <CustomButton
                            buttonType={BUTTON_TYPE.primary}
                            buttonLabel='Save'
                            onClick={handleSave}
                            buttonSize={BUTTON_SIZE.normal}
                        />
                    </div>
                </div>
            </div>
            {toggleView ? (
                <ViewLocationRedlineChanges
                    toggleView={toggleView}
                    closeToggle={closeToggle}
                    locationData={locationData}
                />
            ) : null}
        </CustomModal>
    )
}

export default EditLocationRedlineModal

const CommonRedlineTable = ({
    onEditPress,
    onDeletePress,
    onEditSavePress,
    type = 'past',
    redlineData = [],
    setRedlineData = null,
}) => {
    const changeRedline = (index, key, value) => {
        const data = _.cloneDeep(redlineData)
        data[index][key] = value
        setRedlineData(data)
    }
    return (
        <div className='table-responsive table-bordered'>
            <table className='table'>
                <thead>
                    <tr
                        className='text-cmGrey500 text-cmGrey800 border-cmGrey400'
                        style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            fontFamily: fontsFamily.manrope,
                        }}
                    >
                        <th className='text-nowrap p-3 required'>Effective date</th>
                        <th className='text-nowrap p-3 '>Min</th>
                        <th className='text-nowrap p-3 required'>Standard</th>
                        <th className='text-nowrap p-3 '>Max</th>
                        <th className='text-nowrap p-3 '></th>
                    </tr>
                </thead>
                <tbody>
                    {redlineData?.map((item, index) => {
                        let show = false
                        if (type == 'past') {
                            show =
                                (item?.new && item?.type == 'past') ||
                                new Date(
                                    moment(item?.effective_date, 'YYYYY-MM-DD').format(
                                        'YYYY-MM-DD 00:00:00'
                                    )
                                ) < new Date(moment().format('YYYY-MM-DD 00:00:00'))
                        } else {
                            show =
                                (item?.new && item?.type == 'upcoming') ||
                                new Date(
                                    moment(item?.effective_date, 'YYYYY-MM-DD').format(
                                        'YYYY-MM-DD 00:00:00'
                                    )
                                ) >= new Date(moment().format('YYYY-MM-DD 00:00:00'))
                        }
                        return (
                            <>
                                {show && (
                                    <>
                                        {item?.edit ? (
                                            <tr
                                                className='text-cmGrey800 stripRow'
                                                style={{
                                                    fontSize: '14px',
                                                    fontFamily: fontsFamily.manrope,
                                                    fontWeight: 600,
                                                }}
                                            >
                                                <td className='p-3 text-nowrap text-center'>
                                                    {(item?.new &&
                                                        item?.type == 'past' &&
                                                        item?.edit) ||
                                                    (item?.edit && item?.type == 'upcoming') ? (
                                                        <div className='w-150px'>
                                                            <CustomDatePicker
                                                                minDate={
                                                                    type == 'upcoming'
                                                                        ? new Date()
                                                                        : null
                                                                }
                                                                maxDate={
                                                                    type == 'past'
                                                                        ? new Date(
                                                                              new Date().setDate(
                                                                                  new Date().getDate() -
                                                                                      1
                                                                              )
                                                                          )
                                                                        : null
                                                                }
                                                                value={
                                                                    item?.effective_date
                                                                        ? new Date(
                                                                              item?.effective_date
                                                                          )
                                                                        : null
                                                                }
                                                                onChange={(e) => {
                                                                    changeRedline(
                                                                        index,
                                                                        'effective_date',
                                                                        getValidDate(
                                                                            e?.target?.value,
                                                                            'YYYY-MM-DD'
                                                                        )
                                                                    )
                                                                }}
                                                            />
                                                        </div>
                                                    ) : (
                                                        // getValidDate(item?.effective_date)
                                                        <div className='w-150px'>
                                                            <CustomDatePicker
                                                                minDate={
                                                                    type == 'upcoming'
                                                                        ? new Date()
                                                                        : null
                                                                }
                                                                value={
                                                                    item?.effective_date
                                                                        ? new Date(
                                                                              item?.effective_date
                                                                          )
                                                                        : null
                                                                }
                                                                onChange={(e) => {
                                                                    changeRedline(
                                                                        index,
                                                                        'effective_date',
                                                                        getValidDate(
                                                                            e?.target?.value,
                                                                            'YYYY-MM-DD'
                                                                        )
                                                                    )
                                                                }}
                                                            />
                                                        </div>
                                                    )}
                                                </td>
                                                <td className='p-3 text-nowrap'>
                                                    <div className='w-150px'>
                                                        <CustomInput
                                                            type={INPUT_TYPE.currency}
                                                            // placeholder={formattedNumberFields()}
                                                            value={item?.redline_min}
                                                            onChange={(e) =>
                                                                changeRedline(
                                                                    index,
                                                                    'redline_min',
                                                                    e?.target?.value
                                                                )
                                                            }
                                                            prefixText='$'
                                                        />
                                                    </div>
                                                </td>
                                                <td className='p-3 text-nowrap'>
                                                    <div className='w-150px'>
                                                        <CustomInput
                                                            type={INPUT_TYPE.currency}
                                                            // placeholder={formattedNumberFields()}
                                                            prefixText='$'
                                                            value={item?.redline_standard}
                                                            onChange={(e) =>
                                                                changeRedline(
                                                                    index,
                                                                    'redline_standard',
                                                                    e?.target?.value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </td>
                                                <td className='p-3 '>
                                                    <div className='w-150px'>
                                                        <CustomInput
                                                            type={INPUT_TYPE.currency}
                                                            // placeholder={formattedNumberFields()}
                                                            prefixText='$'
                                                            value={item?.redline_max}
                                                            onChange={(e) =>
                                                                changeRedline(
                                                                    index,
                                                                    'redline_max',
                                                                    e?.target?.value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </td>
                                                <td className='p-3 text-nowrap'>
                                                    <i
                                                        class='fa-solid fa-square-check text-cmBlue-Crayola cursor-pointer'
                                                        style={{fontSize: '35px'}}
                                                        onClick={() => onEditSavePress(index)}
                                                    ></i>
                                                </td>
                                                {type == 'upcoming' || item?.new ? (
                                                    <td className='p-3 text-nowrap'>
                                                        <CustomDelete
                                                            onClick={() => onDeletePress(index)}
                                                        />
                                                    </td>
                                                ) : (
                                                    <td></td>
                                                )}
                                            </tr>
                                        ) : (
                                            <tr
                                                className='text-cmGrey800 stripRow'
                                                style={{
                                                    fontSize: '14px',
                                                    fontFamily: fontsFamily.manrope,
                                                    fontWeight: 600,
                                                    lineHeight: '20px',
                                                }}
                                            >
                                                <td className='p-3 text-nowrap'>
                                                    {getValidDate(item?.effective_date)}
                                                </td>
                                                <td className='p-3 text-nowrap'>
                                                    {item?.redline_min}
                                                </td>
                                                <td className='p-3 text-nowrap text-cmGrey700'>
                                                    {item?.redline_standard}
                                                </td>
                                                <td className='p-3 text-nowrap'>
                                                    {item?.redline_max}
                                                </td>
                                                <td className='p-3 text-nowrap d-flex gap-5 align-items-center '>
                                                    <div
                                                        className='bi bi-pencil fs-5 cursor-pointer'
                                                        onClick={() => onEditPress(index)}
                                                    />
                                                    {type == 'upcoming' || item?.new ? (
                                                        <div
                                                            className='bi bi-trash fs-3 cursor-pointer'
                                                            onClick={() => onDeletePress(index)}
                                                        />
                                                    ) : null}
                                                </td>
                                            </tr>
                                        )}
                                    </>
                                )}
                            </>
                        )
                    })}
                    {/* <>
                        <tr>
                            <td className='text-cmGrey600 fw-bold text-center py-5' colSpan={5}>
                                No data found
                            </td>
                        </tr>
                    </> */}
                    <tr colSpan={5} className=''>
                        <div style={{padding: 5}} className=''>
                            <CustomLink
                                label={'Add Redline'}
                                icon={'bi bi-plus-square'}
                                onClick={() => {
                                    const data = _.cloneDeep(redlineData)
                                    data.push({
                                        type,
                                        new: true,
                                        edit: true,
                                        redline_min: null,
                                        redline_standard: null,
                                        redline_max: null,
                                        effective_date: null,
                                    })
                                    setRedlineData(data)
                                }}
                            />
                        </div>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

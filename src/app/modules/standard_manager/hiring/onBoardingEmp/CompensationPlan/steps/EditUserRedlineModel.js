import React, {useCallback, useEffect, useMemo, useState} from 'react'
import CustomModal from '../../../../../../../customComponents/customModal/CustomModal'
import {fontsFamily} from '../../../../../../../assets/fonts/fonts'
import CustomButton, {
    BUTTON_TYPE,
} from '../../../../../../../customComponents/customButtton/CustomButton'
import _ from 'lodash'
import {TabView, TabPanel} from 'primereact/tabview'
import moment from 'moment'
import CustomDatePicker from '../../../../../../../customComponents/customInputs/customDatePicker/CustomDatePicker'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../../customComponents/customInputs/customInput/CustomInput'
import {
    formattedNumberFields,
    getEmployeeRedlineHelper,
} from '../../../../../../../helpers/CommonHelpers'
import {
    MAIN_POSITTIONS_ID,
    UNIT_TYPE2,
    getValidDate,
} from '../../../../../../../constants/constants'
import CustomDropdown from '../../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import ViewUserRedlineChanges from '../../../../management/particularEmployee/compoents/ViewUserRedlineChanges'
import CustomToast from '../../../../../../../customComponents/customToast/CustomToast'
import CustomLink from '../../../../../../../customComponents/customButtton/CustomLink'

const EditUserRedlineModel = ({
    employeeData,
    onSavePress,
    redline_data = [],
    show,
    handleClose,
    self_gen = false,
}) => {
    const [redlineData, setRedlineData] = useState(redline_data ?? [])
    const [auditToggleView, setAuditToggleView] = useState(false)

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
            item?.redline && item?.start_date ? true : false
        )
        if (isFilledData.includes(false)) {
            return CustomToast.error('Please fill empty data')
        }
        onSavePress(self_gen ? 'self_gen_redline_data' : 'redline_data', redlineData)
    }, [onSavePress, redlineData, self_gen])

    const currentRedline = useMemo(() => {
        const data = getEmployeeRedlineHelper(employeeData, null, self_gen)?.current
        return data
    }, [employeeData, self_gen])

    return (
        <CustomModal
            show={show}
            onHide={handleClose}
            title={`Edit User Redline | ${employeeData?.first_name} ${employeeData?.last_name} (${
                employeeData?.position_id == MAIN_POSITTIONS_ID.closer
                    ? !self_gen
                        ? 'Closer'
                        : 'Setter'
                    : self_gen
                    ? 'Closer'
                    : 'Setter'
            })`}
            maxWidth='1000'
        >
            <div
                className='px-sm-20 px-5 mx-auto'
                style={{
                    fontSize: 14,
                    fontFamily: fontsFamily.manrope,
                }}
            >
                <div
                    style={{
                        fontWeight: 600,
                    }}
                >
                    <div className='d-flex justify-content-between align-items-center mb-5'>
                        <div className='d-flex align-items-center gap-3'>
                            <div className='text-cmGrey900'>Current Redline: </div>
                            <div className='text-cmGrey700'>
                                {currentRedline?.redline_amount
                                    ? `${formattedNumberFields(
                                          currentRedline?.redline_amount,
                                          ''
                                      )} / ${currentRedline?.redline_type}`
                                    : '-'}{' '}
                                since{' '}
                                {currentRedline?.start_date
                                    ? getValidDate(currentRedline?.start_date)
                                    : '-'}
                            </div>

                            <CustomLink
                                label={'Audit log'}
                                onClick={() => setAuditToggleView(true)}
                            />
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
                                self_gen={self_gen}
                            />
                        </TabPanel>
                        <TabPanel header='Upcoming'>
                            <CommonRedlineTable
                                type='upcoming'
                                redlineData={redlineData}
                                onEditPress={onEditPress}
                                onDeletePress={onDeletePress}
                                onEditSavePress={onEditSavePress}
                                setRedlineData={setRedlineData}
                                self_gen={self_gen}
                            />
                        </TabPanel>
                    </TabView>
                </div>
                <div className='row align-items-center justify-content-center w-75 mx-auto'>
                    <div className='col-sm'>
                        <CustomButton
                            width={100}
                            buttonType={BUTTON_TYPE.error}
                            buttonLabel='Cancel'
                            onClick={handleClose}
                        />
                    </div>
                    <div className='col-sm'>
                        <CustomButton
                            width={100}
                            buttonType={BUTTON_TYPE.primary}
                            buttonLabel='Save'
                            onClick={handleSave}
                        />
                    </div>
                </div>
            </div>
            <ViewUserRedlineChanges
                redlineData={employeeData}
                toggleView={auditToggleView}
                closeToggle={() => {
                    setAuditToggleView(false)
                }}
                self_gen={self_gen}
            />
        </CustomModal>
    )
}

export default EditUserRedlineModel

const CommonRedlineTable = ({
    onEditPress,
    onDeletePress,
    onEditSavePress,
    type = 'past',
    redlineData = [],
    setRedlineData = null,
    self_gen = false,
}) => {
    const changeRedline = (index, key, value) => {
        const data = _.cloneDeep(redlineData)
        data[index][key] = value
        setRedlineData(data)
    }
    return (
        <div className='table-responsive table-bordered mb-10'>
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
                        <th className='text-nowrap p-3 '>Effective date</th>
                        <th className='text-nowrap p-3 '>Redline</th>
                        <th className='text-nowrap p-3 '>Redline Type</th>
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
                                    moment(item?.start_date, 'YYYYY-MM-DD').format(
                                        'YYYY-MM-DD 00:00:00'
                                    )
                                ) < new Date(moment().format('YYYY-MM-DD 00:00:00'))
                        } else {
                            show =
                                (item?.new && item?.type == 'upcoming') ||
                                new Date(
                                    moment(item?.start_date, 'YYYYY-MM-DD').format(
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
                                                <td className='p-3 text-nowrap'>
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
                                                                    item?.start_date
                                                                        ? new Date(item?.start_date)
                                                                        : null
                                                                }
                                                                onChange={(e) => {
                                                                    changeRedline(
                                                                        index,
                                                                        'start_date',
                                                                        e?.target?.value
                                                                    )
                                                                }}
                                                            />
                                                        </div>
                                                    ) : (
                                                        getValidDate(item?.start_date)
                                                    )}
                                                </td>
                                                <td className='p-3 text-nowrap'>
                                                    <div className='w-150px'>
                                                        <CustomInput
                                                            type={INPUT_TYPE.currency}
                                                            placeholder={'0.00'}
                                                            prefixText='$'
                                                            value={item?.redline}
                                                            onChange={(e) =>
                                                                changeRedline(
                                                                    index,
                                                                    'redline',
                                                                    e?.target?.value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='w-150px'>
                                                        <CustomDropdown
                                                            searching={false}
                                                            options={UNIT_TYPE2}
                                                            onChange={(e) => {
                                                                changeRedline(
                                                                    index,
                                                                    'redline_type',
                                                                    e?.target?.value
                                                                )
                                                            }}
                                                            value={item?.redline_type ?? ''}
                                                        />
                                                    </div>
                                                </td>
                                                <td className='p-3 text-nowrap'>
                                                    <CustomButton
                                                        icon='bi bi-check2'
                                                        onClick={() => onEditSavePress(index)}
                                                    />
                                                </td>
                                                {type == 'upcoming' || item?.new ? (
                                                    <td className='p-3 text-nowrap'>
                                                        <CustomButton
                                                            buttonType={BUTTON_TYPE.error}
                                                            icon='bi bi-trash'
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
                                                    {getValidDate(item?.start_date)}
                                                </td>
                                                <td className='p-3 text-nowrap text-cmGrey700'>
                                                    {item?.redline}
                                                </td>
                                                <td className='p-3 text-nowrap text-cmGrey700'>
                                                    {item?.redline_type}
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
                    <tr colSpan={5}>
                        <div style={{padding: 5}} className='w-150px'>
                            <CustomLink
                                icon={'bi bi-plus-square'}
                                onClick={() => {
                                    const data = _.cloneDeep(redlineData)
                                    data.push({
                                        type,
                                        new: true,
                                        edit: true,
                                        redline: null,
                                        start_date: null,
                                        redline_type: 'per watt',
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

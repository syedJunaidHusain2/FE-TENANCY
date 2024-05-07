import React, {useCallback, useEffect, useState} from 'react'
import CustomModal from '../../../../../../../customComponents/customModal/CustomModal'
import {fontsFamily} from '../../../../../../../assets/fonts/fonts'
import {
    formattedNumberFields,
    formattedNumberFieldsWithoutDecimal,
    isInputValueExist,
} from '../../../../../../../helpers/CommonHelpers'
import {getValidDate} from '../../../../../../../constants/constants'
import CustomImage from '../../../../../../../customComponents/customImage/CustomImage'
import CustomNoData from '../../../../../../../customComponents/customNoData/CustomNoData'
import Pagination from '../../../../../admin/sequidocs/component/Pagination'
import {
    deleteEmploymentPackageHistoryService,
    getEmploymentPackageHistoryService,
} from '../../../../../../../services/Services'
import CustomLoader from '../../../../../../../customComponents/customLoader/CustomLoader'
import CustomDialog from '../../../../../../../customComponents/customDialog/CustomDialog'
import {CustomSortSvg} from '../../../../../../../_metronic/helpers/components/CustomSortSVG'
import FirstCapital from '../../../../../../../customComponents/customText/CustomCaptializer/FirstCapital'

export const MODAL_NAME = {
    Organization: 'Transfer',
    Overrides: 'Override',
    Redline: 'Redline',
    Upfront: 'Upfront',
    Commission: 'Commission',
    Withheld: 'Withheld',
}

const CustomViewChnagesEmployementPackageModal = ({
    show,
    handleClose,
    title,
    modalName = null,
    userId,
    PositionId = null,
    positionData,
}) => {
    const [historyData, setHistoryData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isAscending, setIsAscending] = useState(false)
    const [sortValue, setSortValue] = useState(null)
    const [sortingOrder, setSortingOrder] = useState(null)

    useEffect(() => {
        getHistoryData()
    }, [sortValue, sortingOrder])

    const getHistoryData = useCallback(() => {
        setLoading(true)
        let type = modalName
        const body = {
            type: type,
            user_id: userId,
            position_id: PositionId,
            sort: sortValue,
            sort_val: sortingOrder,
        }
        getEmploymentPackageHistoryService(body)
            .then((res) => {
                setHistoryData(res.data)
            })
            .finally(() => setLoading(false))
    }, [PositionId, modalName, sortValue, sortingOrder, userId])

    const deleteHistoryData = (id) => {
        CustomDialog.warn('Are you sure you want to delete ?', () => {
            setLoading(true)
            const body = {
                id: id,
                type: modalName,
            }
            deleteEmploymentPackageHistoryService(body)
                .then(() => {
                    getHistoryData()
                })
                .finally(() => setLoading(false))
        })
    }

    const percantageChange = useCallback((oldVal, newVal) => {
        if (oldVal === 0) {
            if (newVal === 0) {
                return 0 // Both old and new values are zero, so percentage change is considered 0%
            } else {
                return 100 // Old value is zero, and new value is non-zero, so percentage change is considered infinite
            }
        }

        const change = newVal - oldVal
        const percentageChange = (change / oldVal) * 100

        return Math.min(percentageChange, 100)
    }, [])

    const handleSortClick = () => {
        const sorted = {...historyData}
        sorted?.history?.sort((a, b) => {
            const dateA = new Date(a.effective_date)
            const dateB = new Date(b.effective_date)
            return isAscending ? dateA - dateB : dateB - dateA
        })

        setHistoryData(sorted)
        setIsAscending(!isAscending)
    }
    return (
        <CustomModal show={show} onHide={handleClose} maxWidth='1300' title={title}>
            <CustomLoader full visible={loading} />
            <div style={{fontFamily: fontsFamily.manrope}}>
                {/* Top blue Card */}
                {/* Redline */}
                {modalName == MODAL_NAME.Redline ? (
                    <div
                        className='bg-cmBlue-Crayola bg-opacity-10 p-5 d-flex align-items-center gap-5 mb-10'
                        style={{
                            borderRadius: 10,
                            lineHeight: '21px',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        <div className='text-cmGrey900'>Current Redline:</div>
                        <div className='text-cmGrey900'>
                            {formattedNumberFields(historyData?.current?.redline, '$')}
                            {` ${historyData?.current?.redline_type}`}
                        </div>
                        <div className='text-cmGrey700'>
                            {' '}
                            since {getValidDate(historyData?.current?.effective_date) ?? '-'}
                        </div>
                    </div>
                ) : null}
                {modalName == MODAL_NAME.Commission ? (
                    <div
                        className='bg-cmBlue-Crayola bg-opacity-10 p-5 d-flex align-items-center gap-5 mb-10'
                        style={{
                            borderRadius: 10,
                            lineHeight: '21px',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        <div className='text-cmGrey900'>Current Commission:</div>
                        <div className='text-cmGrey900'>
                            {formattedNumberFields(historyData?.current?.commission, '%')}
                        </div>
                        <div className='text-cmGrey700'>
                            since{' '}
                            {getValidDate(historyData?.current?.commission_effective_date) ?? '-'}
                        </div>
                    </div>
                ) : null}
                {modalName == MODAL_NAME.Upfront ? (
                    <div
                        className='bg-cmBlue-Crayola bg-opacity-10 p-5 d-flex align-items-center gap-5 mb-10'
                        style={{
                            borderRadius: 10,
                            lineHeight: '21px',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        <div className='text-cmGrey900'>Current Upfront:</div>
                        <div className='text-cmGrey900'>
                            {formattedNumberFields(historyData?.current?.upfront_pay_amount, '$')}
                            {''}
                            {historyData?.current?.upfront_sale_type}
                        </div>
                        <div className='text-cmGrey700'>
                            {' '}
                            since {getValidDate(historyData?.current?.upfront_effective_date)}
                        </div>
                    </div>
                ) : null}
                {/* Organization */}
                {modalName == MODAL_NAME.Organization ? (
                    <div
                        className='bg-cmBlue-Crayola bg-opacity-10 p-5 mb-10'
                        style={{
                            borderRadius: 10,
                            lineHeight: '21px',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        {/* first line */}
                        <div className='d-flex align-items-center gap-5 mb-5'>
                            <div className='text-cmGrey900'>Current Organization:</div>
                            <div className='text-cmGrey700'>
                                {' '}
                                since {getValidDate(historyData?.current?.effective_date) ?? '-'}
                            </div>
                        </div>
                        {/* second line */}
                        <div className='d-flex flex-wrap align-items-center gap-12'>
                            <div className='d-flex align-items-center gap-2'>
                                <div className='text-cmGrey700'>Office State:</div>
                                <div className='text-cmGrey900'>
                                    {historyData?.current?.state_name}
                                </div>
                            </div>
                            <div className='d-flex align-items-center gap-2'>
                                <div className='text-cmGrey700'>Office Name:</div>
                                <div className='text-cmGrey900'>
                                    {historyData?.current?.office_name}
                                </div>
                            </div>
                            <div className='d-flex align-items-center gap-2'>
                                <div className='text-cmGrey700'>Manager:</div>
                                <div className='text-cmGrey900'>
                                    {historyData?.current?.manager_name}
                                </div>
                            </div>
                            <div className='d-flex align-items-center gap-2'>
                                <div className='text-cmGrey700'>Position:</div>
                                <div className='text-cmGrey900'>
                                    {historyData?.current?.sub_position_name}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
                {/* Overrides */}
                {modalName == MODAL_NAME.Overrides ? (
                    <div
                        className='bg-cmBlue-Crayola bg-opacity-10 p-5 mb-10'
                        style={{
                            borderRadius: 10,
                            lineHeight: '21px',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        {/* first line */}
                        <div
                            className='d-flex align-items-center gap-5 mb-5 text-cmGrey900'
                            style={{fontWeight: 700}}
                        >
                            <div>Current Overrides:</div>
                            <div>since {getValidDate(historyData?.current?.effective_date)}</div>
                        </div>
                        {/* second line */}
                        <div className='d-flex flex-wrap align-items-center gap-12'>
                            {positionData?.override?.[0]?.status ? (
                                <div className='d-flex align-items-center gap-2'>
                                    <div className='text-cmGrey700'>Direct</div>
                                    <div className='text-cmGrey900'>
                                        {formattedNumberFields(
                                            historyData?.current?.direct_amount,
                                            historyData?.current?.direct_type == 'percent'
                                                ? ''
                                                : '$'
                                        )}{' '}
                                        {historyData?.current?.direct_type == 'percent'
                                            ? '%'
                                            : historyData?.current?.direct_type}
                                    </div>
                                </div>
                            ) : null}
                            {positionData?.override?.[1]?.status ? (
                                <div className='d-flex align-items-center gap-2'>
                                    <div className='text-cmGrey700'>Indirect</div>
                                    <div className='text-cmGrey900'>
                                        {formattedNumberFields(
                                            historyData?.current?.indirect_amount,
                                            historyData?.current?.indirect_type == 'percent'
                                                ? ''
                                                : '$'
                                        )}{' '}
                                        {historyData?.current?.indirect_type == 'percent'
                                            ? '%'
                                            : historyData?.current?.indirect_type}
                                    </div>
                                </div>
                            ) : null}
                            {positionData?.override?.[2]?.status ? (
                                <div className='d-flex align-items-center gap-2'>
                                    <div className='text-cmGrey700'>Office</div>
                                    <div className='text-cmGrey900'>
                                        {formattedNumberFields(
                                            historyData?.current?.office_amount,
                                            historyData?.current?.office_type == 'percent'
                                                ? ''
                                                : '$'
                                        )}{' '}
                                        {historyData?.current?.office_type == 'percent'
                                            ? '%'
                                            : historyData?.current?.office_type}
                                    </div>
                                </div>
                            ) : null}
                            {positionData?.override?.[3]?.status ? (
                                <div className='d-flex align-items-center gap-2'>
                                    <div className='text-cmGrey700'>Office Stack</div>
                                    <div className='text-cmGrey900'>
                                        {formattedNumberFields(
                                            historyData?.current?.office_stack_overrides_amount,
                                            '%'
                                        )}{' '}
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                ) : null}

                {modalName == MODAL_NAME.Withheld ? (
                    <div
                        className='bg-cmBlue-Crayola bg-opacity-10 p-5 d-flex align-items-center gap-5 mb-10'
                        style={{
                            borderRadius: 10,
                            lineHeight: '21px',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        <div className='text-cmGrey900'>Current Withheld Amount:</div>
                        <div className='text-cmGrey900'>
                            {formattedNumberFields(historyData?.current?.withheld_amount, '$')}{' '}
                            {historyData?.current?.withheld_type}
                        </div>
                        <div className='text-cmGrey700'>
                            {' '}
                            since {getValidDate(historyData?.current?.withheld_effective_date)}
                        </div>
                    </div>
                ) : null}

                {/* Table begins */}
                {/* Redline */}
                {modalName == MODAL_NAME.Redline ? (
                    <div className='table-responsive mb-10'>
                        <table className='table'>
                            <thead>
                                <tr
                                    className='text-cmGrey600 text-cmGrey800 border-bottom-1 border-top-1 border-cmGrey300'
                                    style={{
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        fontFamily: fontsFamily.manrope,
                                        lineHeight: '21px',
                                    }}
                                >
                                    <th className='text-nowrap px-5 py-1 d-flex align-items-center gap-2'>
                                        <span>Effective date</span>
                                        <span
                                            className='pi pi-sort cursor-pointer'
                                            onClick={handleSortClick}
                                        />
                                    </th>
                                    <th className='text-nowrap  px-5 py-1'>Old Redline</th>
                                    <th className='text-nowrap px-5 py-1'>Old Redline Type</th>

                                    <th className='text-nowrap px-5 py-1'>New Redline</th>
                                    <th className='text-nowrap px-5 py-1'>New Redline Type</th>
                                    <th className='text-nowrap  px-5 py-1'>Updated on</th>
                                    <th className='text-nowrap  text-center py-1 px-5'>
                                        Updated by
                                    </th>
                                    <th className='text-nowrap  text-center px-5 py-1'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {historyData?.history?.length > 0 ? (
                                    <>
                                        {historyData?.history?.map((item) => {
                                            let isFutureDate =
                                                getValidDate(new Date(), 'YYYY-MM-DD 00:00') <
                                                getValidDate(
                                                    item?.effective_date,
                                                    'YYYY-MM-DD 00:00'
                                                )
                                            return (
                                                <tr
                                                    className='text-cmGrey800 stripRow'
                                                    style={{
                                                        fontSize: '14px',
                                                        fontFamily: fontsFamily.manrope,
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    <td
                                                        className={
                                                            isFutureDate
                                                                ? 'p-5 border border-5 border-right-0 border-bottom-0 border-top-0 border-cmSuccess'
                                                                : 'p-5 text-nowrap'
                                                        }
                                                    >
                                                        {getValidDate(item?.effective_date)}
                                                    </td>
                                                    <td className='p-5 text-nowrap'>
                                                        {item?.Redline?.map((val) => (
                                                            <div>
                                                                {isInputValueExist(
                                                                    val?.old_redline
                                                                ) ? (
                                                                    <>
                                                                        {formattedNumberFields(
                                                                            val?.old_redline
                                                                        )}{' '}
                                                                        {val?.old_redline_type}
                                                                    </>
                                                                ) : (
                                                                    '-'
                                                                )}
                                                            </div>
                                                        ))}
                                                    </td>
                                                    <td className='p-5 text-nowrap'>
                                                        {item?.Redline?.map((val) => (
                                                            <div>
                                                                {val?.old_redline_amount_type ??
                                                                    '-'}
                                                            </div>
                                                        ))}
                                                    </td>

                                                    <td className='p-5 text-nowrap text-cmGrey700'>
                                                        {item?.Redline?.map((val) => (
                                                            <div>
                                                                {isInputValueExist(val?.redline) ? (
                                                                    <>
                                                                        {formattedNumberFields(
                                                                            val?.redline
                                                                        )}{' '}
                                                                        {val?.redline_type ?? '-'}
                                                                    </>
                                                                ) : (
                                                                    '-'
                                                                )}
                                                            </div>
                                                        ))}
                                                    </td>
                                                    <td className='p-5 text-nowrap'>
                                                        {item?.Redline?.map((val) => (
                                                            <div>
                                                                {val?.redline_amount_type ?? '-'}
                                                            </div>
                                                        ))}
                                                    </td>
                                                    <td className='p-5 text-nowrap'>
                                                        {getValidDate(item?.updated_on)}
                                                    </td>
                                                    <td className='p-5 text-nowrap  text-start d-flex flex-center gap-3'>
                                                        <div>
                                                            <CustomImage
                                                                className={'w-25px h-25px'}
                                                            />
                                                        </div>
                                                        <div className=' text-cmGrey900'>
                                                            {item?.updater_by}
                                                        </div>
                                                    </td>
                                                    <td className='p-5 text-nowrap text-center'>
                                                        {isFutureDate ? (
                                                            <div
                                                                className='pi pi-trash text-cmGrey700 cursor-pointer'
                                                                onClick={() =>
                                                                    deleteHistoryData(item?.id)
                                                                }
                                                            />
                                                        ) : null}
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </>
                                ) : (
                                    <>
                                        <tr>
                                            <td className='text-center py-5' colSpan={6}>
                                                <CustomNoData label={'No data found'} />
                                            </td>
                                        </tr>
                                    </>
                                )}
                            </tbody>
                        </table>
                        <Pagination />
                    </div>
                ) : null}
                {/* Commission */}
                {modalName == MODAL_NAME.Commission ? (
                    <div className='table-responsive mb-10'>
                        <table className='table'>
                            <thead>
                                <tr
                                    className='text-cmGrey600 text-cmGrey800 border-bottom-1 border-top-1 border-cmGrey300'
                                    style={{
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        fontFamily: fontsFamily.manrope,
                                        lineHeight: '21px',
                                    }}
                                >
                                    <th className='text-nowrap px-5 py-1 d-flex align-items-center gap-2'>
                                        <span>Effective date</span>
                                        <span
                                            className='pi pi-sort cursor-pointer'
                                            onClick={handleSortClick}
                                        />
                                    </th>
                                    <th className='text-nowrap  px-5 py-1'>Old %</th>
                                    <th className='text-nowrap px-5 py-1'>New %</th>
                                    <th className='text-nowrap  px-5 py-1'>Updated on</th>
                                    <th className='text-nowrap  text-center py-1 px-5'>
                                        Updated by
                                    </th>
                                    <th className='text-nowrap  text-center px-5 py-1'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {historyData?.history?.length > 0 ? (
                                    <>
                                        {historyData?.history?.map((item) => {
                                            let isFutureDate =
                                                getValidDate(new Date(), 'YYYY-MM-DD 00:00') <
                                                getValidDate(
                                                    item?.effective_date,
                                                    'YYYY-MM-DD 00:00'
                                                )
                                            let percantage = percantageChange(
                                                item?.Commission?.[0]?.old_commission,
                                                item?.Commission?.[0]?.commission
                                            )
                                            return (
                                                <tr
                                                    className='text-cmGrey800 stripRow'
                                                    style={{
                                                        fontSize: '14px',
                                                        fontFamily: fontsFamily.manrope,
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    <td
                                                        className={
                                                            isFutureDate
                                                                ? 'p-5 border border-5 border-right-0 border-bottom-0 border-top-0 border-cmSuccess'
                                                                : 'p-5 text-nowrap'
                                                        }
                                                    >
                                                        {getValidDate(item?.effective_date)}
                                                    </td>
                                                    <td className='p-5 text-nowrap text-cmGrey700'>
                                                        {item?.Commission?.map((val) => (
                                                            <div>
                                                                {' '}
                                                                {formattedNumberFields(
                                                                    val?.old_commission,
                                                                    '%'
                                                                )}
                                                            </div>
                                                        ))}
                                                    </td>
                                                    <td className='p-5 text-nowrap'>
                                                        {item?.Commission?.map((val) => (
                                                            <div className='d-flex gap-2'>
                                                                <div>
                                                                    {' '}
                                                                    {formattedNumberFields(
                                                                        val?.commission,
                                                                        '%'
                                                                    )}
                                                                </div>
                                                                {/* {percantage != 0 ? (
                                                                    <span
                                                                        className={`text-${
                                                                            percantage > 0
                                                                                ? 'cmSuccess'
                                                                                : 'cmError'
                                                                        }`}
                                                                    >
                                                                        {formattedNumberFields(
                                                                            percantage,
                                                                            '%'
                                                                        )}
                                                                    </span>
                                                                ) : null} */}
                                                            </div>
                                                        ))}
                                                    </td>

                                                    <td className='p-5 text-nowrap'>
                                                        {getValidDate(item?.updated_on)}
                                                    </td>
                                                    <td className='p-5 text-nowrap  text-start d-flex flex-center gap-3'>
                                                        <div>
                                                            <CustomImage
                                                                className={'w-25px h-25px'}
                                                            />
                                                        </div>
                                                        <div className=' text-cmGrey900'>
                                                            {item?.updater_by}
                                                        </div>
                                                    </td>
                                                    <td className='p-5 text-nowrap text-center'>
                                                        {isFutureDate ? (
                                                            <div
                                                                className='pi pi-trash text-cmGrey700 cursor-pointer'
                                                                onClick={() =>
                                                                    deleteHistoryData(item?.id)
                                                                }
                                                            />
                                                        ) : null}
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </>
                                ) : (
                                    <>
                                        <tr>
                                            <td className='text-center py-5' colSpan={6}>
                                                <CustomNoData label={'No data found'} />
                                            </td>
                                        </tr>
                                    </>
                                )}
                            </tbody>
                        </table>
                        <Pagination />
                    </div>
                ) : null}
                {/* Upfront */}
                {modalName == MODAL_NAME.Upfront ? (
                    <div className='table-responsive mb-10'>
                        <table className='table'>
                            <thead>
                                <tr
                                    className='text-cmGrey600 text-cmGrey800 border-bottom-1 border-top-1 border-cmGrey300'
                                    style={{
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        fontFamily: fontsFamily.manrope,
                                        lineHeight: '21px',
                                    }}
                                >
                                    <th className='text-nowrap px-5 py-1 d-flex align-items-center gap-2'>
                                        <span>Effective date</span>
                                        <span
                                            className='pi pi-sort cursor-pointer'
                                            onClick={handleSortClick}
                                        />
                                    </th>
                                    <th className='text-nowrap  px-5 py-1'>Old Upfront</th>
                                    <th className='text-nowrap px-5 py-1'>New Upfront</th>
                                    <th className='text-nowrap  px-5 py-1'>Updated on</th>
                                    <th className='text-nowrap  text-center py-1 px-5'>
                                        Updated by
                                    </th>
                                    <th className='text-nowrap  text-center px-5 py-1'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {historyData?.history?.length > 0 ? (
                                    <>
                                        {historyData?.history?.map((item) => {
                                            let isFutureDate =
                                                getValidDate(new Date(), 'YYYY-MM-DD 00:00') <
                                                getValidDate(
                                                    item?.effective_date,
                                                    'YYYY-MM-DD 00:00'
                                                )
                                            let percantage = percantageChange(
                                                item?.Upfront?.[0]?.old_upfront_pay_amount,
                                                item?.Upfront?.[0]?.upfront_pay_amount
                                            )
                                            return (
                                                <tr
                                                    className='text-cmGrey800 stripRow'
                                                    style={{
                                                        fontSize: '14px',
                                                        fontFamily: fontsFamily.manrope,
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    <td
                                                        className={
                                                            isFutureDate
                                                                ? 'p-5 border border-5 border-right-0 border-bottom-0 border-top-0 border-cmSuccess'
                                                                : 'p-5 text-nowrap'
                                                        }
                                                    >
                                                        {getValidDate(item?.effective_date)}
                                                    </td>
                                                    <td className='p-5 text-nowrap'>
                                                        {item?.Upfront?.map((val) => (
                                                            <div>
                                                                {' '}
                                                                {formattedNumberFields(
                                                                    val?.old_upfront_pay_amount
                                                                )}{' '}
                                                                {val?.old_upfront_sale_type}
                                                            </div>
                                                        ))}
                                                    </td>
                                                    <td className='p-5 text-nowrap text-cmGrey700'>
                                                        {item?.Upfront?.map((val) => (
                                                            <div className='d-flex gap-2'>
                                                                <div>
                                                                    {' '}
                                                                    {formattedNumberFields(
                                                                        val?.upfront_pay_amount
                                                                    )}{' '}
                                                                    {val?.upfront_sale_type ?? '-'}
                                                                </div>
                                                                {/* {percantage != 0 ? (
                                                                    <span
                                                                        className={`text-${
                                                                            percantage > 0
                                                                                ? 'cmSuccess'
                                                                                : 'cmError'
                                                                        } ms-2`}
                                                                        style={{
                                                                            fontSize: '12px',
                                                                            fontWeight: 500,
                                                                        }}
                                                                    >
                                                                        {formattedNumberFieldsWithoutDecimal(
                                                                            percantage,
                                                                            '%'
                                                                        )}
                                                                    </span>
                                                                ) : null} */}
                                                            </div>
                                                        ))}
                                                    </td>
                                                    <td className='p-5 text-nowrap'>
                                                        {getValidDate(item?.updated_on)}
                                                    </td>
                                                    <td className='p-5 text-nowrap  text-start d-flex flex-center gap-3'>
                                                        <div>
                                                            <CustomImage
                                                                className={'w-25px h-25px'}
                                                            />
                                                        </div>
                                                        <div className=' text-cmGrey900'>
                                                            {item?.updater_by}
                                                        </div>
                                                    </td>
                                                    <td className='p-5 text-nowrap text-center'>
                                                        {isFutureDate ? (
                                                            <div
                                                                className='pi pi-trash text-cmGrey700 cursor-pointer'
                                                                onClick={() =>
                                                                    deleteHistoryData(item?.id)
                                                                }
                                                            />
                                                        ) : null}
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </>
                                ) : (
                                    <>
                                        <tr>
                                            <td className='text-center py-5' colSpan={6}>
                                                <CustomNoData label={'No data found'} />
                                            </td>
                                        </tr>
                                    </>
                                )}
                            </tbody>
                        </table>
                        <Pagination />
                    </div>
                ) : null}
                {/* Organization */}
                {modalName == MODAL_NAME.Organization ? (
                    <div className='table-responsive mb-10'>
                        <table className='table'>
                            <thead>
                                <tr
                                    className='text-cmGrey600 text-cmGrey800 border-bottom-1 border-top-1 border-cmGrey300'
                                    style={{
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        fontFamily: fontsFamily.manrope,
                                        lineHeight: '21px',
                                    }}
                                >
                                    <th className='text-nowrap px-5 py-1 d-flex align-items-center gap-2'>
                                        <span>Effective date</span>
                                        <span
                                            className='pi pi-sort cursor-pointer'
                                            onClick={handleSortClick}
                                        />
                                    </th>
                                    <th className='text-nowrap px-5 py-1'>Changed</th>
                                    <th className='text-nowrap px-5 py-1'>Office State</th>
                                    <th className='text-nowrap px-5 py-1'>Office Name</th>
                                    <th className='text-nowrap py-1 px-5'>Manager</th>
                                    {/* <th className='text-nowrap px-5 py-1'>Position</th> */}
                                    <th className='text-nowrap px-5 py-1 d-flex align-items-center gap-2'>
                                        <div className='d-flex'>
                                            <span>Updated on</span>
                                            <CustomSortSvg
                                                sortingOrder={
                                                    sortValue === 'update_on' ? sortingOrder : null
                                                }
                                                onClick={() => {
                                                    setSortValue('update_on')
                                                    setSortingOrder(
                                                        sortValue !== 'update_on' ? 'asc' : sortingOrder === 'asc' ? 'desc' : 'asc'
                                                    )
                                                }}
                                            />
                                        </div>
                                    </th>
                                    <th className='text-nowrap px-5 py-1'>Updated by</th>
                                    <th className='text-nowrap px-5 py-1'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {historyData?.history?.length > 0 ? (
                                    <>
                                        {historyData?.history?.map((item) => {
                                            let isFutureDate =
                                                getValidDate(new Date(), 'YYYY-MM-DD 00:00') <
                                                getValidDate(
                                                    item?.effective_date,
                                                    'YYYY-MM-DD 00:00'
                                                )
                                            return (
                                                <tr
                                                    className='text-cmGrey800 stripRow'
                                                    style={{
                                                        fontSize: '14px',
                                                        fontFamily: fontsFamily.manrope,
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    <td
                                                        className={
                                                            isFutureDate
                                                                ? 'p-5 border border-5 border-right-0 border-bottom-0 border-top-0 border-cmSuccess'
                                                                : 'p-5 text-nowrap'
                                                        }
                                                    >
                                                        {getValidDate(
                                                            item?.effective_date,
                                                            'MM/DD/YYYY'
                                                        ) ?? '-'}
                                                    </td>
                                                    <td
                                                        className='px-5 text-start text-nowrap text-cmGrey600'
                                                        style={{
                                                            fontSize: '12px',
                                                            lineHeight: '25px',
                                                        }}
                                                    >
                                                        <div>From</div>
                                                        <div>To</div>
                                                    </td>
                                                    <td
                                                        className='px-5 text-nowrap'
                                                        style={{lineHeight: '25px'}}
                                                    >
                                                        <div>{item?.old_state_name ?? '-'}</div>
                                                        <div>{item?.state_name ?? '-'}</div>
                                                    </td>
                                                    <td
                                                        className='px-5 text-nowrap'
                                                        style={{lineHeight: '25px'}}
                                                    >
                                                        <div>{item?.old_office_name ?? '-'}</div>
                                                        <div>{item?.office_name ?? '-'}</div>
                                                    </td>
                                                    <td
                                                        className='px-5 text-nowrap text-decoration-underline '
                                                        style={{lineHeight: '25px'}}
                                                    >
                                                        <div>{item?.old_manager_name ?? '-'}</div>
                                                        <div>{item?.manager_name ?? '-'}</div>
                                                    </td>
                                                    {/* <td
                                                        className='px-5 text-nowrap'
                                                        style={{lineHeight: '25px'}}
                                                    >
                                                        <div>{item?.old_sub_position_name}</div>
                                                        <div>{item?.sub_position_name}</div>
                                                    </td> */}

                                                    <td className='p-5 text-nowrap '>
                                                        {getValidDate(
                                                            item?.updated_on,
                                                            'MM/DD/YYYY'
                                                        )}
                                                    </td>

                                                    <td className='p-5 text-nowrap  text-start d-flex gap-3'>
                                                        <div>
                                                            <CustomImage
                                                                className={'w-25px h-25px'}
                                                            />
                                                        </div>
                                                        <div className='text-cmGrey900'>
                                                            {item?.updater_by ?? '-'}
                                                        </div>
                                                    </td>
                                                    <td className='p-5 '>
                                                        {isFutureDate ? (
                                                            <div
                                                                className='pi pi-trash text-cmGrey700 cursor-pointer'
                                                                onClick={() =>
                                                                    deleteHistoryData(item?.id)
                                                                }
                                                            />
                                                        ) : null}
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </>
                                ) : (
                                    <>
                                        <tr>
                                            <td className='text-center py-5' colSpan={8}>
                                                <CustomNoData label={'No data found'} />
                                            </td>
                                        </tr>
                                    </>
                                )}
                            </tbody>
                        </table>
                        <Pagination />
                    </div>
                ) : null}

                {/* Overrides */}
                {modalName == MODAL_NAME.Overrides ? (
                    <div className='table-responsive mb-10'>
                        <table className='table'>
                            <thead>
                                <tr
                                    className='text-cmGrey600 text-cmGrey800 border-bottom-1 border-top-1 border-cmGrey300'
                                    style={{
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        fontFamily: fontsFamily.manrope,
                                        lineHeight: '21px',
                                    }}
                                >
                                    <th className='text-nowrap px-5 py-1 d-flex align-items-center gap-2'>
                                        <span>Effective date</span>
                                        <span
                                            className='pi pi-sort cursor-pointer'
                                            onClick={handleSortClick}
                                        />
                                    </th>
                                    <th className='text-nowrap  px-5 py-1'>Type</th>
                                    <th className='text-nowrap  px-5 py-1'>Old Overrides</th>
                                    <th className='text-nowrap px-5 py-1'>New Overrides</th>
                                    <th className='text-nowrap  px-5 py-1'>Updated on</th>
                                    <th className='text-nowrap  text-center py-1 px-5'>
                                        Updated by
                                    </th>
                                    <th className='text-nowrap  text-center px-5 py-1'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {historyData?.history?.length > 0 ? (
                                    <>
                                        {historyData?.history?.map((item) => {
                                            let isFutureDate =
                                                getValidDate(new Date(), 'YYYY-MM-DD 00:00') <
                                                getValidDate(
                                                    item?.effective_date,
                                                    'YYYY-MM-DD 00:00'
                                                )

                                            return (
                                                <tr
                                                    className='text-cmGrey800 stripRow'
                                                    style={{
                                                        fontSize: '14px',
                                                        fontFamily: fontsFamily.manrope,
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    <td
                                                        className={
                                                            isFutureDate
                                                                ? 'p-5 border border-5 border-right-0 border-bottom-0 border-top-0 border-cmSuccess'
                                                                : 'p-5 text-nowrap'
                                                        }
                                                    >
                                                        {getValidDate(item?.effective_date)}
                                                    </td>
                                                    <td className='p-5 text-nowrap '>
                                                        {item?.overrides?.map(
                                                            (amount, amountIndex) => {
                                                                const show =
                                                                    positionData?.override?.[
                                                                        amountIndex
                                                                    ]?.status

                                                                return show ? (
                                                                    <div className='text-cmGrey900'>
                                                                        <FirstCapital
                                                                            label={amount?.type}
                                                                        />
                                                                        {/* {amount?.type} */}
                                                                    </div>
                                                                ) : null
                                                            }
                                                        )}
                                                    </td>
                                                    <td className='p-5 text-nowrap '>
                                                        {item?.overrides?.map(
                                                            (amount, amountIndex) => {
                                                                const show =
                                                                    positionData?.override?.[
                                                                        amountIndex
                                                                    ]?.status

                                                                let isOldOverridePercent =
                                                                    amount?.old_type == 'percent'
                                                                        ? true
                                                                        : false
                                                                return show ? (
                                                                    <div className='text-cmGrey900'>
                                                                        {formattedNumberFields(
                                                                            amount?.old_amount,
                                                                            isOldOverridePercent
                                                                                ? ''
                                                                                : amount?.type ==
                                                                                  'office_stack'
                                                                                ? '%'
                                                                                : '$'
                                                                        )}{' '}
                                                                        {isOldOverridePercent
                                                                            ? '%'
                                                                            : amount?.old_type}
                                                                    </div>
                                                                ) : null
                                                            }
                                                        )}
                                                    </td>
                                                    <td className='p-5 text-nowrap '>
                                                        {item?.overrides?.map(
                                                            (amount, amountIndex) => {
                                                                const show =
                                                                    positionData?.override?.[
                                                                        amountIndex
                                                                    ]?.status
                                                                let isNewOverridePercent =
                                                                    amount?.new_type == 'percent'
                                                                        ? true
                                                                        : false
                                                                return show ? (
                                                                    <div className='text-cmGrey900'>
                                                                        {formattedNumberFields(
                                                                            amount?.new_amount,
                                                                            isNewOverridePercent
                                                                                ? ''
                                                                                : amount?.type ==
                                                                                  'office_stack'
                                                                                ? '%'
                                                                                : '$'
                                                                        )}{' '}
                                                                        {isNewOverridePercent
                                                                            ? '%'
                                                                            : amount?.new_type}
                                                                    </div>
                                                                ) : null
                                                            }
                                                        )}
                                                    </td>
                                                    <td className='p-5 text-nowrap'>
                                                        {getValidDate(item?.updated_on)}
                                                    </td>
                                                    <td className='p-5 text-nowrap  text-start d-flex flex-center gap-3'>
                                                        <div>
                                                            <CustomImage
                                                                className={'w-25px h-25px'}
                                                                src={item?.updater_by?.image}
                                                            />
                                                        </div>
                                                        <div className='text-decoration-underline text-cmGrey900'>
                                                            {item?.updater_by?.first_name}{' '}
                                                            {item?.updater_by?.last_name}
                                                        </div>
                                                    </td>
                                                    {isFutureDate ? (
                                                        <td className='p-5 text-nowrap text-center '>
                                                            <div
                                                                className='pi pi-trash text-cmGrey700 cursor-pointer'
                                                                onClick={() =>
                                                                    deleteHistoryData(item?.id)
                                                                }
                                                            />
                                                        </td>
                                                    ) : (
                                                        <td></td>
                                                    )}
                                                </tr>
                                            )
                                        })}
                                    </>
                                ) : (
                                    <>
                                        <tr>
                                            <td className='text-center py-5' colSpan={6}>
                                                <CustomNoData label={'No data found'} />
                                            </td>
                                        </tr>
                                    </>
                                )}
                            </tbody>
                        </table>
                        <Pagination />
                    </div>
                ) : null}

                {/* Overrides */}
                {modalName == MODAL_NAME.Withheld ? (
                    <div className='table-responsive mb-10'>
                        <table className='table'>
                            <thead>
                                <tr
                                    className='text-cmGrey600 text-cmGrey800 border-bottom-1 border-top-1 border-cmGrey300'
                                    style={{
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        fontFamily: fontsFamily.manrope,
                                        lineHeight: '21px',
                                    }}
                                >
                                    <th className='text-nowrap px-5 py-1 d-flex align-items-center gap-2'>
                                        <span>Effective date</span>
                                        <span
                                            className='pi pi-sort cursor-pointer'
                                            onClick={handleSortClick}
                                        />
                                    </th>
                                    <th className='text-nowrap  px-5 py-1'>Old Amount</th>
                                    <th className='text-nowrap px-5 py-1'>New Amount</th>
                                    <th className='text-nowrap  px-5 py-1'>Updated on</th>
                                    <th className='text-nowrap  text-center py-1 px-5'>
                                        Updated by
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {historyData?.history?.length > 0 ? (
                                    <>
                                        {historyData?.history?.map((item) => {
                                            let isFutureDate =
                                                getValidDate(new Date(), 'YYYY-MM-DD 00:00') <
                                                getValidDate(
                                                    item?.effective_date,
                                                    'YYYY-MM-DD 00:00'
                                                )
                                            let percantage = percantageChange(
                                                item?.Withheld?.[0]?.old_withheld_amount,
                                                item?.Withheld?.[0]?.withheld_amount
                                            )
                                            return (
                                                <tr
                                                    className='text-cmGrey800 stripRow'
                                                    style={{
                                                        fontSize: '14px',
                                                        fontFamily: fontsFamily.manrope,
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    <td
                                                        className={
                                                            isFutureDate
                                                                ? 'p-5 border border-5 border-right-0 border-bottom-0 border-top-0 border-cmSuccess'
                                                                : 'p-5 text-nowrap'
                                                        }
                                                    >
                                                        {getValidDate(item?.effective_date)}
                                                    </td>

                                                    <td className='p-5 text-nowrap '>
                                                        {item?.Withheld?.map((amount) => (
                                                            <div className='text-cmGrey900'>
                                                                {formattedNumberFields(
                                                                    amount?.old_withheld_amount
                                                                )}{' '}
                                                                {amount?.old_withheld_type}
                                                            </div>
                                                        ))}
                                                    </td>
                                                    <td className='p-5 text-nowrap'>
                                                        {item?.Withheld?.map((amount) => (
                                                            <div className='d-flex'>
                                                                <div className='text-cmGrey900'>
                                                                    {formattedNumberFields(
                                                                        amount?.withheld_amount
                                                                    )}{' '}
                                                                    {amount?.withheld_type}
                                                                </div>
                                                                {/* {percantage != 0 ? (
                                                                    <span
                                                                        className={`text-${
                                                                            percantage > 0
                                                                                ? 'cmSuccess'
                                                                                : 'cmError'
                                                                        } ms-2`}
                                                                        style={{
                                                                            fontSize: '12px',
                                                                            fontWeight: 500,
                                                                        }}
                                                                    >
                                                                        {formattedNumberFieldsWithoutDecimal(
                                                                            percantage,
                                                                            '%'
                                                                        )}
                                                                    </span>
                                                                ) : null} */}
                                                            </div>
                                                        ))}
                                                    </td>
                                                    <td className='p-5 text-nowrap'>
                                                        {getValidDate(item?.updated_on)}
                                                    </td>
                                                    <td className='p-5 text-nowrap  text-start d-flex flex-center gap-3'>
                                                        <div>
                                                            <CustomImage
                                                                className={'w-25px h-25px'}
                                                                src={item?.updater_by?.image}
                                                            />
                                                        </div>
                                                        <div className='text-decoration-underline text-cmGrey900'>
                                                            {item?.updater_by}{' '}
                                                        </div>
                                                    </td>
                                                    {isFutureDate ? (
                                                        <td className='p-5 text-nowrap text-center '>
                                                            <div
                                                                className='pi pi-trash text-cmGrey700 cursor-pointer'
                                                                onClick={() =>
                                                                    deleteHistoryData(item?.id)
                                                                }
                                                            />
                                                        </td>
                                                    ) : (
                                                        <td></td>
                                                    )}
                                                </tr>
                                            )
                                        })}
                                    </>
                                ) : (
                                    <>
                                        <tr>
                                            <td className='text-center py-5' colSpan={6}>
                                                <CustomNoData label={'No data found'} />
                                            </td>
                                        </tr>
                                    </>
                                )}
                            </tbody>
                        </table>
                        <Pagination />
                    </div>
                ) : null}
            </div>
        </CustomModal>
    )
}

export default CustomViewChnagesEmployementPackageModal

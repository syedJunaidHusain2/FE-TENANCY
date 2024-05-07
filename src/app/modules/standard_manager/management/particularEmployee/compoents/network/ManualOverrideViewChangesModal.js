import {useEffect, useState} from 'react'
import CustomModal from '../../../../../../../customComponents/customModal/CustomModal'
import {fontsFamily} from '../../../../../../../assets/fonts/fonts'
import {
    formattedNumberFields,
    getErrorMessageFromResponse,
} from '../../../../../../../helpers/CommonHelpers'
import {getValidDate} from '../../../../../../../constants/constants'
import CustomImage from '../../../../../../../customComponents/customImage/CustomImage'
import CustomNoData from '../../../../../../../customComponents/customNoData/CustomNoData'
import Pagination from '../../../../../admin/sequidocs/component/Pagination'
import {deleteManualOverrideHistoryService} from '../../../../../../../services/Services'
import CustomLoader from '../../../../../../../customComponents/customLoader/CustomLoader'
import CustomDialog from '../../../../../../../customComponents/customDialog/CustomDialog'
import CustomToast from '../../../../../../../customComponents/customToast/CustomToast'

const ManualOverrideViewChangesModal = ({
    show,
    handleClose,
    title,
    getOverrideData,
    modalName = null,
    data = [],
}) => {
    const [historyData, setHistoryData] = useState(data)
    const [loading, setLoading] = useState(false)
    const [isAscending, setIsAscending] = useState(false)

    useEffect(() => {
        setHistoryData(data)
    }, [data])

    const deleteHistoryData = (id) => {
        CustomDialog.warn('Are you sure you want to delete ?', () => {
            setLoading(true)
            deleteManualOverrideHistoryService(id)
                .then(() => {
                    getOverrideData()
                })
                .catch((e) => {
                    CustomToast.error(getErrorMessageFromResponse(e))
                })
                .finally(() => setLoading(false))
        })
    }

    const handleSortClick = () => {
        const sorted = {...historyData}
        sorted?.manual_overrides_history?.sort((a, b) => {
            const dateA = new Date(a.effective_date)
            const dateB = new Date(b.effective_date)
            return isAscending ? dateA - dateB : dateB - dateA
        })

        setHistoryData(sorted)
        setIsAscending(!isAscending)
    }
    return (
        <CustomModal show={show} onHide={handleClose} maxWidth='850' title={title}>
            <CustomLoader full visible={loading} />
            <div style={{fontFamily: fontsFamily.manrope}}>
                {/* Top blue Card */}

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
                        <div>Current Manual Overrides:</div>
                        <div>since {getValidDate(historyData?.effective_date)}</div>
                    </div>
                    {/* second line */}
                    <div className='d-flex flex-wrap align-items-center gap-12'>
                        <div className='d-flex align-items-center gap-2'>
                            <div className='text-cmGrey700'>Manual Override Amount</div>
                            <div className='text-cmGrey900'>
                                {formattedNumberFields(
                                    historyData?.overrides_amount,
                                    historyData?.overrides_type == 'percent' ? '' : '$'
                                )}{' '}
                                {historyData?.overrides_type == 'percent'
                                    ? '%'
                                    : historyData?.overrides_type}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table begins */}
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
                                <th className='text-nowrap  px-5 py-1'>Old Overides</th>
                                <th className='text-nowrap px-5 py-1'>New Overides</th>
                                <th className='text-nowrap  px-5 py-1'>Updated on</th>
                                <th className='text-nowrap  text-center py-1 px-5'>Updated by</th>
                                <th className='text-nowrap  text-center px-5 py-1'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {historyData?.manual_overrides_history?.length > 0 ? (
                                <>
                                    {historyData?.manual_overrides_history?.map((item) => {
                                        let isFutureDate =
                                            getValidDate(new Date(), 'YYYY-MM-DD 00:00') <
                                            getValidDate(item?.effective_date, 'YYYY-MM-DD 00:00')
                                        let isNewOverridePercent =
                                            item?.overrides_type == 'percent' ? true : false
                                        let isOldOverridePercent =
                                            item?.old_overrides_type == 'percent' ? true : false
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
                                                    {formattedNumberFields(
                                                        item?.old_overrides_amount,
                                                        isOldOverridePercent ? '' : '$'
                                                    )}{' '}
                                                    {isOldOverridePercent
                                                        ? '%'
                                                        : item?.old_overrides_type}
                                                </td>
                                                <td className='p-5 text-nowrap '>
                                                    {formattedNumberFields(
                                                        item?.overrides_amount,
                                                        isNewOverridePercent ? '' : '$'
                                                    )}{' '}
                                                    {isNewOverridePercent
                                                        ? '%'
                                                        : item?.overrides_type}
                                                </td>
                                                <td className='p-5 text-nowrap'>
                                                    {getValidDate(item?.updated_at)}
                                                </td>
                                                <td className='p-5 text-nowrap  text-start d-flex flex-center gap-3'>
                                                    {item?.updated_by_user ? (
                                                        <>
                                                            <div>
                                                                <CustomImage
                                                                    className={'w-25px h-25px'}
                                                                    src={
                                                                        item?.updated_by_user?.image
                                                                    }
                                                                />
                                                            </div>
                                                            <div className='text-decoration-underline text-cmGrey900'>
                                                                {item?.updated_by_user?.first_name}{' '}
                                                                {item?.updated_by_user?.last_name}
                                                            </div>
                                                        </>
                                                    ) : (
                                                        '-'
                                                    )}
                                                </td>
                                                {isFutureDate ? (
                                                    <td className='p-5 text-nowrap text-center '>
                                                        <div
                                                            className='pi pi-trash text-cmGrey700 cursor-pointer'
                                                            onClick={() => {
                                                                deleteHistoryData(item?.id)
                                                            }}
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
            </div>
        </CustomModal>
    )
}

export default ManualOverrideViewChangesModal

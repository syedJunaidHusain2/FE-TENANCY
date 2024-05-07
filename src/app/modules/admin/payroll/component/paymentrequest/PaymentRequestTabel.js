/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect, useState} from 'react'
import {getValidDate} from '../../../../../../constants/constants'

import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import {TABLE_BORDER, formattedNumberFields} from '../../../../../../helpers/CommonHelpers'
import CustomDialog from '../../../../../../customComponents/customDialog/CustomDialog'
import CustomImage from '../../../../../../customComponents/customImage/CustomImage'
import RedirectToEmployeeProfile from '../../../../../../customComponents/redirectToEmployeeProfile/RedirectToEmployeeProfile'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'
import Pagination from '../../../sequidocs/component/Pagination'
import CustomCheckbox from '../../../../../../customComponents/customCheckbox/CustomCheckbox'
import {CustomSortSvg} from '../../../../../../_metronic/helpers/components/CustomSortSVG'
var selectedArr = null

const PaymentRequestTabel = ({
    className,
    paymentRequestData,
    loading,
    page,
    setPage,
    getPaymentList,
    setSelectedUsers,
    onChangesPaymentRequest,
    requestType,
    onChangePayNow,
    onPress,
    sortingOrder,
    sortValue,
    showTypeCol = false,
}) => {
    const [selectAll, setSelectAll] = useState(false)
    const [paymentData, setPaymentData] = useState(null)

    useEffect(() => {
        setPaymentData(paymentRequestData)
    }, [paymentRequestData])

    const handleChceckbox = (userData, e) => {
        const data = {...paymentData}
        let updatedData = [...data?.data]
        updatedData = updatedData?.map((item) => {
            if (item?.id == userData?.id) {
                return {...item, isChecked: e.target.checked}
            } else {
                return item
            }
        })
        selectedArr = updatedData?.filter((item) => item?.isChecked)?.map((item2) => item2?.id)
        setPaymentData({...paymentData, data: updatedData})
        setSelectedUsers(selectedArr)
        if (updatedData?.length == selectedArr?.length) setSelectAll(true)
        else setSelectAll(false)
    }

    const selectAllCheckbox = (e) => {
        setSelectAll(e.target.checked)
        let selectAllData = paymentRequestData?.data?.map((item) => {
            return {...item, isChecked: e.target.checked}
        })
        selectedArr = selectAllData?.filter((item) => item?.isChecked)?.map((item2) => item2?.id)
        setPaymentData({...paymentData, data: selectAllData})
        setSelectedUsers(selectedArr)
    }

    return (
        <div style={{position: 'relative'}}>
            <CustomLoader full visible={loading} />
            <div className={`card shadow-nones ${className}`}>
                <div className='card-body shadow-none py-0 px-0 mx-0'>
                    <div className='table-responsive shadow-none overflow-auto'>
                        <table className='table '>
                            <thead className={TABLE_BORDER}>
                                <tr
                                    className=' bg-cmGrey300 text-cmGrey800'
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        fontFamily: 'Manrope',
                                    }}
                                >
                                    <th className='p-5 text-nowrap'>
                                        {' '}
                                        {paymentData?.data?.length > 0 && (
                                            <div className=''>
                                                <CustomCheckbox
                                                    onChange={(e) => selectAllCheckbox(e)}
                                                    checked={selectAll || false}
                                                />
                                            </div>
                                        )}
                                    </th>
                                    <th className=' p-5 text-nowrap'>Employee</th>
                                    <th className=' p-5 text-nowrap'>
                                        <div className='d-flex'>
                                            Requested on
                                            <CustomSortSvg
                                                sortingOrder={
                                                    sortValue === 'requested_on'
                                                        ? sortingOrder
                                                        : null
                                                }
                                                onClick={() => onPress('requested_on')}
                                            />
                                        </div>
                                    </th>
                                    <th className=' p-5 text-nowrap'>Approved by</th>
                                    <th
                                        className=' p-5 text-nowrap'
                                        // data-toggle='tooltip'
                                        // data-placement='left'
                                        // title='Value is higher than expected '
                                    >
                                        <div className='d-flex'>
                                            Amount
                                            <CustomSortSvg
                                                sortingOrder={
                                                    sortValue === 'amount' ? sortingOrder : null
                                                }
                                                onClick={() => onPress('amount')}
                                            />
                                        </div>
                                    </th>
                                    {requestType === 'PaymentRequest' ||
                                        (showTypeCol && (
                                            <th
                                                data-toggle='tooltip'
                                                data-placement='left'
                                                title='bonuses, advances, incentives                    '
                                                className='p-5 text-nowrap'
                                            >
                                                Type
                                            </th>
                                        ))}
                                    <th className=''></th>
                                </tr>
                            </thead>
                            <tbody className={TABLE_BORDER}>
                                {paymentData?.data?.length > 0 ? (
                                    <>
                                        {paymentData?.data?.map((item, i) => (
                                            <tr
                                                key={i}
                                                className={`text-cmGrey600 stripRow `}
                                                style={{
                                                    height: '40px',
                                                    fontSize: '14px',
                                                    fontFamily: 'Manrope',
                                                }}
                                            >
                                                <th className='p-5'>
                                                    <div className=''>
                                                        <CustomCheckbox
                                                            checked={item?.isChecked || false}
                                                            onChange={(e) =>
                                                                handleChceckbox(item, e)
                                                            }
                                                        />
                                                    </div>
                                                </th>
                                                <td
                                                    className='p-5 text-cmGrey800 text-nowrap'
                                                    style={{
                                                        textDecoration: 'underline',
                                                        fontFamily: 'Manrope',
                                                        fontWeight: '700',
                                                    }}
                                                >
                                                    <RedirectToEmployeeProfile
                                                        employeeId={item?.user_id}
                                                    >
                                                        <CustomImage
                                                            src={item?.image}
                                                            className='avatar me-3'
                                                        />{' '}
                                                        {item?.first_name} {item?.last_name}{' '}
                                                    </RedirectToEmployeeProfile>
                                                </td>
                                                <td
                                                    className='p-5 text-cmGrey600'
                                                    style={{fontWeight: 600}}
                                                >
                                                    {getValidDate(item?.request_on)}
                                                </td>
                                                <td
                                                    className='p-5 text-cmGrey600'
                                                    style={{fontWeight: 600}}
                                                >
                                                    {item?.approved_by ?? '-'}
                                                </td>
                                                <td
                                                    className='p-5 text-cmGrey900'
                                                    style={{fontWeight: 700}}
                                                >
                                                    {formattedNumberFields(item?.amount, '$')}
                                                </td>
                                                {requestType === 'PaymentRequest' ||
                                                    (showTypeCol && (
                                                        <td
                                                            className='p-5 text-cmGrey600'
                                                            style={{fontWeight: 500}}
                                                        >
                                                            {item?.type ?? '-'}
                                                        </td>
                                                    ))}
                                                <td className='p-5 '>
                                                    <div className='d-flex flex-center gap-5'>
                                                        {/* <div>
                                                            <CustomButton
                                                                className={'text-nowrap'}
                                                                buttonType={BUTTON_TYPE.primary}
                                                                buttonLabel={'Pay Now'}
                                                                buttonSize={BUTTON_SIZE.small}
                                                                onClick={() => {
                                                                    onChangePayNow(item?.id)
                                                                }}
                                                            />
                                                        </div> */}

                                                        {selectedArr?.length > 0 ? (
                                                            <></>
                                                        ) : (
                                                            <div>
                                                                <CustomButton
                                                                    className={'text-nowrap'}
                                                                    buttonSize={BUTTON_SIZE.small}
                                                                    buttonType={BUTTON_TYPE.primary}
                                                                    buttonLabel={'With Payroll'}
                                                                    onClick={() =>
                                                                        onChangesPaymentRequest(
                                                                            'Accept',
                                                                            item?.id
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        )}
                                                        {selectedArr?.length > 0 ? (
                                                            <></>
                                                        ) : (
                                                            <div>
                                                                <CustomButton
                                                                    buttonType={BUTTON_TYPE.error}
                                                                    buttonSize={BUTTON_SIZE.small}
                                                                    buttonLabel={'Decline'}
                                                                    onClick={() => {
                                                                        CustomDialog.warn(
                                                                            'Are you sure you want to decline ?',
                                                                            () => {
                                                                                onChangesPaymentRequest(
                                                                                    'Decline',
                                                                                    item?.id
                                                                                )
                                                                            }
                                                                        )
                                                                    }}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>

                                                {/* {selectedArr?.length > 0 ? (
                                                    <></>
                                                ) : (
                                                    <td className='py-5 text-cmGrey600'>
                                                        <CustomButton
                                                            className={'text-nowrap'}
                                                            buttonType={BUTTON_TYPE.error}
                                                            buttonSize={BUTTON_SIZE.small}
                                                            buttonLabel={'Decline'}
                                                            onClick={() => {
                                                                CustomDialog.warn(
                                                                    'Are you sure you want to decline ?',
                                                                    () => {
                                                                        onChangesPaymentRequest(
                                                                            'Decline',
                                                                            item?.id
                                                                        )
                                                                    }
                                                                )
                                                            }}
                                                        />
                                                    </td>
                                                )} */}
                                            </tr>
                                        ))}
                                    </>
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={15}
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
                    </div>
                </div>
            </div>
            <Pagination
                page={page}
                totalPages={paymentData?.last_page}
                setPage={(changedPage) => setPage(changedPage)}
            />
        </div>
    )
}

export default PaymentRequestTabel

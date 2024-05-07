import React, {useCallback, useEffect, useState} from 'react'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import {Dialog} from 'primereact/dialog'
import {getValidDate} from '../../../../../../constants/constants'
import {getReconciliationScheduleSelector} from '../../../../../../redux/selectors/SettingsSelectors'
import {useSelector} from 'react-redux'
import {moveToReconciliationPayrollService} from '../../../../../../services/Services'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import {getErrorMessageFromResponse} from '../../../../../../helpers/CommonHelpers'

const MoveToReconcilitationPopUp = ({
    show,
    handleClose,
    selectedArr,
    setSelectedArr,
    getPayrollData,
    selectedPageType,
}) => {
    const [loading, setLoading] = useState(false)
    const [selectedPeriod, setSelectedPeriod] = useState(null)
    const [payrollError, setPayrollError] = useState(null)
    const reconciliationSchedule = useSelector(getReconciliationScheduleSelector)

    const handlePayPeriod = (e) => {
        setPayrollError(null)
        const period =
            reconciliationSchedule?.length > 0
                ? reconciliationSchedule?.find((item) => item?.id == e.target.value)
                : null
        setSelectedPeriod(period)
    }
    const onMoveToRecon = () => {
        if (!selectedPeriod) return setPayrollError('Select period')
        setLoading(true)
        const body = {
            payrollId: selectedArr,
            period_from: selectedPeriod?.period_from,
            period_to: selectedPeriod?.period_to,
        }
        // if (selectedPageType) body.select_type = selectedPageType
        // if (selectedPageType == 'all_pages') body.payrollId = []
        moveToReconciliationPayrollService(body)
            .then(() => {
                handleClose()
                getPayrollData()
                setSelectedArr([])
                CustomToast.success('Moved To Reconciliation')
            })
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
            .finally(() => {
                setLoading(false)
            })
    }
    return (
        <Dialog
            id='kt_modal_create_app'
            tabIndex={-1}
            aria-hidden='true'
            header='Move To Reconciliation'
            className='mw-sm-800px w-sm-75'
            visible={show}
            onHide={handleClose}
            backdrop={true}
        >
            <hr className='m-0 p-0 text-cmGrey900' />
            <div
                className='m-0 p-0'
                style={{fontFamily: 'Manrope', fontSize: '14px', position: 'relative'}}
            >
                <CustomLoader full visible={loading} />

                <div className=''>
                    <div className='modal-body  py-2 px-lg-10 mb-5'>
                        <div className='py-lg-3 px-lg-10 '>
                            <>
                                <div
                                    className='d-flex align-items-center flex-wrap justify-content-between w-sm-75 mx-auto'
                                    style={{fontFamily: 'Manrope', fontSize: '14px'}}
                                >
                                    <div>
                                        <h4
                                            className='text-cmGrey800 mb-sm-5 mb-3'
                                            style={{fontWeight: '900'}}
                                        >
                                            Recon Period:
                                        </h4>
                                    </div>
                                    <div className='w-sm-auto w-100'>
                                        <select
                                            style={{
                                                fontWeight: '700',
                                                fontSize: '14px',
                                            }}
                                            onChange={handlePayPeriod}
                                            data-control='select2'
                                            data-hide-search='true'
                                            className={`form-select form-select-black form-select-sm text-cmGrey800 bg-cmGrey200 cursor-pointer ${
                                                payrollError ? 'border-2 border-cmError' : ''
                                            }`}
                                        >
                                            <option style={{fontWeight: 600}} value=''>
                                                Select PayPeriod
                                            </option>
                                            {reconciliationSchedule?.map((item) => (
                                                <option
                                                    key={item?.id}
                                                    className='h-35px'
                                                    value={item?.id}
                                                    style={{
                                                        background: '#FFFFFF',
                                                        fontWeight: '600',
                                                    }}
                                                >
                                                    {getValidDate(item?.period_from)} -{' '}
                                                    {getValidDate(item?.period_to)}
                                                </option>
                                            ))}
                                        </select>
                                        {payrollError ? (
                                            <div className='h-20px'>
                                                <small id='' className='p-error block'>
                                                    {payrollError}
                                                </small>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                                <hr style={{height: '2px'}} />
                            </>
                        </div>
                    </div>
                    <div className='text-center'>
                        <div
                            className='btn bg-cmBlue-Crayola py-2 text-cmwhite'
                            style={{fontWeight: '500'}}
                            onClick={onMoveToRecon}
                        >
                            Move
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}

export default MoveToReconcilitationPopUp

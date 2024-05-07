import React from 'react'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../customComponents/customButtton/CustomButton'
import {useNavigate} from 'react-router-dom'
import {Badge} from 'primereact/badge'
import {useSelector} from 'react-redux'
import {getCompanySettingSelector} from '../../../../../redux/selectors/SettingsSelectors'

const QuikLinksCard = ({payrollExecuteStatus}) => {
    const companySetting = useSelector(getCompanySettingSelector)
    const navigate = useNavigate()
    const navigateToQuickLink = (path) => {
        navigate(path)
    }
    return (
        <>
            {' '}
            {/* Top card 1 */}
            {/* <div
                className='bg-cmwhite shadow-sm p-5 mb-10'
                style={{borderRadius: '10px', fontWeight: 700, fontSize: '16px'}}
            >
                <div className='mb-5'>Complete Setup to start payroll</div>
                <div className='mb-5'>Finish Integrations</div>
            </div> */}
            {/* QuickLinks Card */}
            <div
                className='bg-cmwhite shadow-sm p-5 mb-10'
                style={{borderRadius: '10px', fontWeight: 700, fontSize: '16px'}}
            >
                <div className='mb-3 text-cmGrey900'>Quick Links</div>
                <div className='d-flex gap-4 flex-wrap align-items-center'>
                    <CustomButton
                        buttonType={BUTTON_TYPE.secondary}
                        buttonLabel=' Payroll Report'
                        onClick={() => navigateToQuickLink('/reports/payroll')}
                        buttonSize={BUTTON_SIZE.normal}
                    />

                    <CustomButton
                        buttonType={BUTTON_TYPE.secondary}
                        buttonLabel='Send Alerts'
                        onClick={() => navigateToQuickLink('/alert-center/alerts')}
                        buttonSize={BUTTON_SIZE.normal}
                    />

                    <div style={{width: 'fit-content'}} className='position-relative p-0 m-0'>
                        <CustomButton
                            buttonType={BUTTON_TYPE.secondary}
                            buttonLabel='Finalize Payroll'
                            onClick={() =>
                                navigateToQuickLink('/payroll/run-payroll?currentPayroll')
                            }
                            buttonSize={BUTTON_SIZE.normal}
                        />
                        {!payrollExecuteStatus ? (
                            <span className='position-absolute top-0 start-100 translate-middle w-20px h-20px d-flex flex-center bg-cmError border border-light rounded-circle text-cmwhite fs-6'>
                                !
                            </span>
                        ) : null}
                    </div>

                    {companySetting?.reconciliation ? (
                        <CustomButton
                            buttonType={BUTTON_TYPE.secondary}
                            buttonLabel=' Reconciliations'
                            // to={`customer-Info?pid=${item?.pid}`}
                            onClick={() =>
                                navigateToQuickLink(`/payroll/reconciliation?currentRecon`)
                            }
                            buttonSize={BUTTON_SIZE.normal}
                        />
                    ) : null}
                </div>
            </div>
        </>
    )
}

export default QuikLinksCard

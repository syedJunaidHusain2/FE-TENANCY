import React, {useMemo, useState} from 'react'
import QuikLinksCard from './components/QuikLinksCard'
import PayrollSummaryCard from './components/payrollSummary/PayrollSummaryCard'
import OfficeSalesPerformanceCard from './components/officeSalesPerformance/OfficeSalesPerformanceCard'
import AlertSectionCard from './components/alertSection/AlertSectionCard'
import AnnouncementsCard from './components/anouncements/AnnouncementsCard'
import {getValidDate} from '../../../../constants/constants'
import {getUserDataSelector} from '../../../../redux/selectors/AuthSelectors'
import {useSelector} from 'react-redux'
import {fontsFamily} from '../../../../assets/fonts/fonts'
import useCustomAccessRights from '../../../../accessRights/useCustomAccessRights'
import CustomButton, {BUTTON_SIZE} from '../../../../customComponents/customButtton/CustomButton'

const AdminDashbaord = () => {
    const [payrollExecuteStatus, setPayrollExecuteStatus] = useState(null)
    const userData = useSelector(getUserDataSelector)
    return (
        <div
            className='row'
            style={{fontFamily: fontsFamily.manrope, fontSize: '14px', marginTop: -20}}
        >
            <div className='col-xl-8'>
                <div className='text-cmGrey900 mb-10' style={{fontWeight: 600}}>
                    <span className='text-cmGrey800'> Last Login:</span>{' '}
                    {getValidDate(userData?.lastLogin, 'MM/DD/YYYY [at] hh:mm a') ?? '-'}
                </div>

                <QuikLinksCard payrollExecuteStatus={payrollExecuteStatus} />

                <PayrollSummaryCard setPayrollExecuteStatus={setPayrollExecuteStatus} />

                <OfficeSalesPerformanceCard />
            </div>
            <div className='col-sm'>
                <div className='mb-10'>
                    <AlertSectionCard />
                </div>
                <div>
                    <AnnouncementsCard />
                </div>
            </div>
        </div>
    )
}

export default AdminDashbaord

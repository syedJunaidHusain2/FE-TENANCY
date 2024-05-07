import React, {useState} from 'react'
import SalesReportCard from './salesReport/SalesReportCard'
import GoalTracker from './goalTraker/GoalTracker'
import QuickLinksCardStandard from './quickLinksStd/QuickLinksCardStandard'
import AnnouncementsCardStandard from './announcementsStd/AnnouncementsCardStandard'
import AlertSectionCardStandard from './alertSection/AlertSectionCardStandard'
import OfficePerformaceCard from './officePerformanceStd/OfficePerformaceCard'
import DashBoardCalendarCard from './dashboardCalendar.js/DashBoardCalendarCard'
import {useSelector} from 'react-redux'
import {getUserDataSelector} from '../../../../redux/selectors/AuthSelectors'
import {getValidDate} from '../../../../constants/constants'

const StandardDashboard = () => {
    const [filter, setFilter] = useState('this_week')
    const userData = useSelector(getUserDataSelector)

    return (
        <div className='row' style={{fontFamily: 'Manrope', fontSize: '14px'}}>
            <div className='col-xl-8'>
                <div className='text-cmGrey900 mb-10' style={{fontWeight: 600}}>
                    <span className='text-cmGrey800'> Last Login:</span>
                    {getValidDate(userData?.lastLogin, 'MM/DD/YYYY [at] hh:mm a') ?? '-'}
                </div>

                <div className='mb-10'>
                    <AnnouncementsCardStandard />
                </div>

                <div className='mb-10'>
                    <QuickLinksCardStandard />
                </div>

                <div className='row align-items-start justify-content-between mb-10'>
                    <div className='col-sm-4 mb-sm-0 mb-10'>
                        <SalesReportCard setGoalFilter={setFilter} />{' '}
                    </div>
                    <div className='col-sm'>
                        <GoalTracker filter={filter} />{' '}
                    </div>
                </div>
                <div>
                    <OfficePerformaceCard />
                </div>
            </div>
            <div className='col-sm'>
                <div className='mb-10'>
                    <DashBoardCalendarCard />
                </div>
                <div>{/* <AlertSectionCardStandard /> */}</div>
            </div>
        </div>
    )
}

export default StandardDashboard

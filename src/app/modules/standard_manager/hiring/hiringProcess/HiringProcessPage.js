import React, {useState} from 'react'
import {HiringProgressCards} from './HiringProgressCards'
import HiringTable from './HiringTable'
import {OfficeChart} from './OfficeChart'
import {RecentlyHiredList} from './RecentlyHiredList'
import CustomLoader from '../../../../../customComponents/customLoader/CustomLoader'
import useOfficeLocation from '../../../../../hooks/useOfficeLocation'
import HiringCalendar2 from './HiringCalendar'

const HiringProcessPage = () => {
    const [loading, setLoading] = useState(true)
    const [cardsData, setCardsData] = useState(null)
    const [officeList, selectedLocation, setSelectedLocation] = useOfficeLocation()
    return (
        <div className='row' style={{position: 'relative'}}>
            <CustomLoader full visible={loading} />

            <div className='col-xxl-8' >
                <div style={{borderRadius: '0 10px 10px 10px'}} >
                    <OfficeChart
                        setSelectedLocation={setSelectedLocation}
                        load={setLoading}
                        selectedLocation={selectedLocation}
                        locationList={officeList}
                    />
                </div>
                <div className='row m-4 mx-auto my-10  gap-8'>
                    <HiringProgressCards
                        heading={cardsData?.active_lead ?? '0'}
                        content='Active Leads'
                        className='col-sm '
                        background='#FFF4DE'
                    />
                    <HiringProgressCards
                        heading={cardsData?.total_lead ?? '0'}
                        content='Total Leads'
                        className='col-sm '
                        background='#E1E9FF'
                    />
                    <HiringProgressCards
                        heading={cardsData?.Hired ?? '0'}
                        content='Hired'
                        className='col-sm'
                        background='#D7F9EF'
                    />
                </div>
                <div className='mb-5'>
                    <HiringTable
                        selectedLocation={selectedLocation}
                        getCardData={(data) => setCardsData(data)}
                    />
                </div>
            </div>
            <div className='col-xxl-4'>
                <div className='d-flex flex-column gap-10 w-auto'>
                    <div>
                        {/* <HiringCalendar /> */}
                        <HiringCalendar2 location={selectedLocation} />
                    </div>
                    <div>
                        <RecentlyHiredList selectedLocation={selectedLocation} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HiringProcessPage

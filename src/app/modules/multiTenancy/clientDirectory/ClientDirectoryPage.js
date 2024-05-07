import React from 'react'
import {fontsFamily} from '../../../../assets/fonts/fonts'
import {KTSVG} from '../../../../_metronic/helpers'
import {useNavigate} from 'react-router-dom'
import ActiveBillingCrad from './clientDirectoryTopCards/ActiveBillingCrad'
import TotalSalesCard from './clientDirectoryTopCards/TotalSalesCard'
import ClientandUsersCard from './clientDirectoryTopCards/ClientandUsersCard'
import ClientDirectoryTable from './clientDirectoryTable/ClientDirectoryTable'

const ClientDirectoryPage = () => {
    const naviagte = useNavigate()

    return (
        <div className='container' style={{fontFamily: fontsFamily.manrope}}>
            <div className='d-flex align-items-center gap-3 mb-2'>
                <div>
                    <KTSVG
                        path='/media/icons/duotune/art/back-square.svg'
                        svgClassName='h-25px w-25px cursor-pointer'
                        onClick={() => naviagte(-1)}
                    />
                </div>
                <div
                    className='text-cmGrey900 my-5'
                    style={{fontSize: 20.58, fontWeight: 700, lineHeight: '28px'}}
                >
                    Client Directory
                </div>
            </div>
            {/* Cards */}
            <div className='mb-10 row w-100 mx-auto gap-10'>
                <ActiveBillingCrad className={'col-sm px-sm-10 py-5'} style={{borderRadius: 10}} />
                <TotalSalesCard className={'col-sm px-sm-10 py-5'} style={{borderRadius: 10}} />
                <ClientandUsersCard className={'col-sm px-sm-10 py-5'} style={{borderRadius: 10}} />
            </div>
            {/* table */}
            <ClientDirectoryTable />
        </div>
    )
}

export default ClientDirectoryPage

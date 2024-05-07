import React, {useCallback, useEffect, useState} from 'react'
import {fontsFamily} from '../../../../../../../assets/fonts/fonts'
import {formattedNumberFields} from '../../../../../../../helpers/CommonHelpers'
import UnquiePidTable from './UnquiePidTable'
import {KTSVG} from '../../../../../../../_metronic/helpers'
import {useLocation, useNavigate} from 'react-router-dom'
import {
    getBillingPidDataService,
    getSubscriptionPidDataService,
} from '../../../../../../../services/Services'
import CustomLoader from '../../../../../../../customComponents/customLoader/CustomLoader'

const UniquePidPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [pidsData, setPidsData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [activePage, setActivePage] = useState(1)

    useEffect(() => {
        setLoading(true)
        if (location?.state?.history) {
            const body = {
                subscription_id: location?.state?.uniquePid,
                page: activePage,
                billing_history_id: location?.state?.billingId,
            }
            getBillingPidDataService(body)
                .then((res) => setPidsData(res))
                .finally(() => setLoading(false))
        } else {
            getSubscriptionPidList()
        }
    }, [activePage])

    const getSubscriptionPidList = useCallback(() => {
        const body = {
            subscription_id: location?.state?.uniquePid,
            page: activePage,
        }
        getSubscriptionPidDataService(body)
            .then((res) => setPidsData(res))
            .finally(() => setLoading(false))
    }, [activePage, location?.state?.uniquePid])
    const handlePageChange = (page) => {
        setActivePage(page)
    }

    return (
        <div
            className=''
            style={{fontFamily: fontsFamily.manrope, fontSize: '14px', position: 'relative'}}
        >
            <CustomLoader full visible={loading} />

            <div className='d-flex gap-5 align-items-center mb-5'>
                <div onClick={() => navigate(-1)}>
                    <KTSVG
                        path='/media/icons/duotune/art/back-square.svg'
                        className='cursor-pointer'
                        svgClassName='w-25px h-25px'
                    />
                </div>
                <div
                    className='text-cmGrey900'
                    style={{fontFamily: fontsFamily.manrope, fontSize: '16px', fontWeight: 600}}
                >
                    Unique PIDs
                </div>
            </div>
            <div className='container mb-10' style={{}}>
                <div className='row gap-10'>
                    {/* Card 1 */}
                    <div
                        className='col-sm-2 card'
                        style={{borderRadius: 10, backgroundColor: '#E1E9FF'}}
                    >
                        <div className='card-body'>
                            <div
                                className='card-title text-cmGrey900'
                                style={{fontSize: 20, fontWeight: 700}}
                            >
                                {pidsData?.pid_total}
                            </div>
                            <div className='card-text text-cmGrey800' style={{fontWeight: 700}}>
                                Unique PIDs
                            </div>
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div
                        className='col-sm-2 card'
                        style={{borderRadius: 10, backgroundColor: '#E1E9FF'}}
                    >
                        <div className='card-body'>
                            <div
                                className='card-title text-cmGrey900'
                                style={{fontSize: 20, fontWeight: 700}}
                            >
                                {pidsData?.kw_total}
                            </div>
                            <div className='card-text text-cmGrey800' style={{fontWeight: 700}}>
                                Total KW
                            </div>
                        </div>
                    </div>
                    {/* Card 3 */}
                    <div
                        className='col-sm-2 card'
                        style={{borderRadius: 10, backgroundColor: '#E1E9FF'}}
                    >
                        <div className='card-body'>
                            <div
                                className='card-title text-cmGrey900'
                                style={{fontSize: 20, fontWeight: 700}}
                            >
                                {formattedNumberFields(pidsData?.total_price, '$')}
                            </div>
                            <div className='card-text text-cmGrey800' style={{fontWeight: 700}}>
                                Total Price
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <UnquiePidTable
                tableData={pidsData?.data}
                setTableData={setPidsData}
                activePage={activePage}
                onPageChange={handlePageChange}
            />
        </div>
    )
}

export default UniquePidPage

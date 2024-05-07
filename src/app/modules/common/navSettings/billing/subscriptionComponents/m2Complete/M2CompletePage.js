import React, {useEffect, useState} from 'react'
import {formattedNumberFields} from '../../../../../../../helpers/CommonHelpers'
import {fontsFamily} from '../../../../../../../assets/fonts/fonts'
import {KTSVG} from '../../../../../../../_metronic/helpers'
import {useLocation, useNavigate} from 'react-router-dom'
import M2CompleteTable from './M2CompleteTable'
import {
    getBillingM2DataService,
    getSubscriptionM2CompleteDataService,
} from '../../../../../../../services/Services'
import CustomLoader from '../../../../../../../customComponents/customLoader/CustomLoader'

const M2CompletePage = () => {
    const navigate = useNavigate()

    const location = useLocation()
    const [m2CompleteData, setM2CompleteData] = useState(null)
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
            getBillingM2DataService(body)
                .then((res) => setM2CompleteData(res))
                .finally(() => setLoading(false))
        } else {
            const body = {
                subscription_id: location?.state?.uniquePid,
                page: activePage,
            }
            getSubscriptionM2CompleteDataService(body)
                .then((res) => setM2CompleteData(res))
                .finally(() => setLoading(false))
        }
    }, [activePage])

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
                    M2 Completed
                </div>
            </div>
            <div className='container mb-10'>
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
                                {m2CompleteData?.m2_total}
                            </div>
                            <div className='card-text text-cmGrey800' style={{fontWeight: 700}}>
                                M2 Complete
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
                                {formattedNumberFields(m2CompleteData?.kw_total, '')}
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
                                {formattedNumberFields(m2CompleteData?.total_price, '$')}
                            </div>
                            <div className='card-text text-cmGrey800' style={{fontWeight: 700}}>
                                Total Price
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <M2CompleteTable
                tableData={m2CompleteData?.data}
                activePage={activePage}
                onPageChange={handlePageChange}
            />
        </div>
    )
}

export default M2CompletePage

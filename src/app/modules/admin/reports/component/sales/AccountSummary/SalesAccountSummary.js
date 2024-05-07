import React, {useEffect, useState} from 'react'
import {fontsFamily} from '../../../../../../../assets/fonts/fonts'
import {useLocation, useNavigate} from 'react-router-dom'
import {formattedNumberFields} from '../../../../../../../helpers/CommonHelpers'

import {
    salesAccountSummaryService,
    salesAccountSummarybyPositionService,
} from '../../../../../../../services/Services'
import CustomLoader from '../../../../../../../customComponents/customLoader/CustomLoader'
import CustomDropdown from '../../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import {TabView, TabPanel} from 'primereact/tabview'
import Commisions from './components/Commisions'
import Overrides from './components/Overrides'
import AccountSummaryCompany from './components/AccountSummaryCompany'

const SalesAccountSummary = () => {
    const naviagte = useNavigate()
    const location = useLocation()
    const [summaryData, setSummaryData] = useState(null)
    const [summaryDatabyPosition, setSummaryDatabyPosition] = useState(null)
    const [loading, setLoading] = useState(false)
    const [typeFilter, setTypeFilter] = useState(1)
    const [tab, setTab] = useState(1)

    useEffect(() => {
        setLoading(true)
        const body = {
            pid: location?.state?.pid,
        }
        if (typeFilter == 1) {
            salesAccountSummaryService(body)
                .then((res) => {
                    setSummaryData(res)
                })
                .finally(() => {
                    setLoading(false)
                })
        } else {
            salesAccountSummarybyPositionService(body)
                .then((res) => {
                    setSummaryData(res)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [location?.state?.pid, typeFilter])

    return (
        <div>
            <div
                className='mb-10'
                style={{
                    zIndex: 1,
                    borderRadius: '10px',
                    fontFamily: fontsFamily.manrope,
                    fontSize: '14px',
                    position: 'relative',
                }}
            >
                {/* 1st card */}
                <div
                    className='d-flex flex-wrap align-items-center justify-content-between px-sm-10 px-2 py-5 bg-cmwhite shadow-sm rounded mb-15'
                    style={{fontFamily: 'Manrope', fontSize: '16px', fontWeight: '600'}}
                >
                    <div
                        className='d-flex gap-2 align-items-center cursor-pointer '
                        onClick={() => naviagte(-1)}
                    >
                        <div className='bi bi-box-arrow-left fs-1 text-cmGrey600 text-hover-dark cursor-pointer'></div>
                        <div className='text-cmGrey900'>
                            {location?.state?.pid} - {location?.state?.name} | Account Summary
                        </div>
                    </div>
                    <div className=''>
                        <CustomDropdown
                            options={[
                                {name: 'By Type', value: 1},
                                {name: 'By Position', value: 2},
                            ]}
                            searching={false}
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            showClear={false}
                        />
                    </div>
                </div>
                {/* Card 2 */}
                <div className=''>
                    <div
                        className='d-flex align-items-center gap-5'
                        style={{fontWeight: '700', fontSize: 14, fontFamily: fontsFamily.manrope}}
                    >
                        <div
                            className={`bg-cmwhite cursor-pointer px-4 py-3 ${
                                tab == 1 ? 'text-cmBlue-Crayola' : 'text-cmGrey800'
                            } `}
                            style={{borderRadius: '10px 10px 0px 0px'}}
                            onClick={() => setTab(1)}
                        >
                            Commissions
                        </div>
                        <div
                            className={`bg-cmwhite cursor-pointer px-4 py-3  ${
                                tab == 2 ? 'text-cmBlue-Crayola' : 'text-cmGrey800'
                            } `}
                            style={{
                                borderRadius: '10px 10px 0px 0px',
                            }}
                            onClick={() => setTab(2)}
                        >
                            Overrides
                        </div>
                        <div
                            className={`bg-cmwhite cursor-pointer px-4 py-3  ${
                                tab == 3 ? 'text-cmBlue-Crayola' : 'text-cmGrey800'
                            } `}
                            style={{
                                borderRadius: '10px 10px 0px 0px',
                            }}
                            onClick={() => setTab(3)}
                        >
                            Company
                        </div>
                    </div>
                    <div
                        className='bg-cmwhite shadow-sm  mb-20 p-0'
                        style={{borderRadius: '0px 12px 12px 12px'}}
                    >
                        {tab === 1 ? (
                            <Commisions
                                typeFilter={typeFilter}
                                sumData={summaryData}
                                loading={loading}
                            />
                        ) : tab === 2 ? (
                            <Overrides
                                typeFilter={typeFilter}
                                summaryData={summaryData?.override}
                                loading={loading}
                            />
                        ) : (
                            <AccountSummaryCompany pid={location?.state?.pid} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SalesAccountSummary

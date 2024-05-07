import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {
    getCompanySettingSelector,
    getPositionSettingSelector,
} from '../../../../../../redux/selectors/SettingsSelectors'
import PayPeriodCustomerInfo from './PayPeriodCustomerInfo'
import PayPeriodTableCard from './PayPeriodTableCard'
import {getPastPaystubUserDetailService} from '../../../../../../services/Services'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'

const PayPeriodPage = () => {
    const naviagte = useNavigate()
    const companySetting = useSelector(getCompanySettingSelector)
    const positionSetting = useSelector(getPositionSettingSelector)

    return (
        <div
            style={{
                fontWeight: '600',
                fontFamily: 'Manrope',
                fontSize: '14px',
                position: 'relative',
            }}
        >
            {/* Top Header */}
            <div
                className='bg-cmwhite d-flex align-items-center gap-5 ps-5 py-5 shadow-sm text-cmGrey900 mb-10'
                style={{borderRadius: '0px 10px 10px 10px'}}
            >
                <div
                    onClick={() => naviagte(-1)}
                    className='bi bi-box-arrow-left fs-1 text-cmGrey600 text-hover-dark cursor-pointer'
                ></div>
                <div className=''> Pay Stub (Leslie Alexander, December 2022)</div>
            </div>
            {/* Table Cards starts */}
            <div className='mb-10'>
                <PayPeriodTableCard />
            </div>
            {/* View Reconciliation Report button */}
            {companySetting?.reconciliation && positionSetting?.reconciliation_status ? (
                <div className='text-center'>
                    <Link to={'/smReports/reconciliation'}>
                        <div
                            className='btn bg-cmBlue-Crayola text-cmwhite px-sm-15 px-10'
                            style={{fontWeight: '600', fontFamily: 'Manrope', fontSize: '14px'}}
                        >
                            View Reconciliation Report
                        </div>
                    </Link>
                </div>
            ) : null}

            {/* Customer info Table  */}
            <div>
                <PayPeriodCustomerInfo />
            </div>
        </div>
    )
}

export default PayPeriodPage

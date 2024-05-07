import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import PayStabCustomerInfoTable from './components/PayStabCustomerInfoTable'
import PayStubCard from './components/PayStubCard'
import {
    getCurrentPaystubDetailService,
    getPastPaystubDetailListService,
} from '../../../../../../../../services/Services'
import CustomLoader from '../../../../../../../../customComponents/customLoader/CustomLoader'
import {getValidDate} from '../../../../../../../../constants/constants'
import {PDFDownloadLink} from '@react-pdf/renderer'
import ExportPayStub from './exportPayStub/ExportPayStub'
import CustomButton, {
    BUTTON_TYPE,
} from '../../../../../../../../customComponents/customButtton/CustomButton'
import {useSelector} from 'react-redux'
import {getUserDataSelector} from '../../../../../../../../redux/selectors/AuthSelectors'
import {fontsFamily} from '../../../../../../../../assets/fonts/fonts'

export const payStubSections = {
    commission: 0,
    overrides: 1,
    deduction: 2,
    adjustment: 3,
    reimbursement: 4,
}
const PayStabPage = ({current}) => {
    const sectionRefs = useMemo(() => new Array(5).fill().map(() => React.createRef()), [])
    const location = useLocation()
    const [payStubDetail, setPayStubDetail] = useState(null)
    const [loading, setLoading] = useState(false)
    const exportSectionRefs = useMemo(() => new Array(5).fill().map(() => React.createRef()), [])
    const loggedUser = useSelector(getUserDataSelector)
    const navigate = useNavigate()

    useEffect(() => {
        if (location.state) {
            getPayStubData()
        }
        if (current) getCurrentPayStubData()
    }, [location])

    const getPayStubData = (search) => {
        let {end_date, start_date, userId} = location?.state
        setLoading(true)
        const body = {
            start_date: start_date,
            end_date: end_date,
            user_id: userId,
        }
        if (!search)
            getPastPaystubDetailListService(body)
                .then((res) => {
                    setPayStubDetail(res?.data)
                })
                .finally(() => setLoading(false))
    }

    const commonDataShouldBePassAsBodyInApi = useMemo(() => {
        if (current) {
            return {
                id: payStubDetail?.payroll_id,
                user_id: loggedUser?.id,
                pay_period_from: payStubDetail?.pay_stub?.pay_period_from,
                pay_period_to: payStubDetail?.pay_stub?.pay_period_to,
            }
        }
        if (location.state) {
            return {
                id: payStubDetail?.payroll_id,
                user_id: location?.state?.userId,
                pay_period_from: location?.state?.start_date,
                pay_period_to: location?.state?.end_date,
            }
        }
    }, [
        current,
        location.state,
        loggedUser?.id,
        payStubDetail?.pay_stub?.pay_period_from,
        payStubDetail?.pay_stub?.pay_period_to,
        payStubDetail?.payroll_id,
    ])

    const getCurrentPayStubData = () => {
        setLoading(true)
        getCurrentPaystubDetailService()
            .then((res) => {
                setPayStubDetail(res?.data)
            })
            .finally(() => setLoading(false))
    }

    const onSectionPress = useCallback(
        (key) => {
            let sectionName = payStubSections[key]
            sectionRefs?.[payStubSections.commission]?.current?.classList.remove(
                'border',
                'border-cmSuccess'
            )
            sectionRefs?.[payStubSections.overrides]?.current?.classList.remove(
                'border',
                'border-cmSuccess'
            )
            sectionRefs?.[payStubSections.deduction]?.current?.classList.remove(
                'border',
                'border-cmSuccess'
            )
            sectionRefs?.[payStubSections.adjustment]?.current?.classList.remove(
                'border',
                'border-cmSuccess'
            )
            sectionRefs?.[payStubSections.reimbursement]?.current?.classList.remove(
                'border',
                'border-cmSuccess'
            )
            sectionRefs?.[sectionName]?.current?.classList.add('border', 'border-cmSuccess')

            sectionRefs?.[sectionName]?.current?.scrollIntoView({
                behavior: 'smooth',
            })
        },
        [sectionRefs]
    )

    return (
        <div style={{fontWeight: '600', fontFamily: fontsFamily.manrope, fontSize: '14px'}}>
            {/* Top Header */}
            <CustomLoader visible={loading} full />

            <div className='card mb-10'>
                <div
                    className='d-flex justify-content-between align-items-center bg-cmwhite ps-5 py-5 text-cmGrey900'
                    style={{
                        borderRadius: '0px 10px 10px 10px',
                        boxShadow:
                            'rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
                    }}
                >
                    <div className='d-flex gap-5 align-items-center'>
                        <div
                            className='bi bi-box-arrow-left fs-1 text-cmGrey600 text-hover-dark cursor-pointer'
                            onClick={() => navigate(-1)}
                        ></div>{' '}
                        {payStubDetail?.employee?.first_name ? (
                            <div>
                                Pay Stub ({payStubDetail?.employee?.first_name}{' '}
                                {payStubDetail?.employee?.last_name},{' '}
                                {getValidDate(payStubDetail?.pay_stub?.pay_period_from)} -{' '}
                                {getValidDate(payStubDetail?.pay_stub?.pay_period_to)})
                            </div>
                        ) : null}
                    </div>
                    <div></div>
                    <div className='App me-5'>
                        {/* {location?.state?.past || Array.isArray(payStubDetail) ? ( */}
                        <PDFDownloadLink
                            document={
                                <ExportPayStub
                                    cardData={payStubDetail}
                                    payroll_id={payStubDetail?.payroll_id ?? null}
                                    commonDataShouldBePassAsBodyInApi={
                                        commonDataShouldBePassAsBodyInApi
                                    }
                                />
                            }
                            fileName={`${getValidDate(new Date(), 'MMMM DD yyyy')}-paystub.pdf`}
                        >
                            <CustomButton
                                type='submit'
                                buttonType={BUTTON_TYPE.disabled}
                                buttonLabel='Export'
                                icon={'pi pi-file-export'}
                            />
                        </PDFDownloadLink>
                        {/* ) : null} */}
                    </div>
                </div>
            </div>
            {/* Table Cards starts */}
            <div className='mb-10'>
                <PayStubCard cardData={payStubDetail} onSectionPress={onSectionPress} />
            </div>

            {/* Customer info Table  */}
            {!Array.isArray(payStubDetail) ? (
                <div>
                    <PayStabCustomerInfoTable
                        sectionRefs={sectionRefs}
                        exportSectionRefs={exportSectionRefs}
                        commonDataShouldBePassAsBodyInApi={commonDataShouldBePassAsBodyInApi}
                    />
                </div>
            ) : null}
        </div>
    )
}

export default PayStabPage

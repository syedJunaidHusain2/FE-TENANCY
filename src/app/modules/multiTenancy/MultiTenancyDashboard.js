import {KTSVG} from '../../../_metronic/helpers'
import {fontsFamily} from '../../../assets/fonts/fonts'
import CustomButton, {BUTTON_SIZE} from '../../../customComponents/customButtton/CustomButton'
import {useNavigate} from 'react-router'
import {getUserDataSelector} from '../../../redux/selectors/AuthSelectors'
import {useSelector} from 'react-redux'
import {getValidDate} from '../../../constants/constants'
import {useCallback} from 'react'
import {logoutAction} from '../../../redux/actions/AuthActions'
import {useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {formattedNumberFields} from '../../../helpers/CommonHelpers'
import Chart from 'react-apexcharts'
import CustomDropdown from '../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomImage from '../../../customComponents/customImage/CustomImage'

const MultiTenancyDashboard = () => {
    const naviagte = useNavigate()
    const dispatch = useDispatch()

    const userData = useSelector(getUserDataSelector)

    const onLogoutPress = useCallback(() => {
        dispatch(logoutAction())
    }, [dispatch])

    return (
        <div className='' style={{fontFamily: fontsFamily.manrope}}>
            {/* Body */}
            <div className='container text-cmBlack' style={{}}>
                {/* header */}
                <div>
                    <div style={{fontSize: 34, fontWeight: 800}}>Welcome to Sequifi!</div>
                    <div className='text-cmGrey900' style={{fontSize: 15.5, fontWeight: 600}}>
                        <span className='text-cmGrey800'>Last Login:</span>
                        {getValidDate(userData?.lastLogin, 'MM/DD/YYYY [at] hh:mm a') ?? '-'}
                    </div>
                </div>
                {/* body */}
                <div className='d-flex flex-center gap-10 my-10'>
                    <CustomButton
                        buttonLabel='Add a new Client'
                        onClick={() => naviagte('/company-onboarding/new-user')}
                        buttonSize={BUTTON_SIZE.large}
                    />
                    <CustomButton
                        buttonLabel='Client Directory'
                        buttonSize={BUTTON_SIZE.large}
                        onClick={() => naviagte('/company-onboarding/client-directory')}
                    />
                </div>

                <div className='row gap-xxl-10 gap-5 mb-10'>
                    <div className='col-lg'>
                        <CommonTopCards
                            heading1={formattedNumberFields(20678.93)}
                            content1={'Total Sales'}
                            heading2={formattedNumberFields(20678.93)}
                            content2={'Sales this month'}
                        />
                    </div>
                    <div className='col-lg'>
                        <CommonTopCards
                            heading1={123}
                            content1={'New Clients'}
                            heading2={123}
                            content2={'Total Clients'}
                            heading3={123}
                            content3={'Users'}
                        />
                    </div>
                </div>
                {/* Charts */}
                <div className='row gap-10 '>
                    <div className='col-lg'>
                        <EarningChart />
                    </div>
                    <div className='col-xl-3 col-lg-4 d-flex flex-wrap gap-10'>
                        <div className='w-100'>
                            <CustomSideCard
                                heading={'6'}
                                subHeading={'Clients Onboarded'}
                                icon={'UsersThree'}
                                iconBackground={'#EAE6FF'}
                            />
                        </div>
                        <div className='w-100'>
                            <CustomSideCard
                                heading={'60K'}
                                subHeading={'Earnings'}
                                icon={'greenDollar'}
                                iconBackground={'rgba(93, 184, 135, 0.2)'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MultiTenancyDashboard

// Inside components
const CommonTopCards = ({
    background,
    className,
    heading1,
    heading2,
    content1,
    content2,
    heading3,
    content3,
}) => (
    <div
        className={`card card-flush ${className} px-xl-20 px-10 py-xl-10 py-5 shadow-sm`}
        style={{
            backgroundColor: background,
            fontFamily: fontsFamily.manrope,
        }}
    >
        <div className='d-sm-flex justify-content-between'>
            <div>
                <div
                    className='text-cmGrey900'
                    style={{fontWeight: '800', fontSize: '30px', lineHeight: '40px'}}
                >
                    {heading1}
                </div>
                <div
                    className='text-cmGrey500'
                    style={{
                        fontWeight: '500',
                        fontSize: '18px',
                        lineHeight: '30px',
                    }}
                >
                    {content1}
                </div>
            </div>
            <div className='vr d-sm-block d-none' />
            <hr className=' d-sm-none d-block' />
            <div>
                <div
                    className='text-cmGrey900'
                    style={{fontWeight: '800', fontSize: '30px', lineHeight: '40px'}}
                >
                    {heading1}
                </div>
                <div
                    className='text-cmGrey500'
                    style={{
                        fontWeight: '500',
                        fontSize: '18px',
                        lineHeight: '30px',
                    }}
                >
                    {content1}
                </div>
            </div>
            {heading3 ? (
                <>
                    <div className='vr d-sm-block d-none' />
                    <hr className=' d-sm-none d-block' />
                    <div>
                        <div
                            className='text-cmGrey900'
                            style={{fontWeight: '800', fontSize: '30px', lineHeight: '40px'}}
                        >
                            {heading1}
                        </div>
                        <div
                            className='text-cmGrey500'
                            style={{
                                fontWeight: '500',
                                fontSize: '18px',
                                lineHeight: '30px',
                            }}
                        >
                            {content1}
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    </div>
)

const EarningChart = () => {
    const axisTextStyle = {
        fontsFamily: fontsFamily.manrope,
        colors: '#979699',
        fontSize: '13.5px',
        fontWeight: '600',
        lineHeight: '18.26px',
    }

    const chartOptions = {
        chart: {
            type: 'line',
        },
        toolbar: {
            show: false,
        },
        grid: {
            borderColor: '#F2EDEE',
            padding: {
                left: 25,
                right: 25,
            },
        },
        xaxis: {
            categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sept',
                'Oct',
                'Nov',
                'Dec',
            ],
            labels: {
                style: axisTextStyle,
            },
        },
        yaxis: {
            // title: {
            //     text: 'Value',
            // },

            labels: {
                style: axisTextStyle,
            },
        },
        // dataLabels: {
        //     enabled: false,
        // },
        stroke: {
            curve: 'smooth',
            width: [3, 3],
        },
        colors: ['#6078EC', '#00c247'], // Set custom colors for each line
        markers: {
            size: 5, // Adjust the size of data point markers
        },
        legend: {
            show: false,
        },
    }

    const chartSeries = [
        {
            name: 'Earned',
            data: [55, 66, 70, 50, 40, 10, 45],
        },
        {
            name: 'Forecasted',
            data: [66, 77, 80, 33, 12, 15, 35],
        },
    ]
    return (
        <div
            className='bg-cmwhite  p-10 pb-5 shadow-sm'
            style={{fontFamily: fontsFamily.manrope, borderRadius: 10}}
        >
            <div className='d-flex justify-content-between gap-5 flex-wrap mb-5'>
                <div>
                    <div className='text-cmGrey900' style={{fontSize: 28, fontWeight: 600}}>
                        {formattedNumberFields(20833.89)}
                    </div>
                    <div className='text-cmBlue-Crayola' style={{fontSize: 15.5, fontWeight: 500}}>
                        Total Earnings via Sales
                    </div>
                </div>
                <div
                    className='d-flex flex-center gap-5 flex-wrap text-cmGrey600'
                    style={{fontSize: 13.5, fontWeight: 500, lineHeight: '18.3px'}}
                >
                    <div>
                        <span className='badge badge-cmBlue-Crayola badge-circle w-10px h-10px me-2' />
                        <span>Earned</span>
                    </div>
                    <div>
                        <span className='badge badge-cmSuccess badge-circle w-10px h-10px me-2' />
                        <span>Forecasted</span>
                    </div>
                    <div>
                        <CustomDropdown className='' placeholder='6 months' />
                    </div>
                </div>
            </div>
            <Chart options={chartOptions} series={chartSeries} type='line' height={250} />
        </div>
    )
}

const CustomSideCard = ({heading, subHeading, icon, iconBackground}) => {
    return (
        <div
            className='bg-cmwhite  p-10 shadow-sm'
            style={{fontFamily: fontsFamily.manrope, borderRadius: 10}}
        >
            <div className='d-flex flex-start gap-5'>
                <div
                    className='badge badge-circle w-65px h-65px'
                    style={{backgroundColor: iconBackground}}
                >
                    <KTSVG
                        path={`/media/icons/duotune/art/${icon}.svg`}
                        svgClassName='w-35px h-35px cursor-pointer'
                    />
                </div>
                <div>
                    <div className='text-cmGrey900' style={{fontSize: 28, fontWeight: 600}}>
                        {heading}
                    </div>
                    <div
                        className='text-cmBlue-Crayola mb-3'
                        style={{fontSize: 15.4, fontWeight: 500, lineHeight: '21px'}}
                    >
                        {subHeading}
                    </div>
                    <div>
                        <CustomDropdown className='p-0' placeholder='6 months' />
                    </div>
                </div>
            </div>
        </div>
    )
}

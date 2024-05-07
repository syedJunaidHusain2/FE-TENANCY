import {Doughnut} from 'react-chartjs-2'
import {Chart, ArcElement} from 'chart.js'
import {formattedNumberFields} from '../../../../../../../helpers/CommonHelpers'
import CustomNoData from '../../../../../../../customComponents/customNoData/CustomNoData'

Chart.register(ArcElement)

const InstallRatioDonutChart = ({ratioData}) => {
    const data = {
        datasets: [
            {
                data: [
                    ratioData?.uninstall?.replace('%', ''),
                    ratioData?.install?.replace('%', ''),
                ],
                backgroundColor: ['rgba(96, 120, 236, 0.2)', '#6078EC'],
                display: true,
                // borderColor: ['rgba(96, 120, 236, 0.2)', '#6078EC'],
            },
        ],
    }

    return (
        <div
            className='bg-white py-3 shadow-sm px-10 w-100 mb-5 '
            style={{fontFamily: 'Manrope', borderRadius: '10px'}}
        >
            <div
                className=' text-center mb-5 text-cmGrey800'
                style={{fontSize: '14px', fontWeight: '600', fontFamily: 'Manrope'}}
            >
                Install Ratio
            </div>

            {Number(ratioData?.uninstall?.replace('%', '')) > 0 &&
            Number(ratioData?.install?.replace('%', '')) > 0 ? (
                <>
                    <div className='w-120px h-120px mx-auto'>
                        <Doughnut
                            data={data}
                            options={{
                                plugins: {
                                    legend: {
                                        display: false,
                                    },
                                    tooltip: {
                                        enabled: false,
                                    },
                                },
                                rotation: 90,
                                circumference: 360,
                                cutout: '80%',
                                // maintainAspectRatio: true,
                                // responsive: true,
                            }}
                        />
                    </div>
                    <div
                        style={{
                            position: 'relative',
                            top: '-1%',
                            left: '50%',
                            transform: 'translate(-50%, -300%)',
                            textAlign: 'center',
                        }}
                    >
                        <div style={{color: '#0D1821', fontSize: '16px', fontWeight: 'bold'}}>
                            {formattedNumberFields(ratioData?.install?.replace('%', ''), '')}%
                        </div>
                    </div>

                    <div className='d-flex flex-column mx-auto gap-2 text-center my-0 fw-normal'>
                        <div
                            className='d-flex align-items-center mx-auto'
                            style={{color: '#757575', fontSize: '12px', marginTop: '-15px'}}
                        >
                            <span
                                className='bullet rounded-circle-2 me-1 py-2 px-2'
                                style={{backgroundColor: '#6078EC'}}
                            />
                            Installed Accounts
                        </div>
                        <div
                            className='d-flex align-items-center mx-auto'
                            style={{color: '#757575', fontSize: '12px'}}
                        >
                            <span
                                className='bullet rounded-circle-2 me-1 py-2 px-2'
                                style={{backgroundColor: '#DFE4FB'}}
                            />
                            Uninstalled Accounts
                        </div>
                    </div>
                </>
            ) : (
                <div className='text-center'>
                    <div className='m-0 p-0 mb-5'>
                        <i className='bi bi-circle text-cmGrey400' style={{fontSize: '120px'}}></i>
                    </div>
                    <div className=''>
                        <CustomNoData label={'No data found'} />
                    </div>
                </div>
            )}
        </div>
    )
}
export default InstallRatioDonutChart

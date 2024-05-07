import {Doughnut} from 'react-chartjs-2'
import {Chart, ArcElement} from 'chart.js'
import {useState, useEffect} from 'react'
import {formattedNumberFields} from '../../../../../helpers/CommonHelpers'

Chart.register(ArcElement)

const SalesInstallRatioDonutChart = (props) => {
    useEffect(() => {
        //  install = props?.ratioData?.install?.replace("%","")
        //  unInstall = props?.ratioData?.uninstall?.replace("%","")
    })
    const data = {
        datasets: [
            {
                data: [props?.b, props?.a],
                backgroundColor: ['rgba(96, 120, 236, 0.2)', '#6078EC'],
                display: true,
                borderColor: ['rgba(96, 120, 236, 0.2)', '#6078EC'],
            },
        ],
    }

    return (
        <div
            className='bg-white h-100 py-3 shadow w-auto px-10'
            style={{fontFamily: 'Manrope', borderRadius: '10px'}}
        >
            <div
                className=' text-center mb-5 text-cmGrey800'
                style={{fontSize: '14px', fontWeight: '600', fontFamily: 'Manrope'}}
            >
                Install Ratio
            </div>
            <div className='w-100px h-100px mx-auto'>
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
                        cutout: '88%',
                        maintainAspectRatio: true,
                        responsive: true,
                    }}
                />
            </div>
            <div
                style={{
                    position: 'relative',
                    top: '-1%',
                    left: '50%',
                    transform: 'translate(-50%, -230%)',
                    textAlign: 'center',
                }}
            >
                <div style={{color: '#0D1821', fontSize: '17px', fontWeight: 'bold'}}>
                    {formattedNumberFields(props?.a, '')}%
                </div>
            </div>
            <div className='d-flex flex-column gap-2 align-items-center my-0 fw-normal'>
                <div
                    className='d-flex align-items-center'
                    style={{color: '#757575', fontSize: '12px', marginTop: '-15px'}}
                >
                    <span
                        className='bullet rounded-circle-2 me-1 py-2 px-2'
                        style={{backgroundColor: '#6078EC'}}
                    />
                    Installed Accounts
                </div>
                <div
                    className='d-flex align-items-center'
                    style={{color: '#757575', fontSize: '12px'}}
                >
                    <span
                        className='bullet rounded-circle-2 me-1 py-2 px-2'
                        style={{backgroundColor: '#DFE4FB'}}
                    />
                    Uninstalled Accounts
                </div>
            </div>
        </div>
    )
}
export default SalesInstallRatioDonutChart

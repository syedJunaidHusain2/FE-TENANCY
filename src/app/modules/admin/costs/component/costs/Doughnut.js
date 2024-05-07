import {Doughnut} from 'react-chartjs-2'
import {Chart, ArcElement} from 'chart.js'
import ApexCharts from 'apexcharts'

Chart.register(ArcElement)

const Doughnut1 = ({doughnutData}) => {
    let barArr = []
    let TootltipArr = []
    doughnutData?.data?.map((item) => {
        barArr.push(item?.amount)
        TootltipArr.push(item?.name)
    })

    const data = {
        labels: TootltipArr,

        datasets: [
            {
                data: barArr,
                backgroundColor: ['#6078EC', '#50CD89', '#FE679D', '#FFE16A'],
                display: true,
                borderColor: ['#6078EC', '#50CD89', '#FE679D', '#FFE16A'],
            },
        ],
    }

    return (
        <div className=''>
            <div className='w-200px'>
                <Doughnut
                    data={data}
                    options={{
                        plugins: {
                            legend: {
                                display: false,
                            },
                            tooltip: {
                                enabled: true,
                            },
                        },
                        rotation: -90,
                        circumference: 180,
                        cutout: '80%',
                        maintainAspectRatio: true,
                        responsive: true,
                    }}
                />
            </div>

            <div
                style={{
                    position: 'relative',
                    // top: '-66%',
                    // bottom:'35%',
                    left: '149%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <div style={{color: '#0D1821', fontSize: '12px', fontFamily: 'Manrope'}}></div>
            </div>
            <div
                style={{
                    position: 'relative',
                    bottom: '36%',
                    textAlign: 'center',
                }}
            >
                <div style={{color: '#9E9E9E', fontSize: '10px', fontFamily: 'Manrope'}}>
                    Amount
                </div>
                <div style={{color: '#0D1821', fontSize: '22px', fontWeight: 'bold'}}>
                    ${doughnutData?.total_costs ?? '0'}
                </div>
            </div>
        </div>
    )
}
export default Doughnut1

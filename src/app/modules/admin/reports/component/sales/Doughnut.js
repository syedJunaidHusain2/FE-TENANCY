import {Doughnut} from 'react-chartjs-2'
import {Chart, ArcElement} from 'chart.js'

Chart.register(ArcElement)

const Doughnut1 = ({graphsData}) => {
    const data = {
        datasets: [
            {
                data: [
                    graphsData?.m2_complete,
                    graphsData?.m2_pending,
                    graphsData?.cancelled,
                    graphsData?.clawback,
                ],
                backgroundColor: ['#6078EC', '#50CD89', '#FFE16A', '#FE679D'],
                display: true,
                borderColor: ['#6078EC', '#50CD89', '#FFE16A', '#FE679D'],
            },
        ],
    }
    return (
        <div className='w-175px'>
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
                    rotation: -90,
                    circumference: 180,
                    cutout: '80%',
                    maintainAspectRatio: true,
                    responsive: true,
                }}
            />
            <div
                style={{
                    position: 'relative',
                    top: '-31%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                }}
            >
                <div
                    className='text-cmGrey500'
                    style={{fontWeight: 500, fontSize: '10px', fontFamily: 'Manrope'}}
                >
                    Total Sales
                </div>
                <div
                    className='text-cmBlack'
                    style={{fontSize: '22px', fontWeight: '700', fontFamily: 'Manrope'}}
                >
                    {graphsData?.total_sales}
                </div>
            </div>
        </div>
    )
}
export default Doughnut1

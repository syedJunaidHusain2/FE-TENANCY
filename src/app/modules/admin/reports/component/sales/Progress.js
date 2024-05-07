import {Doughnut} from 'react-chartjs-2'
import {Chart, ArcElement} from 'chart.js'

Chart.register(ArcElement)

const Doughnut1 = ({a, b}) => {
    const data = {
        datasets: [
            {
                data: [b, a],
                backgroundColor: ['rgba(96, 120, 236, 0.2)', '#6078EC'],
                display: true,
                borderColor: ['rgba(96, 120, 236, 0.2)', '#6078EC'],
            },
        ],
    }
    return (
        <div className='mx-auto p-0 m-0' style={{width: '107px'}}>
            <Doughnut
                className=''
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
            <div
                style={{
                    position: 'relative',
                    top: '10%',
                    left: '54%',
                    transform: 'translate(-55%, -227%)',
                    textAlign: 'center',
                }}
            >
                <div className='text-gray-800' style={{fontSize: '19px', fontWeight: '700'}}>
                    {Number(a ?? 0).toFixed(2) ?? '0'}%
                </div>
            </div>
        </div>
    )
}
export default Doughnut1

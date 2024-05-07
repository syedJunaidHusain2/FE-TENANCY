import {Doughnut} from 'react-chartjs-2'
import {Chart, ArcElement} from 'chart.js'

Chart.register(ArcElement)

const data = {
    datasets: [
        {
            data: [20, 100],
            backgroundColor: ['rgba(96, 120, 236, 0.2)', '#6078EC'],
            display: true,
            borderColor: ['rgba(96, 120, 236, 0.2)', '#6078EC'],
        },
    ],
}

const Doughnut1 = () => {
    return (
        <div className='ms-sm-8' style={{width: '107px'}}>
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
                    //   maintainAspectRatio: true,
                    //   responsive: true,
                }}
            />
            <div
                style={{
                    position: 'relative',
                    top: '-96%',
                    left: '54%',
                    transform: 'translate(-50%, -200%)',
                    textAlign: 'center',
                }}
            >
                <div style={{color: '#0D1821', fontSize: '22px', fontWeight: 'bold'}}>77%</div>
            </div>
        </div>
    )
}
export default Doughnut1

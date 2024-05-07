import {Doughnut} from 'react-chartjs-2'
import {Chart, ArcElement} from 'chart.js'
import {
    formattedNumberFields,
    formattedNumberFieldsWithoutDecimal,
} from '../../../../../../../helpers/CommonHelpers'

Chart.register(ArcElement)

// const textCenter = {
//   id: 'textCenter',
//   beforeDatasetsDraw(chart, args, pluginOptions) {
//     const {ctx, data} = chart
//     ctx.save()
//     ctx.font = 'bolder 30px'
//     ctx.fillStyle = 'red'
//     ctx.fillText('text', chart.getDatasetMeta(0).data[0].x)
//   },
// }

const AccountsDonutChart = ({accountData}) => {
    const data = {
        datasets: [
            {
                data: [
                    accountData?.m2_complete,
                    accountData?.m2_pending,
                    accountData?.cancelled,
                    accountData?.clawback,
                ],
                backgroundColor: ['#6078EC', '#50CD89', '#90CAF4', '#FFE16A'],
                display: true,
                borderColor: ['#6078EC', '#50CD89', '#90CAF4', '#FFE16A'],
            },
        ],
    }
    return (
        <div className='bg-white py-3 shadow-sm mb-5 w-100' style={{borderRadius: '10px'}}>
            <div
                className='mb-5 ms-3'
                style={{fontSize: '14px', fontWeight: '500', color: '#757575'}}
            >
                Accounts
            </div>

            <div className=' mx-auto mb-0 px-10 w-200px ' style={{marginTop: '-35px'}}>
                <Doughnut
                    //   width={150}
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
                    // plugins={[textCenter]}
                />
            </div>

            <div
                style={{
                    position: 'relative',
                    top: '-20%',
                    left: '50%',
                    transform: 'translate(-50%, -150%)',
                    textAlign: 'center',
                }}
            >
                <div
                    style={{
                        color: '#9E9E9E',
                        fontSize: '10px',
                        fontFamily: 'Manrope',
                        fontWeight: '500',
                    }}
                >
                    Total Sales
                </div>
                <div style={{color: '#0D1821', fontSize: '18px', fontWeight: '700'}}>
                    {formattedNumberFieldsWithoutDecimal(accountData?.total_sales)}
                </div>
            </div>
            <div style={{marginTop: '-55px'}} className=''>
                <hr />
                <div className='   '>
                    {/* First line */}
                    <div className='d-flex justify-content-between gap-5 pb-2 px-4'>
                        <div className='d-flex align-items-center w-sm-50'>
                            <div
                                className='bullet rounded-circle-2 py-2 px-2'
                                style={{backgroundColor: '#6078EC'}}
                            />
                            <div style={{color: '#757575', fontWeight: '500'}} className='mx-1'>
                                M2 complete
                            </div>
                            <div style={{color: '#0D1821', fontWeight: '700'}}>
                                {accountData?.m2_complete}
                            </div>
                        </div>
                        <div className='d-flex align-items-center w-sm-50'>
                            <div
                                className='bullet rounded-circle-2 py-2 px-2'
                                style={{backgroundColor: '#50CD89'}}
                            />
                            <div style={{color: '#757575', fontWeight: '500'}} className='mx-1'>
                                M2 pending
                            </div>
                            <div style={{color: '#0D1821', fontWeight: '700'}}>
                                {accountData?.m2_pending}
                            </div>
                        </div>
                    </div>
                    {/* second line */}
                    <div className='d-flex justify-content-between gap-5 pt-2 px-4'>
                        <div className='d-flex align-items-center w-sm-50'>
                            <div
                                className='bullet rounded-circle-2 py-2 px-2'
                                style={{backgroundColor: '#90CAF4'}}
                            />
                            <div style={{color: '#757575', fontWeight: '500'}} className='mx-1'>
                                Cancelled
                            </div>
                            <div style={{color: '#0D1821', fontWeight: '700'}}>
                                {accountData?.cancelled}
                            </div>
                        </div>
                        <div className='d-flex align-items-center w-sm-50'>
                            <div
                                className='bullet rounded-circle-2 py-2 px-2'
                                style={{backgroundColor: '#FE679D'}}
                            />
                            <div style={{color: '#757575', fontWeight: '500'}} className='mx-1'>
                                Clawback
                            </div>
                            <div style={{color: '#0D1821', fontWeight: '700'}}>
                                {accountData?.clawback}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AccountsDonutChart

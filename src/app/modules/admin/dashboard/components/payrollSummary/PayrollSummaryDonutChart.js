import ReactApexChart from 'react-apexcharts'

const PayrollSummaryDonutChart = ({chartData}) => {
    const chartOptions = {
        series: [
            chartData?.adjustment ?? 0,
            chartData?.deduction ?? 0,
            chartData?.override ?? 0,
            chartData?.reimbursement ?? 0,
            chartData?.commission ?? 0,
        ],
        options: {
            chart: {
                type: 'donut',
                // offsetY: -10, commentted newly so if any ui occurs, kindly uncomment this
            },

            colors: ['#6078EC', '#FE679D', '#FFE16A', '#7239EA', '#00C247'],
            dataLabels: {
                enabled: false, // Disable the default data labels
            },
            labels: ['Adjustments', 'Deductions', 'Overrides', 'Reimbursements', 'Commissions'],
            stroke: {
                show: false,
            },
            legend: {
                show: false,
            },
            plotOptions: {
                pie: {
                    startAngle: -90,
                    endAngle: 90,
                    offsetY: 0,
                    offsetX: 0,

                    donut: {
                        size: '75%',

                        labels: {
                            show: true,
                            name: {
                                show: true,
                                fontSize: '18px',
                                fontFamily: 'Manrope',
                                fontWeight: 700,
                                color: '#212121',
                                // offsetY: -10,
                            },
                            value: {
                                show: true,
                                fontSize: '18px',
                                fontFamily: 'Manrope',
                                fontWeight: 700,
                                color: '#212121',
                                offsetY: 10,
                                formatter: (val) => '$' + val,
                            },
                            total: {
                                show: true,
                                fontSize: '13px',
                                fontFamily: 'Manrope',
                                fontWeight: 700,
                                color: '#424242',
                                label: 'Total Payroll',
                                formatter: function (w, val) {
                                    let sum = w.globals.seriesTotals.reduce(
                                        (acc, currentValue) => acc + currentValue,
                                        0
                                    )
                                    return '$' + Number(sum ?? 0).toFixed(2)
                                },
                            },
                        },
                    },
                },
                labels: ['Progress'],

                // colors: ['#4680ff'],
            },
            grid: {
                padding: {
                    bottom: 0,
                },
                margin: {
                    bottom: 0,
                },
            },
        },
    }
    return (
        <div className='chart-container w-sm-50 mx-auto'>
            <ReactApexChart
                options={chartOptions.options}
                series={chartOptions.series}
                type='donut'
            />
        </div>
    )
}

export default PayrollSummaryDonutChart

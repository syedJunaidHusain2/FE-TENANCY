import React, {useMemo} from 'react'
import Chart from 'react-apexcharts'
import {
    formattedNumberFields,
    formattedNumberFieldsWithoutDecimal,
} from '../../../../../../helpers/CommonHelpers'

const YourProcessChart = ({achievedGoal, targetGoal}) => {
    const isTargetGoalAvailable = useMemo(() => {
        let hasValueGreaterThanZero = false

        for (let key in targetGoal) {
            if (targetGoal.hasOwnProperty(key) && targetGoal[key] > 0) {
                hasValueGreaterThanZero = true
            }
        }
        return hasValueGreaterThanZero
    }, [targetGoal])

    const overAllpercantage = useMemo(() => {
        let overallPercentage = 0,
            percentageEarning = 0,
            percentageAccount = 0,
            percentageKwSold = 0
        if (isTargetGoalAvailable) {
            percentageEarning =
                (100 *
                    (Number(achievedGoal?.get_earning) > Number(targetGoal?.earning)
                        ? parseFloat(targetGoal?.earning)
                        : parseFloat(achievedGoal?.get_earning))) /
                parseFloat(targetGoal?.earning)

            percentageAccount =
                (100 *
                    (Number(achievedGoal?.get_account) > Number(targetGoal?.account)
                        ? parseFloat(targetGoal?.account)
                        : parseFloat(achievedGoal?.get_account))) /
                parseFloat(targetGoal?.account)

            percentageKwSold =
                (100 *
                    (Number(achievedGoal?.get_kw_sold) > Number(targetGoal?.kw_sold)
                        ? parseFloat(targetGoal?.kw_sold)
                        : parseFloat(achievedGoal?.get_kw_sold))) /
                parseFloat(targetGoal?.kw_sold)

            overallPercentage =
                (((percentageEarning ?? 0) + (percentageAccount ?? 0) + (percentageKwSold ?? 0)) *
                    100) /
                300
        }

        // return Math.min(overallPercentage)
        return {
            percentageEarning,
            percentageAccount,
            percentageKwSold,
            overallPercentage,
        }
    }, [
        achievedGoal?.get_account,
        achievedGoal?.get_earning,
        achievedGoal?.get_kw_sold,
        isTargetGoalAvailable,
        targetGoal?.account,
        targetGoal?.earning,
        targetGoal?.kw_sold,
    ])

    const chartData = {
        series: isTargetGoalAvailable
            ? [
                  overAllpercantage?.percentageEarning ?? 0,
                  overAllpercantage?.percentageAccount ?? 0,
                  overAllpercantage?.percentageKwSold ?? 0,
              ]
            : [0, 0, 0],
        options: {
            chart: {
                type: 'radialBar',
            },
            colors: ['#00C247', '#FFE16A', '#FE679D'],
            plotOptions: {
                radialBar: {
                    dataLabels: {
                        value: {
                            fontSize: '22px',
                            show: false,
                        },
                        name: {
                            show: true,
                        },

                        total: {
                            show: true,
                            label: formattedNumberFields(overAllpercantage?.overallPercentage, '%'),
                            fontSize: '20px',
                            fontWeight: 700,
                            fontFamily: 'Manrope',
                        },
                    },
                },
            },
            labels: ['Earnings', 'Accounts', 'Kw Sold'],
        },
    }
    return (
        <div style={{fontFamily: 'Manrope', width: 'fit-content'}} className='text-center'>
            <Chart
                options={chartData.options}
                series={chartData.series}
                type='radialBar'
                height='auto'
            />

            <div className='row w-100 mx-auto px-3 justify-content-between gap-3 align-itmes-center'>
                <div className='col text-start'>
                    <div className='h-5px w-30px bg-cmSuccess rounded mb-1' />
                    <div className='text-cmGrey600 mb-1' style={{fontSize: 10, fontWeight: 600}}>
                        Earnings
                    </div>
                    <div className='text-cmGrey900' style={{fontSize: 14, fontWeight: 700}}>
                        {formattedNumberFields(achievedGoal?.get_earning, '$')}
                    </div>
                </div>
                <div className='col text-start'>
                    <div className='h-5px w-30px bg-cmYellow rounded mb-1' />
                    <div className='text-cmGrey600 mb-1' style={{fontSize: 10, fontWeight: 600}}>
                        Accounts
                    </div>
                    <div className='text-cmGrey900' style={{fontSize: 14, fontWeight: 700}}>
                        {formattedNumberFields(achievedGoal?.get_account, '$')}
                    </div>
                </div>
                <div className='col text-start'>
                    <div className='h-5px w-30px bg-cmpink rounded mb-1' />
                    <div className='text-cmGrey600 mb-1' style={{fontSize: 10, fontWeight: 600}}>
                        KW Sold
                    </div>
                    <div className='text-cmGrey900' style={{fontSize: 14, fontWeight: 700}}>
                        {formattedNumberFields(achievedGoal?.get_kw_sold, '$')}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default YourProcessChart

import React from 'react'

const PayPeriodTableCard = ({payStubData}) => {
    return (
        <div
            className='card shadow-sm w-sm-75 mx-auto p-sm-10 p-5'
            style={{fontSize: '14px', fontFamily: 'Manrope', fontWeight: 600}}
        >
            {/* Heading */}
            <div className='text-center mb-10'>logo to come</div>
            <div className='text-center text-cmGrey700 mb-10'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
                <span className='mx-5'>|</span>+502 98543456<span className='mx-5'>|</span>+502
                98543456
            </div>
            {/* Pay Stub table */}
            <div className='table-responsive overflow-auto mb-5 '>
                <table className='table border border-cmwhite border-4 w-100'>
                    <tr className='bg-cmBlue-Crayola bg-opacity-15 text-cmBlue-Crayola text-center'>
                        <th
                            rowspan='2'
                            className='py-5 px-1'
                            style={{fontSize: '30px', fontWeight: '700', letterSpacing: '8px'}}
                        >
                            PAY STUB
                        </th>
                        <th>Pay Period</th>
                        <th>Accounts this pay period</th>
                        <th>YTD</th>
                    </tr>
                    <tr className='bg-cmGrey100 text-center text-cmGrey700 border border-cmwhite border-4 '>
                        <td>11/02/2022- 12/03/2022</td>
                        <td>200</td>
                        <td>2195</td>
                    </tr>
                </table>
            </div>

            {/* EMPLOYEE INFORMATION */}
            <div className='mb-10'>
                <div className='text-cmGrey700 text-center mb-2' style={{letterSpacing: '1px'}}>
                    EMPLOYEE INFORMATION
                </div>
                <div className='table-responsive  overflow-auto'>
                    <table className='table  w-100 text-cmGrey700'>
                        <tr className='border border-cmwhite border-4 '>
                            <th className='bg-cmBlue-Crayola bg-opacity-15 text-cmBlue-Crayola px-1 ps-5 py-3'>
                                Employee
                            </th>
                            <td className='bg-cmGrey100 ps-5'>Leslie Alexander</td>
                            <th className='bg-cmBlue-Crayola bg-opacity-15 text-cmBlue-Crayola px-1 py-3 ps-5'>
                                Employee ID
                            </th>
                            <td className='bg-cmGrey100 ps-5'>47</td>
                        </tr>
                        <tr className='border border-cmwhite border-4'>
                            <th className='bg-cmBlue-Crayola bg-opacity-15 text-cmBlue-Crayola px-1 py-3 ps-5'>
                                SSN
                            </th>
                            <td className='bg-cmGrey100 ps-5'>xxx-xx-1234</td>
                            <th className='bg-cmBlue-Crayola bg-opacity-15 text-cmBlue-Crayola px-1 py-3 ps-5'>
                                Department
                            </th>
                            <td className='bg-cmGrey100 ps-5'>Sales</td>
                        </tr>
                        <tr className='border border-cmwhite border-4'>
                            <th className='bg-cmBlue-Crayola bg-opacity-15 text-cmBlue-Crayola px-1 py-3 ps-5'>
                                Bank Account
                            </th>
                            <td className='bg-cmGrey100 ps-5'>xxxxx1234</td>
                            <th className='bg-cmBlue-Crayola bg-opacity-15 text-cmBlue-Crayola px-1 py-3 ps-5'>
                                Position
                            </th>
                            <td className='bg-cmGrey100 ps-5'>Setter</td>
                        </tr>
                    </table>
                </div>
            </div>

            {/* EARNINGS */}
            <div className='mb-10'>
                <div className='text-cmGrey700 text-center mb-2' style={{letterSpacing: '1px'}}>
                    EARNINGS
                </div>
                <div className='table-responsive  overflow-auto'>
                    <table className='table  w-100 text-cmGrey700 text-center '>
                        <tr className='bg-cmBlue-Crayola bg-opacity-15 text-cmBlue-Crayola border border-cmwhite border-4'>
                            <th className='px-1 py-3 ps-5'>Description</th>
                            <th className='px-1 py-3 ps-5'>TOTAL</th>
                            <th className='px-1 py-3 ps-5'>YTD</th>
                        </tr>
                        <tr className='bg-cmGrey100 border border-cmwhite border-4'>
                            <td className='px-1 py-3 ps-5'>Total M1 (50 accounts)</td>
                            <td className='px-1 py-3 ps-5'>$1,500.00</td>
                            <td className='px-1 py-3 ps-5'>$25,000.00</td>
                        </tr>
                        <tr className='bg-cmGrey100 border border-cmwhite border-4'>
                            <th className='px-1 py-3 ps-5'>Total M2 (20 accounts)</th>
                            <th className='px-1 py-3 ps-5'>$2,800.00</th>
                            <th className='px-1 py-3 ps-5'>$31,200.00</th>
                        </tr>
                        <tr className='bg-cmGrey100 border border-cmwhite border-4'>
                            <th className='px-1 py-3 ps-5'>Overrides(10 accounts)</th>
                            <th className='px-1 py-3 ps-5'>$500.00</th>
                            <th className='px-1 py-3 ps-5'>$750.00</th>
                        </tr>
                        <tr
                            className='bg-cmBlue-Crayola bg-opacity-15 text-cmBlue-Crayola border border-cmwhite border-4'
                            style={{fontWeight: '800'}}
                        >
                            <th className='px-1 py-3 px-5 text-end'>Gross Pay</th>
                            <th className='px-1 py-3 ps-5'>$4,800.00</th>
                            <th className='px-1 py-3 ps-5'>$56,950</th>
                        </tr>
                    </table>
                </div>
            </div>
            {/* DEDUCTIONS And NET PAY */}
            <div className='d-flex flex-wrap'>
                <div className='w-sm-75 overflow-auto mb-sm-0 mb-5 '>
                    <div className='text-cmGrey700 text-center mb-2' style={{letterSpacing: '1px'}}>
                        DEDUCTIONS
                    </div>
                    <div className='table-responsive  overflow-auto'>
                        <table className='table  w-100 text-cmGrey700 text-center '>
                            <tr className='bg-cmBlue-Crayola bg-opacity-15 text-cmBlue-Crayola border border-cmwhite border-4'>
                                <th className='px-1 py-3 ps-5'>Description</th>
                                <th className='px-1 py-3 ps-5'>Amount</th>
                                <th className='px-1 py-3 ps-5'>YTD</th>
                            </tr>
                            <tr className='bg-cmGrey100 border border-cmwhite border-4'>
                                <td className='px-1 py-3 ps-5'>Rent</td>
                                <td className='px-1 py-3 ps-5'>$550.00</td>
                                <td className='px-1 py-3 ps-5'>$560</td>
                            </tr>
                            <tr className='bg-cmGrey100 border border-cmwhite border-4'>
                                <th className='px-1 py-3 ps-5'>Travel</th>
                                <th className='px-1 py-3 ps-5'>$60.24</th>
                                <th className='px-1 py-3 ps-5'>$60.24</th>
                            </tr>
                            <tr className='bg-cmGrey100 border border-cmwhite border-4'>
                                <th className='px-1 py-3 ps-5'>Clawback</th>
                                <th className='px-1 py-3 ps-5'>$100.00</th>
                                <th className='px-1 py-3 ps-5'>$1,200.00</th>
                            </tr>
                            <tr className='bg-cmGrey100 border border-cmwhite border-4'>
                                <th className='px-1 py-3 ps-5'>Miscellaneous</th>
                                <th className='px-1 py-3 ps-5'>$50.50</th>
                                <th className='px-1 py-3 ps-5'>$120.00</th>
                            </tr>
                            <tr
                                className='bg-cmBlue-Crayola bg-opacity-15 text-cmBlue-Crayola border border-cmwhite border-4'
                                style={{fontWeight: '800'}}
                            >
                                <th className='py-3 px-5 text-end'>Total Deductions</th>
                                <th className='py-3 ps-5'>$760.74</th>
                                <th className='py-3 ps-5'>$1,940.24</th>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className='mx-auto'>
                    <div className='text-cmGrey700 mb-2 text-center' style={{letterSpacing: '1px'}}>
                        NET PAY
                    </div>
                    <table className='w-100 text-center text-cmGrey700 mb-10'>
                        <tr className='bg-cmBlue-Crayola text-cmBlue-Crayola bg-opacity-15'>
                            <th className='py-3 px-10'>TOTAL</th>
                        </tr>
                        <tr>
                            <td className='py-3 px-10 bg-cmGrey100 text-cmGrey900'>$4,039.26</td>
                        </tr>
                    </table>
                    <table className='w-100 text-center text-cmGrey700 mb-10'>
                        <tr className='bg-cmBlue-Crayola text-cmBlue-Crayola bg-opacity-15'>
                            <th className='py-3 px-5'>Unpaid Commission</th>
                        </tr>
                        <tr>
                            <td className='py-3 px-5 bg-cmGrey100 text-cmGrey700'>$4,039.26</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default PayPeriodTableCard

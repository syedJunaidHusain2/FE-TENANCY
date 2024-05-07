import React from 'react'
import {formattedNumberFields} from '../../../../../../helpers/CommonHelpers'
import Progress from './Progress'

const SalesContractCard = ({graphsData, contracts}) => {
    return (
        <div className='w-100' style={{fontFamily: 'Manrope', fontSize: '13px', fontWeight: '600'}}>
            <div className='row p-5 bg-cmwhite shadow' style={{borderRadius: '12px'}}>
                {/* Contracts table starts  */}
                <div className='mb-sm-0 mb-10 col-xxl-7 col-sm-6' style={{fontWeight: '600 '}}>
                    <div
                        className='mb-4 text-cmGrey800'
                        style={{fontFamily: 'Manrope', fontSize: '14px'}}
                    >
                        Contracts
                    </div>
                    {/* Table starts */}
                    <div>
                        {/* line 1 */}
                        <div className='d-flex align-items-center justify-content-between'>
                            <div className='text-cmGrey600'>Avg. profit per rep:</div>
                            <div className='text-cmBlack'>
                                {formattedNumberFields(contracts?.avg_profit_per_rep, '$')}
                            </div>
                        </div>
                        <hr className='border-cmGrey500 p-0 my-2 border-dotted' />
                        {/* line 2 */}
                        <div className='d-flex align-items-center justify-content-between'>
                            <div className='text-cmGrey600'>Total KW Installed:</div>
                            <div className='text-cmBlack'>
                                {formattedNumberFields(contracts?.total_kw_installed, '')} Kw
                            </div>
                        </div>

                        <hr className='border-cmGrey500 p-0 my-2 border-dotted' />
                        {/* line 3 */}
                        <div className='d-flex align-items-center justify-content-between'>
                            <div className='text-cmGrey600 '>Total Revenue Generated:</div>
                            <div className='text-cmBlack '>
                                {formattedNumberFields(contracts?.total_revenue_generated, '$')}
                            </div>
                        </div>
                        <hr className='border-cmGrey500 p-0 my-2 border-dotted' />
                        {/* line 4 */}
                        <div className='d-flex align-items-center justify-content-between '>
                            <div className='text-cmGrey600 '>Total KW Pending:</div>
                            <div className='text-cmBlack'>
                                {formattedNumberFields(contracts?.total_kw_pending, '')} KW
                            </div>
                        </div>
                        <hr className='border-cmGrey500 p-0 my-2 border-dotted' />
                        {/* line 5 */}
                        <div className='d-flex align-items-center justify-content-between'>
                            <div className='text-cmGrey600'>Total Revenue Pending:</div>
                            <div className='text-cmBlack'>
                                {' '}
                                {formattedNumberFields(contracts?.total_revenue_pending, '$')}
                            </div>
                        </div>
                    </div>
                    {/* Table ends */}
                </div>
                {/* Contracts table ends  */}
                {/* Line */}
                {/* <div
                    className='d-none d-md-block border-cmGrey200 border-end-dashed col '
                    style={{width: 'fit-content'}}
                /> */}
                <div className='mx-auto col-xxl-4 col-sm-6'>
                    <div
                        className='mb-5 text-cmGrey800 text-center'
                        style={{fontFamily: 'Manrope', fontSize: '14px'}}
                    >
                        Install Ratio
                    </div>
                    <div className=''>
                        <Progress
                            a={graphsData?.install?.replace('%', '')}
                            b={graphsData?.uninstall?.replace('%', '')}
                        />
                    </div>
                    <div className='d-flex flex-center'>
                        <div
                            style={{marginTop: '-20px', fontSize: '12px', fontWeight: '500'}}
                            className='text-cmGrey600 text-nowrap'
                        >
                            <div className='d-flex gap-2 '>
                                <i className='bi bi-circle-fill text-cmBlue-Crayola' />

                                <div>Installed Accounts</div>
                            </div>
                            <div className='d-flex gap-2'>
                                <i className='bi bi-circle-fill' style={{color: '#DFE4FB'}} />

                                <div>Unserviced Accounts</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SalesContractCard

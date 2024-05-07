import React, {useEffect, useMemo, useState} from 'react'

import {Sidebar} from 'primereact/sidebar'
import moment from 'moment'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import {getValidDate} from '../../../../../../constants/constants'
import CustomImage from '../../../../../../customComponents/customImage/CustomImage'
import {TabView, TabPanel} from 'primereact/tabview'
import {
    formattedNumberFields,
    getEmployeeRedlineHelper,
} from '../../../../../../helpers/CommonHelpers'
import {fontsFamily} from '../../../../../../assets/fonts/fonts'

export default function ViewUserRedlineChanges({
    toggleView,
    closeToggle,
    redlineData,
    self_gen = false,
}) {
    const pastUpcomingRedline = useMemo(() => {
        const data = getEmployeeRedlineHelper(redlineData, null, self_gen)
        return data
    }, [redlineData, self_gen])
    return (
        <>
            <Sidebar
                visible={toggleView}
                position='right'
                onHide={closeToggle}
                showCloseIcon={false}
                className={'w-sm-50 w-100 px-0 mx-0'}
            >
                <div className='m-0 p-0' id='kt_explore_body'>
                    <div className='text-cmBlack mx-10 d-flex justify-content-between align-items-center mb-4'>
                        <div
                            className=''
                            style={{fontSize: '16px', fontWeight: '600', fontFamily: 'Manrope'}}
                        >
                            Redlines
                        </div>
                        <div className='d-flex align-items-center gap-2'>
                            <div
                                className='bi bi-x-lg fs-3 bg-hover-cmGrey200 text-cmBlack rounded-circle px-1 '
                                onClick={closeToggle}
                            />
                        </div>
                    </div>
                    <div className='card shadow-none'>
                        <div className='mt-0 border border-cmGrey200'></div>
                        <div
                            style={{
                                fontWeight: 600,
                            }}
                        >
                            <div className='d-flex justify-content-between align-items-center mb-5 mt-3'>
                                <div className='d-flex align-items-center gap-3'>
                                    <div className='text-cmGrey900'>Current Redline: </div>
                                    <div className='text-cmGrey700'>
                                        {pastUpcomingRedline?.current?.redline_amount
                                            ? `${formattedNumberFields(
                                                  pastUpcomingRedline?.current?.redline_amount,
                                                  ''
                                              )} / ${pastUpcomingRedline?.current?.redline_type}`
                                            : '-'}{' '}
                                        since{' '}
                                        {pastUpcomingRedline?.current?.start_date
                                            ? getValidDate(pastUpcomingRedline?.current?.start_date)
                                            : '-'}
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </div>
                        <div>
                            <TabView>
                                <TabPanel header='Past'>
                                    <CommonRedlineTable redlineData={pastUpcomingRedline?.past} />
                                </TabPanel>
                                <TabPanel header='Upcoming'>
                                    <CommonRedlineTable
                                        redlineData={pastUpcomingRedline?.upcoming}
                                    />
                                </TabPanel>
                            </TabView>
                        </div>
                    </div>
                </div>
            </Sidebar>
        </>
    )
}
const CommonRedlineTable = ({redlineData = []}) => {
    return (
        <div className='table-responsive table-bordered mb-10'>
            <table className='table'>
                <thead>
                    <tr
                        className='text-cmGrey500 text-cmGrey800 border-cmGrey400'
                        style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            fontFamily: fontsFamily.manrope,
                        }}
                    >
                        <th className='text-nowrap p-3 '>Effective date</th>
                        <th className='text-nowrap p-3 '>Redline</th>
                        <th className='text-nowrap p-3 '>Redline Type</th>
                    </tr>
                </thead>
                <tbody>
                    {redlineData?.map((item, index) => {
                        return (
                            <>
                                {
                                    <>
                                        <tr
                                            className='text-cmGrey800 stripRow'
                                            style={{
                                                fontSize: '14px',
                                                fontFamily: fontsFamily.manrope,
                                                fontWeight: 600,
                                                lineHeight: '20px',
                                            }}
                                        >
                                            <td className='p-3 text-nowrap'>
                                                {getValidDate(item?.start_date)}
                                            </td>
                                            <td className='p-3 text-nowrap text-cmGrey700'>
                                                {item?.redline}
                                            </td>
                                            <td className='p-3 text-nowrap text-cmGrey700'>
                                                {item?.redline_type}
                                            </td>
                                        </tr>
                                    </>
                                }
                            </>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

import React, {useEffect, useState} from 'react'
import {getUserRedlineService} from '../../../../../../services/Services'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import CustomImage from '../../../../../../customComponents/customImage/CustomImage'
import {Sidebar} from 'primereact/sidebar'
import {getValidDate} from '../../../../../../constants/constants'
import moment from 'moment'
import {getEmployeeRedlineHelper} from '../../../../../../helpers/CommonHelpers'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'
import CustomDatePicker from '../../../../../../customComponents/customInputs/customDatePicker/CustomDatePicker'
import CustomDropdown from '../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../customComponents/customInputs/customInput/CustomInput'
import {fontsFamily} from '../../../../../../assets/fonts/fonts'

export default function ViewChanges({toggleView, closeToggle, id}) {
    const [loading, setLoading] = useState(true)
    const [redlineData, setRedlineData] = useState([])
    useEffect(() => {
        setLoading(true)
        // Past Redlines
        getUserRedlineService(id)
            .then((res) => {
                const data = getEmployeeRedlineHelper({redline_data: res?.data})
                setRedlineData(data?.past)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [id])

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
                    <CustomLoader full visible={loading} />
                    <div className='text-cmBlack mx-10 d-flex justify-content-between align-items-center mb-4'>
                        <div
                            className=''
                            style={{fontSize: '16px', fontWeight: '600', fontFamily: 'Manrope'}}
                        >
                            Past Redlines
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

                        <div className='mt-15 '>
                            {/* first row */}

                            <div className=''>
                                <div>
                                    {redlineData?.length > 0 ? (
                                        redlineData?.map((item) => (
                                            <table
                                                style={{
                                                    fontWeight: 600,
                                                    borderRadius: 15,
                                                    overflow: 'hidden',
                                                }}
                                                className='w-100 mb-10'
                                            >
                                                <tr className='text-start stripRow'>
                                                    <td className='px-5 py-2 text-cmGrey700 '>
                                                        Redline:
                                                    </td>
                                                    <td className='px-5  py-2 text-cmBlack'>
                                                        {item?.redline} {item?.redline_type}
                                                    </td>
                                                </tr>
                                                <tr className='text-start stripRow px-5'>
                                                    <td className='px-5  py-2 text-cmGrey700 '>
                                                        Effective Date:
                                                    </td>
                                                    <td className='px-5  py-2 text-cmBlack '>
                                                        {getValidDate(item?.start_date)}
                                                    </td>
                                                </tr>
                                                <tr className='text-start stripRow px-5'>
                                                    <td className='px-5  py-2 text-cmGrey700 '>
                                                        Updated by:
                                                    </td>
                                                    <td className='px-5  py-2 text-cmBlack '>
                                                        <CustomImage
                                                            src={item?.image}
                                                            className='avatar me-2'
                                                            style={{
                                                                width: '30px',
                                                                height: '30px',
                                                            }}
                                                            alt='img'
                                                        />
                                                        <span> {item?.updater_name}</span>
                                                    </td>
                                                </tr>
                                            </table>
                                        ))
                                    ) : (
                                        <div style={{textAlign: 'center'}}>
                                            No Redline Data Available
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Sidebar>
        </>
    )
}

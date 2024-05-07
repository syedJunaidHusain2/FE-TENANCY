import React, {useEffect, useState} from 'react'
import Pagination from '../../Pagination'
import CustomImage from '../../../../../../../customComponents/customImage/CustomImage'
import {useLocation, useNavigate} from 'react-router-dom'
import {
    getSequiDocsTemplateHistoryService,
    getSequiDocsTemplatesHistoryService,
} from '../../../../../../../services/Services'
import {useSelector} from 'react-redux'
import {
    getIsLoggedInSelector,
    getUserDataSelector,
} from '../../../../../../../redux/selectors/AuthSelectors'
import {getValidDate} from '../../../../../../../constants/constants'
import CustomLoader from '../../../../../../../customComponents/customLoader/CustomLoader'
import {fontsFamily} from '../../../../../../../assets/fonts/fonts'
import {KTSVG} from '../../../../../../../_metronic/helpers'
import CustomFilterButton from '../../../../../../../customComponents/customFilterButton/CustomFilterButton'
import Collapse from '@mui/material/Collapse'
import {TABLE_BORDER} from '../../../../../../../helpers/CommonHelpers'

const History = () => {
    const tableData = [1, 2]
    const [showNames, setshowNames] = useState(false)
    const [loading, setLoading] = useState(false)

    const [historyData, setHistoryData] = useState(null)
    const loggedUser = useSelector(getUserDataSelector)
    const [componentStates, setComponentStates] = useState([])

    const location = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        setLoading(true)
        getSequiDocsTemplatesHistoryService(location?.state?.id)
            .then((res) => {
                setHistoryData(res?.data)
            })
            .finally(() => setLoading(false))
    }, [location?.state?.id])

    const toggleComponent = (ind) => {
        let data = [...componentStates]
        let index = ind?.toString()
        const isExistInData = data.some((item) => item == index)

        if (isExistInData) data = data.filter((item) => item != index)
        else data.push(index)
        setComponentStates(data)
    }

    return (
        <>
            <div
                className='mb-10 d-flex align-items-center gap-3 bg-cmwhite shadow-sm p-5'
                style={{
                    borderRadius: 10,
                    fontFamily: fontsFamily.manrope,
                    fontSize: 16,
                    fontWeight: 600,
                }}
            >
                <KTSVG
                    path='/media/icons/duotune/art/back-square.svg'
                    svgClassName='h-25px w-20px cursor-pointer'
                    onClick={() => navigate(-1)}
                />
                <div className='me-auto text-cmGrey900'>Template History</div>
                {/* <CustomFilterButton /> */}
            </div>
            <div className='shadow bg-cmwhite' style={{borderRadius: 10}}>
                <div style={{position: 'relative'}}>
                    <CustomLoader visible={loading} full />

                    {/* <CustomLoader visible={loading} full /> */}
                    <div className='py-0 px-0 mx-0'>
                        <div
                            className='d-flex flex-wrap gap-10 align-items-center'
                            style={{fontWeight: 600, fontSize: '16px'}}
                        >
                            <div className='p-5 text-cmGrey800 text-decoration-underline'>
                                {location?.state?.name}
                            </div>
                            <div className='p-5 text-cmGrey500'>
                                {location?.state?.template_comment}
                            </div>
                        </div>
                        <div className='table-responsive  overflow-auto'>
                            <table className='table' style={{tableLayout: 'fixed', width: '100%'}}>
                                <thead className={TABLE_BORDER}>
                                    <tr
                                        className=' text-cmGrey900 bg-cmGrey300 '
                                        style={{
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            fontFamily: fontsFamily.manrope,
                                        }}
                                    >
                                        <th className='w-150px p-5 text-nowrap'>Date</th>
                                        <th className='w-150px p-5 text-nowrap'>Action by</th>
                                        <th className='w-150px p-5 text-nowrap'>Action</th>
                                        <th className='w-150px p-5 text-nowrap'>People</th>
                                        <th className='w-150px p-5 text-nowrap'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {historyData?.data?.length > 0 ? (
                                        historyData?.data?.map((item, index) => (
                                            <>
                                                <tr
                                                    className={`text-cmGrey600 stripRow ${TABLE_BORDER}`}
                                                    style={{
                                                        fontSize: '14px',
                                                        fontFamily: 'Manrope',
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    <td className='text-cmGrey900 p-5'>
                                                        {getValidDate(item?.document_send_date)}
                                                    </td>

                                                    <td className='p-5'>
                                                        <div className='text-cmGrey900 text-nowrap'>
                                                            {item?.doc_send_by?.first_name}{' '}
                                                            {item?.doc_send_by?.item?.last_name}
                                                            {item?.doc_send_by?.id ==
                                                            loggedUser?.id ? (
                                                                <span className='text-cmGrey700'>
                                                                    (Myself)
                                                                </span>
                                                            ) : null}
                                                        </div>
                                                    </td>

                                                    <td
                                                        className='p-5'
                                                        style={{
                                                            fontWeight: '600',
                                                            fontSize: '14px',
                                                            lineHeight: '21px',
                                                        }}
                                                    >
                                                        <span
                                                            className={`text-cmwhite badge px-3 ${
                                                                item?.action == 'assign'
                                                                    ? 'bg-cmOrange'
                                                                    : 'bg-cmgreen'
                                                            } py-2`}
                                                        >
                                                            {item?.action}
                                                        </span>
                                                    </td>
                                                    <td className='p-5 d-flex align-items-center gap-3'>
                                                        <span className='bi bi-person fs-1'></span>{' '}
                                                        <span> {item?.DocSendTo?.length} </span>
                                                    </td>
                                                    <td
                                                        className='p-5 text-cminfo '
                                                        // onClick={() => setshowNames(!showNames)}
                                                    >
                                                        <div
                                                            style={{width: 'fit-content'}}
                                                            className='text-center m-auto text-decoration-underline cursor-pointer'
                                                            onClick={() => toggleComponent(index)}
                                                        >
                                                            {componentStates?.includes(
                                                                index?.toString()
                                                            )
                                                                ? 'Hide'
                                                                : 'View'}
                                                        </div>
                                                    </td>
                                                </tr>

                                                {componentStates?.includes(index?.toString()) ? (
                                                    <tr className='m-0 p-0'>
                                                        <td></td>
                                                        <td colSpan={4} className=''>
                                                            <div className='d-flex align-items-start cursor-pointer overflow-auto pb-2'>
                                                                {item?.DocSendTo?.map((user) => (
                                                                    <div
                                                                        className='d-flex me-5 gap-2 align-items-center badge rounded-pill border border-cmGrey300 px-3 text-cmGrey700'
                                                                        style={{
                                                                            fontWeight: 500,
                                                                            fontSize: '12px',
                                                                            fontFamily: 'Manrope',
                                                                        }}
                                                                    >
                                                                        <CustomImage
                                                                            className=''
                                                                            style={{
                                                                                width: '20px',
                                                                                height: '20px',
                                                                            }}
                                                                        />{' '}
                                                                        <span>
                                                                            {user?.first_name}{' '}
                                                                            {user?.last_name}{' '}
                                                                        </span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ) : null}
                                            </>
                                        ))
                                    ) : (
                                        <>
                                            <tr>
                                                <td
                                                    colSpan={5}
                                                    style={{
                                                        textAlign: 'center',
                                                        fontFamily: 'Manrope',
                                                        fontWeight: '500',
                                                        fontSize: 14,
                                                        paddingTop: 20,
                                                        paddingBottom: 20,
                                                    }}
                                                >
                                                    No data found
                                                </td>
                                            </tr>
                                        </>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default History

import {useCallback, useEffect, useMemo, useState} from 'react'
import {getAnnouncementCardDataAction} from '../../../../../redux/actions/DashboardActions'
import {
    getAnnouncementCardDataSelector,
    getAnnouncementSelector,
} from '../../../../../redux/selectors/DashboardSelectors'
import {useSelector} from 'react-redux'
import {getUserDataSelector} from '../../../../../redux/selectors/AuthSelectors'
import {useDispatch} from 'react-redux'
import CustomLoader from '../../../../../customComponents/customLoader/CustomLoader'
import ManageAnnouncementModal from '../../../common/manageAnnouncement/manageAnnouncementModal'
import ViewAllAnnouncement from '../../../common/manageAnnouncement/viewAllAnnouncement'
import CustomEllipsis from '../../../../../customComponents/customEllipsis/CustomEllipsis'
import ViewSingleAnnouncement from '../../../common/manageAnnouncement/viewSingleAnnouncement'
import CustomNoData from '../../../../../customComponents/customNoData/CustomNoData'
import AccessRights from '../../../../../accessRights/AccessRights'

const AnnouncementsCardStandard = () => {
    const announcementCardData = useSelector(getAnnouncementCardDataSelector)

    const [loading, setLoading] = useState(false)
    const [fullLoading, setFullLoading] = useState(false)
    const [showManageAnnouncementModal, setShowManageAnnouncementModal] = useState(false)
    const [showViewAllAnnouncement, setShowViewAllAnnouncement] = useState(false)
    const [showSingleAnnouncement, setShowSingleAnnouncement] = useState(false)
    const [singleAnnouncementData, setSingleAnnouncementData] = useState(null)

    const dispatch = useDispatch()
    useEffect(() => {
        getAnnouncementData()
    }, [])

    const getAnnouncementData = useCallback(() => {
        if (announcementCardData) setLoading(true)
        else setFullLoading(true)

        dispatch(getAnnouncementCardDataAction()).finally(() => {
            if (announcementCardData) setLoading(false)
            else setFullLoading(false)
        })
    }, [dispatch])

    const handleViewAllAnnouncement = () => {
        setShowViewAllAnnouncement(!showViewAllAnnouncement)
    }

    const handleModalClose = () => {
        setShowManageAnnouncementModal(false)
        getAnnouncementData()
    }

    const handleSingleAnnouncement = (item) => {
        setSingleAnnouncementData(item)
        setShowSingleAnnouncement(!showSingleAnnouncement)
    }

    const announcemenFilterData = useMemo(() => {
        return announcementCardData
            ?.filter?.(
                (filterItem) => filterItem?.status == 'Live' || filterItem?.status == 'Upcoming'
            )
            ?.sort((a, b) => b.pin_to_top - a.pin_to_top)
    }, [announcementCardData])

    return (
        <>
            {/* QuickLinks Card */}
            <div
                className='bg-cmwhite shadow-sm px-10 py-5 mb-10'
                style={{
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '16px',
                    position: 'relative',
                }}
            >
                <CustomLoader visible={fullLoading} full />
                <div
                    className='d-flex flex-wrap align-items-center justify-content-between mb-5'
                    style={{position: 'relative'}}
                >
                    <div className='text-cmGrey900'>
                        Announcements ({announcemenFilterData?.length ?? 0}
                        )
                        <CustomLoader visible={loading} size={50} />
                    </div>
                    <div className='d-flex flex-wrap align-items-center gap-10'>
                        <AccessRights forManager>
                            <div style={{alignSelf: 'center', fontSize: '14px'}}>
                                <div
                                    className='text-cmBlue-Crayola cursor-pointer '
                                    onClick={() => setShowManageAnnouncementModal(true)}
                                >
                                    <span className='mx-2 border border-cmBlue-Crayola px-2 border-1 rounded'>
                                        +
                                    </span>
                                    <span className='text-decoration-underline'>Manage</span>
                                </div>
                            </div>
                        </AccessRights>
                        <div style={{fontSize: '14px'}}>
                            <div
                                className='text-cmGrey700 cursor-pointer text-nowrap'
                                onClick={handleViewAllAnnouncement}
                            >
                                View all
                            </div>
                        </div>
                    </div>
                </div>
                <div className='d-flex overflow-auto align-itmes-center gap-sm-10 gap-5'>
                    {announcemenFilterData?.length > 0 ? (
                        announcemenFilterData?.map((item, i) => (
                            <div
                                className={` bg-${'cmOrange'} bg-opacity-25 py-5 ps-5 pe-10 rounded cursor-pointer`}
                                onClick={() => handleSingleAnnouncement(item)}
                                key={i}
                            >
                                <div className=''>
                                    <div
                                        className='text-nowrap text-cmBlack'
                                        style={{fontSize: '16px', fontWeight: 700}}
                                    >
                                        {item?.title}
                                        <span
                                            className=' text-cmGrey600 ms-1'
                                            style={{fontSize: '12px', fontWeight: 600}}
                                        >
                                            ({item?.status})
                                        </span>
                                    </div>
                                    <div
                                        className='card-subtitle mb-2 text-cmGrey800'
                                        style={{fontSize: '12px', fontWeight: 700}}
                                    >
                                        <CustomEllipsis
                                            className='text-cmGrey600'
                                            style={{
                                                fontFamily: 'Manrope',
                                                whiteSpace: 'nowrap',
                                                fontSize: '12px',
                                            }}
                                            text={item?.description}
                                        >
                                            {item?.description}
                                        </CustomEllipsis>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='col-sm'>
                            <CustomNoData label={'No Announcements'} />
                        </div>
                    )}

                    {/* Card 2 */}
                    {/* <div className='col-sm bg-cminfo bg-opacity-25 card'>
                        <div className='card-body'>
                            <div
                                className='card-title text-cmBlack'
                                style={{fontSize: '16px', fontWeight: 700}}
                            >
                                Paystubs Available!
                            </div>
                            <div
                                className='card-subtitle mb-2 text-cmGrey800'
                                style={{fontSize: '12px', fontWeight: 700}}
                            ></div>
                        </div>
                    </div> */}
                    {/* Card 3 */}
                    {/* <div className='col-sm bg-cmPurple bg-opacity-25 card'>
                        <div className='card-body'>
                            <div
                                className='card-title text-cmBlack'
                                style={{fontSize: '16px', fontWeight: 700}}
                            >
                                Policy Update
                            </div>
                            <div
                                className='card-subtitle mb-2 text-cmGrey800'
                                style={{fontSize: '12px', fontWeight: 700}}
                            ></div>
                        </div>
                    </div> */}
                    {/* Card 1 */}
                    {/* <div className='col-sm bg-cmSuccess bg-opacity-25 card'>
                        <div className='card-body'>
                            <div
                                className='card-title text-cmBlack'
                                style={{fontSize: '16px', fontWeight: 700}}
                            >
                                Policy Update
                            </div>
                            <div
                                className='card-subtitle mb-2 text-cmGrey800'
                                style={{fontSize: '12px', fontWeight: 700}}
                            ></div>
                        </div>
                    </div> */}
                </div>
            </div>
            {showManageAnnouncementModal ? (
                <ManageAnnouncementModal
                    // announcementData={announcementData}
                    role='standard'
                    show={showManageAnnouncementModal}
                    handleClose={handleModalClose}
                    // getAnnouncementData={() => getAnnouncementData()}
                    // setHeadFilters={setHeadFilters}
                    // headFilters={headFilters}
                    // loading={loading}
                    // setLoading={setLoading}
                />
            ) : null}
            {showViewAllAnnouncement ? (
                <ViewAllAnnouncement
                    open={showViewAllAnnouncement}
                    close={handleViewAllAnnouncement}
                    announcementData={announcemenFilterData}
                />
            ) : null}

            {showSingleAnnouncement ? (
                <ViewSingleAnnouncement
                    open={showSingleAnnouncement}
                    close={handleSingleAnnouncement}
                    announcementData={singleAnnouncementData}
                />
            ) : null}
        </>
    )
}

export default AnnouncementsCardStandard

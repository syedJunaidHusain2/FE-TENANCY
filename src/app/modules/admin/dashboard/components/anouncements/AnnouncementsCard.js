import React, {useEffect, useState, useCallback, useMemo} from 'react'
import {getAnnouncementSelector} from '../../../../../../redux/selectors/DashboardSelectors'
import {useDispatch} from 'react-redux'
import {getannouncementDataAction} from '../../../../../../redux/actions/DashboardActions'
import {useSelector} from 'react-redux'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import {getUserDataSelector} from '../../../../../../redux/selectors/AuthSelectors'
import {Link} from 'react-router-dom'
import ManageAnnouncementModal from '../../../../common/manageAnnouncement/manageAnnouncementModal'
import AddNewAnnouncementModal from '../../../../common/manageAnnouncement/addNewAnnouncementModal'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'
import CustomNoData from '../../../../../../customComponents/customNoData/CustomNoData'
import {KTSVG} from '../../../../../../_metronic/helpers'
import {fontsFamily} from '../../../../../../assets/fonts/fonts'
import CustomLink, {LINK_SIZE} from '../../../../../../customComponents/customButtton/CustomLink'

const AnnouncementsCard = () => {
    const announcementData = useSelector(getAnnouncementSelector)
    const loggedUser = useSelector(getUserDataSelector)
    const [loading, setLoading] = useState(false)
    const [fullLoading, setFullLoading] = useState(false)
    const [showManageAnnouncementModal, setShowManageAnnouncementModal] = useState(false)
    const [showEditAnnouncementModal, setShowEditAnnouncementModal] = useState(false)
    const [editAnnouncementData, setEditAnnouncementData] = useState(false)

    const dispatch = useDispatch()
    useEffect(() => {
        getAnnouncementData()
    }, [])

    const getAnnouncementData = useCallback(() => {
        if (announcementData) setLoading(true)
        else setFullLoading(true)
        const body = {
            id: loggedUser?.id,
        }
        dispatch(getannouncementDataAction(body)).finally(() => {
            if (announcementData) setLoading(false)
            else setFullLoading(false)
        })
    }, [dispatch])

    const onPressEditModal = (item) => {
        setShowEditAnnouncementModal(true)
        setEditAnnouncementData(item)
    }

    const announcemenFilterData = useMemo(() => {
        return announcementData
            ?.filter?.(
                (filterItem) => filterItem?.status == 'Live' || filterItem?.status == 'Upcoming'
            )
            ?.sort((a, b) => b.pin_to_top - a.pin_to_top)
    }, [announcementData])

    return (
        <div
            className='mb-10 h-550px p-5 bg-cmwhite shadow-sm text-cmGrey900'
            style={{
                overflowY: 'auto',
                overflowX: 'hidden',
                fontSize: 14,
                fontWeight: 600,
                fontFamily: fontsFamily.manrope,
                position: 'relative',
                borderRadius: 10,
            }}
        >
            <CustomLoader visible={fullLoading} full />
            {/* Heading */}
            <div className='d-flex align-items-center flex-wrap justify-content-between'>
                <div className='' style={{fontSize: 16, fontWeight: 700, position: 'relative'}}>
                    Announcements(
                    {announcemenFilterData?.length ?? '0'}
                    ) <CustomLoader visible={loading} size={50} />
                </div>

                <div>
                    <CustomLink
                        label={'Manage'}
                        linkSize={LINK_SIZE.large}
                        onClick={() => setShowManageAnnouncementModal(true)}
                    />
                </div>
            </div>
            {/* line 1 */}
            {announcemenFilterData?.length > 0 ? (
                <>
                    {announcemenFilterData?.map((item) => (
                        <div key={item?.id}>
                            <div className='d-flex align-items-center justify-content-between gap-5 mb-2'>
                                <div>
                                    <div
                                        style={{fontSize: 15, fontWeight: 800}}
                                        className='text-cmGrey800'
                                    >
                                        {item?.title}
                                    </div>
                                    <div
                                        className='text-cmGrey800'
                                        style={{fontWeight: 600, fontSize: 12}}
                                    >
                                        {' '}
                                        {item?.description}
                                    </div>
                                </div>
                                <span className='pe-5' onClick={() => onPressEditModal(item)}>
                                    <KTSVG
                                        path='/media/icons/duotune/art/EditIcon2.svg'
                                        className='cursor-pointer'
                                        svgClassName='w-20px h-20px'
                                    />
                                </span>
                            </div>
                            <hr className='pt-2 m-0' />
                        </div>
                    ))}
                </>
            ) : (
                <CustomNoData label={'No Announcements'} />
            )}

            {showManageAnnouncementModal ? (
                <ManageAnnouncementModal
                    show={showManageAnnouncementModal}
                    role='admin'
                    loading={loading}
                    handleClose={() => {
                        setShowManageAnnouncementModal(false)
                        getAnnouncementData()
                    }}
                    announcementData={announcementData}
                />
            ) : null}
            {showEditAnnouncementModal ? (
                <AddNewAnnouncementModal
                    item={editAnnouncementData}
                    show={showEditAnnouncementModal}
                    onClose={() => setShowEditAnnouncementModal(false)}
                />
            ) : null}
        </div>
    )
}

export default AnnouncementsCard

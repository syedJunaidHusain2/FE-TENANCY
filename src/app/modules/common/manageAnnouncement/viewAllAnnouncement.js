import {Sidebar} from 'primereact/sidebar'
import CustomButton, {BUTTON_TYPE} from '../../../../customComponents/customButtton/CustomButton'
import ViewSingleAnnouncement from './viewSingleAnnouncement'
import {useCallback, useState} from 'react'
import {fontsFamily} from '../../../../assets/fonts/fonts'
import CustomLink from '../../../../customComponents/customButtton/CustomLink'

const ViewAllAnnouncement = ({open, close, announcementData}) => {
    const [showSingleAnnouncementDetails, setShowSingleAnnouncementDetails] = useState(false)
    const [singleAnnouncementData, setSingleAnnouncementData] = useState(null)

    const handleViewAllAnnouncement = (item) => {
        setSingleAnnouncementData(item)
        setShowSingleAnnouncementDetails(!showSingleAnnouncementDetails)
    }

    const shortText = useCallback((originalText) => {
        const maxLength = 50 // Adjust this number according to your preference
        const shortText =
            originalText.length > maxLength
                ? originalText.slice(0, maxLength) + '...'
                : originalText

        return shortText
    }, [])

    return (
        <>
            <Sidebar
                visible={open}
                position='right'
                onHide={close}
                showCloseIcon={false}
                style={{fontSize: 14, fontFamily: fontsFamily.manrope}}
                className={'w-sm-25 w-100'}
                icons={() => (
                    <div className='d-flex align-items-center justify-content-between w-100'>
                        <div
                            className='text-cmBlack'
                            style={{
                                fontSize: '16px',
                                fontFamily: fontsFamily.manrope,
                                fontWeight: '700',
                            }}
                        >
                            All Announcements({announcementData?.length ?? '0'})
                        </div>
                        <div
                            onClick={close}
                            className='bi bi-x-lg cursor-pointer border border-cmGrey700 rounded-circle px-1 text-hover-danger border-hover-danger border-2'
                        />
                    </div>
                )}
                maskClassName='bg-cmBlack bg-opacity-50'
            >
                {/* <CustomLoader full visible={loading} /> */}
                {announcementData?.length > 0
                    ? announcementData?.map((item) => (
                          <>
                              <div
                                  className={`bg-${
                                      item?.pin_to_top ? 'cmBlue-Crayola bg-opacity-5' : null
                                  } border-1 border-bottom border-cmGrey300`}
                              >
                                  <div
                                      className='py-3 '
                                      style={{
                                          fontWeight: 600,
                                          fontFamily: 'Manrope',
                                      }}
                                  >
                                      <div className='text-cmGrey900 px-4 d-flex justify-content-between'>
                                          <div>{item?.title}</div>
                                          {item?.pin_to_top == 1 ? (
                                              <div className='bi bi-pin-angle text-cmGrey700 fs-4' />
                                          ) : null}
                                      </div>

                                      <div
                                          className='text-cmGrey600 px-4'
                                          style={{fontWeight: 500}}
                                      >
                                          {shortText(item?.description)}
                                      </div>
                                      <div>
                                          <div className='px-4'>
                                              <CustomLink
                                                  label={'See Details'}
                                                  onClick={() => handleViewAllAnnouncement(item)}
                                              />
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </>
                      ))
                    : null}
            </Sidebar>
            {showSingleAnnouncementDetails ? (
                <ViewSingleAnnouncement
                    open={showSingleAnnouncementDetails}
                    close={handleViewAllAnnouncement}
                    announcementData={singleAnnouncementData}
                />
            ) : null}
        </>
    )
}

export default ViewAllAnnouncement

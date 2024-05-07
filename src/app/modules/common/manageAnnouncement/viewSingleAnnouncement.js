import {Sidebar} from 'primereact/sidebar'
import CustomButton, {BUTTON_TYPE} from '../../../../customComponents/customButtton/CustomButton'
import {useState} from 'react'
import {IMAGE_URL, getValidDate} from '../../../../constants/constants'
import CustomImage from '../../../../customComponents/customImage/CustomImage'
import {IMAGE_TYPE} from '../../../../helpers/CommonHelpers'
import {KTSVG} from '../../../../_metronic/helpers'

const ViewSingleAnnouncement = ({open, close, announcementData}) => {
    const convertToFullURL = (domain) => {
        if (domain.startsWith('http://') || domain.startsWith('https://')) {
            return domain
        } else {
            return `https://www.${domain}`
        }
    }

    return (
        <>
            <Sidebar
                visible={open}
                position='right'
                onHide={close}
                showCloseIcon={false}
                className={'w-sm-25'}
                icons={() => (
                    <div className='d-flex align-items-center my-2 justify-content-between  w-100 '>
                        <div
                            style={{
                                fontSize: '16px',
                                color: '#0D1821',
                                fontFamily: 'Manrope',
                                fontWeight: '700',
                            }}
                        >
                            Announcement Detail
                        </div>
                        <button
                            onClick={close}
                            style={{
                                border: '1px solid grey',
                                marginTop: '-3px',
                                borderRadius: '50%',
                            }}
                            className=' btn btn-flex h-35px bg-body  shadow-sm fs-7 px-3 '
                        >
                            <span className='bi bi-x-lg ' style={{color: 'grey'}}></span>
                        </button>
                    </div>
                )}
            >
                {/* <CustomLoader full visible={loading} /> */}
                <div>
                    <div style={{background: '#FFF3DA', padding: '20px 228px 20px 30px'}}>
                        <h2 className=''>{announcementData?.title}</h2>
                    </div>
                    <div
                        className='text-end py-2'
                        style={{fontSize: '14px', fontWeight: 700, fontFamily: 'Manrope'}}
                    >
                        <span>{getValidDate(announcementData?.start_date, 'MM/DD/YYYY')}</span>
                    </div>
                    <div style={{fontSize: '14px', fontWeight: '600'}}>
                        <p>{announcementData?.description}</p>
                        {/* <p>
                            We are thrilled to announce some significant updates to our company
                            policies that will further strengthen our organization and pave the way
                            for a better future. These updates reflect our commitment to creating an
                            inclusive, supportive, and productive work environment for all.
                        </p> */}

                        {announcementData?.link ? (
                            <>
                                <p>Click on the link to read more about the benefits</p>
                                <a
                                    target='blank'
                                    rel='noopener noreferrer'
                                    href={convertToFullURL(announcementData?.link)}
                                >
                                    {announcementData?.link}
                                </a>
                            </>
                        ) : null}
                    </div>
                    {announcementData?.file ? (
                        <div className='mt-5'>
                            <label className='row fs-4 fw-bold px-3 mb-5'> Attached Files</label>

                            <div
                                className='btn text-cmGrey600 d-flex align-items-center gap-2 border px-5 py-3'
                                style={{fontWeight: '600', fontSize: 12}}
                            >
                                <span
                                    className='bg-cmBlue-Crayola bg-opacity-10 d-flex  p-2 rounded'
                                    style={{width: 'fit-content'}}
                                >
                                    <KTSVG
                                        path='/media/icons/duotune/art/doc1.svg'
                                        className='cursor-pointer p-0 m-0'
                                        // svgClassName='w-15px h-15px'
                                    />
                                </span>
                                <span>
                                    <a
                                        className='text-cmBlue-Crayola text-decoration-underline'
                                        target='blank'
                                        href={`${IMAGE_URL}/${announcementData?.file}`}
                                    >
                                        {announcementData?.file}
                                    </a>
                                </span>
                            </div>
                        </div>
                    ) : null}
                </div>
            </Sidebar>
        </>
    )
}

export default ViewSingleAnnouncement

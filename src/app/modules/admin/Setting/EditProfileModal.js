import {useRef, useState} from 'react'
import CustomImage from '../../../../customComponents/customImage/CustomImage'
import CustomModal from '../../../../customComponents/customModal/CustomModal'
import {IMAGE_TYPE, getServerImage} from '../../../../helpers/CommonHelpers'
import CustomButton, {BUTTON_TYPE} from '../../../../customComponents/customButtton/CustomButton'
import AvatarEditor from 'react-avatar-editor'

const EditProfileModal = ({
    show,
    handleClose,
    companyProfile,
    // getServerImage,
    companyProfileFilePickerRef,
    updateCompanyProfileData,
    handleRotationChange,
    handleZoomChange,
    rotation,
    zoomLevel,
}) => {
    const editorRef = useRef(null)

    const [editImage, setEditImage] = useState(false)
    const [scale, setScale] = useState(1)
    const [rotate, setRotate] = useState(0)

    const onPressEdit = () => {
        setEditImage(true)
    }
    // const onPressSave = () => {
    //     setEditImage(false)
    //     handleClose()
    // }

    const onPressSave = () => {
        // if (editorRef.current) {
        //     const canvas = editorRef.current.getImageScaledToCanvas()
        //     // You can save the canvas or upload it to your server here
        //     updateCompanyProfileData('logo', canvas.toDataURL('image/png'))
        //     setEditImage(false)
        //     handleClose()
        // }
        if (editorRef.current) {
            const canvas = editorRef.current.getImageScaledToCanvas()
            // Convert the canvas image to a blob
            canvas?.toBlob((blob) => {
                // Set the desired image name here
                const customImageName = 'custom_image_name.png'
                // Save the blob as a file with the custom name
                let file = new File([blob], customImageName, {type: 'image/png'})
                updateCompanyProfileData('logo', file)
                setEditImage(false)
                handleClose()
            })
            // setEditImage(false)
            // handleClose()
        }
    }
    return (
        <>
            <CustomModal show={show} onHide={handleClose} maxWidth='500' title={'Company Logo'}>
                {/* <CustomLoader full visible={loading} /> */}
                {/* Body Starts */}
                <div className='overflow-hidden'>
                    <div className=' d-flex align-items-center justify-content-center mx-auto '>
                        {editImage ? (
                            <AvatarEditor
                                ref={editorRef}
                                image={
                                    companyProfile?.logo?.name
                                        ? URL.createObjectURL(companyProfile?.logo)
                                        : getServerImage(
                                              companyProfile?.logo,
                                              IMAGE_TYPE.companyLogo
                                          )
                                }
                                width={250}
                                height={250}
                                border={15}
                                color={[255, 255, 255, 0.6]} // RGBA
                                scale={scale}
                                rotate={rotate}
                            />
                        ) : (
                            <CustomImage
                                className={'w-250px h-250px m-5'}
                                type={IMAGE_TYPE.companyLogo}
                                customSrc={
                                    companyProfile?.logo?.name
                                        ? URL.createObjectURL(companyProfile?.logo)
                                        : getServerImage(
                                              companyProfile?.logo,
                                              IMAGE_TYPE.companyLogo
                                          )
                                }
                            ></CustomImage>
                        )}
                    </div>
                </div>
                {editImage ? (
                    <>
                        <div className='row'>
                            <div
                                className='col-sm'
                                style={{
                                    fontSize: '15px',
                                    fontWeight: 600,
                                    fontFamily: 'Manrope',
                                }}
                            >
                                <div>
                                    <label>Zoom</label>
                                </div>
                                <div className='d-flex'>
                                    <span className='fs-2 px-2'>+</span>
                                    <input
                                        type='range'
                                        min='0.1'
                                        max='2'
                                        step='0.01'
                                        value={scale}
                                        onChange={(e) => setScale(parseFloat(e.target.value))}
                                    />
                                    <span className='fs-2 px-2'>-</span>
                                </div>
                            </div>
                            <div
                                className='col-sm'
                                style={{
                                    fontSize: '15px',
                                    fontWeight: 600,
                                    fontFamily: 'Manrope',
                                }}
                            >
                                <div>
                                    <label>Straighten</label>
                                </div>
                                <div className='d-flex'>
                                    <span className='fs-2 px-2'>+</span>
                                    <input
                                        type='range'
                                        min='0'
                                        max='360'
                                        step='1'
                                        value={rotate}
                                        onChange={(e) => setRotate(parseInt(e.target.value))}
                                    />
                                    <span className='fs-2 px-2'>-</span>
                                </div>
                            </div>
                        </div>

                        <div
                            className='mt-7 d-flex gap-3 justify-content-between'
                            style={{float: 'right'}}
                        >
                            <div className='d-flex gap-3'>
                                <div>
                                    <CustomButton
                                        type='submit'
                                        buttonType={BUTTON_TYPE.primary}
                                        buttonLabel={'Save'}
                                        onClick={onPressSave}
                                    />
                                </div>

                                <div>
                                    <CustomButton
                                        type='submit'
                                        buttonType={BUTTON_TYPE.error}
                                        buttonLabel={'Cancel'}
                                        onClick={() => setEditImage(false)}
                                    />
                                    {/* <button
                                        className=' btn btn-sm btn-icon text-cmError bg-cmError bg-opacity-10 py-5 px-15 rounded cursor-pointer '
                                        style={{
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            color: '#6078EC',
                                            fontFamily: 'Manrope',
                                        }}
                                        onClick={() => setEditImage(false)} */}
                                    {/* > */}
                                    {/* <span>Cancel</span>
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className='mt-5 d-flex flex-wrap gap-3 justify-content-between'>
                        <div className='d-flex gap-3'>
                            {companyProfile?.logo?.name ? (
                                <div>
                                    <CustomButton
                                        buttonType={BUTTON_TYPE.secondary}
                                        buttonLabel={
                                            <div className='d-flex align-items-center gap-3'>
                                                <div className='bi bi-pen fs-4 px-1 text-cminfo' />
                                                <div>Edit</div>
                                            </div>
                                        }
                                        onClick={onPressEdit}
                                    />
                                </div>
                            ) : null}

                            <div>
                                <CustomButton
                                    buttonType={BUTTON_TYPE.secondary}
                                    buttonLabel={
                                        <div className='d-flex align-items-center gap-3'>
                                            <div className='bi bi-camera fs-3 px-1 text-cminfo' />
                                            <div>Add Logo</div>
                                        </div>
                                    }
                                    onClick={() => companyProfileFilePickerRef?.current?.click()}
                                />
                            </div>
                        </div>

                        <div className='d-flex flex-center gap-5'>
                            <CustomButton
                                buttonLabel='Save'
                                buttonType={BUTTON_TYPE.primary}
                                onClick={() => handleClose()}
                            />
                            <CustomButton
                                buttonLabel='Delete'
                                buttonType={BUTTON_TYPE.error}
                                onClick={() => {
                                    updateCompanyProfileData('logo', null)
                                }}
                            />
                            <input
                                ref={companyProfileFilePickerRef}
                                type='file'
                                name='logo'
                                accept='.png,.jpeg,.jpg,.heic'
                                onChange={(e) => {
                                    updateCompanyProfileData(e?.target?.name, e?.target?.files?.[0])
                                    setEditImage(true)
                                }}
                                style={{display: 'none'}}
                            />
                        </div>
                    </div>
                )}
            </CustomModal>
        </>
    )
}

export default EditProfileModal

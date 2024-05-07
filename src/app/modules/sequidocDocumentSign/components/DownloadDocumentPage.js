import React from 'react'
import {KTSVG} from '../../../../_metronic/helpers'
import CustomButton, {BUTTON_SIZE} from '../../../../customComponents/customButtton/CustomButton'
import CustomImage from '../../../../customComponents/customImage/CustomImage'

const DownloadDocumentPage = () => {
    return (
        <div className=''>
            <div className=''>
                <KTSVG
                    path='/media/icons/duotune/art/BlueEllipse.svg'
                    svgClassName='w-100'
                    svgStyle={{width: '100%', height: 'auto'}}
                />
            </div>
            <div
                className='bg-cmwhite shadow mw-500px mx-auto h-500px position-relative'
                style={{borderRadius: 10, marginTop: -200}}
            >
                <div
                    className='position-absolute top-0 start-50 translate-middle w-100px h-100px bg-cmwhite shadow-sm d-flex flex-center'
                    style={{borderRadius: 10}}
                >
                    <CustomImage style={{width: 55}} />
                </div>
                <div className='w-sm-75 h-100 mx-auto text-center' style={{paddingTop: 100}}>
                    <div>
                        <div className='text-cmGrey900' style={{fontSize: 33, fontWeight: 700}}>
                            You’re All Done!
                        </div>
                        <div className=''>
                            <KTSVG
                                path='/media/icons/duotune/art/DoneCheck.svg'
                                svgClassName='w-auto '
                                svgStyle={{width: '111px', height: '111px'}}
                            />
                        </div>
                    </div>
                </div>
                <div className='bg-cmGrey100 fixed-bottom position-absolute bottom-0'>
                    <div className='w-sm-75 mx-auto text-center my-10 d-flex flex-column gap-5'>
                        <div className='text-cmGrey900' style={{fontSize: 16, fontWeight: 700}}>
                            Your Response Has Been Submitted
                        </div>
                        <div className='text-cmGrey700' style={{fontSize: 14, fontWeight: 500}}>
                            You have accepted the offer letter. Welcome to the team! We’ll send a
                            signed copy to you on mail
                        </div>
                        <div>
                            <CustomButton
                                buttonLabel='Download document'
                                buttonSize={BUTTON_SIZE.large}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DownloadDocumentPage

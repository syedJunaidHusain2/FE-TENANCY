import React, {useState} from 'react'
import CustomButton, {
    BUTTON_TYPE,
} from '../../../../../../../../customComponents/customButtton/CustomButton'
import TestEmailModal from '../../components/offerLettersComponent/TestEmailModal'
import {KTSVG} from '../../../../../../../../_metronic/helpers'
import {fontsFamily} from '../../../../../../../../assets/fonts/fonts'

const FinalStepOtherTemplate = ({step, setStep}) => {
    const [openTestEmail, setOpenTestEmail] = useState(false)
    const handleTestEmailModal = () => {
        setOpenTestEmail(!openTestEmail)
    }
    return (
        <div
            className='bg-cmwhite text-center shadow-sm py-sm-15 py-10 px-5'
            style={{fontFamily: fontsFamily.manrope, fontSize: 14, borderRadius: 10}}
        >
            {/* internal block */}
            <div className='w-sm-75 mb-sm-15 mb-10 mx-auto '>
                <KTSVG
                    path='/media/icons/duotune/art/OpenMailwithPage.svg'
                    svgClassName='h-80px w-80px mb-5'
                />
                <div className='text-cmGrey900 mb-3' style={{fontSize: 20, fontWeight: 700}}>
                    Your template Code of Conduct is ready to go!
                </div>
                <div className='text-cmGrey700' style={{fontWeight: 600, lineHeight: '24px'}}>
                    <div className='mb-5'>
                        Feel free to begin using Offer Letter 1 for inviting potential employees.
                        <br />
                        This template is stored in{' '}
                        <span className='text-cmGrey800' style={{fontWeight: 700}}>
                            Sequidocs &gt; Agreements
                        </span>
                        , allowing you to make edits directly from there.
                    </div>
                    <div>
                        Permissions to use this template:{' '}
                        <span className='text-cmGrey900' style={{fontWeight: 700}}>
                            Setters, Closers, Managers
                        </span>{' '}
                        and{' '}
                        <span className='text-cmGrey900' style={{fontWeight: 700}}>
                            Human Resources
                        </span>
                        <br />
                        Recipient Position:{' '}
                        <span className='text-cmGrey900' style={{fontWeight: 700}}>
                            Setters
                        </span>{' '}
                        and{' '}
                        <span className='text-cmGrey900' style={{fontWeight: 700}}>
                            Closers
                        </span>{' '}
                        <br /> Additional Recipients:{' '}
                        <span className='text-cmGrey900' style={{fontWeight: 700}}>
                            Employee Manager
                        </span>{' '}
                        and{' '}
                        <span className='text-cmGrey900' style={{fontWeight: 700}}>
                            {' '}
                            Office Manager{' '}
                        </span>
                        <br />
                    </div>
                </div>
            </div>
            {/* Buttons */}
            <div className='d-flex flex-wrap flex-center gap-sm-10 gap-5'>
                <CustomButton
                    buttonLabel='Back to Offer Letters'
                    buttonType={BUTTON_TYPE.primaryBorder}
                    padding={'py-3'}
                    onClick={() => setStep(step - 1)}
                />
                <CustomButton
                    buttonLabel='Test Template'
                    buttonType={BUTTON_TYPE.secondary}
                    padding={'px-sm-10 py-3'}
                    onClick={handleTestEmailModal}
                />

                <CustomButton buttonLabel='Use Now' padding={'px-sm-15 py-3'} />
            </div>
            {openTestEmail ? (
                <TestEmailModal show={openTestEmail} handleClose={handleTestEmailModal} />
            ) : null}
        </div>
    )
}

export default FinalStepOtherTemplate

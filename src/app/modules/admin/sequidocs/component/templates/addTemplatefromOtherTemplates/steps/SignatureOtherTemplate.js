import React, {useState} from 'react'
import {KTSVG} from '../../../../../../../../_metronic/helpers'
import CustomLoader from '../../../../../../../../customComponents/customLoader/CustomLoader'
import {ListBox} from 'primereact/listbox'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomCheckbox from '../../../../../../../../customComponents/customCheckbox/CustomCheckbox'
import {fontsFamily} from '../../../../../../../../assets/fonts/fonts'
import CustomButton, {
    BUTTON_TYPE,
} from '../../../../../../../../customComponents/customButtton/CustomButton'

const SignatureOtherTemplate = ({step, setStep}) => {
    const [loading, setLoading] = useState(false)
    return (
        <div className='w-sm-75' style={{fontFamily: fontsFamily.manrope}}>
            <div className='mb-10'>
                <div className='text-cmGrey900 mb-2' style={{fontSize: 18, fontWeight: 700}}>
                    All Signatures Required
                </div>
                <div
                    className='text-cmGrey700'
                    style={{fontSize: 14, fontWeight: 700, lineHeight: '24px'}}
                >
                    Add People that need to sign this document <br /> Additional Signatures Required
                    (if any)- Add more people that needs to sign this template E.g. the recipient,
                    their manager, their office manager, Admin, SuperAdmin
                </div>
            </div>
            <div className='rounded bg-cmwhite border border-cmDisabled py-10 px-sm-20 px-5 mb-10'>
                <div className='w-sm-60'>
                    <div className='text-cmGrey800 mb-5' style={{fontSize: 16, fontWeight: 700}}>
                        Select Signature Required
                    </div>
                    <div className='d-flex align-items-center gap-3 mb-10'>
                        <CustomCheckbox
                        // checked={signaturesRequired}
                        // onChange={(e) => setSignaturesRequired(e.target.checked)}
                        />
                        <div className='text-cmGrey800' style={{fontSize: 14, fontWeight: 600}}>
                            Employee Signature (person receiving this template)
                        </div>
                    </div>

                    <div className='mb-5'>
                        <div
                            className='text-cmGrey800 mb-2'
                            style={{fontSize: 16, fontWeight: 700}}
                        >
                            Additional Signatures
                        </div>
                        <CustomInput
                            type={INPUT_TYPE.search}
                            placeholder='Search Positions'
                            // onChange={(e) => onSearchSignature(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        {1 > 0 ? (
                            <ListBox
                                multiple
                                value={null}
                                // options={filterSignatures}
                                optionLabel='name'
                                className='w-full md:w-14rem'
                                // onChange={(e) => setSelectSignature(e.value)}
                            />
                        ) : null}
                    </div>
                    {/* selected value block */}
                    <div className='h-100px' style={{overflowY: 'auto', overflowX: 'hidden'}}>
                        <CustomLoader visible={loading} full />

                        {null?.map((item) =>
                            null?.includes(item?.value) ? (
                                <div
                                    className='d-flex align-items-center justify-content-between text-cmGrey700  border-cmGrey200 p-5 border-bottom'
                                    style={{fontSize: 14, fontWeight: 600}}
                                >
                                    <div>{item?.name}</div>
                                    <KTSVG
                                        path='/media/icons/duotune/art/trash.svg'
                                        svgClassName='h-20px w-20px cursor-pointer'
                                        // onClick={() => removeSignature(item?.value)}
                                    />
                                </div>
                            ) : null
                        )}
                    </div>
                </div>
            </div>
            {/* Buttons */}
            <div className='d-flex flex-center gap-10'>
                {step > 1 ? (
                    <CustomButton
                        buttonLabel='Back'
                        buttonType={BUTTON_TYPE.secondary}
                        padding={'px-20'}
                        onClick={() => setStep(step - 1)}
                    />
                ) : null}
                <CustomButton
                    buttonLabel='Save & Continue'
                    padding={'px-10'}
                    onClick={() => setStep(step + 1)}
                    // loading={buttonLoading}
                />
            </div>
        </div>
    )
}

export default SignatureOtherTemplate

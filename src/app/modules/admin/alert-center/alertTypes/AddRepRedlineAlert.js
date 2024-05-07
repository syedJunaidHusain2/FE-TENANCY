import {useCallback, useState} from 'react'
import {fontsFamily} from '../../../../../assets/fonts/fonts'
import CustomDatePicker from '../../../../../customComponents/customInputs/customDatePicker/CustomDatePicker'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomLoader from '../../../../../customComponents/customLoader/CustomLoader'
import CustomModal from '../../../../../customComponents/customModal/CustomModal'

const AddRepRedlineAlert = ({data, show, handleClose}) => {
    const [loading, setLoading] = useState(false)
    const [repRedlinePayload, setRepRedlinePayload] = useState({
        effectiveDate: null,
        redline: null,
    })
    const [repRedlineError, setRepRedlineError] = useState({
        effectiveDate: null,
        redline: null,
    })

    const onChange = (e) => {
        onChangeData(e.target.name, e.target.value)
    }
    const onChangeData = useCallback(
        (name, value) => {
            setRepRedlinePayload({...repRedlinePayload, [name]: value})
            setRepRedlineError({...repRedlineError, [name]: ''})
        },
        [repRedlineError, repRedlinePayload]
    )

    const onSavePress = () => {
        if (!repRedlinePayload?.effectiveDate)
            return setRepRedlineError({...repRedlineError, effectiveDate: 'Select Effective Date'})
        if (!repRedlinePayload?.redline)
            return setRepRedlineError({...repRedlineError, redline: 'Enter Redline'})
        setLoading(true)
    }
    return (
        <>
            <CustomModal show={show} onHide={handleClose} maxWidth='550' title={'Add Rep Redline'}>
                <>
                    <div className='' style={{position: 'relative'}}>
                        <CustomLoader visible={loading} full />

                        <div className=' px-lg-10'>
                            <div className=' w-sm-75 mx-auto w-100'>
                                <div className='row align-items-center  mb-5 mt-5'>
                                    <div
                                        className='text-cmGrey700 col-sm mb-sm-0 '
                                        style={{
                                            fontWeight: '600',
                                            fontFamily: fontsFamily.manrope,
                                            fontSize: '14px',
                                        }}
                                    >
                                        Effective Date:
                                    </div>

                                    <div className='col-sm'>
                                        <CustomDatePicker
                                            onChange={onChange}
                                            value={repRedlinePayload?.effectiveDate}
                                            errorMessage={repRedlineError?.effectiveDate}
                                            name='effectiveDate'
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className='row align-items-center mb-5 mt-3'>
                                        <div
                                            className='text-cmGrey700  col-sm mb-sm-0 '
                                            style={{
                                                fontWeight: '600',
                                                fontFamily: fontsFamily.manrope,
                                                fontSize: '14px',
                                            }}
                                        >
                                            Redline:
                                        </div>

                                        <div className='col-sm'>
                                            <CustomInput
                                                prefixText='$'
                                                onChange={onChange}
                                                className=''
                                                placeholder='0.00'
                                                type={INPUT_TYPE.number}
                                                name={'redline'}
                                                value={repRedlinePayload?.redline}
                                                errorMessage={repRedlineError?.redline}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className='d-flex align-items-center justify-content-center mb-10 mt-10'>
                                    <button
                                        type='button'
                                        className='btn py-2 px-sm-20 px-5'
                                        style={{
                                            background: '#6078EC',
                                            color: '#FFFFFF',
                                            fontSize: '16px',
                                            fontWeight: '700',
                                        }}
                                        onClick={onSavePress}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            </CustomModal>
        </>
    )
}

export {AddRepRedlineAlert}

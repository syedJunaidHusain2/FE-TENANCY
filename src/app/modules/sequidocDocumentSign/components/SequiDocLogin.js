import React, {useState} from 'react'
import {KTSVG} from '../../../../_metronic/helpers'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../customComponents/customInputs/customInput/CustomInput'
import {fontsFamily} from '../../../../assets/fonts/fonts'
import {useNavigate} from 'react-router-dom'

const SequiDocLogin = () => {
    const [password, setpassword] = useState(null)
    const navigate = useNavigate()
    const handleInputChange = (e) => {
        setpassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate('/document-signing/step1')
    }
    return (
        <div
            className='h-100 d-flex flex-center'
            style={{fontFamily: fontsFamily.manrope, backgroundColor: 'rgba(0, 0, 0, 0.8)'}}
        >
            <div className='w-sm-30 w-75 d-flex flex-column flex-center gap-5'>
                <div>
                    <KTSVG
                        path='/media/icons/duotune/art/lock-grey.svg'
                        svgClassName='w-60px'
                        svgStyle={{width: '58px', height: '58px'}}
                    />
                </div>
                <div className='text-cmGrey200 text-center' style={{fontWeight: 600, fontSize: 18}}>
                    <div className='mb-1'>Please look for a 6 digit code sent with your email</div>
                    <div style={{fontSize: 14}}>Paste the code in the box below!</div>
                </div>
                <div className='w-80 text-center'>
                    <form action='' onSubmit={(e) => handleSubmit(e)}>
                        <CustomInput
                            type={INPUT_TYPE.password}
                            feedback={false}
                            placeholder='Password'
                            inputBackground='cmGrey800'
                            value={password}
                            textColor={'cmGrey400'}
                            onChange={handleInputChange}
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SequiDocLogin

import clsx from 'clsx'
import React, {useState} from 'react'
import {forgotPasswordService} from '../../../../../../services/Services'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import oneSignal from '../../../../../../onesignal/oneSignal'
import {useDispatch} from 'react-redux'
import {loginAction} from '../../../../../../redux/actions/AuthActions'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomButton, {
    BUTTON_SIZE,
} from '../../../../../../customComponents/customButtton/CustomButton'

const Login = () => {
    const [loginForgot, setLoginForgot] = useState('Signin')
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const forgotPassword = () => {
        setEmailError('')
        setEmail('')
        setPassword('')
        setLoginForgot('ForgotPassword')
    }

    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email)
    }

    const changePassword = (event) => {
        event.preventDefault()

        if (email == '') return setEmailError('Username is required')
        if (isValidEmail(email)) {
            setLoading(true)
            const body = {
                email: email,
            }
            forgotPasswordService(body)
                .then((res) => {
                    if (res?.status == false) return CustomToast.error(res?.message)
                    CustomToast.success('Email sent successfully')
                    setLoginForgot('Signin')
                })
                .finally(() => {
                    setLoading(false)
                })
        } else {
            setEmailError('Wrong email format')
        }
    }

    const handleLoginSubmit = (e) => {
        e.preventDefault()
        if (email == '' || password == '') {
            if (email == '') setEmailError('Enter Username')
            if (password == '') setPasswordError('Enter Password')
            return
        } else if (isValidEmail(email)) {
            setLoading(true)
            let body = {
                email,
                password,
                device_token: null,
            }
            dispatch(loginAction(body)).catch(() => {
                setLoading(false)
            })
        } else {
            setEmailError('Enter valid email address')
        }
    }

    return loginForgot == 'Signin' ? (
        <form
            className='w-100'
            onSubmit={handleLoginSubmit}
            noValidate
            style={{fontFamily: 'Manrope'}}
        >
            {/* begin::Heading */}
            <div className='text-center mb-5'>
                <div
                    className='text-cmGrey800'
                    style={{fontSize: '30px', lineHeight: '42px', fontWeight: '500px'}}
                >
                    User Sign in
                </div>
            </div>

            {/* form card */}

            <div className=' p-sm-10 p-5 card shadow-sm' style={{borderRadius: '20px'}}>
                <div className='my-auto '>
                    {/* begin::Form group */}
                    <div className='mb-5'>
                        <CustomInput
                            label={'Username'}
                            placeholder='Enter Username'
                            onChange={(e) => {
                                setEmail(e.target.value)
                                setEmailError('')
                            }}
                            errorMessage={emailError}
                            type={INPUT_TYPE.email}
                            value={email}
                        />
                    </div>
                    <div className=''>
                        <CustomInput
                            label={'Password'}
                            placeholder='Enter Password'
                            feedback={false}
                            type={INPUT_TYPE.password}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                                setPasswordError('')
                            }}
                            // style={{width: '50%'}}
                            errorMessage={passwordError}
                        />
                    </div>
                    <div
                        style={{fontWeight: '600', cursor: 'pointer'}}
                        className='text-hover-dark text-cmGrey600 mb-10 d-flex flex-end'
                    >
                        <div onClick={() => forgotPassword()}>Forgot password?</div>
                    </div>

                    {/* begin::Action */}
                    <div className='text-center '>
                        <CustomButton
                            onClick={handleLoginSubmit}
                            loading={loading}
                            buttonLabel={`${loading ? 'Please wait...' : 'Sign in'} `}
                            buttonSize={BUTTON_SIZE.small}
                        />
                    </div>

                    {/* end::Action */}
                </div>
            </div>
        </form>
    ) : (
        <form
            className='form w-100'
            onSubmit={changePassword}
            noValidate
            id='kt_forgot_password_form'
            style={{fontFamily: 'Manrope'}}
        >
            <div></div>
            {/* begin::Heading */}
            <div className='text-center mb-5 mt-0'>
                <div className='' style={{color: '#424242', fontSize: '30px'}}>
                    Forgot Password{''}
                </div>
            </div>

            {/* form card */}

            <div className='card p-10 shadow' style={{borderRadius: '20px'}}>
                <div className='my-auto'>
                    {/* begin::Form group */}
                    <div className='fv-row mb-10 w-sm-350px  mx-auto'>
                        <div className='mb-2'>
                            <CustomInput
                                label={'Email'}
                                placeholder='Email'
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    setEmailError('')
                                }}
                                errorMessage={emailError}
                                type={INPUT_TYPE.email}
                                value={email}
                            />
                        </div>
                        <div
                            style={{
                                color: '#757575',
                                fontWeight: '500',
                                cursor: 'pointer',
                            }}
                            className='text-end'
                            onClick={() => {
                                setEmailError('')
                                setEmail('')
                                setLoginForgot('Signin')
                            }}
                        >
                            Sign In?
                        </div>
                    </div>

                    <div className=''>
                        <CustomButton
                            onClick={changePassword}
                            loading={loading}
                            buttonLabel={`${loading ? 'Please wait...' : 'Submit'} `}
                            buttonSize={BUTTON_SIZE.small}
                        />
                    </div>

                    {/* end::Action */}
                </div>
            </div>
        </form>
    )
}

export default Login

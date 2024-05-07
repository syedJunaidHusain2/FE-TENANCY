import {FC} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {KTSVG, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import CustomButton, {BUTTON_SIZE} from '../../../../../customComponents/customButtton/CustomButton'

const Error404 = () => {
    const naviagte = useNavigate()
    return (
        <div>
            <div className='mb-5'>
                <KTSVG
                    path='/media/icons/duotune/art/Error-404.svg'
                    svgStyle={{width: '100%', height: 'auto'}}
                    svgClassName='w-500px '
                />
            </div>

            {/* begin::Link */}
            {/* <div className='mb-0'>
                <Link to='/dashboard' className='btn btn-sm btn-primary'>
                    Return Home
                </Link>
            </div> */}

            <div className='text-center'>
                <div
                    className='text-cmGrey800 mb-20'
                    style={{fontSize: '18px', fontWeight: 800, lineHeight: '24.59px'}}
                >
                    The page you requested does not exist!
                </div>
                <CustomButton
                    buttonLabel='Back to Previous Page'
                    buttonSize={BUTTON_SIZE.large}
                    onClick={() => naviagte('/dashboard')}
                />
            </div>

            {/* end::Link */}
        </div>
    )
}

export default Error404

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react'
import {getSaleDataForSuperAdminService} from '../../../../../../services/Services'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import CustomModal from '../../../../../../customComponents/customModal/CustomModal'
import {getErrorMessageFromResponse} from '../../../../../../helpers/CommonHelpers'
import CustomButton from '../../../../../../customComponents/customButtton/CustomButton'

const AuthenticateSalesUserPopup = ({
    pid,
    show,
    onSuccessClose = () => {},
    handleClose = () => {},
}) => {
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState(null)

    const VerifyUser = (e) => {
        e.preventDefault()
        if (!password) return CustomToast.error('Enter password')
        setLoading(true)
        getSaleDataForSuperAdminService(pid, password)
            .then((res) => {
                onSuccessClose()
            })
            .catch((error) => {
                CustomToast.error(getErrorMessageFromResponse(error))
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <CustomModal show={show} onHide={handleClose} title='Verify Super Admin' maxWidth='350'>
            <CustomLoader visible={loading} full />
            {/* Form Starts */}
            <div className='w-75 mx-auto my-10'>
                <form action='' onSubmit={VerifyUser}>
                    <input
                        type='password'
                        onChange={(e) => setPassword(e?.target?.value)}
                        className='form-control'
                        placeholder='Enter Password'
                    />
                </form>
            </div>

            <div className='d-flex justify-content-center mt-0 mb-12'>
                <CustomButton onClick={VerifyUser} buttonLabel='Verify' />
            </div>
        </CustomModal>
    )
}

export {AuthenticateSalesUserPopup}

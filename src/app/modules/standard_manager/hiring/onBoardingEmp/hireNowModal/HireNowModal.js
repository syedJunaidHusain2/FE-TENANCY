import {sendUserCredentialService} from '../../../../../../services/Services'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import {useState} from 'react'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import CustomModal from '../../../../../../customComponents/customModal/CustomModal'
import {getErrorMessageFromResponse} from '../../../../../../helpers/CommonHelpers'

const HireNowModal = ({show, handleClose, id}) => {
    const [loading, setLoading] = useState(false)

    const sendCredential = () => {
        setLoading(true)
        sendUserCredentialService(id)
            .then(() => {
                handleClose('done')
                CustomToast.success('User hired and credentials sent to their mail')
            })
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
            .finally(() => {
                setLoading(false)
            })
    }
    return (
        <CustomModal
            show={show}
            onHide={handleClose}
            title={'Are you sure want to hire ?'}
            maxWidth='1000'
        >
            <CustomLoader visible={loading} full />

            <div
                className='modal-body py-lg-5  p-15 '
                style={{fontFamily: 'Manrope', fontSize: '14px'}}
            >
                {/* Time */}
                <div className='mb-5'>
                    <h2
                        style={{
                            fontSize: '17px',
                            color: '#212121',
                            fontFamily: 'Manrope',
                            fontWeight: '700',
                            marginLeft: '5px',
                            textAlign: 'center',
                        }}
                    >
                        This action will send credential to a new user on their mail.
                    </h2>
                </div>

                {/* end::Stepper */}
            </div>
            <button
                className='d-flex mx-auto justify-content-center align-items-center mb-10 cursor-pointer border-0 px-10 py-2 bg-cmBlue-Crayola text-cmwhite'
                style={{
                    borderRadius: '6px',
                    fontSize: '16px',
                    fontWeight: '700',
                }}
                onClick={sendCredential}
            >
                Send Credential
            </button>
        </CustomModal>
    )
}

export {HireNowModal}

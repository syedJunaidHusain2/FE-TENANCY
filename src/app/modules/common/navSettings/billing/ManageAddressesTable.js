import React, {useCallback, useEffect, useState} from 'react'
import {fontsFamily} from '../../../../../assets/fonts/fonts'
import CustomEditIcon from '../../../../../customComponents/customIcons/CustomEditIcon'
import EditBillingModal from './EditBillingModal'
import {getBusinessAddressListService} from '../../../../../services/Services'
import CustomLoader from '../../../../../customComponents/customLoader/CustomLoader'

const BILLING_FIELD_KEYS = {
    name: 'name',
    country: 'country',
    address1: 'mailing_address',
    address2: 'address',
    city: 'mailing_city',
    state: 'mailing_state',
    zip: 'mailing_zip',
    ein: 'mailing_ein',
}
const BUSINESS_FIELD_KEYS = {
    name: 'name',
    country: 'country',
    city: 'business_city',
    address1: 'business_address',
    address2: 'address',
    state: 'business_state',
    zip: 'business_zip',
    ein: 'business_ein',
}

const ManageAddressesTable = () => {
    const [openBilling, setopenBilling] = useState(false)
    const [openBusiness, setopenBusiness] = useState(false)
    const [loading, setLoading] = useState(false)
    const [addressData, setAddressData] = useState([])
    const [editableData, setEditableData] = useState(null)

    useEffect(() => {
        getBusinessAddresses()
    }, [])

    const getBusinessAddresses = useCallback(() => {
        setLoading(true)
        getBusinessAddressListService()
            .then((res) => setAddressData(res?.data))
            .finally(() => {
                setLoading(false)
            })
    }, [])

    const handleBillingModal = () => {
        setopenBilling(!openBilling)
    }

    const handleBusinessModal = () => {
        setopenBusiness(!openBusiness)
    }

    return (
        <div style={{fontSize: 14, fontWeight: 600}}>
            <div
                className='text-cmGrey900 mb-10'
                style={{fontSize: 20, fontFamily: fontsFamily.manrope, fontWeight: 600}}
            >
                Manage Addresses
            </div>
            {/* Billing Addresses */}
            <div className='mb-10' style={{}}>
                <div className='text-cmGrey800' style={{fontFamily: '', fontSize: 18}}>
                    Billing Addresses
                </div>
                <div className='text-cmGrey600 mb-5'>
                    This address appears on your invoice. It could be your company address or your
                    billing department’s address.
                </div>
                <div
                    className='bg-cmwhite shadow-sm p-5 border border-cmGrey300 border-1 border-dashed'
                    style={{borderRadius: 10, position: 'relative'}}
                >
                    <CustomLoader full visible={loading} />

                    <div className='d-flex align-items-start justify-content-between'>
                        <div className='d-flex align-itmes-center gap-3 mb-5'>
                            <div className='text-cmGrey600'>Company name:</div>
                            <div className='text-cmGrey800'>{addressData?.name}</div>
                        </div>

                        <CustomEditIcon svgClassName='w-30px h-30px' onClick={handleBillingModal} />
                    </div>
                    <div className='d-flex align-itmes-center gap-3 mb-5'>
                        <div className='text-cmGrey600'>Company address:</div>
                        <div className='text-cmGrey800'>
                            {addressData?.mailing_address}
                            {addressData?.mailing_city ? `,${addressData?.mailing_city}` : null},
                            {addressData?.mailing_state}, {addressData?.country}
                        </div>
                    </div>
                    <div className='d-flex align-itmes-center gap-3'>
                        <div className='text-cmGrey600'>Tax ID:</div>
                        <div className='text-cmGrey800'>
                            {addressData?.mailing_ein ?? 'Not Added'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Business Address */}
            <div>
                <div className='text-cmGrey800' style={{fontFamily: '', fontSize: 18}}>
                    Business Address
                </div>
                <div className='text-cmGrey600 mb-5'>
                    This is your company address. In most cases, this address will be the same as
                    your billing address.
                </div>
                <div
                    className='bg-cmwhite shadow-sm p-5 border border-cmGrey300 border-1 border-dashed'
                    style={{borderRadius: 10, position: 'relative'}}
                >
                    <CustomLoader full visible={loading} />

                    <div className='d-flex align-items-start justify-content-between'>
                        <div className='d-flex align-itmes-center gap-3 mb-5'>
                            <div className='text-cmGrey600'>Company name:</div>
                            <div className='text-cmGrey800'>{addressData?.name}</div>
                        </div>

                        <CustomEditIcon
                            svgClassName='w-30px h-30px'
                            onClick={handleBusinessModal}
                        />
                    </div>
                    <div className='d-flex align-itmes-center gap-3 mb-5'>
                        <div className='text-cmGrey600'>Company address:</div>
                        <div className='text-cmGrey800'>
                            {addressData?.business_address}
                            {addressData?.business_city
                                ? `,${addressData?.business_city}`
                                : null}, {addressData?.business_state}, {addressData?.country}
                        </div>
                    </div>
                    <div className='d-flex align-itmes-center gap-3'>
                        <div className='text-cmGrey600'>Tax ID:</div>
                        <div className='text-cmGrey800'>
                            {addressData?.business_ein ?? 'Not Added'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modales */}
            {openBilling && (
                <EditBillingModal
                    show={openBilling}
                    handleClose={handleBillingModal}
                    type={'Billing'}
                    getAddressesData={getBusinessAddresses}
                    editableData={addressData}
                    fieldKeys={BILLING_FIELD_KEYS}
                />
            )}
            {openBusiness && (
                <EditBillingModal
                    show={openBusiness}
                    handleClose={handleBusinessModal}
                    type={'Business'}
                    getAddressesData={getBusinessAddresses}
                    editableData={addressData}
                    fieldKeys={BUSINESS_FIELD_KEYS}
                />
            )}
        </div>
    )
}

export default ManageAddressesTable

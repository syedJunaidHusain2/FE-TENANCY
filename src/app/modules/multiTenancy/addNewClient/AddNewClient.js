import {useCallback, useState} from 'react'
import {KTSVG} from '../../../../_metronic/helpers'
import {useNavigate} from 'react-router'
import {fontsFamily} from '../../../../assets/fonts/fonts'
import CustomArrow, {ARROW_DIRECTION} from '../../../../customComponents/customIcons/CustomIcons'
import CustomInput, {
    CommonLabel,
    INPUT_TYPE,
} from '../../../../customComponents/customInputs/customInput/CustomInput'
import CustomButton, {BUTTON_SIZE} from '../../../../customComponents/customButtton/CustomButton'
import {companyOnboardSettingService} from '../../../../services/Services'
import {TYPE_OF_COMPANY_OPTIONS} from '../../../../constants/constants'
import {getDataWithoutMask, getErrorMessageFromResponse} from '../../../../helpers/CommonHelpers'
import CustomToast from '../../../../customComponents/customToast/CustomToast'

const AddNewClient = () => {
    const naviagte = useNavigate()
    const [basicInformationData, setBasicInformationData] = useState({
        company_name: null,
        type_of_company: null, //optional
        ein_no: null, // optional
        sub_domain: null,
        email: null,
        password: 'NewUser123#',
        position_id: 0,
    })
    const [loading, setLoading] = useState(false)
    const updateBasicInformationData = useCallback(
        (field, value) => {
            setBasicInformationData((val) => ({
                ...val,
                [field]: value,
            }))
        },
        [setBasicInformationData]
    )

    const onChangeInputData = (e) => {
        updateBasicInformationData(e?.target?.name, e?.target?.value)
    }

    const onSelectTypeOfCompany = (val) => {
        updateBasicInformationData('type_of_company', val)
    }

    const onSave = useCallback(() => {
        setLoading(true)
        const body = {...basicInformationData}
        body.ein_no = getDataWithoutMask(body.ein_no)
        companyOnboardSettingService(body)
            .then(() => {
                naviagte(-1)
                CustomToast.success(' Added Successfully')
            })
            .catch((err) => {
                CustomToast.error(getErrorMessageFromResponse(err))
            })
            .finally(() => setLoading(false))
    }, [basicInformationData, naviagte])
    return (
        <div className='container' style={{fontFamily: fontsFamily.manrope}}>
            <div className='d-flex align-items-center gap-3 mb-2'>
                <div>
                    <KTSVG
                        path='/media/icons/duotune/art/back-square.svg'
                        svgClassName='h-25px w-25px cursor-pointer'
                        onClick={() => naviagte(-1)}
                    />
                </div>
                <div className='text-cmGrey900' style={{fontSize: 20.58, fontWeight: 500}}>
                    Add a new client
                </div>
            </div>
            <div className='text-cmGrey700 mb-10' style={{fontWeight: 600, fontSize: 14}}>
                Finish these sections to onboard a new client, ensuring you provide accurate company
                details, administrative contacts, and technical preferences.
            </div>
            <BasicInformation
                onChangeInputData={onChangeInputData}
                basicInformationData={basicInformationData}
                onSelectTypeOfCompany={onSelectTypeOfCompany}
            />
            <BillingSubscription />
            <AdministrativeSetup />
            <Integrations />
            <div className='mt-5'>
                <CustomButton
                    buttonLabel='Save'
                    // onClick={() => naviagte('new-user')}
                    onClick={onSave}
                    buttonSize={BUTTON_SIZE.large}
                    loading={loading}
                />
            </div>
        </div>
    )
}

export default AddNewClient

export const BasicInformation = ({
    onChangeInputData,
    basicInformationData,
    onSelectTypeOfCompany,
}) => {
    return (
        <div className='w-sm-85 shadow-sm mb-10' style={{borderRadius: 10}}>
            <div
                className='bg-cmGrey200 d-flex align-items-center gap-5 ps-sm-10 p-5'
                style={{borderRadius: '10px 10px 0 0'}}
            >
                <div className='text-cmBlack' style={{fontSize: 18, fontWeight: 700}}>
                    Basic Information
                </div>
                <CustomArrow arrowDirection={ARROW_DIRECTION.down} />
            </div>

            {
                <div className='bg-cmwhite pt-10 pb-15' style={{borderRadius: '0 0 10px 10px '}}>
                    <div className='w-sm-50 mx-auto'>
                        <div className='mb-5'>
                            <CustomInput
                                label={'Company Name'}
                                name='company_name'
                                onChange={onChangeInputData}
                                value={basicInformationData?.company_name}
                                required
                            />
                        </div>
                        <div className='mb-5'>
                            <CustomInput
                                label={'Company Email'}
                                name='email'
                                onChange={onChangeInputData}
                                value={basicInformationData?.email}
                                required
                            />
                        </div>
                        <div className='mb-5'>
                            <CustomInput
                                label={'Sub-domain'}
                                name='sub_domain'
                                onChange={onChangeInputData}
                                value={basicInformationData?.sub_domain}
                                required
                            />
                        </div>
                        <div>
                            <div className='mb-1'>
                                <CommonLabel label='Type of company' />
                            </div>
                            <div
                                className='d-flex gap-4 align-items-center flex-wrap mb-5'
                                style={{fontSize: 14, fontWeight: 600}}
                            >
                                {TYPE_OF_COMPANY_OPTIONS.map((item) => {
                                    let isSelected =
                                        basicInformationData?.type_of_company == item?.value
                                    return (
                                        <>
                                            <div
                                                className={`w-100px h-40px ${
                                                    isSelected
                                                        ? 'bg-cmBlue-Crayola text-cmwhite'
                                                        : 'border border-cmGrey500 text-cmGrey500'
                                                } d-flex flex-center cursor-pointer`}
                                                style={{borderRadius: 6}}
                                                onClick={() => onSelectTypeOfCompany(item?.value)}
                                            >
                                                {item?.name}
                                            </div>
                                        </>
                                    )
                                })}
                                {/* <div
                                    className='w-100px h-40px bg-cmBlue-Crayola d-flex flex-center text-cmwhite'
                                    style={{borderRadius: 6}}
                                >
                                    Solar
                                </div>
                                <div
                                    className='w-100px h-40px border border-cmGrey500 d-flex flex-center text-cmGrey500'
                                    style={{borderRadius: 6}}
                                >
                                    Pest Control
                                </div>
                                <div
                                    className='w-100px h-40px border border-cmGrey500 d-flex flex-center text-cmGrey500'
                                    style={{borderRadius: 6}}
                                >
                                    Roofing
                                </div>
                                <div
                                    className='w-100px h-40px border border-cmGrey500 d-flex flex-center text-cmGrey500'
                                    style={{borderRadius: 6}}
                                >
                                    Real Estate
                                </div>
                                <div
                                    className='w-100px h-40px border border-cmGrey500 d-flex flex-center text-cmGrey500'
                                    style={{borderRadius: 6}}
                                >
                                    Other
                                </div> */}
                            </div>
                        </div>
                        <div>
                            <CustomInput
                                label={'EIN No.'}
                                type={INPUT_TYPE.mobile}
                                mask='99-9999999'
                                name='ein_no'
                                onChange={onChangeInputData}
                                value={basicInformationData?.sub_domain}
                            />
                            <div className='text-cmGrey500' style={{fontSize: 14, fontWeight: 600}}>
                                Employer Identification Number for tax and identification purposes.
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export const BillingSubscription = () => {
    return (
        <div className='w-sm-85 shadow-sm mb-10' style={{borderRadius: 10}}>
            <div
                className='bg-cmGrey200 d-flex align-items-center gap-5 ps-sm-10 p-5'
                style={{borderRadius: '10px 10px 0 0'}}
            >
                <div className='text-cmBlack' style={{fontSize: 18, fontWeight: 700}}>
                    Billing & Subscription
                </div>
                <CustomArrow arrowDirection={ARROW_DIRECTION.down} />
            </div>

            {0 > 1 ? (
                <div className='bg-cmwhite pt-10 pb-15' style={{borderRadius: '0 0 10px 10px '}}>
                    <div className='w-sm-50 mx-auto'>
                        <div className='mb-5'>
                            <CustomInput label={'Billing frequency'} />
                        </div>
                        <div
                            className='my-5  px-2 bage bg-cmPurple text-cmPurple py-1 bg-opacity-10  rounded-pill text-center text-nowrap'
                            style={{
                                fontSize: 14,
                                fontWeight: 700,
                                lineHeight: '19.12px',
                                width: 'fit-content',
                            }}
                        >
                            Unique PID’s
                        </div>

                        <div className='row align-items-center mb-5 text-cmgrey800'>
                            <div className='col-md d-flex'>
                                <div className='d-flex align-items-center '>
                                    {' '}
                                    <span className='mt-5 me-2'>$</span>{' '}
                                    <CustomInput label={'Rack Price'} type={INPUT_TYPE.number} />{' '}
                                    <span className='mt-5 ms-2'>/watt</span>
                                </div>
                            </div>
                            <div className='col-md '>
                                <div className='d-flex align-items-center'>
                                    <span className='mt-5 me-2'>$</span>{' '}
                                    <CustomInput
                                        label={'Discounted Price'}
                                        type={INPUT_TYPE.number}
                                    />{' '}
                                    <span className='mt-5 ms-2'>/watt</span>
                                </div>{' '}
                            </div>
                        </div>
                        <div
                            className='my-5 px-2 bage bg-cmPurple text-cmPurple py-1 bg-opacity-10  rounded-pill text-center  text-nowrap'
                            style={{
                                fontSize: 14,
                                fontWeight: 700,
                                lineHeight: '19.12px',
                                width: 'fit-content',
                            }}
                        >
                            M2 Completed
                        </div>
                        <div className='row align-items-center mb-5 text-cmgrey800'>
                            <div className='col-md d-flex'>
                                <div className='d-flex align-items-center '>
                                    {' '}
                                    <span className='mt-5 me-2'>$</span>{' '}
                                    <CustomInput label={'Rack Price'} type={INPUT_TYPE.number} />{' '}
                                    <span className='mt-5 ms-2'>/watt</span>
                                </div>
                            </div>
                            <div className='col-md '>
                                <div className='d-flex align-items-center'>
                                    <span className='mt-5 me-2'>$</span>{' '}
                                    <CustomInput
                                        label={'Discounted Price'}
                                        type={INPUT_TYPE.number}
                                    />{' '}
                                    <span className='mt-5 ms-2'>/watt</span>
                                </div>{' '}
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export const AdministrativeSetup = () => {
    return (
        <div className='w-sm-85 shadow-sm mb-10' style={{borderRadius: 10}}>
            <div
                className='bg-cmGrey200 d-flex align-items-center gap-5 ps-sm-10 p-5'
                style={{borderRadius: '10px 10px 0 0'}}
            >
                <div className='text-cmBlack' style={{fontSize: 18, fontWeight: 700}}>
                    Administrative Setup
                </div>
                <CustomArrow arrowDirection={ARROW_DIRECTION.down} />
            </div>

            {0 > 1 ? (
                <div className='bg-cmwhite pt-10 pb-15' style={{borderRadius: '0 0 10px 10px '}}>
                    <div className='w-sm-50 mx-auto'>
                        <div
                            className='mb-3 px-2 bage bg-cminfo text-cminfo py-1 bg-opacity-10  rounded-pill text-center text-nowrap'
                            style={{
                                fontSize: 16,
                                fontWeight: 700,
                                lineHeight: '19.12px',
                                width: 'fit-content',
                            }}
                        >
                            Company Owner
                        </div>
                        <div className='row align-items-center mb-5 text-cmgrey800'>
                            <div className='col-md d-flex'>
                                <CustomInput label={'Full Name'} placeholder='Enter Full Name' />
                            </div>
                            <div className='col-md '>
                                <CustomInput label={'Emial'} placeholder='Enter Full Name' />
                            </div>
                        </div>
                        <div className='d-flex gap-5 align-items-center'>
                            {' '}
                            <div
                                className='my-6 px-2 bage bg-cmPurple text-cmPurple py-1 bg-opacity-10  rounded-pill text-center  text-nowrap'
                                style={{
                                    fontSize: 14,
                                    fontWeight: 700,
                                    lineHeight: '19.12px',
                                    width: 'fit-content',
                                }}
                            >
                                Super Admin
                            </div>{' '}
                            <span>(Max 3)</span>
                        </div>
                        <div className='row align-items-center mb-2 text-cmgrey800'>
                            <div className='col-md d-flex'>
                                <CustomInput label={'Full Name'} placeholder='Enter Full Name' />
                            </div>
                            <div className='col-md '>
                                <CustomInput label={'Email'} placeholder='Enter Email' />
                            </div>
                        </div>
                        <div className='row align-items-center mb-2 text-cmgrey800'>
                            <div className='col-md d-flex'>
                                <CustomInput label={'Full Name'} placeholder='Enter Full Name' />
                            </div>
                            <div className='col-md '>
                                <CustomInput label={'Email'} placeholder='Enter Email' />
                            </div>
                        </div>{' '}
                        <div className='row align-items-center mb-2 text-cmgrey800'>
                            <div className='col-md d-flex'>
                                <CustomInput label={'Full Name'} placeholder='Enter Full Name' />
                            </div>
                            <div className='col-md '>
                                <CustomInput label={'Email'} placeholder='Enter Email' />
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export const Integrations = () => {
    return (
        <div className='w-sm-85 shadow-sm mb-10' style={{borderRadius: 10}}>
            <div
                className='bg-cmGrey200 d-flex align-items-center gap-5 ps-sm-10 p-5'
                style={{borderRadius: '10px 10px 0 0'}}
            >
                <div className='text-cmBlack' style={{fontSize: 18, fontWeight: 700}}>
                    Integrations
                </div>
                <CustomArrow arrowDirection={ARROW_DIRECTION.down} />
            </div>

            {0 > 1 ? (
                <div className='bg-cmwhite pt-10 pb-15' style={{borderRadius: '0 0 10px 10px '}}>
                    <div className='w-sm-50 mx-auto'>
                        <div className='d-flex justify-content-center gap-10'>
                            <div className='bg-cmGrey200 border border-1 border-cmSuccess px-20 py-20'>
                                A
                            </div>
                            <div className=' bg-cmGrey200 border border-1 border-cmDisabled px-20 py-20'>
                                B
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

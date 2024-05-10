import './styles.css'
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
import {Container, Card, Button, Form, Accordion} from 'react-bootstrap'

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

// BasicInformation Starts----------------------
const billingDataMain = [
    {
        heading: 'Sequifi Payroll',
        detail: ['Unique PID’s', 'M2 Completed', 'Per Active User'],
    },
    {
        heading: 'Sequipay',
        detail: ['W2 Employee', 'Contractor', 'One-time payment'],
    },
]
const tabConstants = ['Basic Information', 'Billing Details', 'Admin Setups', 'Payroll', 'Support']
export const BasicInformation = ({
    onChangeInputData,
    basicInformationData,
    onSelectTypeOfCompany,
}) => {
    const [tabActiveIndex, setActiveIndex] = useState(0)
    const handleItemClick = (index) => {
        setActiveIndex(index)
    }
    return (
        <div className=' shadow-sm mb-10' style={{borderRadius: 10}}>
            {/* <div
        className="bg-cmGrey200 d-flex align-items-center gap-5 ps-sm-10 p-5"
        style={{ borderRadius: "10px 10px 0 0" }}
      >
        <div className="text-cmBlack" style={{ fontSize: 18, fontWeight: 700 }}>
          Basic Information
          Basic Information
        </div>
        <CustomArrow arrowDirection={ARROW_DIRECTION.down} />
      </div> */}
            <div
                className='bg-cmwhite pt-10 pb-15  global-padding'
                style={{borderRadius: '0 0 10px 10px '}}
            >
                {/* ------------   Tabs Box ---------------*/}
                <div
                    className='d-flex justify-content-between text-cmGrey500'
                    style={{fontSize: '15px', marginBottom: '3rem', fontWeight: 700}}
                >
                    {tabConstants.map((item, index) => (
                        <p
                            key={index}
                            style={{cursor: 'pointer'}}
                            className={tabActiveIndex === index ? 'text-cmBlue-Crayola' : ''}
                            onClick={() => handleItemClick(index)}
                        >
                            {index + 1}. {item}
                        </p>
                    ))}
                </div>
                {/* ------------   Tabs Box End ---------------*/}

                {/* <<<< ------------  Input Fields Main ,Containers Starts ------------->>>> */}

                {/*--------------- Basic Information ---------------*/}
                {tabActiveIndex === 0 && (
                    <div>
                        <h2 style={{marginBottom: '1rem', fontWeight: 700}}>Basic Information</h2>
                        <div className='d-flex justify-content-between responsivess-first'>
                            <div className=' ' style={{marginBottom: '2rem'}}>
                                <div className='mb-5'>
                                    <CustomInput
                                        label={'Company Name'}
                                        name='company_name'
                                        onChange={onChangeInputData}
                                        value={basicInformationData?.company_name}
                                        required
                                    />
                                </div>
                                <div className='mb-5 '>
                                    <CustomInput
                                        label={'Sub-domain'}
                                        name='sub_domain'
                                        onChange={onChangeInputData}
                                        value={basicInformationData?.sub_domain}
                                        required
                                    />
                                </div>
                                {/* <div className='mb-5'>
                            <CustomInput
                                label={'Company Email'}
                                name='email'
                                onChange={onChangeInputData}
                                value={basicInformationData?.email}
                                required
                            />
                        </div> */}

                                {/* ---- Types of Company ---- */}
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
                                                        onClick={() =>
                                                            onSelectTypeOfCompany(item?.value)
                                                        }
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

                                {/* <div>
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
                        </div> */}

                                {/* -------- Worker Type ------- */}
                                <div
                                    style={{display: 'flex', alignItems: 'center', margin: '5px 0'}}
                                    className='responsivess-first'
                                >
                                    <Form.Label style={{marginRight: '10px', color: '#6a6b71'}}>
                                        Worker Type:
                                    </Form.Label>
                                    <Form.Check
                                        inline
                                        type='checkbox'
                                        label='W-2'
                                        value={1}
                                        style={{marginRight: '10px', color: '#6a6b71'}}
                                    />
                                    <Form.Check
                                        inline
                                        type='checkbox'
                                        label='Contractor'
                                        value={2}
                                        style={{marginRight: '10px', color: '#6a6b71'}}
                                    />
                                </div>
                            </div>

                            {/* -------- Upload Logo -------- */}
                            <Container className='col-md-3 upload'>
                                <h6>Upload Logo</h6>
                                <Card
                                    className='py-10 mt-3'
                                    style={{border: '3px dashed #80808063', background: '#F7F7F7'}}
                                >
                                    <div className='text-center'>
                                        <Button
                                            variant='outline-secondary'
                                            size='lg'
                                            style={{
                                                padding: '4px',
                                                width: '2.5rem',
                                                height: '2.5rem',
                                                borderRadius: '50%',

                                                border: '3px solid #938a8a',
                                            }}
                                        >
                                            <i
                                                className='fas fa-plus'
                                                style={{
                                                    transform: 'scale(1.5) translate(2px, -1px)',
                                                    color: '#938a8a',
                                                }}
                                            ></i>
                                        </Button>
                                        <h5 className='mt-3'>Upload File</h5>
                                        <p style={{fontSize: '10px'}}>
                                            Drag and drop logo here or click to upload.
                                        </p>
                                    </div>
                                </Card>
                            </Container>
                        </div>
                        <Button variant='primary' className='bg-cmBlue-Crayola' type='submit'>
                            Save & Continue
                        </Button>
                    </div>
                )}
                {/* --------------- Basic Information Ends ---------------*/}

                {/* --------------- Billing Details --------------- */}
                {tabActiveIndex === 1 && (
                    <div>
                        <h2 style={{marginBottom: '1rem', fontWeight: 700}}>Billing Details</h2>

                        <h5>Billing frequency</h5>

                        <div
                            className='bg-cmGrey100 col-md-7 d-flex align-items-center justify-content-between gap-5 ps-sm-10 p-4'
                            style={{borderRadius: '10px 10px 0 0', marginBottom: '2rem'}}
                        >
                            <div className='text-cmGrey500' style={{fontSize: 15, fontWeight: 500}}>
                                Select Frequency
                            </div>
                            <CustomArrow arrowDirection={ARROW_DIRECTION.down} />
                        </div>
                        <div className='new-client'>
                            {billingDataMain.map((item, mainIndex) => (
                                <Accordion defaultActiveKey={['0']} alwaysOpen key={mainIndex}>
                                    <Accordion.Item eventKey={mainIndex}>
                                        <Accordion.Header>
                                            <div style={{display: 'flex', gap: '1rem'}}>
                                                <input
                                                    type='checkbox'
                                                    style={{
                                                        width: '20px',
                                                        height: '20px',
                                                        backgroundColor: '#fff',
                                                        border: '1px solid #ccc',
                                                        borderRadius: '3px',
                                                    }}
                                                />
                                                <h5 style={{fontSize: 15, fontWeight: 800}}>
                                                    {item.heading}
                                                </h5>
                                            </div>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.6rem',
                                                    marginBottom: '2rem',
                                                }}
                                            >
                                                <input
                                                    type='checkbox'
                                                    style={{
                                                        width: '20px',
                                                        height: '20px',
                                                        backgroundColor: '#fff',
                                                        border: '1px solid #ccc',
                                                        borderRadius: '3px',
                                                    }}
                                                />
                                                <h6 style={{marginBottom: '0', fontWeight: 700}}>
                                                    Payroll Calculations
                                                </h6>
                                            </div>

                                            {item.detail.map((item, id) => (
                                                <div>
                                                    <div
                                                        style={{
                                                            padding: '0.3rem 0.8rem',
                                                            background: 'rgb(114 57 234 / 19%)',
                                                            borderRadius: '2rem',
                                                            width: 'fit-content',
                                                            fontSize: '15px',
                                                            fontWeight: '700',
                                                            color: '#7239EA',
                                                            marginTop: '1.8rem',
                                                        }}
                                                    >
                                                        {item}
                                                    </div>
                                                    <div
                                                        className='d-flex gap-20 responsivess'
                                                        key={id}
                                                    >
                                                        <div style={{paddingTop: '1rem'}}>
                                                            <h6>Rack Price</h6>
                                                            <div
                                                                className='d-flex gap-2 '
                                                                style={{
                                                                    alignItems: 'center',
                                                                    lineHeight: 0,
                                                                }}
                                                            >
                                                                <h5>$</h5>
                                                                <input
                                                                    style={{
                                                                        height: '3rem',
                                                                        borderRadius: '8px',
                                                                        background: '#00000009',
                                                                        border: '2px solid #00000019',
                                                                        padding: '1.5rem 1rem',
                                                                    }}
                                                                />{' '}
                                                                <h5>/watt</h5>
                                                            </div>
                                                        </div>
                                                        <div style={{paddingTop: '1rem'}}>
                                                            <h6>Discounted Price</h6>
                                                            <div
                                                                className='d-flex gap-2 '
                                                                style={{
                                                                    alignItems: 'center',
                                                                    lineHeight: 0,
                                                                }}
                                                            >
                                                                <h5>$</h5>
                                                                <input
                                                                    style={{
                                                                        height: '3rem',
                                                                        borderRadius: '8px',
                                                                        background: '#00000009',
                                                                        border: '2px solid #00000019',
                                                                        padding: '1.5rem 1rem',
                                                                    }}
                                                                />{' '}
                                                                <h5>/watt</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            ))}
                        </div>
                        <Button variant='primary' className='bg-cmBlue-Crayola' type='submit'>
                            Save & Continue
                        </Button>
                    </div>
                )}

                {/* --------------- Billing Details Ends--------------- */}

                {/* --------------- Admin Setup --------------- */}
                {tabActiveIndex === 2 && (
                    <div>
                        <h2 style={{marginBottom: '1rem', fontWeight: 700}}>
                            Administrative Setup
                        </h2>
                        {/*  ------- Company Owner ----- */}
                        <div>
                            <div
                                style={{
                                    padding: '0.3rem 0.8rem',
                                    background: 'rgba(0, 76, 232, 0.1)',
                                    borderRadius: '2rem',
                                    width: 'fit-content',
                                    fontSize: '15px',
                                    fontWeight: '700',
                                    color: 'rgba(0, 76, 232, 1)',
                                    margin: '1.8rem 0',
                                }}
                            >
                                Company Owner
                            </div>

                            <div
                                className=' d-flex responsivess'
                                style={{
                                    flexWrap: 'wrap',
                                    gap: '20px',
                                    width: '55%',
                                }}
                            >
                                <div className='mb-5' style={{flexGrow: 1}}>
                                    <CustomInput
                                        label={'Full Name'}
                                        name='name'
                                        onChange={onChangeInputData}
                                        value={basicInformationData?.name}
                                        required
                                    />
                                </div>
                                <div className='mb-5' style={{flexGrow: 1}}>
                                    <CustomInput
                                        label={'Login Email'}
                                        name='email'
                                        onChange={onChangeInputData}
                                        value={basicInformationData?.email}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/*  -------  Super Admin ----- */}
                        <div>
                            <div
                                className='d-flex gap-4 align-items-center'
                                style={{margin: '1.8rem 0'}}
                            >
                                <div
                                    style={{
                                        padding: '0.3rem 0.8rem',
                                        background: 'rgba(93, 184, 135, 0.1)',
                                        borderRadius: '2rem',
                                        width: 'fit-content',
                                        fontSize: '15px',
                                        fontWeight: '700',
                                        color: 'rgba(93, 184, 135, 1)',
                                    }}
                                >
                                    Super Admin
                                </div>
                                <p style={{marginBottom: '0'}}> (max 3)</p>
                            </div>

                            <div
                                className=' d-flex  responsivess'
                                style={{
                                    flexWrap: 'wrap',
                                    gap: '20px',
                                    width: '55%',
                                }}
                            >
                                <div className='mb-5' style={{flexGrow: 1}}>
                                    <CustomInput
                                        label={'Full Name'}
                                        name='name'
                                        onChange={onChangeInputData}
                                        value={basicInformationData?.name}
                                        required
                                    />
                                </div>
                                <div className='mb-5' style={{flexGrow: 1}}>
                                    <CustomInput
                                        label={'Login Email'}
                                        name='email'
                                        onChange={onChangeInputData}
                                        value={basicInformationData?.email}
                                        required
                                    />
                                </div>
                            </div>

                            <div
                                className=' d-flex responsivess'
                                style={{
                                    flexWrap: 'wrap',
                                    gap: '20px',
                                    width: '55%',
                                }}
                            >
                                <div className='mb-5' style={{flexGrow: 1}}>
                                    <CustomInput
                                        label={'Full Name'}
                                        name='name'
                                        onChange={onChangeInputData}
                                        value={basicInformationData?.name}
                                        required
                                    />
                                </div>
                                <div className='mb-5' style={{flexGrow: 1}}>
                                    <CustomInput
                                        label={'Login Email'}
                                        name='email'
                                        onChange={onChangeInputData}
                                        value={basicInformationData?.email}
                                        required
                                    />
                                </div>
                            </div>

                            <div
                                className=' d-flex responsivess'
                                style={{
                                    flexWrap: 'wrap',
                                    gap: '20px',
                                    width: '55%',
                                }}
                            >
                                <div className='mb-5' style={{flexGrow: 1}}>
                                    <CustomInput
                                        label={'Full Name'}
                                        name='name'
                                        onChange={onChangeInputData}
                                        value={basicInformationData?.name}
                                        required
                                    />
                                </div>
                                <div className='mb-5' style={{flexGrow: 1}}>
                                    <CustomInput
                                        label={'Login Email'}
                                        name='email'
                                        onChange={onChangeInputData}
                                        value={basicInformationData?.email}
                                        required
                                    />
                                </div>
                            </div>

                            <div
                                className=' d-flex responsivess'
                                style={{
                                    flexWrap: 'wrap',
                                    gap: '20px',
                                    width: '55%',
                                }}
                            >
                                <div className='mb-5' style={{flexGrow: 1}}>
                                    <CustomInput
                                        label={'Full Name'}
                                        name='name'
                                        onChange={onChangeInputData}
                                        value={basicInformationData?.name}
                                        required
                                    />
                                </div>
                                <div className='mb-5' style={{flexGrow: 1}}>
                                    <CustomInput
                                        label={'Login Email'}
                                        name='email'
                                        onChange={onChangeInputData}
                                        value={basicInformationData?.email}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <Button variant='primary' className='bg-cmBlue-Crayola' type='submit'>
                            Save & Continue
                        </Button>
                    </div>
                )}
                {/* --------------- Admin Setup Ends--------------- */}

                {/* --------------- PayrollProcessing --------------- */}
                {tabActiveIndex === 3 && (
                    <div>
                        <h2 style={{marginBottom: '1rem', fontWeight: 700}}>Payroll Processing</h2>
                        <div
                            className=' d-flex responsivess'
                            style={{
                                flexWrap: 'wrap',
                                gap: '20px',
                                width: '55%',
                            }}
                        >
                            <div className='mb-5' style={{flexGrow: 1}}>
                                <CustomInput
                                    label={'Company Tenant ID'}
                                    name='company_id'
                                    onChange={onChangeInputData}
                                    value={basicInformationData?.company_id}
                                    required
                                />
                            </div>
                            <div className='mb-5' style={{flexGrow: 1}}>
                                <CustomInput
                                    label={'API Key'}
                                    name='api_key'
                                    onChange={onChangeInputData}
                                    value={basicInformationData?.api_key}
                                    required
                                />
                            </div>
                        </div>
                        <Button variant='primary' className='bg-cmBlue-Crayola' type='submit'>
                            Save & Continue
                        </Button>
                    </div>
                )}
                {/* --------------- Payroll Processing Ends --------------- */}

                {/* --------------- Tech & Support --------------- */}
                {tabActiveIndex === 4 && (
                    <div>
                        <h2 style={{marginBottom: '1.5rem', fontWeight: 700}}>Tech & Support</h2>
                        <div
                            style={{
                                width: '55%',
                            }}
                        >
                            <div
                                style={{display: 'flex', alignItems: 'center', margin: '5px 0'}}
                                className='responsivess-first'
                            >
                                <Form.Label style={{marginRight: '10px', color: 'black'}}>
                                    Have a Firebase Whitelisted Domain?
                                </Form.Label>
                                <Form.Check
                                    inline
                                    type='checkbox'
                                    label='Yes'
                                    value={1}
                                    style={{marginRight: '10px', color: 'black'}}
                                />
                                <Form.Check
                                    inline
                                    type='checkbox'
                                    label='No'
                                    value={2}
                                    style={{marginRight: '10px', color: '#6a6b71'}}
                                />
                            </div>
                            <div
                                className='text-cmGrey500'
                                style={{fontSize: '14px', marginBottom: '1.5rem'}}
                            >
                                You can whitelist the firebase domain
                                <span className='text-cmBlue-Crayola' style={{fontWeight: '500'}}>
                                    Click Here!
                                </span>
                            </div>
                            <div className='mb-5'>
                                <CustomInput
                                    label={'Recovery email'}
                                    name='recovery_email'
                                    onChange={onChangeInputData}
                                    value={basicInformationData?.recovery_email}
                                    required
                                />
                            </div>
                            <div className='mb-5'>
                                <CustomInput
                                    label={'Support URL'}
                                    name='support_url'
                                    onChange={onChangeInputData}
                                    value={basicInformationData?.support_url}
                                    required
                                />
                            </div>
                            <p className='text-cmGrey500' style={{fontSize: '14px'}}>
                                Enter the URL that will be embedded as an iframe for support or
                                helpdesk purposes.
                            </p>
                        </div>
                        <Button variant='primary' className='bg-cmBlue-Crayola' type='submit'>
                            Finish Add Client
                        </Button>
                    </div>
                )}
                {/* --------------- Tech & Support Ends--------------- */}
            </div>
        </div>
    )
}
// BasicInformation Ends----------------------


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

import timeZones from '../../../../../constants/timezones.json'
import CustomLoader from '../../../../../customComponents/customLoader/CustomLoader'
import {INTEGRATIONS_ID, getDaysArray, getValidDate} from '../../../../../constants/constants'
import TickCircle from '../assests/TickCircle.png'
import CustomImage from '../../../../../customComponents/customImage/CustomImage'
import {IMAGE_TYPE, getServerImage} from '../../../../../helpers/CommonHelpers'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomModal from '../../../../../customComponents/customModal/CustomModal'
import CustomDropdown from '../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import useIntegrationSetting from './useIntegrationSetting'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../customComponents/customButtton/CustomButton'

const IntregationSetting = ({data, show, handleClose}) => {
    const {loading, onChangeInputData, onDisconnectPress, onSavePress, integrationData} =
        useIntegrationSetting({
            show,
            data,
            handleClose,
        })

    return (
        <CustomModal show={show} onHide={handleClose} maxWidth='950' title={'Integration Settings'}>
            <>
                {/* <div className='modal-header '></div> */}
                <div className=''>
                    <div className=' px-lg-10'>
                        <div className=' d-flex justify-content-center'>
                            <div className='row w-sm-500px w-100'>
                                {/* Top Header */}
                                <div className='d-flex flex-wrap justify-content-between align-items-center mb-5'>
                                    <div className='d-flex gap-sm-10 gap-5'>
                                        <div>
                                            <CustomImage
                                                type={IMAGE_TYPE.companyLogo}
                                                customSrc={getServerImage(
                                                    data?.logo,
                                                    IMAGE_TYPE.companyLogo
                                                )}
                                                alt=''
                                                style={{width: '46px', height: '46px'}}
                                            />
                                        </div>
                                        <div>
                                            <div style={{fontSize: '20px', fontWeight: '700'}}>
                                                {data?.name}
                                            </div>
                                            <div
                                                style={{
                                                    color: '#BDBDBD',
                                                    fontSize: '16px',
                                                    fontWeight: '600',
                                                }}
                                            >
                                                {'CRM'}
                                            </div>
                                        </div>
                                    </div>
                                    {/* For Active Status */}
                                    {data?.status == 1 && (
                                        <div
                                            className='d-flex align-items-center justify-content-center px-3 py-1'
                                            style={{
                                                background: 'rgba(0, 194, 71, 0.1)',
                                                color: '#00C247',
                                                fontWeight: '700',
                                                fontSize: '12px',
                                                borderRadius: '6px',
                                            }}
                                        >
                                            Active
                                        </div>
                                    )}
                                    {/* For Inactive Status */}
                                    {data?.status == 0 && (
                                        <div
                                            className='d-flex align-items-center justify-content-center px-3 py-1'
                                            style={{
                                                background: 'rgba(255, 51, 51, 0.1)',
                                                color: '#FF3333',
                                                fontWeight: '700',
                                                fontSize: '12px',
                                                borderRadius: '6px',
                                            }}
                                        >
                                            Inactive
                                        </div>
                                    )}
                                    {/* For Progress Status */}
                                    {data?.status == 2 && (
                                        <div
                                            className='d-flex align-items-center justify-content-center px-3 py-1'
                                            style={{
                                                background: 'rgba(0, 76, 232, 0.1)',
                                                color: '#004CE8',
                                                fontWeight: '700',
                                                fontSize: '12px',
                                                borderRadius: '6px',
                                            }}
                                        >
                                            In Progress
                                        </div>
                                    )}
                                </div>
                                <hr
                                    style={{borderTop: '1px solid rgba(239, 242, 245, 1)'}}
                                    className=''
                                />

                                {/* LGCY */}
                                {data?.id == INTEGRATIONS_ID.lgcy ? (
                                    <>
                                        {/* UserName */}
                                        <div className='mb-5'>
                                            <CustomInput
                                                label={'Username'}
                                                placeholder='Enter Username'
                                                name='userName'
                                                value={integrationData?.userName ?? ''}
                                                onChange={onChangeInputData}
                                            />
                                        </div>

                                        {/* Password */}
                                        <div className='mb-5'>
                                            <div className='card flex justify-content-center'>
                                                <CustomInput
                                                    label={'Password'}
                                                    type={INPUT_TYPE.password}
                                                    feedback={false}
                                                    placeholder='Enter Key'
                                                    name='password'
                                                    value={integrationData?.password ?? ''}
                                                    onChange={onChangeInputData}
                                                    style={{width: '100%'}}
                                                />
                                            </div>
                                        </div>
                                    </>
                                ) : null}

                                {/* HUBSPOT + JOB NIMBUSS*/}
                                {[INTEGRATIONS_ID.hubspot, INTEGRATIONS_ID.jobNimbuss].includes(
                                    data?.id
                                ) ? (
                                    <div className='mb-5'>
                                        <CustomInput
                                            label={'Enter API'}
                                            placeholder='Enter API'
                                            feedback={false}
                                            type={INPUT_TYPE.password}
                                            name={'api_key'}
                                            value={integrationData?.api_key ?? ''}
                                            onChange={onChangeInputData}
                                        />
                                    </div>
                                ) : null}

                                <div>
                                    {/* First row starts */}
                                    <div className='row justify-content-between mb-5'>
                                        {/* Data Fetch Frequency */}
                                        <div className=' col-sm-6 mb-sm-0 mb-5'>
                                            <CustomDropdown
                                                searching={false}
                                                label={'Data Fetch Frequency'}
                                                options={[
                                                    {name: 'Daily', value: 'daily'},
                                                    {name: 'Weekly', value: 'weekly'},
                                                    {name: 'Monthly', value: 'monthly'},
                                                ]}
                                                name={'data_fetch_frequency'}
                                                value={integrationData?.data_fetch_frequency ?? ''}
                                                onChange={onChangeInputData}
                                            />
                                        </div>

                                        {/* Day*/}
                                        {integrationData?.data_fetch_frequency == 'monthly' ? (
                                            <div className='col-sm-6'>
                                                <CustomDropdown
                                                    searching={false}
                                                    label={'Date'}
                                                    placeholder='Select Day'
                                                    options={getDaysArray()}
                                                    name={'day'}
                                                    displayKey='name'
                                                    valueKey='value'
                                                    value={integrationData?.day ?? ''}
                                                    onChange={onChangeInputData}
                                                />
                                            </div>
                                        ) : null}

                                        {integrationData?.data_fetch_frequency == 'weekly' ? (
                                            <div className='col-sm-6'>
                                                <CustomDropdown
                                                    searching={false}
                                                    label={'Day'}
                                                    placeholder='Select Day'
                                                    options={[
                                                        {name: 'Monday', value: 'monday'},
                                                        {name: 'Tuesday', value: 'tuesday'},
                                                        {name: 'Wednesday', value: 'wednesday'},
                                                        {name: 'Thursday', value: 'thursday'},
                                                        {name: 'Friday', value: 'friday'},
                                                        {name: 'Saturday', value: 'saturday'},
                                                    ]}
                                                    name={'day'}
                                                    value={integrationData?.day ?? ''}
                                                    onChange={onChangeInputData}
                                                />
                                            </div>
                                        ) : null}
                                    </div>
                                    {/* First row ends */}

                                    {/* Second row starts */}
                                    <div className='row justify-content-between mb-5'>
                                        {/* Time */}

                                        <div className=' col-sm-6 mb-sm-0 mb-5'>
                                            <CustomDropdown
                                                label={'Time'}
                                                searching={false}
                                                name='time'
                                                placeholder='Select Time'
                                                options={new Array(24)
                                                    .fill('')
                                                    .map((item, index) => {
                                                        let text = '00'
                                                        if (index <= 9) text = `0${index}:00`
                                                        else text = `${index}:00`
                                                        return {text}
                                                    })}
                                                valueKey={'text'}
                                                onChange={onChangeInputData}
                                                displayKey='text'
                                                value={integrationData.time}
                                            />
                                        </div>
                                        {/* Time Zone*/}
                                        <div className='col-sm-6'>
                                            <CustomDropdown
                                                label={'Time Zone'}
                                                name='timezone'
                                                options={timeZones}
                                                value={integrationData?.timezone ?? ''}
                                                placeholder='Select Timezone'
                                                valueKey={'text'}
                                                displayKey={'text'}
                                                onChange={onChangeInputData}
                                            />
                                        </div>
                                    </div>
                                    {/* Second row ends */}

                                    {/* Third row starts */}
                                    <div
                                        className='d-flex align-items-center mb-15'
                                        style={{fontWeight: 600}}
                                    >
                                        {/* Bottom Icon */}
                                        <div className='me-2'>
                                            <img src={TickCircle} alt='' width={12.5} />
                                        </div>
                                        {/* Bottom Text */}
                                        <div className='me-10'>
                                            {data?.status == 1 && data?.last_import
                                                ? 'Last Successful Import'
                                                : null}
                                        </div>
                                        {/* Bottom text */}
                                        <div>{getValidDate(data?.last_import, 'MM/DD/YY')}</div>
                                    </div>
                                    {/* Third row Ends */}
                                </div>

                                <div className='d-flex align-items-center justify-content-center gap-10 mb-20'>
                                    <CustomButton
                                        buttonLabel='Save'
                                        onClick={onSavePress}
                                        buttonSize={BUTTON_SIZE.normal}
                                    />

                                    {data?.status ? (
                                        <CustomButton
                                            buttonLabel='Disconnect'
                                            onClick={onDisconnectPress}
                                            buttonSize={BUTTON_SIZE.normal}
                                            buttonType={BUTTON_TYPE.error}
                                        />
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <CustomLoader visible={loading} full />
                {/* buttons */}
            </>
        </CustomModal>
    )
}

export {IntregationSetting}

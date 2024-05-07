import {useCallback, useEffect, useState} from 'react'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../customComponents/customButtton/CustomButton'
import CustomCheckbox from '../../../../customComponents/customCheckbox/CustomCheckbox'
import CustomDatePicker from '../../../../customComponents/customInputs/customDatePicker/CustomDatePicker'
import CustomDropdown from '../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../customComponents/customInputs/customInput/CustomInput'
import CustomModal from '../../../../customComponents/customModal/CustomModal'
import {addAnnouncementDataService, disableAnnouncementService} from '../../../../services/Services'
import {useSelector} from 'react-redux'
import {
    getPositionsSelector,
    geyAllStatesWithOfficesSelector,
} from '../../../../redux/selectors/SettingsSelectors'
import CustomToast from '../../../../customComponents/customToast/CustomToast'
import _ from 'lodash'
import {getValidDate} from '../../../../constants/constants'
import useOfficeLocation from '../../../../hooks/useOfficeLocation'
import CustomLoader from '../../../../customComponents/customLoader/CustomLoader'
import {
    ADD_ANNOUNCEMENT_VALIDATION_FIELD,
    addAnnouncementValidation,
} from '../../../../validations/validations'
import {
    getBooleanValue,
    getErrorMessageFromResponse,
    getServerImage,
    isEmptyObjectValue,
} from '../../../../helpers/CommonHelpers'
import CustomAutoCompleteDropdown from '../../../../customComponents/customInputs/customAutoCompleteDropdown/CustomAutoCompleteDropdown'
import {saveAs} from 'file-saver'
import AccessRights from '../../../../accessRights/AccessRights'

const FIELD_KEYS = {
    title: 'title',
    description: 'description',
    office: 'office',
    positions: 'positions',
    start_date: 'start_date',
    durations: 'durations',
    link: 'link',
    file: 'file',
    pin_to_top: 'pin_to_top',
}

const AddNewAnnouncementModal = ({item, show, onClose, getAnnouncements}) => {
    const durationOptions = [
        {
            name: '1 day',
            value: '1 day',
        },
        {
            name: '1 week',
            value: '1 week',
        },
        {
            name: '2 week',
            value: '2 week',
        },
        {
            name: '3 week',
            value: '3 week',
        },
        {
            name: '1 month',
            value: '1 month',
        },
    ]
    const allPositions = useSelector(getPositionsSelector)
    const [officeList] = useOfficeLocation(null, false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(ADD_ANNOUNCEMENT_VALIDATION_FIELD)

    const [announcementData, setannouncementData] = useState({
        title: '',
        description: '',
        office: [],
        start_date: new Date(),
        durations: '',
        positions: [],
        link: '',
        file: '',
        pin_to_top: false,
        ...item,
    })
    const [slectedPosition, setSlectedPosition] = useState([])
    const [selectedOffice, setselectedOffice] = useState([])

    useEffect(() => {
        let officeData = item?.office?.map(
            (item) =>
                // name: item?.office_name,
                item?.id
        )

        let positionData = item?.positions?.map(
            (item) =>
                // name: item?.position_name,
                item?.id
        )
        setselectedOffice(officeData)
        setSlectedPosition(positionData)
    }, [item?.office, item?.position])

    const updateFieldsData = useCallback(
        (key, value) => {
            Object.freeze(announcementData)
            let temp = _.cloneDeep(announcementData)
            temp[key] = value

            setannouncementData(temp)
        },
        [announcementData]
    )
    const onChangeInputData = useCallback(
        (e) => {
            updateFieldsData(e?.target?.name, e?.target?.value)
        },
        [updateFieldsData]
    )

    const onChangeInputFile = useCallback(
        (e) => {
            const file = e?.target?.files[0]
            updateFieldsData(e?.target?.name, file)
        },
        [updateFieldsData]
    )

    const handleAddAnnouncement = () => {
        const passPosition = slectedPosition?.join(',')
        const passOffice = selectedOffice?.join(',')
        let formData = new FormData()
        formData.append('title', announcementData?.title)
        formData.append('description', announcementData?.description)
        formData.append('link', announcementData?.link)
        formData.append('office', passOffice)
        formData.append('start_date', getValidDate(announcementData?.start_date, 'YYYY-MM-DD'))
        formData.append('durations', announcementData?.durations)
        formData.append('positions', passPosition)
        if (announcementData?.file) {
            formData.append('file[]', announcementData.file?.type ? announcementData.file : null)
        }

        formData.append('pin_to_top', getBooleanValue(announcementData?.pin_to_top))

        if (announcementData?.id) formData.append('id', announcementData?.id)
        const validationErrors = addAnnouncementValidation({
            ...announcementData,
            positions: slectedPosition,
            office: selectedOffice,
        })

        setError(validationErrors)

        if (isEmptyObjectValue(validationErrors)) {
            setLoading(true)

            addAnnouncementDataService(formData)
                .then((res) => {
                    CustomToast.success(`Announcement ${item ? 'updated' : 'added'}  successfully`)
                    onClose()
                    getAnnouncements()
                })
                .finally(() => {
                    setLoading(false)
                })
                .catch((error) => {
                    CustomToast.error(getErrorMessageFromResponse(error))
                })
        }
    }
    const onSelectPosition = (e) => {
        setSlectedPosition(e.target.value)
    }

    const onSelectOffice = (e) => {
        setselectedOffice(e.target.value)
    }

    const positionList = allPositions.map((i) => {
        return {name: i.position_name, value: i.id}
    })
    const onSelectPinToTop = (e) => {
        updateFieldsData(e.target?.name, e?.checked)
    }

    const disableAnnouncement = () => {
        setLoading(true)
        const body = {
            id: announcementData?.id,
            disable: announcementData?.disable == 1 ? 0 : 1,
        }
        disableAnnouncementService(body)
            .then(() => {
                CustomToast.success(
                    `Announcement ${announcementData?.disable == 1 ? 'Enabled' : 'Disabled'}`
                )
                onClose()
                getAnnouncements()
            })
            .finally(() => setLoading(false))
    }

    return (
        <>
            <CustomModal
                id='kt_modal_create_app'
                show={show}
                onHide={onClose}
                title={`${item ? 'Edit' : 'Add New'} Announcements`}
                maxWidth='750'
            >
                <CustomLoader full visible={loading} />

                <form>
                    <div
                        className='px-sm-15 px-5 py-0 w-sm-75 mx-auto'
                        style={{fontFamily: 'Manrope', fontSize: '14px'}}
                    >
                        {/*begin::Stepper */}
                        <div className='mb-6 d-flex  gap-5 align-items-center'>
                            <div className={`${announcementData?.status ? 'w-75' : 'w-100'}`}>
                                <CustomInput
                                    label={'Title'}
                                    required
                                    placeholder='Enter Title'
                                    onChange={onChangeInputData}
                                    name={FIELD_KEYS.title}
                                    errorMessage={error?.title}
                                    value={announcementData?.title}
                                    // rejex={/^[\w\-\s]+$/}
                                    // className='w-sm-auto w-100'
                                />
                            </div>
                            <div
                                className='mt-6 bage bg-cminfo text-cminfo py-1 bg-opacity-10  rounded-pill text-center'
                                style={{
                                    fontSize: 14,
                                    fontWeight: 600,
                                    lineHeight: '19.12px',
                                    width: 'fit-content',
                                }}
                            >
                                {announcementData?.status}
                            </div>
                        </div>

                        {/* Content */}
                        <div className='mb-6'>
                            <CustomInput
                                required
                                label={'Content'}
                                placeholder='Enter Content'
                                type={INPUT_TYPE.textarea}
                                name={FIELD_KEYS.description}
                                onChange={onChangeInputData}
                                errorMessage={error?.content}
                                value={announcementData?.description}
                            />
                        </div>
                        {/* Pin to top */}
                        <AccessRights forSuperAdmin>
                            <div className='mb-6 d-flex align-items-center gap-3'>
                                <CustomCheckbox
                                    checked={announcementData?.pin_to_top ? true : false}
                                    onChange={onSelectPinToTop}
                                    value={announcementData?.pin_to_top}
                                    name={FIELD_KEYS.pin_to_top}
                                />
                                <div style={{fontSize: '12px', fontWeight: 600}}>
                                    <span className='text-cmGrey700 me-1'>Pin to top</span>
                                    <span className='text-cmGrey500'>
                                        (you can only pin 3 announcements)
                                    </span>
                                </div>
                            </div>
                        </AccessRights>

                        <div className=''>
                            {/* Positions*/}
                            <div className='mb-6'>
                                <CustomAutoCompleteDropdown
                                    required
                                    label={'Positions'}
                                    options={positionList}
                                    onChange={onSelectPosition}
                                    errorMessage={error?.position}
                                    value={slectedPosition}
                                    selectedOptions={slectedPosition}
                                />
                            </div>
                            <div className='mb-6'>
                                <CustomAutoCompleteDropdown
                                    required
                                    options={officeList}
                                    label={'Office'}
                                    onChange={onSelectOffice}
                                    errorMessage={error?.office}
                                    value={selectedOffice}
                                    selectedOptions={selectedOffice}
                                    // name={FIELD_KEYS.office}
                                />
                            </div>
                        </div>

                        {/* Link */}
                        <div className=''>
                            <div className='mb-6'>
                                <CustomInput
                                    label={'Link'}
                                    placeholder='Enter Link'
                                    type={INPUT_TYPE.text}
                                    onChange={onChangeInputData}
                                    errorMessage={error?.link}
                                    value={announcementData?.link}
                                    name={FIELD_KEYS.link}
                                />
                            </div>
                        </div>

                        {/* Date */}
                        <div className=' row align-items-end'>
                            <div className='mb-6 col-sm'>
                                <CustomDatePicker
                                    label={'Start Date'}
                                    required
                                    value={
                                        announcementData?.start_date
                                            ? new Date(announcementData?.start_date)
                                            : new Date()
                                    }
                                    placeholder='Start Date'
                                    onChange={onChangeInputData}
                                    name={FIELD_KEYS.start_date}
                                    errorMessage={error?.startDate}
                                    // maxDate={new Date()}
                                />
                            </div>
                            <div className='mb-6 col-sm'>
                                <CustomDropdown
                                    valueKey='name'
                                    displayKey='name'
                                    required
                                    label={'Duration'}
                                    onChange={onChangeInputData}
                                    options={durationOptions}
                                    errorMessage={error?.duration}
                                    value={announcementData?.durations}
                                    name={FIELD_KEYS.durations}
                                />
                            </div>
                        </div>
                        <div>
                            <div className=''>
                                <label
                                    htmlFor='formFileMultiple'
                                    className='form-label text-cmGrey700'
                                    style={{fontWeight: 600}}
                                >
                                    Attach file
                                </label>
                                <input
                                    type='file'
                                    className='form-control'
                                    placeholder='Select file'
                                    onChange={onChangeInputFile}
                                    name={FIELD_KEYS.file}
                                    // value={announcementData?.file}
                                />
                            </div>
                            {announcementData?.file ? (
                                <div className='text-cmGrey600 text-end' style={{fontSize: 11}}>
                                    <span className='bi bi-paperclip fs-4' />
                                    {announcementData?.file?.name
                                        ? announcementData?.file?.name
                                        : announcementData?.file}
                                </div>
                            ) : null}
                        </div>
                        {/* end::Stepper */}
                        <div className='row gap-2 mt-10'>
                            <div className='col-sm text-nowrap w-100'>
                                <CustomButton
                                    buttonSize={BUTTON_SIZE.normal}
                                    buttonType={BUTTON_TYPE.primary}
                                    buttonLabel={item ? 'Update' : 'Save'}
                                    onClick={handleAddAnnouncement}
                                />
                            </div>
                            <div className='col-sm w-100'>
                                {item ? (
                                    <CustomButton
                                        buttonSize={BUTTON_SIZE.normal}
                                        buttonType={
                                            announcementData?.disable == 1
                                                ? BUTTON_TYPE.success
                                                : BUTTON_TYPE.error
                                        }
                                        buttonLabel={
                                            announcementData?.disable == 1 ? 'Enable' : 'Disable'
                                        }
                                        onClick={disableAnnouncement}
                                    />
                                ) : (
                                    <CustomButton
                                        buttonSize={BUTTON_SIZE.normal}
                                        buttonType={BUTTON_TYPE.disabled}
                                        buttonLabel={'Cancel'}
                                        onClick={onClose}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </form>
            </CustomModal>
        </>
    )
}
export default AddNewAnnouncementModal

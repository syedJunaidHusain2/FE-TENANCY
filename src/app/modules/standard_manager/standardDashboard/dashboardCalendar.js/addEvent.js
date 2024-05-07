import {useState} from 'react'
import CustomDatePicker from '../../../../../customComponents/customInputs/customDatePicker/CustomDatePicker'
import CustomDropdown from '../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomButton, {BUTTON_TYPE} from '../../../../../customComponents/customButtton/CustomButton'
import {addCalanderEventService} from '../../../../../services/Services'
import {
    ADD_CALENDAR_EVENT_VALIDATION_FIELD,
    addCalendarValidation,
} from '../../../../../validations/validations'
import {EVENTS_TYPES, getValidDate} from '../../../../../constants/constants'
import {Dialog} from 'primereact/dialog'
import {isEmptyObjectValue} from '../../../../../helpers/CommonHelpers'
import CustomToast from '../../../../../customComponents/customToast/CustomToast'
import {fontsFamily} from '../../../../../assets/fonts/fonts'

const AddEventCard = ({updateEvent, show, handleClose, getList}) => {
    const [date, setDate] = useState(null)
    const [time, setTime] = useState(null)
    const [type, setType] = useState(null)
    const [eventView, setEventView] = useState(null)
    const [eventName, setEventName] = useState(null)
    const [description, setDescription] = useState()
    const [addEventError, setAddEventError] = useState(ADD_CALENDAR_EVENT_VALIDATION_FIELD)
    const [loading, setLoading] = useState(false)

    const capitalizeFirstLowercaseRest = (str) => {
        return str?.charAt(0).toUpperCase() + str?.slice(1).toLowerCase()
    }

    const addEvent = (e) => {
        e.preventDefault()
        const body = {
            event_date: getValidDate(date, 'yyyy-MM-DD'),
            type: type?.toLowerCase(),
            event_name: eventName,
            description: description,
            // state_code: selecetedLocation,
            event_time: time,
        }
        const validationErrors = addCalendarValidation(body)
        setAddEventError(validationErrors)

        if (isEmptyObjectValue(validationErrors)) {
            setLoading(true)
            addCalanderEventService(body).finally(() => {
                CustomToast.success('Event Created Successfully')
                getList()
            })
            handleClose()
        }
    }

    return (
        <Dialog
            visible={show}
            onHide={handleClose}
            style={{fontFamily: fontsFamily.manrope}}
            breakpoints={{'960px': '75vw', '640px': '100vw'}}
            header={!updateEvent ? 'Add an Event' : 'Update Event'}
        >
            <div className='m-0 p-0' style={{borderBottom: '1px solid #EFF2F5'}}></div>

            <form onSubmit={addEvent}>
                <div className='card shadow-none p-0 m-0'>
                    <div className='d-flex justify-content-center mx-auto mt-4'>
                        <div className='w-100'>
                            <div className='mb-5' style={{fontSize: '14px'}}>
                                <div className='d-sm-flex mb-5 justify-content-between gap-5 w-100 px-sm-0 px-1 mx-sm-0 mx-auto'>
                                    <div className=''>
                                        <CustomDatePicker
                                            label={'Date'}
                                            required
                                            errorMessage={addEventError.eventDate}
                                            // isModal
                                            value={date}
                                            onChange={(e) => setDate(e?.target?.value)}
                                            minDate={new Date()}
                                        />
                                    </div>
                                    <div className=''>
                                        <CustomInput
                                            label={'Time'}
                                            required
                                            placeholder='hh:mm'
                                            type='time'
                                            onChange={(e) => {
                                                setTime(e.target.value)
                                            }}
                                            errorMessage={addEventError.eventTime}
                                            value={time}
                                        />
                                    </div>
                                </div>
                                <div className=''>
                                    <CustomDropdown
                                        label={'Type'}
                                        required
                                        options={EVENTS_TYPES}
                                        value={type}
                                        onChange={(e) => {
                                            setType(e.target.value)
                                        }}
                                        errorMessage={addEventError.eventType}
                                    />
                                </div>
                            </div>
                            <div className='mb-5'>
                                <CustomInput
                                    label={'Event Name'}
                                    required
                                    placeholder='Enter Event Name'
                                    onChange={(e) => {
                                        setEventName(e.target.value)
                                    }}
                                    errorMessage={addEventError.eventName}
                                    value={eventName}
                                />
                            </div>
                            <div className='mb-5'>
                                <CustomInput
                                    label={'Description'}
                                    type={INPUT_TYPE.textarea}
                                    placeholder='Enter Description'
                                    onChange={(e) => {
                                        setDescription(e.target.value)
                                    }}
                                    value={description}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-center mt-11 mb-9'>
                        <CustomButton
                            type='submit'
                            buttonType={BUTTON_TYPE.primary}
                            buttonLabel={!updateEvent ? 'Add Event' : 'Update Event'}
                            // onClick={!updateEvent ? addEvent : onUpdateEvent}
                            onClick={addEvent}
                        />
                    </div>
                </div>
            </form>
        </Dialog>
    )
}
export {AddEventCard}

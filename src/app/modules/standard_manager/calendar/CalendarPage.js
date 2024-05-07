import React, {useState} from 'react'
import AccessRights, {
    PERMISSIONS_GROUP,
    PERMISSION_TYPE,
} from '../../../../accessRights/AccessRights'
import useOfficeLocation from '../../../../hooks/useOfficeLocation'
import Calandar from '../calendar/Calandar'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../customComponents/customButtton/CustomButton'
import CustomDropdown from '../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import {allPermissionsAccess} from '../../../../accessRights/useCustomAccessRights'

const CalendarPage = () => {
    const [officeList, selectedLocation, setSelectedLocation] = useOfficeLocation()
    const [show, setShow] = useState(false)
    const [timeSlotModal, setTimeSlotModal] = useState(false)

    return (
        <AccessRights
            customCondition={allPermissionsAccess.standard.calendar.calendar.view}
            showPlaceHolder
        >
            <div style={{fontSize: '14px', fontFamily: 'Manrope', marginTop: '-20px'}}>
                <div className='w-100 d-flex flex-wrap align-items-center justify-content-between mb-10'>
                    <div
                        className=' mb-2 mt- d-flex align-items-center flex-row ms-1 gap-2 '
                        id='kt_chat_contacts_header'
                    >
                        <div
                            className='text-cmGrey900'
                            style={{
                                fontFamily: 'Manrope',
                                fontWeight: '700',
                                fontSize: '17px',
                            }}
                        >
                            Office :
                        </div>
                        <div>
                            <CustomDropdown
                                onChange={(e) => setSelectedLocation(e?.target?.value)}
                                value={selectedLocation}
                                options={officeList}
                                showClear={false}
                            />
                        </div>
                    </div>
                    <div className='d-flex gap-5'>
                        <CustomButton
                            buttonType={BUTTON_TYPE.primary}
                            buttonSize={BUTTON_SIZE.small}
                            buttonLabel='Setup Availability'
                            onClick={() => setTimeSlotModal(true)}
                        />
                        <CustomButton
                            buttonType={BUTTON_TYPE.secondary}
                            buttonLabel='Add an Event'
                            buttonSize={BUTTON_SIZE.small}
                            onClick={() => setShow(true)}
                        />
                    </div>
                </div>
                <div>
                    <Calandar
                        selecetedLocation={selectedLocation}
                        show={show}
                        setShow={setShow}
                        timeSlotModal={timeSlotModal}
                        setTimeSlotModal={setTimeSlotModal}
                    />
                </div>
            </div>
        </AccessRights>
    )
}

export default CalendarPage

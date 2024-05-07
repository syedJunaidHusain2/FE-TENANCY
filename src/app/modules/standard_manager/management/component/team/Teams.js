import React, {useCallback, useEffect, useState} from 'react'
import {KTSVG} from '../../../../../../_metronic/helpers'
import Select from '../../Icon/select.png'
import Card from './Card'
import TeamsTable from './TeamsTable'
import {
    getManagmentTeamsNewServices,
    getManagmentTeamsService,
} from '../../../../../../services/Services'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import {getUsedStateAction} from '../../../../../../redux/actions/SettingActions'
import {useDispatch} from 'react-redux'
import {BitzTabelsPopUp} from './BitzTabelsPopUp'
import _debounce from 'lodash/debounce'
import AccessRights, {
    PERMISSIONS_GROUP,
    PERMISSION_TYPE,
} from '../../../../../../accessRights/AccessRights'
import useOfficeLocation from '../../../../../../hooks/useOfficeLocation'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'
import CustomDropdown from '../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../customComponents/customInputs/customInput/CustomInput'
import {allPermissionsAccess} from '../../../../../../accessRights/useCustomAccessRights'

export default function Teams() {
    const [teamsData, setTeamsData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [showCreateAppModal, setShowCreateAppModal] = useState(false)
    const [search, setSearch] = useState('')
    const [officeList, location, setLocation] = useOfficeLocation()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsedStateAction())
    }, [])

    useEffect(() => {
        getTeams()
    }, [location, search])

    const getTeams = () => {
        if (location) {
            setLoading(true)
            const param = {
                office_id: location,
                filter: search,
            }

            getManagmentTeamsService(param)
                .then((res) => {
                    setTeamsData(res)
                })
                .finally(() => setLoading(false))
        }
    }
    const handleClose = () => {
        setShowCreateAppModal(false)
    }
    const delaySearch = useCallback(
        _debounce((value) => {
            setSearch(value)
        }, 500),
        []
    )
    const onAddUpdate = (bodyData) => {}

    return (
        <div style={{position: 'relative'}}>
            <CustomLoader full visible={loading} />

            <div
                className='card bg-cmwhite'
                style={{
                    fontSize: '14px',
                    fontFamily: 'Manrope',
                    position: 'relative',
                    borderRadius: '0 10px 10px 10px',
                    boxShadow:
                        'rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
                }}
            >
                <div className=' mt-2 p-6 d-flex flex-wrap gap-2 justify-content-between'>
                    <div
                        className='d-flex align-items-center gap-2 flex-row'
                        id='kt_chat_contacts_header'
                    >
                        <label
                            style={{
                                color: '#212121',
                                fontFamily: 'Manrope',
                                fontWeight: 'bold',
                                fontSize: '17px',
                            }}
                        >
                            Office:
                        </label>
                        <CustomDropdown
                            onChange={(e) => setLocation(e?.target?.value)}
                            options={officeList}
                            value={location || ''}
                            showClear={false}
                        />
                    </div>
                    <div
                        style={{height: '43px', borderRadius: '20px'}}
                        className='w-md-250px mb-1'
                        id='kt_chat_contacts_header'
                    >
                        <form
                            className='position-relative'
                            // style={{background: '#F5F5F5', borderRadius: '90px'}}
                            autoComplete='off'
                        >
                            {/* Approval Table Search Input */}
                            <CustomInput
                                type={INPUT_TYPE.search}
                                name='search'
                                onChange={(e) => delaySearch(e?.target?.value)}
                                value={search}
                            />
                            {/* <KTSVG
                                path='/media/icons/duotune/general/gen021.svg'
                                className='svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 ms-3 translate-middle-y'
                            />

                            <input
                                style={{background: '#F5F5F5', borderRadius: '10px'}}
                                type='text'
                                className='form-control form-control-solid px-12 '
                                name='search'
                                placeholder='Search...'
                                onChange={(e) => delaySearch(e?.target?.value)}
                            /> */}
                        </form>
                    </div>

                    <div className='' style={{alignSelf: 'center'}}>
                        <AccessRights
                            customCondition={allPermissionsAccess.standard.management.team.add}
                        >
                            {/* <button
                                href='#'
                                className='btn btn-sm  me-0 ms-sm-6'
                                style={{
                                    background: '#6078EC',
                                    color: 'white',
                                    fontSize: '14px',
                                    fontStyle: 'bold',
                                    width: '119px',
                                    height: '43px',
                                }}
                                //   onClick={() => setOpen(true)}
                                data-bs-toggle='modal'
                                data-bs-target='#kt_modal_offer_a_deal'
                                onClick={() => {
                                    setShowCreateAppModal(true)
                                }}
                            >
                                Create New
                            </button> */}
                            <CustomButton
                                buttonType={BUTTON_TYPE.primary}
                                buttonSize={BUTTON_SIZE.small}
                                buttonLabel='Create New'
                                onClick={() => {
                                    setShowCreateAppModal(true)
                                }}
                            />
                        </AccessRights>
                    </div>
                </div>
            </div>

            <div>
                <Card cardData={teamsData} />
            </div>

            <div className='my-5 d-flex flex-wrap gap-10 w-100 mx-auto'>
                <TeamsTable
                    className='col-sm'
                    tableData={teamsData?.data}
                    locationList={officeList}
                    getData={() => getTeams()}
                ></TeamsTable>
            </div>
            {showCreateAppModal ? (
                <BitzTabelsPopUp
                    show={showCreateAppModal}
                    handleClose={() => handleClose()}
                    location={officeList}
                    addEditTeam={(data) => onAddUpdate(data)}
                    getTeams={getTeams}
                />
            ) : null}
        </div>
    )
}

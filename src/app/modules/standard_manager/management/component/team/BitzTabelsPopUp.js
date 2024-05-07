import {useState, useEffect, useCallback} from 'react'

import {
    addManagementTeamService,
    getTeamLeadByOfficeIdService,
    getTeamMembersByOfficeIdService,
    officeBYUserIDSerices,
    updateManagementTeamService,
} from '../../../../../../services/Services'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import CustomImage from '../../../../../../customComponents/customImage/CustomImage'
import useOfficeLocation from '../../../../../../hooks/useOfficeLocation'
import CustomAutoCompleteMultiselectDropdown from '../../../../../../customComponents/customInputs/customAutoCompleteMultiselectDropdown/CustomAutoCompleteMultiselectDropdown'
import {getErrorMessageFromResponse} from '../../../../../../helpers/CommonHelpers'
import CustomInput from '../../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomModal from '../../../../../../customComponents/customModal/CustomModal'
import CustomButton, {
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'
import CustomDropdown from '../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'

const BitzTabelsPopUp = ({show, handleClose, selectedTeam, getTeams}) => {
    const [officeList, selectedLocation, setSelectedLocation] = useOfficeLocation(
        selectedTeam?.office_id,
        false
    )
    const [selectedTeamLead, setSelectedTeamLead] = useState(selectedTeam?.team_lead_id)
    const [teamName, setTeamName] = useState(selectedTeam?.team_name)
    const [teamMember, setTeamMember] = useState(selectedTeam?.members ?? [])
    const [loading, setLoading] = useState(false)
    const [userByOfficeData, setUserByOffceData] = useState([])
    const [teamMembersData, setTeamMembersData] = useState([])
    const [showSuggestion, setShowSuggestion] = useState(false)
    const [searchLoading, setSearchLoading] = useState(false)

    useEffect(() => {
        if (selectedTeam) setLoading(true)
        setSearchLoading(true)
        if (selectedLocation) {
            getuserByOfficeData()
        }
        // getTeamLeadByOffice()
    }, [selectedLocation, selectedTeam?.office_id])

    const getuserByOfficeData = () => {
        officeBYUserIDSerices(selectedLocation)
            .then((res) => {
                const modifiedRes = res?.data?.map((item) => ({
                    ...item,
                    name: `${item?.first_name} ${item?.last_name}`,
                }))
                setTeamMembersData(modifiedRes)
                setUserByOffceData(modifiedRes)
            })
            .finally(() => {
                setLoading(false)
                setSearchLoading(false)
            })
    }

    const getTeamLeadByOffice = () => {
        if (selectedLocation) {
            getTeamMembersByOfficeIdService(selectedLocation).then((res) => {
                if (selectedTeam?.members?.length > 0) {
                    setTeamMembersData([...selectedTeam?.members, ...res.data])
                }
            })
            getTeamLeadByOfficeIdService(selectedLocation)
                .then((res) => {
                    setUserByOffceData(res.data)
                })
                .then(() => setSearchLoading(false))
        }
    }
    const handleAddEdit = (e, type) => {
        e.preventDefault()
        if (!teamName) return CustomToast.error('Enter team name')
        if (!selectedLocation) return CustomToast.error('Select office')

        setLoading(true)
        if (type == 'add') {
            const body = {
                team_name: teamName,
                office_id: selectedLocation,
                team_lead_id: selectedTeamLead,
                team_members: teamMember?.map((item) => {
                    return item?.id
                }),
            }
            addManagementTeamService(body)
                .then(() => {
                    CustomToast.success('Team Created Successfully')
                    handleClose()
                    getTeams()
                })
                .catch((e) => {
                    CustomToast.error(getErrorMessageFromResponse(e))
                })
                .finally(() => setLoading(false))
        } else {
            // const teamMembers = teamMember?.filter((item) => {
            //     return item?.id != selectedTeamLead
            // })
            const body = {
                id: selectedTeam?.id,
                team_name: teamName,
                office_id: selectedLocation,
                team_lead_id: selectedTeamLead,
                team_members: teamMember?.map((item) => {
                    return item?.id
                }),
            }
            updateManagementTeamService(body)
                .then(() => {
                    CustomToast.success('Team Updated Successfully')
                    handleClose()
                    getTeams()
                })
                .catch((e) => {
                    CustomToast.error(getErrorMessageFromResponse(e))
                })
                .finally(() => setLoading(false))
        }
    }

    const onRemove = (id) => {
        const updateTeam = teamMember?.filter((item) => item?.id !== id)
        setTeamMember(updateTeam)
    }

    const onOptionPress = useCallback((item) => {
        setTeamMember((val) => [
            ...val,
            {
                first_name: item?.first_name,
                last_name: item?.last_name,
                id: item?.id,
                image: item?.image,
            },
        ])
    }, [])
    return (
        <CustomModal
            show={show}
            onHide={handleClose}
            maxWidth='1000'
            title={selectedTeam ? 'Edit Team ' : 'Create New team'}
        >
            <div className=''>
                <CustomLoader full visible={loading} />
                <form
                    onSubmit={(e) =>
                        selectedTeam ? handleAddEdit(e, 'update') : handleAddEdit(e, 'add')
                    }
                >
                    <div className=''>
                        <div className='d-flex justify-content-center'>
                            <div className='row w-sm-75 w-100'>
                                <div className='d-flex justify-content-center gap-10 mb-5 py-5 overflow-auto'>
                                    {teamMember?.map((item, index) => {
                                        return (
                                            item?.id !== selectedTeamLead?.id && (
                                                <div
                                                    className='text-center '
                                                    key={`teamMember-${item?.id}-${index}`}
                                                >
                                                    <div className='position-relative'>
                                                        <CustomImage
                                                            src={item?.image}
                                                            className='avatar'
                                                            style={{width: '50px', height: '50px'}}
                                                            alt=''
                                                        />
                                                        <div
                                                            className='position-absolute top-0 start-100 translate-middle cursor-pointer bi bi-x-circle-fill fs-1'
                                                            style={{color: '#6078EC'}}
                                                            onClick={() => onRemove(item?.id)}
                                                        ></div>
                                                    </div>
                                                    <div
                                                        style={{
                                                            fontWeight: '500',
                                                            fontSize: '12px',
                                                            color: '#868686',
                                                        }}
                                                    >
                                                        {item?.first_name}
                                                    </div>
                                                </div>
                                            )
                                        )
                                    })}
                                </div>
                                <div className='row'>
                                    <div className='col-sm'>
                                        <div className='mb-10'>
                                            <CustomInput
                                                label={'Team Name'}
                                                name='team_name'
                                                value={teamName}
                                                placeholder='Enter Team Name'
                                                onChange={(e) => setTeamName(e.target?.value)}
                                                rejex={/^[\w\-\s]+$/}
                                            />
                                        </div>
                                        <div className='mb-10'>
                                            <CustomDropdown
                                                label={'Office'}
                                                value={selectedLocation}
                                                onChange={(e) => {
                                                    setSelectedLocation(e.target?.value)
                                                    setSelectedTeamLead(null)
                                                    setUserByOffceData([])
                                                    setTeamMembersData([])
                                                    setTeamMember([])
                                                }}
                                                placeholder={
                                                    selectedTeam?.location_name ?? 'Select Office'
                                                }
                                                options={officeList}
                                            />
                                        </div>
                                        <div className='mb-10'>
                                            <CustomDropdown
                                                label={'Team Lead'}
                                                value={selectedTeamLead}
                                                options={userByOfficeData}
                                                placeholder='Search for an Team Lead'
                                                onChange={(e) =>
                                                    setSelectedTeamLead(e.target.value)
                                                }
                                                valueKey='id'
                                                displayKey='name'
                                                loading={searchLoading}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-sm'>
                                        <div>
                                            <div className='d-flex align-items-center gap-5'>
                                                <div
                                                    className={`text-cmGrey700 text-nowrap`}
                                                    style={{fontWeight: 600}}
                                                >
                                                    Team Members:
                                                </div>
                                                <div
                                                    // showSuggestion
                                                    //     ? 'bi bi-eye-slash'
                                                    //     : 'bi bi-eye'

                                                    className={`
                                                                                                  cursor-pointer text-cminfo`}
                                                    onClick={() =>
                                                        setShowSuggestion(!showSuggestion)
                                                    }
                                                >
                                                    {showSuggestion ? 'Hide list' : 'Show List'}
                                                </div>
                                            </div>
                                            <CustomAutoCompleteMultiselectDropdown
                                                showSuggestion={showSuggestion}
                                                zIndex={1}
                                                options={teamMembersData}
                                                placeholder='Search for members'
                                                onChange={(e) => onOptionPress(e.target.value)}
                                                membersList={teamMember}
                                                searchFields={['first_name', 'last_name']}
                                                selectedLead={selectedTeamLead}
                                                loading={searchLoading}
                                            />
                                        </div>
                                        {/* <div className='bg-dark' style={{fontFamily: 'Manrope'}}>
                                            <div className='mx-3 '></div>
                                        </div> */}
                                    </div>
                                </div>
                                <div className='text-center mt-sm-20 mb-sm-10 mt-10 mb-5'>
                                    <CustomButton
                                        type='submit'
                                        buttonType={BUTTON_TYPE.primary}
                                        buttonLabel={selectedTeam ? 'Update Team' : 'Create Team'}
                                        onClick={(e) =>
                                            selectedTeam
                                                ? handleAddEdit(e, 'update')
                                                : handleAddEdit(e, 'add')
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </CustomModal>
    )
}

export {BitzTabelsPopUp}

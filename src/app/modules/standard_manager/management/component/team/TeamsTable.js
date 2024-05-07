/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useMemo, useState, useEffect} from 'react'
import {FC} from 'react'
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import AccessRights from '../../../../../../accessRights/AccessRights'
import {
    PERMISSIONS_GROUP,
    PERMISSION_TYPE,
} from '../../../../../../accessRights/AccessRightsConstants'

import {
    deleteManagmentTeamMemberService,
    deleteTeamService,
} from '../../../../../../services/Services'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import Edit from '../../../../admin/sequidocs/Icon/edit.png'
import {BitzTabelsPopUp} from './BitzTabelsPopUp'
import CustomDialog from '../../../../../../customComponents/customDialog/CustomDialog'
import CustomImage from '../../../../../../customComponents/customImage/CustomImage'
import {getErrorMessageFromResponse} from '../../../../../../helpers/CommonHelpers'
import CustomEditIcon from '../../../../../../customComponents/customIcons/CustomEditIcon'
import CustomDelete from '../../../../../../customComponents/customIcons/CustomDelete'
import {allPermissionsAccess} from '../../../../../../accessRights/useCustomAccessRights'
const TeamsTable = ({className, tableData, locationList, getData}) => {
    const [showCreateAppModal, setShowCreateAppModal] = useState(false)
    const [selectedTeam, setSelectedTeam] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleClose = () => {
        setShowCreateAppModal(false)
        getData()
    }

    useEffect(() => {
        if (!showCreateAppModal) setSelectedTeam(null)
    }, [showCreateAppModal])
    const deleteMember = (teamId, memberId) => {
        const body = {
            team_id: teamId,
            member_id: memberId,
        }
        deleteManagmentTeamMemberService(body)
            .then(() => getData())
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
            .finally(() => CustomToast.success('Member Deleted Successfully'))
    }
    const deleteTeam = (id) => {
        setLoading(true)

        deleteTeamService(id)
            .then(() => getData())
            .finally((res) => {
                CustomToast.success('Team Deleted Successfully')
            })
            .finally(() => setLoading(false))
    }

    return (
        <>
            <CustomLoader full visible={loading} />
            {tableData?.length > 0 ? (
                tableData?.map((item) => (
                    <div
                        key={item?.id}
                        className={`bg-cmwhite w-100 ${className}`}
                        style={{border: '1px solid #6078EC', borderRadius: '12px'}}
                    >
                        <div className=' py-0 px-0 mx-0'>
                            <div className='w-100 mt-0 pt-6 px-10 d-flex flex-wrap justify-content-between mb-5'>
                                <div
                                    className=' mb-2 mt- d-flex flex-row ms-1'
                                    id='kt_chat_contacts_header'
                                >
                                    <label
                                        style={{
                                            color: '#212121',
                                            fontFamily: 'Manrope ',
                                            fontWeight: 'bold',
                                            fontSize: '16px',
                                        }}
                                    >
                                        {item?.team_name ?? '-'}
                                    </label>
                                    <label style={{color: '#757575'}} className='ms-7'>
                                        <i className='bi bi-person'></i>
                                        <label className='p-1 ms-1'> {item?.people ?? '0'}</label>
                                    </label>
                                </div>
                                <AccessRights
                                    customCondition={
                                        allPermissionsAccess.standard.management.team.edit
                                    }
                                >
                                    <div className='d-flex gap-3'>
                                        <CustomEditIcon
                                            onClick={() => {
                                                setShowCreateAppModal(true)
                                                setSelectedTeam(item)
                                            }}
                                        />

                                        <CustomDelete
                                            onClick={() => {
                                                CustomDialog.warn(
                                                    'Are you sure you want to delete ?',
                                                    () => {
                                                        deleteTeam(item?.id)
                                                    }
                                                )
                                            }}
                                        />
                                    </div>
                                </AccessRights>
                            </div>
                            <div id='get1' className='table-responsive overflow-auto'>
                                <table className='table' style={{marginTop: '-20px'}}>
                                    <thead>
                                        <tr
                                            className=' '
                                            style={{
                                                background: 'white',
                                                color: '#424242',
                                                fontSize: '12px',
                                                fontWeight: 'bold',
                                                fontFamily: 'Manrope',
                                            }}
                                        >
                                            {/* <th st></th> */}
                                            <th style={{width: '235px'}} className=''></th>
                                            <th className='min-w-100px'></th>
                                            <th className='text-end'></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {item?.team_lead_id && (
                                            <tr
                                                className='stripRow '
                                                style={{
                                                    color: '#616161',
                                                    fontSize: '14px',
                                                    fontFamily: 'Manrope',
                                                }}
                                            >
                                                <td
                                                    className=' d-flex flex-row px-10'
                                                    style={{
                                                        color: '#424242',
                                                        fontFamily: 'Manrope',
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    <CustomImage
                                                        src={item?.image}
                                                        className='avatar me-3'
                                                    />{' '}
                                                    <font className='mt-1'>
                                                        {item?.team_lead_name ?? '-'}
                                                    </font>
                                                    {
                                                        <button
                                                            className='ms-5 mt-1'
                                                            style={{
                                                                width: '50px',
                                                                fontSize: '10px',
                                                                fontSize: '12px',
                                                                border: 'none',
                                                                borderRadius: '20px',
                                                                color: '#00C247',
                                                                fontFamily: 'Manrope',
                                                                height: '19px',
                                                                background: 'rgba(0, 194, 71, 0.1)',
                                                            }}
                                                        >
                                                            {'Lead'}
                                                        </button>
                                                    }
                                                </td>

                                                <td className=''>{item?.sub_position ?? '-'}</td>
                                                <td className=''></td>
                                            </tr>
                                        )}
                                        {item?.members?.map((child, index) => (
                                            <tr
                                                key={index}
                                                className='stripRow '
                                                style={{
                                                    color: '#616161',
                                                    fontSize: '14px',
                                                    fontFamily: 'Manrope',
                                                }}
                                            >
                                                <td
                                                    className=' d-flex flex-row px-10'
                                                    style={{
                                                        color: '#424242',
                                                        fontFamily: 'Manrope',
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    <CustomImage
                                                        src={child?.image}
                                                        className='avatar me-3'
                                                    />{' '}
                                                    <font className='mt-1'>
                                                        {child?.first_name ?? '-'}{' '}
                                                        {child?.last_name ?? '-'}
                                                    </font>
                                                    {item?.team_lead_id == child?.id && (
                                                        <button
                                                            className='ms-5 mt-1'
                                                            style={{
                                                                width: '50px',
                                                                fontSize: '10px',
                                                                fontSize: '12px',
                                                                border: 'none',
                                                                borderRadius: '20px',
                                                                color: '#00C247',
                                                                fontFamily: 'Manrope',
                                                                height: '19px',
                                                                background: 'rgba(0, 194, 71, 0.1)',
                                                            }}
                                                        >
                                                            {'Lead'}
                                                        </button>
                                                    )}
                                                </td>

                                                <td className=''>{child?.sub_position ?? '-'}</td>
                                                <AccessRights
                                                    customCondition={
                                                        allPermissionsAccess.standard.management
                                                            .team.delete
                                                    }
                                                >
                                                    <td className='px-3 '>
                                                        {' '}
                                                        {item?.team_lead_id != child?.id && (
                                                            <i
                                                                className='bi bi-x-circle text-cmError cursor-pointer'
                                                                onClick={() => {
                                                                    CustomDialog.warn(
                                                                        'Are you sure you want to delete ?',
                                                                        () => {
                                                                            deleteMember(
                                                                                item?.id,
                                                                                child?.id
                                                                            )
                                                                        }
                                                                    )
                                                                }}
                                                                style={{
                                                                    fontSize: '22px',
                                                                    color: '#616161',
                                                                }}
                                                            ></i>
                                                        )}
                                                    </td>
                                                </AccessRights>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <>NO TEAMS</>
            )}
            {showCreateAppModal && (
                <BitzTabelsPopUp
                    show={showCreateAppModal}
                    handleClose={() => handleClose()}
                    location={locationList}
                    selectedTeam={selectedTeam}
                    getTeams={getData}
                />
            )}
        </>
    )
}

export default TeamsTable

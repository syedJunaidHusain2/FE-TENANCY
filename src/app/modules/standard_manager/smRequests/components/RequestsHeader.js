/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router-dom'
import AccessRights from '../../../../../accessRights/AccessRights'
import {allPermissionsAccess} from '../../../../../accessRights/useCustomAccessRights'
import {Badge} from '@mui/material'
import {useSelector} from 'react-redux'
import {getApprovalListSelector} from '../../../../../redux/selectors/RequestApprovalSelectors'
import {fontsFamily} from '../../../../../assets/fonts/fonts'

const RequestsHeader = ({showIncentive, setShowIncentive}) => {
    const approvalList = useSelector(getApprovalListSelector)
    const location = useLocation()

    return (
        <div
            style={{
                fontSize: '16px',
                fontWeight: '800',
                fontFamily: fontsFamily.manrope,
                marginTop: '-20px',
            }}
            className='d-flex flex-nowrap gap-7 text-cmGrey500'
        >
            <AccessRights
                customCondition={allPermissionsAccess.standard.requestAndApprovels.myRequests.view}
            >
                <Link
                    className={`py-2 px-3 bg-cmwhite shadow
                        ${
                            location.pathname === '/requests/request' && 'active'
                                ? 'text-cmBlue-Crayola '
                                : ' text-cmGrey500'
                        }`}
                    to='/requests/request'
                    style={{borderRadius: '10px 10px 0 0'}}
                >
                    {' '}
                    My Requests
                </Link>
            </AccessRights>

            <AccessRights
                customCondition={allPermissionsAccess.standard.requestAndApprovels.approvals.view}
            >
                <Badge badgeContent={approvalList?.total} color='primary'>
                    <Link
                        className={`py-2 px-3 bg-cmwhite shadow  ${
                            location.pathname === '/requests/approvals' && 'active'
                                ? 'text-cmBlue-Crayola'
                                : 'text-cmGrey500'
                        }`}
                        to='/requests/approvals'
                        style={{borderRadius: '10px 10px 0 0'}}
                    >
                        Approvals
                    </Link>
                </Badge>
            </AccessRights>
        </div>
    )
}

export {RequestsHeader}

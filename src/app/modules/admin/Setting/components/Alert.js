import React, {useState} from 'react'
import IncompleteAccount from './AlertPage/IncompleteAccount'
import AccessRights, {
    PERMISSIONS_GROUP,
    PERMISSION_TYPE,
} from '../../../../../accessRights/AccessRights'
import AlertsEmail from './AlertPage/AlertsEmail'
export default function Alert() {
    return (
        <>
            {/* <MarketingDeals /> */}
            <div className='mb-5'>
                <IncompleteAccount />
            </div>
            {/* <div>
                <AlertsEmail />
            </div> */}
        </>
    )
}

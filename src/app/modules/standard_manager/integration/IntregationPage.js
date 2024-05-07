import React from 'react'
import {PageTitle} from '../../../../_metronic/layout/core'
import {IntregationCards} from './components/IntregationCards'
import useIntegration from './useIntegration'
import AccessRights, {
    PERMISSIONS_GROUP,
    PERMISSION_TYPE,
} from '../../../../accessRights/AccessRights'
import {allPermissionsAccess} from '../../../../accessRights/useCustomAccessRights'

const profileBreadCrumbs = [
    {
        title: 'Dashboard /',
        path: '/',
        isSeparator: false,
        isActive: false,
    },
]

const IntregationPage = () => {
    const {integrationList, onModalClose} = useIntegration()

    return (
        <AccessRights
            customCondition={allPermissionsAccess.administrator.integrations.integrations.view}
            showPlaceHolder
        >
            <div className='px-sm-10'>
                <PageTitle breadcrumbs={profileBreadCrumbs}>Intregation</PageTitle>
                <div style={{marginTop: '-20px'}}>
                    {/* Cards begin */}
                    <div className='row mx-auto gap-10'>
                        {integrationList?.length > 0 &&
                            integrationList?.map((item) => (
                                <IntregationCards
                                    key={item?.id}
                                    data={item}
                                    onModalClose={onModalClose}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </AccessRights>
    )
}

export default IntregationPage

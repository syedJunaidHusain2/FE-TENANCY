import React, {useEffect, useMemo, useState} from 'react'
import Edit from '../../../../admin/sequidocs/Icon/edit.png'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import useUserEmploymentPackage, {USER_TYPE} from '../../../../../../hooks/useUserEmploymentPackage'

import useCustomAccessRights from '../../../../../../accessRights/useCustomAccessRights'
import CustomEditIcon from '../../../../../../customComponents/customIcons/CustomEditIcon'
import CustomButton, {
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'
import CustomViewChnagesEmployementPackageModal, {
    MODAL_NAME,
} from './EmpolymentPackageViewChangesModals.js/CustomViewChnagesEmployementPackageModal'
import {getBooleanValue} from '../../../../../../helpers/CommonHelpers'
import CustomLink from '../../../../../../customComponents/customButtton/CustomLink'

const UserEmployementPackage = ({id = null, getTopCardUserProfile = () => {}}) => {
    const [openViewChnagesOrganizationModal, setOpenViewChnagesOrganizationModal] = useState(false)
    const [openViewChnagesOverridesModal, setOpenViewChnagesOverridesModal] = useState(false)

    const {
        loading,
        organizationLoading,
        redlineLoading,
        overrideLoading,
        agreementLoading,
        deductionLoading,
        saveEmploymentPackage,
        getEmployeeData,
        employeeData,

        // Edit Section
        EditOrganisationSection,
        EditRedlineComissionUpfrontSection,
        EditOverridesSection,
        EditAgreementsSection,
        EditDeductionsSection,

        // View Section
        ViewOrganisationSection,
        ViewRedlineComissionUpfrontSection,
        ViewOverridesSection,
        ViewAgreementsSection,
        ViewDeductionsSection,
        bothPositionData,
    } = useUserEmploymentPackage({
        id,
        userType: USER_TYPE.hiredEmployee,
        getTopCardUserProfile: () => {
            getTopCardUserProfile()
            setEditState({
                step1: false,
                step2: false,
                step3: false,
                step4: false,
                step5: false,
                step6: false,
            })
        },
    })

    const {employeeProfileAccess} = useCustomAccessRights({employeeData})

    const [editState, setEditState] = useState({
        step1: false,
        step2: false,
        step3: false,
        step4: false,
        step5: false,
        step6: false,
    })

    const onSaveOrganization = () => {
        saveEmploymentPackage.organisationValidation().then(() => {
            CustomToast.success('Employment Package Updated')
            clickHandler('step2')
            //   if (
            //     [HIRING_PROCESS_STATUS.offerLetterSent, HIRING_PROCESS_STATUS.offerLetterResent].includes(
            //       employeeData?.status_id
            //     )
            //   ) {
            //     sendEmailbyIdService(employeeData?.id).then(() => {
            //       CustomToast.success('Offer Letter Resent')
            //     })
            //   }
        })
    }

    const onSaveRedlinePress = () => {
        saveEmploymentPackage.commissionAndRedlineValidation().then(() => {
            CustomToast.success('Employment Package Updated')
            getEmployeeData()
            clickHandler('step3')
        })
    }

    const onSaveOverridesPress = () => {
        saveEmploymentPackage.overrideValidation().then(() => {
            CustomToast.success('Employment Package Updated')
            clickHandler('step4')
        })
    }
    const onSaveAggrementPress = () => {
        saveEmploymentPackage.agreementValidation().then(() => {
            CustomToast.success('Employment Package Updated')
            clickHandler('step5')
        })
    }

    const onSaveDeductionPress = () => {
        saveEmploymentPackage.deductionsValidation().then(() => {
            CustomToast.success('Employment Package Updated')
            clickHandler('step6')
        })
    }

    const showSaveButton = useMemo(() => {
        return employeeProfileAccess.editEmploymentPackageAccess
    }, [employeeProfileAccess.editEmploymentPackageAccess])

    const clickHandler = (value) => {
        const val = !editState[value]
        if (!val) getEmployeeData()
        const data = {
            step1: false,
            step2: false,
            step3: false,
            step4: false,
            step5: false,
            step6: false,
        }
        data[value] = val
        setEditState(data)
    }

    // View changes modal
    const handleViewChangeModal = (modalNanme) => {
        if (modalNanme == MODAL_NAME.Organization)
            setOpenViewChnagesOrganizationModal(!openViewChnagesOrganizationModal)
        if (modalNanme == MODAL_NAME.Overrides)
            setOpenViewChnagesOverridesModal(!openViewChnagesOverridesModal)
    }

    return (
        <div style={{position: 'relative'}}>
            <CustomLoader full visible={loading} loaderPosition='top' />
            <div className='d-xl-flex flex-wrap justify-content-evenly gap-5'>
                <div
                    className='col-sm bg-cmwhite shadow-sm mb-5'
                    style={{borderRadius: '10px', position: 'relative'}}
                >
                    <CustomLoader full visible={organizationLoading} />
                    <div className='row align-items-center col-sm py-4 pe-1 ps-4 mx-auto'>
                        <div
                            style={{fontWeight: '700', fontSize: '16px'}}
                            className='col-sm text-cmGrey900 d-flex align-items-center text-nowrap gap-5'
                        >
                            <div>Organization</div>

                            <CustomLink
                                label={'View Changes'}
                                onClick={() => handleViewChangeModal(MODAL_NAME.Organization)}
                            />
                        </div>

                        {showSaveButton ? (
                            <div className='col-sm '>
                                {!editState?.step2 && (
                                    <span className='d-flex flex-sm-end'>
                                        <CustomEditIcon onClick={() => clickHandler('step2')} />
                                    </span>
                                )}
                                {editState?.step2 && (
                                    <div className='d-flex justify-content-end gap-2'>
                                        <CustomButton
                                            buttonLabel='Cancel'
                                            buttonType={BUTTON_TYPE.greyText}
                                            onClick={() => clickHandler('step2')}
                                        />

                                        <CustomButton
                                            buttonLabel='Save'
                                            padding={'px-10'}
                                            buttonType={BUTTON_TYPE.primary}
                                            onClick={onSaveOrganization}
                                        />
                                    </div>
                                )}
                            </div>
                        ) : null}
                    </div>

                    <hr className='text-cmGrey500 m-0 p-0'></hr>
                    <div>
                        {!editState.step2 ? ViewOrganisationSection : EditOrganisationSection}
                        {openViewChnagesOrganizationModal ? (
                            <CustomViewChnagesEmployementPackageModal
                                show={openViewChnagesOrganizationModal}
                                modalName={MODAL_NAME.Organization}
                                handleClose={() => handleViewChangeModal(MODAL_NAME.Organization)}
                                title={`Organizational Changes- ${employeeData?.first_name} ${employeeData?.last_name}`}
                                userId={id}
                                PositionId={employeeData?.position_id}
                            />
                        ) : null}
                    </div>
                </div>
                <div
                    className='col-sm  bg-cmwhite shadow-sm mb-5'
                    style={{borderRadius: '10px', position: 'relative'}}
                >
                    <CustomLoader full visible={redlineLoading} />
                    <div className='row align-items-center col-sm py-4 pe-1 ps-4 mx-auto'>
                        <div
                            className='col text-cmGrey900 text-nowrap'
                            style={{fontWeight: '700', fontSize: '16px'}}
                        >
                            <div>Redline / Commission / Upfront</div>
                        </div>

                        {showSaveButton ? (
                            <div className='col'>
                                {!editState?.step3 && (
                                    <span className='d-flex flex-sm-end'>
                                        <CustomEditIcon onClick={() => clickHandler('step3')} />
                                    </span>
                                )}
                                {editState?.step3 && (
                                    <div className='d-flex justify-content-end gap-2'>
                                        <CustomButton
                                            buttonLabel='Cancel'
                                            buttonType={BUTTON_TYPE.greyText}
                                            onClick={() => clickHandler('step3')}
                                        />

                                        <CustomButton
                                            buttonLabel='Save'
                                            padding={'px-10'}
                                            buttonType={BUTTON_TYPE.primary}
                                            onClick={onSaveRedlinePress}
                                        />
                                    </div>
                                )}
                            </div>
                        ) : null}
                    </div>

                    <hr className='text-cmGrey500 m-0 p-0'></hr>
                    <div>
                        {!editState.step3
                            ? ViewRedlineComissionUpfrontSection
                            : EditRedlineComissionUpfrontSection}
                    </div>
                </div>
            </div>
            <div className='d-flex flex-wrap justify-content-evenly gap-5 mb-5'>
                <div
                    className='w-sm-50 w-100 col-sm bg-cmwhite shadow-sm '
                    style={{borderRadius: '10px', position: 'relative'}}
                >
                    <CustomLoader full visible={overrideLoading} />
                    <div className='row align-items-center col-sm py-4 pe-1 ps-4 mx-auto'>
                        <div
                            style={{fontWeight: '700', fontSize: '16px'}}
                            className='col-sm text-cmGrey900 d-flex align-items-center text-nowrap gap-5'
                        >
                            <div>Overrides</div>

                            <CustomLink
                                label={'View Changes'}
                                onClick={() => handleViewChangeModal(MODAL_NAME.Overrides)}
                            />
                        </div>
                        {showSaveButton ? (
                            <div className='col'>
                                {!editState?.step4 && (
                                    <span className='d-flex flex-end'>
                                        <CustomEditIcon onClick={() => clickHandler('step4')} />
                                    </span>
                                )}
                                {editState?.step4 && (
                                    <div className='d-flex justify-content-end gap-2'>
                                        <CustomButton
                                            buttonLabel='Cancel'
                                            buttonType={BUTTON_TYPE.greyText}
                                            onClick={() => clickHandler('step4')}
                                        />

                                        <CustomButton
                                            buttonLabel='Save'
                                            padding={'px-10'}
                                            buttonType={BUTTON_TYPE.primary}
                                            onClick={onSaveOverridesPress}
                                        />
                                    </div>
                                )}
                            </div>
                        ) : null}
                    </div>

                    <hr className='text-cmGrey500 m-0 p-0'></hr>
                    <div className=''>
                        {!editState.step4 ? ViewOverridesSection : EditOverridesSection}
                    </div>
                    {openViewChnagesOverridesModal ? (
                        <CustomViewChnagesEmployementPackageModal
                            show={openViewChnagesOverridesModal}
                            modalName={MODAL_NAME.Overrides}
                            handleClose={() => handleViewChangeModal(MODAL_NAME.Overrides)}
                            title={`Override Changes - ${employeeData?.first_name} ${employeeData?.last_name}`}
                            userId={id}
                            positionData={bothPositionData?.firstPosition}
                        />
                    ) : null}
                </div>

                {/* Deductions */}
                {getBooleanValue(bothPositionData?.firstPosition?.deduction_status) == 1 ? (
                    <div
                        className='w-sm-50 w-100 col-sm bg-cmwhite shadow-sm '
                        style={{borderRadius: '10px', position: 'relative'}}
                    >
                        <CustomLoader full visible={deductionLoading} />
                        <div className='d-flex align-items-center justify-content-between flex-wrap p-4'>
                            <div
                                style={{fontWeight: '700', fontSize: '16px'}}
                                className='text-cmGrey900'
                            >
                                Deductions
                            </div>
                            {showSaveButton ? (
                                <>
                                    {!editState?.step6 && (
                                        <CustomEditIcon onClick={() => clickHandler('step6')} />
                                    )}
                                    {editState?.step6 && (
                                        <div className='d-flex gap-2'>
                                            <CustomButton
                                                buttonLabel='Cancel'
                                                buttonType={BUTTON_TYPE.greyText}
                                                onClick={() => clickHandler('step6')}
                                            />

                                            <CustomButton
                                                buttonLabel='Save'
                                                padding={'px-10'}
                                                buttonType={BUTTON_TYPE.primary}
                                                onClick={onSaveDeductionPress}
                                            />
                                        </div>
                                    )}
                                </>
                            ) : null}
                        </div>

                        <hr className='text-cmGrey500 m-0 p-0'></hr>
                        <div>
                            {!editState.step6 ? ViewDeductionsSection : EditDeductionsSection}
                        </div>
                    </div>
                ) : null}
            </div>
            <div className='d-flex flex-wrap justify-content-evenly gap-5'>
                {/* Agreements */}
                <div
                    className='w-sm-50 w-100 col-sm bg-cmwhite shadow-sm '
                    style={{borderRadius: '10px', position: 'relative'}}
                >
                    <CustomLoader full visible={agreementLoading} />
                    <div className='d-flex align-items-center justify-content-between flex-wrap px-10 py-4'>
                        <div
                            style={{fontWeight: '700', fontSize: '16px'}}
                            className='text-cmGrey900'
                        >
                            Agreement
                        </div>
                    </div>

                    <hr className='text-cmGrey500 m-0 p-0'></hr>
                    <div className=''>
                        {!editState.step5 ? ViewAgreementsSection : EditAgreementsSection}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserEmployementPackage

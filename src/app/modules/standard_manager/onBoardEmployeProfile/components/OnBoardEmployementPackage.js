import React, {useEffect, useMemo, useState} from 'react'
import Edit from '../../../admin/sequidocs/Icon/edit.png'
import CustomLoader from '../../../../../customComponents/customLoader/CustomLoader'
import CustomToast from '../../../../../customComponents/customToast/CustomToast'
import {HIRING_PROCESS_STATUS} from '../../../../../constants/constants'
import useUserEmploymentPackage from '../../../../../hooks/useUserEmploymentPackage'
import CustomEditIcon from '../../../../../customComponents/customIcons/CustomEditIcon'

const OnBoardEmployementPackage = ({id = null, getonbording = () => {}}) => {
    const {
        loading,
        personalDetailLoading,
        organizationLoading,
        redlineLoading,
        overrideLoading,
        agreementLoading,
        saveEmploymentPackage,
        employeeData,
        getEmployeeData,

        // Edit Section
        EditPersonalDetailSection,
        EditOrganisationSection,
        EditRedlineComissionUpfrontSection,
        EditOverridesSection,
        EditAgreementsSection,

        // View Section
        ViewPersonalDetailSection,
        ViewOrganisationSection,
        ViewRedlineComissionUpfrontSection,
        ViewOverridesSection,
        ViewAgreementsSection,
    } = useUserEmploymentPackage({id})

    const [editState, setEditState] = useState({
        step1: false,
        step2: false,
        step3: false,
        step4: false,
        step5: false,
    })

    const onSaveEmployeePersonalData = () => {
        saveEmploymentPackage.personalDetailValidation().then(() => {
            CustomToast.success('Employment Package Updated')
            clickHandler('step1')
        })
    }

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

    const showSaveButton = useMemo(() => {
        return ![
            HIRING_PROCESS_STATUS.onboarding,
            HIRING_PROCESS_STATUS.rejected,
            HIRING_PROCESS_STATUS.offerLetterRejected,
            HIRING_PROCESS_STATUS.adminRejected,
            HIRING_PROCESS_STATUS.draft,
            HIRING_PROCESS_STATUS.active,
        ].includes(employeeData?.status_id)
    }, [employeeData?.status_id])

    const clickHandler = (value) => {
        getEmployeeData()
        const data = {
            step1: false,
            step2: false,
            step3: false,
            step4: false,
            step5: false,
            step6: false,
        }
        data[value] = !editState[value]
        setEditState(data)
    }

    return (
        <div style={{position: 'relative'}}>
            <CustomLoader full visible={loading} loaderPosition='top' />
            <div className='d-flex flex-wrap justify-content-evenly gap-5'>
                <div
                    className='col w-50 bg-cmwhite shadow-sm mb-5'
                    style={{borderRadius: '10px', position: 'relative'}}
                >
                    <CustomLoader full visible={personalDetailLoading} />
                    <div
                        className='d-flex align-items-center justify-content-between flex-wrap px-10 py-4 bg-cmwhite'
                        style={{borderRadius: '10px'}}
                    >
                        <div
                            style={{fontWeight: 700, fontSize: '16px'}}
                            className='text-cmGrey900 '
                        >
                            Employee Personal Detail
                        </div>

                        {showSaveButton ? (
                            <>
                                {!editState?.step1 && (
                                    <CustomEditIcon onClick={() => clickHandler('step1')} />
                                )}
                                {editState?.step1 && (
                                    <div className='d-flex gap-2'>
                                        <button
                                            className='btn py-2 bg-cmBlue-Crayola bg-opacity-10 text-cmBlue-Crayola'
                                            onClick={() => clickHandler('step1')}
                                        >
                                            Cancel
                                        </button>
                                        <div
                                            onClick={onSaveEmployeePersonalData}
                                            className='btn py-2 bg-cmBlue-Crayola bg-opacity-10 text-cmBlue-Crayola'
                                        >
                                            Save
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : null}
                    </div>

                    <hr className='text-cmGrey500 m-0 p-0'></hr>
                    <div>
                        {!editState.step1 ? ViewPersonalDetailSection : EditPersonalDetailSection}
                    </div>
                </div>
                <div
                    className='col w-50 bg-cmwhite shadow-sm mb-5'
                    style={{borderRadius: '10px', position: 'relative'}}
                >
                    <CustomLoader full visible={organizationLoading} />
                    <div
                        className='d-flex align-items-center justify-content-between flex-wrap px-10 py-4 bg-cmwhite'
                        style={{borderRadius: '10px'}}
                    >
                        <div
                            style={{fontWeight: '700', fontSize: '16px'}}
                            className='text-cmGrey900'
                        >
                            Organization
                        </div>
                        {showSaveButton ? (
                            <>
                                {!editState?.step2 && (
                                    <CustomEditIcon onClick={() => clickHandler('step2')} />
                                )}
                                {editState?.step2 && (
                                    <div className='d-flex gap-2'>
                                        <button
                                            className='btn py-2 bg-cmBlue-Crayola bg-opacity-10 text-cmBlue-Crayola'
                                            onClick={() => clickHandler('step2')}
                                        >
                                            Cancel
                                        </button>
                                        <div
                                            onClick={onSaveOrganization}
                                            className='btn py-2 bg-cmBlue-Crayola bg-opacity-10 text-cmBlue-Crayola'
                                        >
                                            Save
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : null}
                    </div>

                    <hr className='text-cmGrey500 m-0 p-0'></hr>
                    <div>
                        {!editState.step2 ? ViewOrganisationSection : EditOrganisationSection}
                    </div>
                </div>
            </div>
            <div className='d-flex flex-wrap justify-content-evenly gap-5'>
                <div
                    className='col-sm  bg-cmwhite shadow-sm '
                    style={{borderRadius: '10px', position: 'relative'}}
                >
                    <CustomLoader full visible={redlineLoading} />
                    <div className='d-flex align-items-center justify-content-between flex-wrap px-10 py-4 '>
                        <div
                            style={{fontWeight: '700', fontSize: '16px'}}
                            className='text-cmGrey900'
                        >
                            Redline / Commission / Upfront
                        </div>
                        {showSaveButton ? (
                            <>
                                {!editState?.step3 && (
                                    <CustomEditIcon onClick={() => clickHandler('step3')} />
                                )}
                                {editState?.step3 && (
                                    <div className='d-flex gap-2'>
                                        <button
                                            className='btn py-2 bg-cmBlue-Crayola bg-opacity-10 text-cmBlue-Crayola'
                                            onClick={() => clickHandler('step3')}
                                        >
                                            Cancel
                                        </button>
                                        <div
                                            onClick={onSaveRedlinePress}
                                            className='btn py-2 bg-cmBlue-Crayola bg-opacity-10 text-cmBlue-Crayola'
                                        >
                                            Save
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : null}
                    </div>

                    <hr className='text-cmGrey500 m-0 p-0'></hr>
                    <div>
                        {!editState.step3
                            ? ViewRedlineComissionUpfrontSection
                            : EditRedlineComissionUpfrontSection}
                    </div>
                </div>
                <div
                    className='w-50 col bg-cmwhite shadow-sm '
                    style={{borderRadius: '10px', position: 'relative'}}
                >
                    <CustomLoader full visible={overrideLoading} />
                    <div className='d-flex align-items-center justify-content-between flex-wrap px-10 py-4'>
                        <div
                            style={{fontWeight: '700', fontSize: '16px'}}
                            className='text-cmGrey900'
                        >
                            Overrides
                        </div>
                        {showSaveButton ? (
                            <>
                                {!editState?.step4 && (
                                    <CustomEditIcon onClick={() => clickHandler('step4')} />
                                )}
                                {editState?.step4 && (
                                    <div className='d-flex gap-2'>
                                        <button
                                            className='btn py-2 bg-cmBlue-Crayola bg-opacity-10 text-cmBlue-Crayola'
                                            onClick={() => clickHandler('step4')}
                                        >
                                            Cancel
                                        </button>
                                        <div
                                            onClick={onSaveOverridesPress}
                                            className='btn py-2 bg-cmBlue-Crayola bg-opacity-10 text-cmBlue-Crayola'
                                        >
                                            Save
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : null}
                    </div>

                    <hr className='text-cmGrey500 m-0 p-0'></hr>
                    <div>{!editState.step4 ? ViewOverridesSection : EditOverridesSection}</div>
                </div>
            </div>

            <div className='d-flex flex-wrap justify-content-evenly gap-5 mt-5 '>
                <div
                    className='w-50 col bg-cmwhite shadow-sm bg-dark'
                    style={{borderRadius: '10px', position: 'relative'}}
                >
                    <CustomLoader full visible={agreementLoading} />
                    <div className='d-flex align-items-center justify-content-between flex-wrap px-10 py-2 bg-cmwhite '>
                        <div
                            style={{fontWeight: '700', fontSize: '16px'}}
                            className='text-cmGrey900'
                        >
                            Agreements
                        </div>
                        {showSaveButton ? (
                            <>
                                {!editState?.step5 && (
                                    <CustomEditIcon onClick={() => clickHandler('step5')} />
                                )}
                                {editState?.step5 && (
                                    <div className='d-flex gap-2'>
                                        <button
                                            className='btn py-2 bg-cmBlue-Crayola bg-opacity-10 text-cmBlue-Crayola'
                                            onClick={() => clickHandler('step5')}
                                        >
                                            Cancel
                                        </button>
                                        <div
                                            onClick={onSaveAggrementPress}
                                            className='btn py-2 bg-cmBlue-Crayola bg-opacity-10 text-cmBlue-Crayola'
                                        >
                                            Save
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : null}
                    </div>

                    <hr className='text-cmGrey500 m-0 p-0'></hr>
                    <div>{!editState.step5 ? ViewAgreementsSection : EditAgreementsSection}</div>
                </div>
            </div>
        </div>
    )
}

export default OnBoardEmployementPackage

import React from 'react'
import useBackendCard from './useBackendCard'
import 'react-datepicker/dist/react-datepicker.css'
import CustomLoader from '../../../../../../../customComponents/customLoader/CustomLoader'
import {
    isPermittedForAccess,
    PERMISSION_TYPE,
    PERMISSIONS_GROUP,
} from '../../../../../../../accessRights/AccessRights'
import CustomDialog from '../../../../../../../customComponents/customDialog/CustomDialog'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../../../customComponents/customButtton/CustomButton'
import CustomArrow, {
    ARROW_DIRECTION,
} from '../../../../../../../customComponents/customIcons/CustomIcons'
import CustomEditIcon from '../../../../../../../customComponents/customIcons/CustomEditIcon'
import {fontsFamily} from '../../../../../../../assets/fonts/fonts'
import ReconciliationTableview from './ReconciliationTableview'
import ReconciliationTableEdit from './ReconciliationTableEdit'

export default function SetupCard1() {
    const {
        toggleMorePress,
        more,
        edit,
        setEdit,
        onEditButtonPress,
        onSavePress,
        getReconliation,
        reconciliation,
        setReconciliation,
        handleReconciliation,
        handleFromPeriod,
        loading,
        setLoading,
        companySetting,
        reconDisableDates,
    } = useBackendCard()

    return (
        <div
            className='card shadow-sm bg-cmwhite'
            style={{position: 'relative', borderRadius: '10px'}}
        >
            <CustomLoader full visible={loading} />

            <div className='my-3 mt-5 d-flex flex-wrap align-items-center justify-content-between'>
                <div className='ms-sm-11 ms-5 form-switch form-switch-sm form-check-custom form-check-solid '>
                    <div
                        className='text-cmBlack m-0'
                        style={{
                            fontSize: '16px',
                            fontFamily: fontsFamily.manrope,
                            fontWeight: '700',
                            lineHeight: '21.86px',
                        }}
                    >
                        Reconciliations
                        {/* Backend */}
                    </div>
                    {isPermittedForAccess({
                        permission: PERMISSIONS_GROUP.administrator.setting.setup,
                        type: PERMISSION_TYPE.edit,
                    }) && (
                        <input
                            style={{marginLeft: '15px'}}
                            className='form-check-input'
                            type='checkbox'
                            checked={companySetting?.reconciliation}
                            name='notifications'
                            onClick={handleReconciliation}
                        />
                    )}
                    <label
                        className='mx-2 text-cmGrey600'
                        style={{fontFamily: 'Manrope', fontSize: '12px', fontWeight: '500'}}
                    >
                        {companySetting?.reconciliation ? 'Enabled' : 'Disabled'}
                    </label>
                    {companySetting?.reconciliation ? (
                        <CustomArrow
                            arrowDirection={!more ? ARROW_DIRECTION.right : ARROW_DIRECTION.down}
                            onClick={() => {
                                toggleMorePress(!more ? true : false)
                            }}
                        />
                    ) : null}
                </div>
                {isPermittedForAccess({
                    permission: PERMISSIONS_GROUP.administrator.setting.setup,
                    type: PERMISSION_TYPE.edit,
                }) && (
                    <div className='mx-sm-0 mx-auto'>
                        {edit ? (
                            <div className='d-flex justify-content-end me-8 gap-3'>
                                <CustomButton
                                    buttonSize={BUTTON_SIZE.small}
                                    buttonLabel='Cancel'
                                    buttonType={BUTTON_TYPE.greyText}
                                    onClick={() => {
                                        setEdit(!edit)
                                        getReconliation()
                                    }}
                                />

                                <CustomButton
                                    buttonLabel='Save'
                                    buttonSize={BUTTON_SIZE.small}
                                    buttonType={BUTTON_TYPE.secondary}
                                    onClick={() => {
                                        CustomDialog.warn(
                                            'These changes will affect the entire software. Do you wish to save these changes?',
                                            () => {
                                                onSavePress()
                                            },
                                            () => {
                                                setEdit(!edit)
                                                getReconliation()
                                            }
                                        )
                                    }}
                                />
                            </div>
                        ) : (
                            <div className='d-flex justify-content-end me-8 '>
                                <CustomEditIcon onClick={onEditButtonPress} />
                            </div>
                        )}
                    </div>
                )}

                {/* </div> */}
            </div>
            {more && (
                <>
                    {!edit ? (
                        <>
                            {more ? (
                                <>
                                    <div className='mb-6'>
                                        <div
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: '500',
                                                fontFamily: 'Manrope',
                                            }}
                                            className='ms-sm-11 mx-5 text-cmGrey600 mb-5'
                                        >
                                            Do you withhold any amount from comissions to be
                                            reconcilliated later ?
                                        </div>
                                        <div className=''>
                                            <ReconciliationTableview
                                                reconciliation={reconciliation}
                                            />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <b></b>
                            )}
                        </>
                    ) : (
                        <>
                            <div>
                                <div
                                    style={{
                                        fontSize: '14px',
                                        fontFamily: 'Manrope',
                                    }}
                                    className='ms-11 text-cmGrey600'
                                >
                                    Do you with hold any amount from comissions to be reconcilliated
                                    later ?
                                </div>
                            </div>
                            <div>
                                <ReconciliationTableEdit
                                    loading={loading}
                                    setLoading={setLoading}
                                    getReconliation={getReconliation}
                                    reconciliation={reconciliation}
                                    setReconciliation={setReconciliation}
                                    handlePeriod={handleFromPeriod}
                                    reconDisableDates={reconDisableDates}
                                />
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    )
}

import React, {useState, useEffect} from 'react'
import More1 from './Path1.png'
import useCorporate from './UseCorporate'
import {KTSVG} from '../../../../../../_metronic/helpers'
import More from './Path.png'
import clsx from 'clsx'
import CorporateTabel from './CorporateTabel'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'
import CorporateFilter from '../../../filters/CorporateFilter'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'

const initialFilter = {
    employee: '',
    costHead: '',
    approvedBy: '',
    requestedOn: '',
}

export default function SetupCard1({ReportData, onApplyFilter, loading, onResetFilter}) {
    const {
        toggleMorePress,
        more,
        edit,
        onEditButtonPress,
        onSavePress,
        setShowCostsCentersWithNoValue,
        showCostsCentersWithNoValue,
        onToggleCostCentersWithNoValue,
    } = useCorporate()

    return (
        <div className='card bg-white h-auto mt-6 shadow-sm fw-bold' style={{position: 'relative'}}>
            <CustomLoader full visible={loading} />
            <div className='my-3'>
                <div className='d-flex align-items-center flex-wrap justify-content-between mx-5 py-2'>
                    <div className='form-check d-flex form-switch form-switch-sm form-check-custom form-check-solid'>
                        <label
                            className='form-label'
                            style={{
                                fontSize: '17px',
                                fontFamily: 'Manrope',
                                // fontStyle: 'Medium',
                                color: '#212121',
                                fontWeight: 'bold',
                            }}
                        >
                            Corporate
                        </label>
                    </div>
                    {more ? (
                        <>
                            <div className=' d-flex align-items-center gap-10'>
                                <div className=''>
                                    <CustomButton
                                        type='submit'
                                        buttonType={BUTTON_TYPE.primary}
                                        buttonLabel={
                                            showCostsCentersWithNoValue
                                                ? 'Hide Cost Centers With No Value'
                                                : 'Show Full List'
                                        }
                                        onClick={onToggleCostCentersWithNoValue}
                                    />
                                </div>
                                <div>
                                    {/* <CorporateFilter
                                        initialFilter={initialFilter}
                                        onApplyFilter={(updatedFilter) =>
                                            onApplyFilter(updatedFilter)
                                        }
                                        resetFilter={onResetFilter}
                                    /> */}
                                </div>
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            {more === true ? (
                <CorporateTabel
                    showCostsCentersWithNoValue={showCostsCentersWithNoValue}
                    tableData={ReportData}
                />
            ) : (
                <b></b>
            )}
            {/* <CorporateTabel tableData={ReportData}/> */}
        </div>
    )
}

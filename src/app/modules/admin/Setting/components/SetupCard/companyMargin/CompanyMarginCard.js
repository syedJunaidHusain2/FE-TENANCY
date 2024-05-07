import React, {useEffect, useState} from 'react'
import {fontsFamily} from '../../../../../../../assets/fonts/fonts'
import CustomEditIcon from '../../../../../../../customComponents/customIcons/CustomEditIcon'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../../../customComponents/customButtton/CustomButton'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../../customComponents/customInputs/customInput/CustomInput'
import {
    getCompanyMarginService,
    updateCompanyMarginService,
} from '../../../../../../../services/Services'
import CustomToast from '../../../../../../../customComponents/customToast/CustomToast'
import CustomLoader from '../../../../../../../customComponents/customLoader/CustomLoader'
import {percentageLimitCheck} from '../../../../../../../helpers/CommonHelpers'

const CompanyMarginCard = () => {
    const [editMode, setEditMode] = useState(false)
    const [companyMargin, setCompanyMargin] = useState(null)
    const [loading, setloading] = useState(true)
    const [companyMarginInputEror, setCompanyMarginInputEror] = useState(null)
    const handleEditMode = () => {
        setEditMode(!editMode)
    }

    useEffect(() => {
        getCompanyMarginData()
    }, [])

    const getCompanyMarginData = () => {
        getCompanyMarginService()
            .then((res) => {
                setCompanyMargin(res?.data?.company_margin)
            })
            .finally(() => setloading(false))
    }

    const handleChangeCompanyMargin = (e) => {
        let {value, max, name} = e.target

        if (percentageLimitCheck(max, value)) setCompanyMargin(e.target.value)
    }

    const handleEditCancel = () => {
        setloading(true)
        handleEditMode()
        getCompanyMarginData()
    }

    const UpdateCompanyMarginData = () => {
        const body = {company_margin: companyMargin, id: 1}
        if (!body.company_margin) return setCompanyMarginInputEror('Please enter a value')
        setloading(true)
        updateCompanyMarginService(body)
            .then((res) => {
                CustomToast.success('Company Margin updated successfully')
                getCompanyMarginData()
                handleEditMode()
            })
            .catch((err) => CustomToast.error(err))
            .finally(() => {
                setloading(false)
                setCompanyMarginInputEror(null)
            })
    }

    return (
        <div
            className='shadow-sm bg-cmwhite'
            style={{borderRadius: '10px', fontFamily: fontsFamily.manrope}}
        >
            <div
                className='ps-10 py-5'
                style={{
                    fontSize: '16px',
                    fontFamily: 'Manrope',
                    color: '#9E9E9E',
                    fontWeight: '600',
                }}
            >
                System Modules
            </div>
            {/* <div className='modal-header mb-2'></div> */}
            <hr className='m-0 text-cmGrey400' />
            <div className='py-5 ps-10 pe-8'>
                <div
                    className='text-cmBlack'
                    style={{fontSize: 16, fontWeight: 700, lineHeight: '21.86px'}}
                >
                    Company Margin
                </div>
                <div style={{position: 'relative'}}>
                    <CustomLoader full visible={loading} />

                    <div className='d-flex align-items-center flex-wrap justify-content-between'>
                        <div className='d-flex align-items-center gap-5'>
                            <div
                                className='text-cmGrey600'
                                style={{fontSize: 14, fontWeight: 500, lineHeight: '21px'}}
                            >
                                Percentage of the sale value that is withheld for company costs
                                prior to any commission calculations are made
                            </div>
                            {!editMode ? (
                                <div
                                    className='text-cmGrey900'
                                    style={{fontSize: 16, fontWeight: 600, lineHeight: '32px'}}
                                >
                                    {companyMargin} %
                                </div>
                            ) : (
                                <div className='w-100px'>
                                    <CustomInput
                                        type={INPUT_TYPE.number}
                                        suffixText='%'
                                        value={companyMargin}
                                        errorMessage={companyMarginInputEror}
                                        max={100}
                                        onChange={(e) => handleChangeCompanyMargin(e)}
                                    />
                                </div>
                            )}
                        </div>
                        {!editMode ? (
                            <div>
                                <CustomEditIcon onClick={handleEditMode} />
                            </div>
                        ) : (
                            <div className='d-flex align-items-center gap-3'>
                                <CustomButton
                                    buttonLabel='Cancel'
                                    buttonType={BUTTON_TYPE.greyText}
                                    buttonSize={BUTTON_SIZE.small}
                                    onClick={handleEditCancel}
                                />
                                <CustomButton
                                    buttonLabel='Save'
                                    buttonType={BUTTON_TYPE.secondary}
                                    buttonSize={BUTTON_SIZE.small}
                                    onClick={UpdateCompanyMarginData}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyMarginCard

import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {fontsFamily} from '../../../../../../../../assets/fonts/fonts'
import CustomCheckbox from '../../../../../../../../customComponents/customCheckbox/CustomCheckbox'
import CustomButton, {
    BUTTON_TYPE,
} from '../../../../../../../../customComponents/customButtton/CustomButton'
import {addTemplateSignatureStep2Service} from '../../../../../../../../services/Services'
import CustomLoader from '../../../../../../../../customComponents/customLoader/CustomLoader'
import {getBooleanValue} from '../../../../../../../../helpers/CommonHelpers'
const SignaturesStep = ({
    step,
    setStep,
    categoryId,
    selectedTemplate,
    newCreatedTemplateId,
    templateId,
}) => {
    const [loading, setLoading] = useState(false)
    const [buttonLoading, setButtonLoading] = useState(false)
    // const allPositions = useSelector(getPositionsSelector)
    const [recipientSign, setRecipientSign] = useState(
        selectedTemplate?.recipient_sign_req ? true : false
    )
    const [recruiterSign, setRecruiterSign] = useState(
        selectedTemplate?.recruiter_sign_req ? true : false
    )
    const [managerSign, setManagerSign] = useState(
        selectedTemplate?.manager_sign_req ? true : false
    )
    const [additionalSign, setAdditionalSign] = useState(
        selectedTemplate?.add_recruiter_sign_req ? true : false
    )
    const [signatureOrder, setSignatureOrder] = useState([
        {
            id: '1',
            name: 'Employee Signature (person receiving this template)',
        },
        {
            id: '2',
            name: "Employee's Manager",
        },
    ])

    useEffect(() => {
        // let additionalSign = selectedTemplate?.sequi_docs_additional_signature?.map(
        //     (item) => item?.additional_signature
        // )
        // setSignaturesRequired(selectedTemplate?.recipient_sign_req ? true : false)
        // setSelectSignature(additionalSign ?? [])
    }, [selectedTemplate])
    // const positionList = useMemo(() => {
    //     return allPositions?.map((i) => ({name: `${i.position_name} Signature`, value: i.id}))
    // }, [allPositions])

    const onSave = useCallback(() => {
        setButtonLoading(true)
        const body = {
            category_id: categoryId ?? selectedTemplate?.categery_id,
            template_id: templateId ?? newCreatedTemplateId,
            recipient_sign_req: getBooleanValue(recipientSign),
            manager_sign_req: getBooleanValue(managerSign),
            recruiter_sign_req: 0,
            add_recruiter_sign_req: 0,
            // recruiter_sign_req: getBooleanValue(recruiterSign),
            // add_recruiter_sign_req: getBooleanValue(additionalSign),
        }
        addTemplateSignatureStep2Service(body)
            .then(() => {
                setStep(step + 1)
            })
            .finally(() => {
                setButtonLoading(false)
            })
    }, [
        categoryId,
        managerSign,
        newCreatedTemplateId,
        recipientSign,
        selectedTemplate?.categery_id,
        setStep,
        step,
        templateId,
    ])

    // const onSearchSignature = (val) => {
    //     let filterData = getGlobalSearchData(positionList, ['name'], val)
    //     if (val) {
    //         setFilterSignatures(filterData && filterData)
    //     } else {
    //         setFilterSignatures(null)
    //     }
    // }

    // const removeSignature = (val) => {
    //     const updatedArr = selectedSignature.filter((item) => item !== val)

    //     setSelectSignature(updatedArr)
    // }
    function handleOnDragEnd(result) {
        if (!result.destination) return
        const items = Array.from(signatureOrder)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)
        setSignatureOrder(items)
    }

    return (
        <div className='w-sm-75' style={{fontFamily: fontsFamily.manrope}}>
            <div className='mb-10'>
                <div className='text-cmGrey900 mb-2' style={{fontSize: 18, fontWeight: 700}}>
                    All Signatures Required
                </div>
                <div
                    className='text-cmGrey700'
                    style={{fontSize: 14, fontWeight: 700, lineHeight: '24px'}}
                >
                    Add People that need to sign this document <br /> Additional Signatures Required
                    (if any)- Add more people that needs to sign this template E.g. the recipient,
                    their manager, their office manager, Admin, SuperAdmin
                </div>
            </div>
            <div className='rounded bg-cmwhite border border-cmDisabled py-10 px-sm-20 px-5 mb-10'>
                <div className='w-sm-75'>
                    <div className='text-cmGrey800 mb-5' style={{fontSize: 16, fontWeight: 700}}>
                        Select Signature Required
                    </div>
                    {/* <div className='d-flex align-items-center gap-3 mb-5'>
                        <CustomCheckbox checked={true} />
                        <div
                            className='text-cmGrey800'
                            style={{
                                fontSize: 14,
                                fontWeight: 600,
                            }}
                        >
                            Set Signing Order
                        </div>
                    </div> */}
                    {/* For Future Use */}
                    {/* <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId='characters'>
                            {(provided) => (
                                <div
                                    className='characters'
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {signatureOrder?.map(({id, name}, index) => {
                                        return (
                                            <Draggable key={id} draggableId={id} index={index}>
                                                {(provided) => (
                                                    <div
                                                        className='d-flex align-items-center gap-3 mb-5  bg-cmGrey200 p-5 rounded'
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <span className='pi pi-align-justify'></span>
                                                        <span className='me-3'>{id}</span>
                                                        <CustomCheckbox
                                                            checked={recipientSign}
                                                            onChange={(e) =>
                                                                setRecipientSign(e.target.checked)
                                                            }
                                                        />
                                                        <div
                                                            className='text-cmGrey800'
                                                            style={{
                                                                fontSize: 14,
                                                                fontWeight: 600,
                                                            }}
                                                        >
                                                            {name}
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        )
                                    })}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext> */}

                    <div className='d-flex align-items-center gap-3 mb-10'>
                        <CustomCheckbox
                            checked={recipientSign}
                            onChange={(e) => setRecipientSign(e.target.checked)}
                        />
                        <div className='text-cmGrey800' style={{fontSize: 14, fontWeight: 600}}>
                            Employee Signature (person receiving this template)
                        </div>
                    </div>
                    <div className='d-flex align-items-center gap-3 mb-10'>
                        <CustomCheckbox
                            checked={managerSign}
                            onChange={(e) => setManagerSign(e.target.checked)}
                        />
                        <div className='text-cmGrey800' style={{fontSize: 14, fontWeight: 600}}>
                            Employee's Manager
                        </div>
                    </div>
                    {/* <div className='d-flex align-items-center gap-3 mb-10'>
                        <CustomCheckbox
                            checked={recruiterSign}
                            onChange={(e) => setRecruiterSign(e.target.checked)}
                        />
                        <div className='text-cmGrey800' style={{fontSize: 14, fontWeight: 600}}>
                            Recruiter
                        </div>
                    </div>
                    <div className='d-flex align-items-center gap-3 mb-10'>
                        <CustomCheckbox
                            checked={additionalSign}
                            onChange={(e) => setAdditionalSign(e.target.checked)}
                        />
                        <div className='text-cmGrey800' style={{fontSize: 14, fontWeight: 600}}>
                            Additional Recruiter
                        </div>
                    </div> */}

                    {/* <div className='mb-5'>
                        <div
                            className='text-cmGrey800 mb-2'
                            style={{fontSize: 16, fontWeight: 700}}
                        >
                            Additional Signatures
                        </div>
                        <CustomInput
                            type={INPUT_TYPE.search}
                            placeholder='Search Positions'
                            onChange={(e) => onSearchSignature(e.target.value)}
                        />
                    </div> */}
                    {/* <div className='mb-2'>
                        {filterSignatures ? (
                            <ListBox
                                multiple
                                value={selectedSignature}
                                options={filterSignatures}
                                optionLabel='name'
                                className='w-full md:w-14rem'
                                onChange={(e) => setSelectSignature(e.value)}
                            />
                        ) : null}
                    </div> */}
                    {/* selected value block */}
                    {/* <div className='h-100px' style={{overflowY: 'auto', overflowX: 'hidden'}}>
                        <CustomLoader visible={loading} full />

                        {positionList?.map((item) =>
                            selectedSignature?.includes(item?.value) ? (
                                <div
                                    className='d-flex align-items-center justify-content-between text-cmGrey700  border-cmGrey200 p-5 border-bottom'
                                    style={{fontSize: 14, fontWeight: 600}}
                                >
                                    <div>{item?.name}</div>
                                    <KTSVG
                                        path='/media/icons/duotune/art/trash.svg'
                                        svgClassName='h-20px w-20px cursor-pointer'
                                        onClick={() => removeSignature(item?.value)}
                                    />
                                </div>
                            ) : null
                        )}

                    </div> */}
                </div>
            </div>
            {/* Buttons */}
            <div className='d-flex flex-center gap-10'>
                {step > 1 ? (
                    <CustomButton
                        buttonLabel='Back'
                        buttonType={BUTTON_TYPE.secondary}
                        padding={'px-20'}
                        onClick={() => setStep(step - 1)}
                    />
                ) : null}
                <CustomButton
                    buttonLabel='Save & Continue'
                    padding={'px-10'}
                    onClick={onSave}
                    loading={buttonLoading}
                />
            </div>
        </div>
    )
}

export default SignaturesStep

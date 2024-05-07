import {Sidebar} from 'primereact/sidebar'
import {useEffect, useState} from 'react'
import {updateCommissionService} from '../../../../../../services/Services'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import {formattedNumberFields} from '../../../../../../helpers/CommonHelpers'
import {formattedNumberFieldsWithoutDecimal} from '../../../../../../helpers/CommonHelpers'
import {useSelector} from 'react-redux'
import {getCompanySettingSelector} from '../../../../../../redux/selectors/SettingsSelectors'
import {fontsFamily} from '../../../../../../assets/fonts/fonts'

const ViewPositionSidebar = ({
    open,
    close,
    data,
    setupLoader,
    setData,
    editposition,
    setEditPosition,
    list,
    getPositionid,
    position,
    setPosition,
    edit,
    setEdit,
    override,
    setOverrides,
    deductions,
    setDeduction,
    setLoader,
}) => {
    const companySetting = useSelector(getCompanySettingSelector)
    useEffect(
        function () {
            setEdit(editposition)
            setPosition(data)
            setDeduction(data?.deducation)
            setOverrides(data?.override)
        },

        [data, editposition, list]
    )
    const handleSave = () => {
        const data = deductions
        data?.map((item) => {
            delete item.costcenter
            // delete item.deduction_type
            delete item.limit
            delete item.limit_ammount
            delete item.limit_type
            delete item.position_id
            delete item.deduction_setting_id
            delete item.id
        })
        var data1 = override
        data1.map((item) => {
            delete item.override_ammount_locked
            delete item.override_id
            delete item.id
            // delete item.override_id
            delete item.overrides_type
            delete item.override_type_locked
            delete item.overrides_detail
            delete item.overridessattlement
            delete item.position_id
            delete item.settlement_id
            // delete item.override_type_id
            delete item.status
        })
        var body = {
            commission_parentage: position.commission,
            commission_structure_type: position.commission_structure,
            upfront_ammount: position.upfront,
            calculated_by: position.upfront_calculated_by,
            upfront_system: position.upfront_system,
            upfront_limit: position.limit_par_period,
            limit_ammount: position.limit_ammount,
            limit_type: position.limit,
            sliding_scale: position.sliding_scale,
            deduction: data,
            override: data1,
        }
        updateCommissionService(position.id, body).then((res) => {
            getPositionid(position?.id)
        })
    }

    const titleStyle = {fontWeight: 600, fontSize: 16, lineHeight: '21px', color: '#616161'}
    const discriptionStyle = {fontWeight: 600, fontSize: 16, lineHeight: '21px', color: '#212121'}
    const HeadingStyle = {fontWeight: 600, fontSize: 16, lineHeight: '21px', color: '#212121'}

    return (
        <div>
            <Sidebar
                visible={open}
                data-pr-classname='w-100'
                position='right'
                p-sidebar-content='m-0'
                onHide={close}
                showCloseIcon={false}
                style={{
                    fontFamily: fontsFamily.manrope,
                    margin: '0px',
                    padding: '0px',
                    width: '100%',
                }}
                className={'w-sm-30 w-100 m-0 p-0 d-flex '}
                icons={() => (
                    <div className='d-flex align-items-center ms-sm-10 justify-content-between  w-100 '>
                        <div className='' style={HeadingStyle}>
                            {data?.position_name} &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp; Commission
                            Structure
                        </div>

                        <div
                            className={`bi bi-x-circle text-cmGrey800 fs-1 cursor-pointer text-hover-danger`}
                            onClick={close}
                        />
                    </div>
                )}
            >
                <CustomLoader full visible={setupLoader} />
                <div className='mb-7 w-100 m-0 p-0 ' style={{margin: 0, padding: 0, width: 100}}>
                    <div className='row py-5 w-100'>
                        <div className='col-1'></div>
                        <div className='col-5' style={titleStyle}>
                            Commission
                        </div>
                        <div className='col-5' style={discriptionStyle}>
                            {data?.commission_parentag_hiring_locked ? (
                                <span className='bi bi-lock-fill text-cmGrey700 me-2' />
                            ) : null}
                            <span> {data?.commission_parentage}%</span>
                        </div>
                        <div className='col-1'></div>
                    </div>
                    {/* line 2 */}
                    <div className='row py-5 bg-strip'>
                        <div className='col-1'></div>
                        <div className='col-5' style={titleStyle}>
                            Comission Structure:
                        </div>
                        <div className='col-5' style={discriptionStyle}>
                            {data?.commission_parentag_type_hiring_locked ? (
                                <span className='bi bi-lock-fill text-cmGrey700 me-2' />
                            ) : null}
                            <span>{data?.commission_structure_type}</span>
                        </div>
                        <div className='col-1'></div>
                    </div>
                    <div className='h-50px' />
                    {/* Line 3 */}
                    {data?.upfront_status ? (
                        <>
                            <div className='row py-5 bg-strip'>
                                <div className='col-1'></div>
                                <div className='col-5' style={titleStyle}>
                                    Upfront:
                                </div>
                                <div className='col-5' style={discriptionStyle}>
                                    {data?.upfront_ammount_locked ? (
                                        <span className='bi bi-lock-fill text-cmGrey700 me-2' />
                                    ) : null}
                                    <span>
                                        {formattedNumberFields(data?.upfront_ammount)}{' '}
                                        {data?.calculated_by}
                                    </span>
                                </div>
                                <div className='col-1'></div>
                            </div>

                            <div className='row py-5'>
                                <div className='col-1'></div>
                                <div className='col-5' style={titleStyle}>
                                    {' '}
                                    Upfront System:
                                </div>
                                <div className='col-5' style={discriptionStyle}>
                                    {data?.upfront_system_locked ? (
                                        <span className='bi bi-lock-fill text-cmGrey700 me-2' />
                                    ) : null}
                                    <span>{data?.upfront_system}</span>
                                </div>
                                <div className='col-1'></div>
                            </div>
                            <div className='row py-5 bg-strip'>
                                <div className='col-1'></div>
                                <div className='col-5' style={titleStyle}>
                                    Limit (Per period):
                                </div>
                                <div className='col-5' style={discriptionStyle}>
                                    {formattedNumberFieldsWithoutDecimal(data?.upfront_limit, '$')}
                                </div>
                                <div className='col-1'></div>
                            </div>
                        </>
                    ) : null}
                    <div className='h-50px' />
                    {data?.deduction_status ? (
                        <div>
                            <div style={HeadingStyle} className='py-2 row'>
                                <div className='col-1'></div>
                                <div className='d-flex gap-2 align-items-center col'>
                                    {data?.deduction_locked ? (
                                        <span className='bi bi-lock-fill text-cmGrey700' />
                                    ) : null}
                                    <div>Deductions</div>
                                </div>
                            </div>

                            {data?.deduction?.map((item, index) => (
                                <div
                                    className='row py-5'
                                    key={index}
                                    style={{
                                        background: index % 2 == 0 ? '#F9F9F9' : '',
                                    }}
                                >
                                    <div className='col-1'></div>
                                    <div className='col-5' style={titleStyle}>
                                        {item?.cost_center_name}:
                                    </div>
                                    <div className='col-5' style={discriptionStyle}>
                                        {item?.deduction_type} {item?.ammount_par_paycheck}
                                    </div>
                                    <div className='col-1'></div>
                                </div>
                            ))}
                            <div className='row py-5'>
                                <div className='col-1'></div>
                                <div className='col-5' style={titleStyle}>
                                    Limit:
                                </div>
                                <div className='col-5' style={discriptionStyle}>
                                    {data?.limit_type} {data?.limit_ammount ?? '0'}{' '}
                                </div>
                                <div className='col-1'></div>
                            </div>
                        </div>
                    ) : null}
                    <div className='h-50px' />

                    <div>
                        <div style={HeadingStyle} className='py-2 row'>
                            <div className='col-1'></div>
                            <div className='col'>Overrides</div>
                        </div>
                        {data?.override?.length > 0 &&
                            data?.override?.map((item2, index) =>
                                item2?.status ? (
                                    <div
                                        className='row py-5'
                                        style={{
                                            background: index % 2 == 0 ? '#F9F9F9' : '',
                                        }}
                                        key={index}
                                    >
                                        <div className='col-1'></div>
                                        <div className='col-5' style={titleStyle}>
                                            {item2?.overrides_type ?? '-'}:
                                        </div>
                                        <div className='col-5' style={discriptionStyle}>
                                            {data?.override_ammount_locked ? (
                                                <span className='bi bi-lock-fill text-cmGrey700 me-2' />
                                            ) : null}
                                            <span>
                                                {item2.override_type_id == 4
                                                    ? formattedNumberFieldsWithoutDecimal(
                                                          item2?.override_ammount,
                                                          '%'
                                                      )
                                                    : formattedNumberFieldsWithoutDecimal(
                                                          item2?.override_ammount,
                                                          item2?.type == 'percent' ? '' : '$'
                                                      )}{' '}
                                                {item2?.type == 'percent' ? '%' : item2?.type}
                                            </span>
                                        </div>
                                        <div className='col-1'></div>
                                    </div>
                                ) : null
                            )}
                    </div>

                    <div className='h-50px' />

                    {data?.reconciliation_status && companySetting?.reconciliation ? (
                        <>
                            <div style={HeadingStyle} className='py-2 row'>
                                <div className='col-1'></div>
                                <div className='col'>Settlements:</div>
                            </div>
                            <div className='row py-5 bg-strip'>
                                <div className='col-1'></div>
                                <div className='col-5' style={titleStyle}>
                                    {' '}
                                    Withhold Commission:
                                </div>
                                <div className='col-5' style={discriptionStyle}>
                                    {formattedNumberFieldsWithoutDecimal(
                                        data?.commission_withheld,
                                        '$'
                                    )}{' '}
                                    {data?.commission_type}
                                </div>
                                <div className='col-1'></div>
                            </div>
                            {/* line 2 */}
                            <div className='row py-5'>
                                <div className='col-1'></div>
                                <div className='col-5' style={titleStyle}>
                                    Maximum:
                                </div>
                                <div className='col-5' style={discriptionStyle}>
                                    {formattedNumberFieldsWithoutDecimal(
                                        data?.maximum_withheld,
                                        '$'
                                    )}
                                </div>
                                <div className='col-1'></div>
                            </div>
                            {/* line 3 */}
                            <div className='row py-5 bg-strip'>
                                <div className='col-1'></div>
                                <div className='col-5' style={titleStyle}>
                                    {' '}
                                    Override Settlement:
                                </div>
                                <div className='col-5' style={discriptionStyle}>
                                    {data?.override_settlement}
                                </div>
                                <div className='col-1'></div>
                            </div>
                            {/* Line */}
                            <div className='row py-5'>
                                <div className='col-1'></div>
                                <div className='col-5' style={titleStyle}>
                                    Clawback Settlement:
                                </div>
                                <div className='col-5' style={discriptionStyle}>
                                    {data?.clawback_settlement}
                                </div>
                                <div className='col-1'></div>
                            </div>
                        </>
                    ) : null}
                    {data?.is_stack === 1 ? (
                        <div className='row py-5 bg-strip'>
                            <div className='col-1'></div>
                            <div className='col-5' style={titleStyle}>
                                Stack Settlement:
                            </div>
                            <div className='col-5' style={discriptionStyle}>
                                {data?.stack_settlement}
                            </div>
                            <div className='col-1'></div>
                        </div>
                    ) : null}
                    {/* Pay Frequency */}
                    <div className='row py-5'>
                        <div className='col-1'></div>
                        <div className='col-5' style={titleStyle}>
                            Pay Frequency:
                        </div>
                        <div className='col-5' style={discriptionStyle}>
                            {data?.frequency_type_name}
                        </div>
                        <div className='col-1'></div>
                    </div>
                </div>
            </Sidebar>
        </div>
    )
}

export default ViewPositionSidebar

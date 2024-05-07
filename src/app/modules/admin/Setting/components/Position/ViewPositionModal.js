import {useEffect, useState} from 'react'
import {updateCommissionService} from '../../../../../../services/Services'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import {formattedNumberFields} from '../../../../../../helpers/CommonHelpers'
import {formattedNumberFieldsWithoutDecimal} from '../../../../../../helpers/CommonHelpers'
import {useSelector} from 'react-redux'
import {getCompanySettingSelector} from '../../../../../../redux/selectors/SettingsSelectors'
export default function ViewPositionModal({
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
}) {
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

    return (
        // <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Toggle right offcanvas</button>
        <div
            className='offcanvas offcanvas-end w-auto overflow-auto'
            tabIndex='-1'
            id='offcanvasRight'
            aria-labelledby='offcanvasRightLabel'
        >
            <CustomLoader full visible={setupLoader} />
            {!setupLoader && (
                <div
                    className='card shadow-none w-100'
                    style={{overflowY: 'auto', overflowX: 'hidden'}}
                >
                    <div className='d-flex align-items-center gap-10 m-5 '>
                        <div
                            className=' text-nowrap '
                            style={{
                                fontSize: '16px',
                                color: '#212121              ',
                                fontFamily: 'Manrope',
                            }}
                        >
                            {data?.position_name} &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp; Commission
                            Structure
                        </div>
                        <div
                            data-bs-dismiss='offcanvas'
                            aria-label='Close'
                            className=' cursor-pointer '
                        >
                            <i
                                className='bi bi-x-circle'
                                style={{fontSize: '22px', color: '#616161'}}
                            ></i>
                        </div>
                    </div>
                    <div className='mt-0' style={{borderBottom: '1px solid #EFF2F5'}}></div>
                    {/* {edit === false ? ( */}
                    <div
                        style={{marginLeft: '-10px', marginRight: '-60px', overflowX: 'hidden'}}
                        className='card-body'
                        id='kt_explore_body'
                    >
                        <div
                            id='kt_explore_scroll'
                            className='scroll-y me-n5 pe-5'
                            data-kt-scroll='true'
                            data-kt-scroll-height='auto'
                            data-kt-scroll-wrappers='#kt_engage_demos_body'
                            data-kt-scroll-dependencies='#kt_engage_demos_header'
                            data-kt-scroll-offset='5px'
                        >
                            <div className='mb-7' style={{overflow: 'hidden'}}>
                                <div className='container mt-2 ms-20'>
                                    <div className='row g-2'>
                                        <div
                                            className='col-5'
                                            style={{
                                                fontFamily: 'Manrope',
                                                color: '#616161                      ',
                                                fontSize: '16px',
                                            }}
                                        >
                                            Commission:
                                        </div>
                                        <div
                                            className='col ms-3'
                                            style={{fontFamily: 'Manrope', fontSize: '14px'}}
                                        >
                                            {data?.commission_parentag_hiring_locked ? (
                                                <span className='bi bi-lock-fill text-cmGrey700 me-2' />
                                            ) : null}

                                            <label
                                                style={{
                                                    fontSize: '16px',
                                                    fontFamily: 'Manrope',
                                                    color: '#212121',
                                                }}
                                            >
                                                {data?.commission_parentage}%
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    style={{background: '#F9F9F9'}}
                                    className='container mt-2 h-50px '
                                >
                                    <div className='row g-2 mt-4 ms-19'>
                                        <div
                                            className='col-6 mt-3'
                                            style={{
                                                fontFamily: 'Manrope',
                                                color: '#616161                      ',
                                                fontSize: '16px',
                                            }}
                                        >
                                            Comission Structure:
                                        </div>
                                        <div
                                            className='col mt-3'
                                            style={{
                                                fontFamily: 'Manrope',
                                                fontSize: '14px',
                                                marginLeft: '-6px',
                                            }}
                                        >
                                            {data?.commission_parentag_type_hiring_locked ? (
                                                <span className='bi bi-lock-fill text-cmGrey700 me-2' />
                                            ) : null}
                                            <label
                                                style={{
                                                    fontSize: '16px',
                                                    fontFamily: 'Manrope',
                                                    color: '#212121',
                                                }}
                                            >
                                                {data?.commission_structure_type}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                {data?.upfront_status ? (
                                    <>
                                        <div
                                            style={{background: '#F9F9F9'}}
                                            className='container mt-2 h-50px '
                                        >
                                            <div className='row g-2 mt-13 ms-19'>
                                                <div
                                                    className='col-6 mt-4'
                                                    style={{
                                                        fontFamily: 'Manrope',
                                                        color: '#616161                      ',
                                                        fontSize: '16px',
                                                    }}
                                                >
                                                    Upfront:
                                                </div>
                                                <div
                                                    className='col mt-4'
                                                    style={{
                                                        fontFamily: 'Manrope',
                                                        fontSize: '14px',
                                                    }}
                                                >
                                                    {data?.upfront_ammount_locked ? (
                                                        <span className='bi bi-lock-fill text-cmGrey700 me-2' />
                                                    ) : null}
                                                    <label
                                                        style={{
                                                            fontSize: '16px',
                                                            fontFamily: 'Manrope',
                                                            color: '#212121',
                                                        }}
                                                    >
                                                        {formattedNumberFields(
                                                            data?.upfront_ammount
                                                        )}{' '}
                                                        {data?.calculated_by}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='container mt-4 ms-20'>
                                            <div className='row g-2'>
                                                <div
                                                    className='col-5'
                                                    style={{
                                                        fontFamily: 'Manrope',
                                                        color: '#616161                      ',
                                                        fontSize: '16px',
                                                    }}
                                                >
                                                    Upfront System:
                                                </div>
                                                <div
                                                    className='col ms-4'
                                                    style={{
                                                        fontFamily: 'Manrope',
                                                        fontSize: '14px',
                                                    }}
                                                >
                                                    {data?.upfront_system_locked ? (
                                                        <span className='bi bi-lock-fill text-cmGrey700 me-2' />
                                                    ) : null}

                                                    <label
                                                        style={{
                                                            fontSize: '16px',
                                                            fontFamily: 'Manrope',
                                                            color: '#212121',
                                                        }}
                                                    >
                                                        {data?.upfront_system}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            style={{background: '#F9F9F9'}}
                                            className='container mt-2 h-50px '
                                        >
                                            <div className='row g-2 mt-4 ms-19'>
                                                <div
                                                    className='col-6 mt-4'
                                                    style={{
                                                        fontFamily: 'Manrope',
                                                        color: '#616161                      ',
                                                        fontSize: '16px',
                                                    }}
                                                >
                                                    Limit (Per period):
                                                </div>
                                                <div
                                                    className='col mt-4 ms-1'
                                                    style={{
                                                        fontFamily: 'Manrope',
                                                        fontSize: '14px',
                                                    }}
                                                >
                                                    <label
                                                        style={{
                                                            fontSize: '16px',
                                                            fontFamily: 'Manrope',
                                                            color: '#212121',
                                                        }}
                                                    >
                                                        {formattedNumberFieldsWithoutDecimal(
                                                            data?.upfront_limit,
                                                            '$'
                                                        )}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : null}
                                {data?.deduction_status ? (
                                    <div>
                                        <div className='container mt-2 h-50px '>
                                            <div className='d-flex g-2 mt-13 ms-20'>
                                                {data?.deduction_locked ? (
                                                    <span className='bi bi-lock-fill text-cmGrey700 me-2' />
                                                ) : null}
                                                <div
                                                    className=''
                                                    style={{
                                                        fontFamily: 'Manrope',
                                                        color: '#212121                        ',
                                                        fontSize: '16px',
                                                    }}
                                                >
                                                    Deductions
                                                </div>
                                            </div>
                                        </div>
                                        {data?.deduction?.map((item, index) => (
                                            <div
                                                key={index}
                                                style={{
                                                    background: index % 2 == 0 ? '#F9F9F9' : '',
                                                }}
                                                className='container h-50px '
                                            >
                                                <div className='row g-2 mt-0 ms-20'>
                                                    <div
                                                        className='col-6 mt-4'
                                                        style={{
                                                            fontFamily: 'Manrope',
                                                            color: '#616161                      ',
                                                            fontSize: '16px',
                                                        }}
                                                    >
                                                        {item?.cost_center_name}:
                                                    </div>
                                                    <div
                                                        className='col mt-4 ms-1'
                                                        style={{
                                                            fontFamily: 'Manrope',
                                                            fontSize: '14px',
                                                        }}
                                                    >
                                                        <label
                                                            style={{
                                                                fontSize: '16px',
                                                                fontFamily: 'Manrope',
                                                                color: '#212121',
                                                            }}
                                                        >
                                                            {item?.deduction_type}{' '}
                                                            {item?.ammount_par_paycheck}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <div
                                            style={{background: '#F9F9F9'}}
                                            className='container h-50px '
                                        >
                                            <div className='row g-2 mt-12 ms-20'>
                                                <div
                                                    className='col-6 mt-4 ms-1'
                                                    style={{
                                                        fontFamily: 'Manrope',
                                                        color: '#616161                      ',
                                                        fontSize: '16px',
                                                    }}
                                                >
                                                    Limit:
                                                </div>
                                                <div
                                                    className='col mt-4'
                                                    style={{
                                                        fontFamily: 'Manrope',
                                                        fontSize: '14px',
                                                    }}
                                                >
                                                    <label
                                                        style={{
                                                            fontSize: '16px',
                                                            fontFamily: 'Manrope',
                                                            color: '#212121',
                                                        }}
                                                    >
                                                        {data?.limit_type}{' '}
                                                        {data?.limit_ammount ?? '0'} {/* Monthly */}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : null}
                                {<div></div>}
                                <div className='container mt-2 h-50px '>
                                    <div className='row g-2 mt-13 ms-20'>
                                        <div
                                            className='col-6 mt-4'
                                            style={{
                                                fontFamily: 'Manrope',
                                                color: '#212121                        ',
                                                fontSize: '16px',
                                            }}
                                        >
                                            Overrides
                                        </div>
                                    </div>
                                </div>{' '}
                                {data?.override?.length > 0 &&
                                    data?.override?.map((item2, index) =>
                                        item2?.status ? (
                                            <div
                                                key={index}
                                                style={{background: '#F9F9F9'}}
                                                className='container h-50px '
                                            >
                                                <div className='row g-2 mt-0 ms-20'>
                                                    <div
                                                        className='col-6 mt-4'
                                                        style={{
                                                            fontFamily: 'Manrope',
                                                            color: '#616161                      ',
                                                            fontSize: '16px',
                                                        }}
                                                    >
                                                        {item2?.overrides_type ?? '-'}:
                                                    </div>
                                                    <div
                                                        className='col mt-4'
                                                        style={{
                                                            fontFamily: 'Manrope',
                                                            fontSize: '14px',
                                                        }}
                                                    >
                                                        {data?.override_ammount_locked ? (
                                                            <span className='bi bi-lock-fill text-cmGrey700 me-2' />
                                                        ) : null}
                                                        <label
                                                            style={{
                                                                fontSize: '16px',
                                                                fontFamily: 'Manrope',
                                                                color: '#212121',
                                                            }}
                                                        >
                                                            {item2.override_type_id == 4
                                                                ? formattedNumberFieldsWithoutDecimal(
                                                                      item2?.override_ammount,
                                                                      '%'
                                                                  )
                                                                : formattedNumberFieldsWithoutDecimal(
                                                                      item2?.override_ammount,
                                                                      '$'
                                                                  )}{' '}
                                                            {item2?.type}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : null
                                    )}
                                {/* <div className='container h-50px '>
                                    <div className='row g-2 mt-0 ms-20'>
                                        <div
                                            className='col-6 mt-4'
                                            style={{
                                                fontFamily: 'Manrope',
                                                color: '#616161                      ',
                                                fontSize: '16px',
                                            }}
                                        >
                                            Override System:
                                        </div>
                                        <div
                                            className='col mt-4'
                                            style={{fontFamily: 'Manrope', fontSize: '14px'}}
                                        >
                                            {data?.sliding_scale_locked ? (
                                                <span className='bi bi-lock-fill text-cmGrey700 me-2' />
                                            ) : null}
                                            <label
                                                style={{
                                                    fontSize: '16px',
                                                    fontFamily: 'Manrope',
                                                    color: '#212121',
                                                }}
                                            >
                                                {data?.sliding_scale}
                                            </label>
                                        </div>
                                    </div>
                                </div> */}
                                {/* Limit (Per period): */}
                                {data?.reconciliation_status && companySetting?.reconciliation ? (
                                    <>
                                        <div
                                            style={{background: '#F9F9F9'}}
                                            className='container h-50px '
                                        >
                                            <div className='row g-2 mt-12 ms-20'>
                                                <div
                                                    className='col-6 mt-4 ms-1'
                                                    style={{
                                                        fontFamily: 'Manrope',
                                                        color: '#212121                      ',
                                                        fontSize: '16px',
                                                    }}
                                                >
                                                    Settlements:
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{}} className='container h-50px '>
                                                <div className='row g-2 mt-0 ms-20'>
                                                    <div
                                                        className='col-6 mt-4'
                                                        style={{
                                                            fontFamily: 'Manrope',
                                                            color: '#616161',
                                                            fontSize: '16px',
                                                        }}
                                                    >
                                                        Withhold Commission:
                                                    </div>
                                                    <div
                                                        className='col mt-4'
                                                        style={{
                                                            fontFamily: 'Manrope',
                                                            fontSize: '14px',
                                                        }}
                                                    >
                                                        <label
                                                            style={{
                                                                fontSize: '16px',
                                                                fontFamily: 'Manrope',
                                                                color: '#212121',
                                                            }}
                                                        >
                                                            {formattedNumberFieldsWithoutDecimal(
                                                                data?.commission_withheld,
                                                                '$'
                                                            )}{' '}
                                                            {data?.commission_type}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                style={{background: '#F9F9F9'}}
                                                className='container h-50px '
                                            >
                                                <div className='row g-2 mt-0 ms-20'>
                                                    <div
                                                        className='col-6 mt-4'
                                                        style={{
                                                            fontFamily: 'Manrope',
                                                            color: '#616161',
                                                            fontSize: '16px',
                                                        }}
                                                    >
                                                        Maximum:
                                                    </div>
                                                    <div
                                                        className='col mt-4'
                                                        style={{
                                                            fontFamily: 'Manrope',
                                                            fontSize: '14px',
                                                        }}
                                                    >
                                                        <label
                                                            style={{
                                                                fontSize: '16px',
                                                                fontFamily: 'Manrope',
                                                                color: '#212121',
                                                            }}
                                                        >
                                                            {formattedNumberFieldsWithoutDecimal(
                                                                data?.maximum_withheld,
                                                                '$'
                                                            )}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{}} className='container h-50px '>
                                                <div className='row g-2 mt-0 ms-20'>
                                                    <div
                                                        className='col-6 mt-4'
                                                        style={{
                                                            fontFamily: 'Manrope',
                                                            color: '#616161',
                                                            fontSize: '16px',
                                                        }}
                                                    >
                                                        Override Settlement:
                                                    </div>
                                                    <div
                                                        className='col mt-4'
                                                        style={{
                                                            fontFamily: 'Manrope',
                                                            fontSize: '14px',
                                                        }}
                                                    >
                                                        <label
                                                            style={{
                                                                fontSize: '16px',
                                                                fontFamily: 'Manrope',
                                                                color: '#212121',
                                                            }}
                                                        >
                                                            {data?.override_settlement}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                style={{background: '#F9F9F9'}}
                                                className='container h-50px '
                                            >
                                                <div className='row g-2 mt-0 ms-20'>
                                                    <div
                                                        className='col-6 mt-4'
                                                        style={{
                                                            fontFamily: 'Manrope',
                                                            color: '#616161',
                                                            fontSize: '16px',
                                                        }}
                                                    >
                                                        Clawback Settlement:
                                                    </div>
                                                    <div
                                                        className='col mt-4'
                                                        style={{
                                                            fontFamily: 'Manrope',
                                                            fontSize: '14px',
                                                        }}
                                                    >
                                                        <label
                                                            style={{
                                                                fontSize: '16px',
                                                                fontFamily: 'Manrope',
                                                                color: '#212121',
                                                            }}
                                                        >
                                                            {data?.clawback_settlement}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : null}
                                {data.is_stack === 1 ? (
                                    <div style={{}} className='container h-50px '>
                                        <div className='row g-2 mt-0 ms-20'>
                                            <div
                                                className='col-6 mt-4'
                                                style={{
                                                    fontFamily: 'Manrope',
                                                    color: '#212121',
                                                    fontSize: '16px',
                                                }}
                                            >
                                                Stack Settlement:
                                            </div>
                                            <div
                                                className='col mt-4'
                                                style={{fontFamily: 'Manrope', fontSize: '14px'}}
                                            >
                                                <label
                                                    style={{
                                                        fontSize: '16px',
                                                        fontFamily: 'Manrope',
                                                        color: '#212121',
                                                    }}
                                                >
                                                    {data?.stack_settlement}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                ) : null}
                                <div style={{}} className='container h-50px '>
                                    <div className='row g-2 mt-0 ms-20'>
                                        <div
                                            className='col-6 mt-4'
                                            style={{
                                                fontFamily: 'Manrope',
                                                color: '#212121',
                                                fontSize: '16px',
                                            }}
                                        >
                                            Pay Frequency:
                                        </div>
                                        <div
                                            className='col mt-4'
                                            style={{fontFamily: 'Manrope', fontSize: '14px'}}
                                        >
                                            <label
                                                style={{
                                                    fontSize: '16px',
                                                    fontFamily: 'Manrope',
                                                    color: '#212121',
                                                }}
                                            >
                                                {data?.frequency_type_name}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* ) : ( */}
                    <></>
                    {/* // <EditPostion
          //   position={position}
          //   setPosition={setPosition}
          //   deductions={deductions}
          //   setDeduction={setDeduction}
          //   override={override}
          //   setOverrides={setOverrides}
          //   list={list}
          // /> */}
                    {/* )} */}
                </div>
            )}
        </div>
    )
}

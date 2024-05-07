/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import {getCostCenterDropdownService} from '../../../../../../services/Services'
import Select from '../../Icon/select.png'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../customComponents/customInputs/customInput/CustomInput'
export function EditPostion({
    position,
    setPosition,
    deductions,
    setDeduction,
    override,
    setOverrides,
    list,
}) {
    const [rowsData, setRowsData] = useState([])
    const [type, setType] = useState()
    const handleOffice = (e, index) => {
        const {name, value} = e.target
        const rowsInput = [...override]
        rowsInput[index][name] = value
        setOverrides(rowsInput)
        // setOverrides({...override, o: e.target.value})
    }
    useEffect(
        function () {
            setRowsData(deductions)
            setOverrides(override)
        },
        [deductions, override, list]
    )
    const handleAdd = () => {
        var id1 = rowsData.length + 1
        const rowsInput = {
            id: id1,
            cost_center_id: '',
            deduction_type: deductions[0].deduction_type,
            ammount_par_paycheck: '',
            costcenter: {name: ''},
        }
        setRowsData([...rowsData, rowsInput])
    }
    const handleDeduction = (e, index) => {
        const {name, value} = e.target
        const rowsInput = [...rowsData]
        rowsInput[index][name] = value
        setRowsData(rowsInput)
        setDeduction(rowsData)
    }
    const handleremove = (id) => {
        const filteredArray = rowsData.filter((item) => item?.id !== id)
        setRowsData(filteredArray)
        setDeduction(filteredArray)
    }
    return (
        <>
            {/* begin::Demos drawer */}

            <div
                style={{marginLeft: '-30px', marginRight: '-16px', overflowX: 'hidden'}}
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
                        <div className='container mt-2 ms-17'>
                            <div className='row g-2'>
                                <div
                                    className='col-4'
                                    style={{
                                        fontFamily: 'Manrope',
                                        color: '#616161                      ',
                                        fontSize: '16px',
                                    }}
                                >
                                    Commission:
                                </div>
                                <div
                                    className='col-6 ms-5'
                                    style={{fontFamily: 'Manrope', fontSize: '14px'}}
                                >
                                    <label
                                        style={{
                                            fontSize: '16px',
                                            marginTop: '-3px',
                                            fontFamily: 'Manrope',
                                            color: '#212121',
                                        }}
                                        className='d-flex flex-row'
                                    >
                                        <CustomInput
                                            onChange={(e) =>
                                                setPosition({
                                                    ...position,
                                                    commission: e.target.value,
                                                })
                                            }
                                            value={position.commission}
                                        />
                                        {/* 50% */}
                                        <label className='p-2'>%</label>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div style={{background: '#F9F9F9'}} className='container mt-2 h-50px '>
                            <div className='row g-2 mt-4 ms-16'>
                                <div
                                    className='col-5 mt-3'
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
                                    style={{fontFamily: 'Manrope', fontSize: '14px'}}
                                >
                                    <label
                                        className='d-flex flex-row'
                                        style={{
                                            marginTop: '-6px',
                                            borderRadius: '6px',
                                            width: '90%',
                                            height: '40px',
                                        }}
                                    >
                                        <select
                                            style={{
                                                fontWeight: '800px',
                                                color: '#424242',
                                                fontSize: '14px',
                                            }}
                                            onChange={(e) =>
                                                setPosition({
                                                    ...position,
                                                    commission_structure: e.target.value,
                                                })
                                            }
                                            name='commission_structure'
                                            data-control='select2'
                                            data-hide-search='true'
                                            className='form-select h-40px form-select-black form-select-sm cursor-pointer bg-cmGrey200'
                                            defaultValue='1'
                                        >
                                            <option selected hidden>
                                                {position.commission_structure}
                                            </option>

                                            <option value='Quaterly'>Quaterly</option>
                                            <option value='Fixed'>Fixed</option>
                                        </select>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div style={{background: '#F9F9F9'}} className='container mt-2 h-50px '>
                            <div className='row g-2 mt-13 ms-16'>
                                <div
                                    className='col-5 mt-4'
                                    style={{
                                        fontFamily: 'Manrope',
                                        color: '#616161                      ',
                                        fontSize: '16px',
                                    }}
                                >
                                    Upfront:
                                </div>
                                <div
                                    className='col mt-4 ms-1'
                                    style={{fontFamily: 'Manrope', fontSize: '14px'}}
                                >
                                    <label
                                        style={{
                                            fontSize: '16px',
                                            marginLeft: '-8px',

                                            marginTop: '-8px',
                                            fontFamily: 'Manrope',
                                            color: '#212121',
                                        }}
                                        className='d-flex flex-row'
                                    >
                                        {' '}
                                        <label className='p-2'>$</label>
                                        <CustomInput
                                            value={position.upfront}
                                            onChange={(e) =>
                                                setPosition({...position, upfront: e.target.value})
                                            }
                                            type={INPUT_TYPE.number}
                                        />
                                        {/* 50% */}
                                        <label
                                            className='d-flex flex-row ms-3'
                                            style={{
                                                marginTop: '-0px',
                                                borderRadius: '6px',
                                                width: '52%',
                                                height: '40px',
                                                fontFamily: 'Manrope',
                                            }}
                                        >
                                            <select
                                                style={{
                                                    fontWeight: '800',
                                                    color: '#424242',
                                                    fontSize: '14px',
                                                }}
                                                onChange={(e) =>
                                                    setPosition({
                                                        ...position,
                                                        upfront_calculated_by: e.target.value,
                                                    })
                                                }
                                                name='status'
                                                data-control='select2'
                                                data-hide-search='true'
                                                className='form-select form-select-black form-select-sm bg-cmGrey200 cursor-pointer'
                                                defaultValue='1'
                                            >
                                                <option selected hidden>
                                                    {position.upfront_calculated_by}
                                                </option>

                                                <option value='Per KW'>Per KW</option>
                                                <option value='Per Sale'>Per Sale</option>
                                            </select>
                                        </label>
                                    </label>
                                    {/* <label
                    style={{fontSize: '16px', fontFamily: 'Manrope', color: '#212121'}}
                  >
                    $ 100 per KW
                  </label> */}
                                </div>
                            </div>
                        </div>
                        <div className='container mt-4 ms-17'>
                            <div className='row g-2'>
                                <div
                                    className='col-4'
                                    style={{
                                        fontFamily: 'Manrope',
                                        color: '#616161                      ',
                                        fontSize: '16px',
                                    }}
                                >
                                    Upfront System:
                                </div>
                                <div
                                    className='col-6 ms-sm-7'
                                    style={{fontFamily: 'Manrope', fontSize: '14px'}}
                                >
                                    <label
                                        className='d-flex flex-row'
                                        style={{
                                            marginTop: '-6px',

                                            borderRadius: '6px',
                                            width: '93%',
                                            height: '40px',
                                        }}
                                    >
                                        <select
                                            style={{
                                                fontWeight: '800',
                                                color: '#424242',
                                                fontSize: '14px',
                                            }}
                                            name='status'
                                            onChange={(e) =>
                                                setPosition({
                                                    ...position,
                                                    upfront_system: e.target.value,
                                                })
                                            }
                                            data-control='select2'
                                            data-hide-search='true'
                                            className='form-select h-40px form-select-black form-select-sm cursor-pointer bg-cmGrey200'
                                            defaultValue='1'
                                        >
                                            <option selected hidden>
                                                {position.upfront_system}
                                            </option>
                                            <option value='Quaterly'>Quaterly</option>
                                            <option value='Tiered'>Tiered</option>
                                        </select>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div style={{background: '#F9F9F9'}} className='container mt-2 h-50px '>
                            <div className='row g-2 mt-4 ms-16'>
                                <div
                                    className='col-5 mt-4'
                                    style={{
                                        fontFamily: 'Manrope',
                                        color: '#616161                      ',
                                        fontSize: '16px',
                                    }}
                                >
                                    Limit (Per period):
                                </div>
                                <div
                                    className='col mt-1'
                                    style={{fontFamily: 'Manrope', fontSize: '14px'}}
                                >
                                    <label
                                        style={{
                                            fontSize: '16px',
                                            fontFamily: 'Manrope',
                                            color: '#212121',
                                        }}
                                    >
                                        <label className='p-2'>$</label>
                                        <CustomInput
                                            value={position.limit_par_period}
                                            onChange={(e) =>
                                                setPosition({
                                                    ...position,
                                                    limit_par_period: e.target.value,
                                                })
                                            }
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='container mt-2 h-50px '>
                            <div className='row g-2 mt-13 ms-16'>
                                <div
                                    className='col-6 mt-4'
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
                        {rowsData.map((item, index) => (
                            <div
                                className='container mt-0 mb-2'
                                style={{background: index % 2 === 0 ? '#F9F9F9' : ''}}
                            >
                                <div className='row g-2 ms-17'>
                                    <div
                                        className='col-4'
                                        style={{fontFamily: 'Manrope', fontSize: '14px'}}
                                    >
                                        <label
                                            className='d-flex w-150px flex-row  h-50px'
                                            style={{
                                                background: '#EEEEEE',
                                                borderRadius: '6px',
                                                color: '#424242',
                                            }}
                                        >
                                            <select
                                                style={{
                                                    fontWeight: '800',
                                                    fontSize: '14px',
                                                }}
                                                name='cost_center_id'
                                                data-control='select2'
                                                data-hide-search='true'
                                                className='form-select form-select-black form-select-sm bg-cmGrey200 cursor-pointer'
                                                onChange={(e) => handleDeduction(e, index)}
                                            >
                                                <option selected disabled>
                                                    {item.costcenter.name}
                                                </option>
                                                {list.map((item) => (
                                                    <option value={item.id}> {item.name}</option>
                                                ))}
                                            </select>
                                        </label>
                                    </div>
                                    <div
                                        className='col ms-sm-7'
                                        style={{fontFamily: 'Manrope', fontSize: '14px'}}
                                    >
                                        <label
                                            className='d-flex flex-row  h-50px'
                                            style={{
                                                background: '',
                                                width: '78%',
                                                borderRadius: '10px',
                                                color: '#424242',
                                            }}
                                        >
                                            <label
                                                className='mt-5 me-2 d-flex flex-row'
                                                style={{fontFamily: 'Manrope #0D1821'}}
                                            >
                                                {item.deduction_type}{' '}
                                                <i
                                                    className='bi bi-exclamation-circle ms-1 mt-1 '
                                                    style={{color: '#616161'}}
                                                ></i>
                                            </label>
                                            <CustomInput
                                                type={INPUT_TYPE.number}
                                                onChange={(e) => handleDeduction(e, index)}
                                                name='ammount_par_paycheck'
                                                value={item.ammount_par_paycheck}
                                            />
                                            <i
                                                onClick={() => handleremove(item.id)}
                                                className='bi bi-x-circle p-3 mt-1'
                                                style={{
                                                    fontSize: '22px',
                                                    cursor: 'pointer',
                                                    color: '#616161',
                                                }}
                                            ></i>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className='d-flex mt-3 ms-17'>
                            <ul
                                style={{
                                    fontFamily: 'Manrope',
                                    color: '#6078EC                  ',
                                    fontWeight: '400',
                                    fontStyle: 'SemiBold',
                                    textDecoration: 'underline',
                                    fontSize: '16px',
                                    cursor: 'pointer',
                                }}
                                className='ms-4 nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent  flex-nowrap'
                            >
                                <li className='nav-item d-flex' onClick={() => handleAdd()}>
                                    <div
                                        style={{
                                            color: '#6078EC                      ',
                                            width: '15px',
                                            height: '15px',
                                            border: '1px solid #6078EC                  ',
                                        }}
                                        className='d-flex text-center align-item-center justify-content-center'
                                    >
                                        <b style={{marginTop: '-5px'}}>+</b>
                                    </div>
                                    <li
                                        className='ms-2'
                                        style={{
                                            color: '#6078EC  ',
                                            fontSize: '14px',
                                            textDecoration: '#6078EC                  ',
                                            padding: '0px',
                                            marginTop: '-3px',
                                        }}
                                    >
                                        Add Another
                                    </li>
                                </li>
                            </ul>
                        </div>
                        <div style={{background: '#F9F9F9'}} className='container h-50px '>
                            <div className='row g-2 mt-12 ms-16'>
                                <div
                                    className='col-5 mt-4'
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
                                    style={{fontFamily: 'Manrope', fontSize: '14px'}}
                                >
                                    <label
                                        style={{
                                            fontSize: '16px',
                                            fontFamily: 'Manrope',
                                            color: '#212121',
                                        }}
                                    >
                                        <label
                                            style={{
                                                fontSize: '16px',
                                                marginLeft: '-10px',

                                                marginTop: '-8px',
                                                fontFamily: 'Manrope',
                                                color: '#212121',
                                            }}
                                            className='d-flex flex-row'
                                        >
                                            {' '}
                                            <label
                                                className='mt-3 me-2 d-flex flex-row'
                                                style={{fontFamily: 'Manrope #0D1821'}}
                                            >
                                                {position.limit_type}
                                                <i
                                                    className='bi bi-exclamation-circle ms-1 mt-2 '
                                                    style={{color: '#616161'}}
                                                ></i>
                                            </label>{' '}
                                            <CustomInput
                                                onChange={(e) =>
                                                    setPosition({
                                                        ...position,
                                                        limit_ammount: e.target.value,
                                                    })
                                                }
                                                value={position.limit_ammount}
                                            />
                                            {/* 50% */}
                                            <label
                                                className='d-flex flex-row ms-3'
                                                style={{
                                                    marginTop: '-0px',
                                                    borderRadius: '6px',
                                                    width: '56%',
                                                    height: '40px',
                                                    fontFamily: 'Manrope',
                                                }}
                                            >
                                                <select
                                                    style={{
                                                        fontWeight: '800px',
                                                        color: '#424242',
                                                        fontSize: '14px',
                                                    }}
                                                    onChange={(e) =>
                                                        setPosition({
                                                            ...position,
                                                            limit: e.target.value,
                                                        })
                                                    }
                                                    name='limit'
                                                    data-control='select2'
                                                    data-hide-search='true'
                                                    className='form-select form-select-black form-select-sm bg-cmGrey200 cursror-pointer'
                                                    defaultValue='1'
                                                >
                                                    <option selected hidden>
                                                        {position.limit}
                                                    </option>
                                                    <option value='Per Period'>Per Period</option>
                                                    <option value='Per Sale'>Per Sale</option>
                                                </select>
                                            </label>
                                        </label>{' '}
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='container mt-2 h-50px '>
                            <div className='row g-2 mt-13 ms-16'>
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
                        <div style={{background: '#F9F9F9'}} className='container h-50px '>
                            <div className='row g-2 mt-0 ms-16'>
                                <div
                                    className='col-5 mt-4'
                                    style={{
                                        fontFamily: 'Manrope',
                                        color: '#616161                      ',
                                        fontSize: '16px',
                                    }}
                                >
                                    {override[0].overrides_type}
                                    {/* Direct: */}
                                </div>
                                <div
                                    className='col-6 mt-4'
                                    style={{fontFamily: 'Manrope', fontSize: '14px'}}
                                >
                                    <label
                                        style={{
                                            fontSize: '16px',
                                            fontFamily: 'Manrope',
                                            color: '#212121',
                                        }}
                                    >
                                        <label
                                            style={{
                                                fontSize: '16px',
                                                marginLeft: '-6px',

                                                marginTop: '-8px',
                                                fontFamily: 'Manrope',
                                                color: '#212121',
                                            }}
                                            className='d-flex flex-row'
                                        >
                                            {' '}
                                            <label
                                                className='mt-3 me-2 d-flex flex-row'
                                                style={{fontFamily: 'Manrope #0D1821'}}
                                            >
                                                ${' '}
                                            </label>{' '}
                                            <CustomInput
                                                onChange={(e) => handleOffice(e, 0)}
                                                name='override_ammount'
                                                className='p-3 h-40px w-80px'
                                                value={override[0].override_ammount}
                                            />
                                            {/* 50% */}
                                            <label
                                                className='d-flex flex-row ms-3'
                                                style={{
                                                    background: '#EEEEEE',
                                                    borderRadius: '6px',
                                                    height: '40px',
                                                    fontFamily: 'Manrope',
                                                    color: '#424242                        ',
                                                }}
                                            >
                                                <select
                                                    style={{
                                                        fontWeight: '800',
                                                        fontSize: '14px',
                                                    }}
                                                    name='override_ammount_type'
                                                    onChange={(e) => handleOffice(e, 0)}
                                                    data-control='select2'
                                                    data-hide-search='true'
                                                    className='form-select form-select-black form-select-sm w-md-125px bg-cmGrey200 cursor-pointer'
                                                    defaultValue='1'
                                                >
                                                    <option selected hidden>
                                                        {override[0].override_ammount_type}
                                                    </option>
                                                    <option value='Per KW'>Per KW</option>
                                                    <option value='Per KW'>Per KW</option>
                                                </select>
                                            </label>
                                        </label>{' '}
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='container h-50px '>
                            <div className='row g-2 mt-0 ms-16'>
                                <div
                                    className='col-5 mt-4'
                                    style={{
                                        fontFamily: 'Manrope',
                                        color: '#616161                      ',
                                        fontSize: '16px',
                                    }}
                                >
                                    {override[1].overrides_type}:
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
                                        <label
                                            style={{
                                                fontSize: '16px',
                                                marginLeft: '-6px',

                                                marginTop: '-8px',
                                                fontFamily: 'Manrope',
                                                color: '#212121',
                                            }}
                                            className='d-flex flex-row'
                                        >
                                            {' '}
                                            <label
                                                className='mt-3 me-2 d-flex flex-row'
                                                style={{fontFamily: 'Manrope #0D1821'}}
                                            >
                                                ${' '}
                                            </label>{' '}
                                            <CustomInput
                                                onChange={(e) => handleOffice(e, 1)}
                                                name='override_ammount'
                                                value={override[1].override_ammount}
                                            />
                                            {/* 50% */}
                                            <label
                                                className='d-flex flex-row ms-3'
                                                style={{
                                                    borderRadius: '6px',
                                                    height: '40px',
                                                    fontFamily: 'Manrope',
                                                }}
                                            >
                                                <select
                                                    style={{
                                                        fontWeight: '800',
                                                        color: '#424242',
                                                        fontSize: '14px',
                                                    }}
                                                    name='override_ammount_type'
                                                    onChange={(e) => handleOffice(e, 1)}
                                                    data-control='select2'
                                                    data-hide-search='true'
                                                    className='form-select form-select-black form-select-sm w-md-125px cursor-pointer bg-cmGrey200'
                                                    defaultValue='1'
                                                >
                                                    <option selected hidden>
                                                        {override[1].override_ammount_type}
                                                    </option>
                                                    <option value='Per KW'>Per KW</option>
                                                    <option value='Per KW'>Per KW</option>
                                                </select>
                                            </label>
                                        </label>{' '}
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div style={{background: '#F9F9F9'}} className='container h-50px '>
                            <div className='row g-2 mt-0 ms-16'>
                                <div
                                    className='col-5 mt-4'
                                    style={{
                                        fontFamily: 'Manrope',
                                        color: '#616161                      ',
                                        fontSize: '16px',
                                    }}
                                >
                                    {override[2].overrides_type}:
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
                                        <label
                                            style={{
                                                fontSize: '16px',
                                                marginLeft: '-6px',

                                                marginTop: '-8px',
                                                fontFamily: 'Manrope',
                                                color: '#212121',
                                            }}
                                            className='d-flex flex-row'
                                        >
                                            {' '}
                                            <label
                                                className='mt-3 me-2 d-flex flex-row'
                                                style={{fontFamily: 'Manrope #0D1821'}}
                                            >
                                                ${' '}
                                            </label>{' '}
                                            <CustomInput
                                                name='override_ammount'
                                                onChange={(e) => handleOffice(e, 2)}
                                                value={override[2].override_ammount}
                                                type={INPUT_TYPE.number}
                                            />
                                            {/* 50% */}
                                            <label
                                                className='d-flex flex-row ms-3'
                                                style={{
                                                    borderRadius: '6px',
                                                    height: '40px',
                                                    fontFamily: 'Manrope',
                                                }}
                                            >
                                                <select
                                                    style={{
                                                        fontWeight: '800',
                                                        color: '#424242',
                                                        fontSize: '14px',
                                                    }}
                                                    name='override_ammount_type'
                                                    data-control='select2'
                                                    data-hide-search='true'
                                                    className='form-select form-select-black form-select-sm w-md-125px cursor-pointer bg-cmGrey200'
                                                    defaultValue='1'
                                                    onChange={(e) => handleOffice(e, 2)}
                                                >
                                                    <option selected hidden>
                                                        {override[2].override_ammount_type}
                                                    </option>
                                                    <option value='Per KW'>Per KW</option>
                                                    <option value='Per KW'>Per KW</option>
                                                </select>
                                            </label>
                                        </label>{' '}
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='container h-50px '>
                            <div className='row g-2 mt-0 ms-16'>
                                <div
                                    className='col-5 mt-4'
                                    style={{
                                        fontFamily: 'Manrope',
                                        color: '#616161                      ',
                                        fontSize: '16px',
                                    }}
                                >
                                    Override System:
                                </div>
                                <div
                                    className='col-6 mt-4'
                                    style={{fontFamily: 'Manrope', fontSize: '14px'}}
                                >
                                    <label
                                        style={{
                                            fontSize: '16px',
                                            fontFamily: 'Manrope',
                                            color: '#212121',
                                        }}
                                    >
                                        <label
                                            className='d-flex flex-row'
                                            style={{
                                                marginTop: '-6px',
                                                borderRadius: '6px',
                                                height: '40px',
                                            }}
                                        >
                                            <select
                                                style={{
                                                    fontWeight: '800',
                                                    color: '#424242',
                                                    fontSize: '14px',
                                                }}
                                                name='status'
                                                data-control='select2'
                                                data-hide-search='true'
                                                className='form-select w-md-225px h-40px form-select-black form-select-sm cursor-pointer bg-cmGrey200'
                                                defaultValue='1'
                                                onChange={(e) =>
                                                    setPosition({
                                                        ...position,
                                                        sliding_scale: e.target.value,
                                                    })
                                                }
                                            >
                                                <option selected hidden>
                                                    {position.sliding_scale}
                                                </option>
                                                <option value='Tiered'>Tiered</option>
                                                <option value='Fixed'>Fixed</option>
                                            </select>
                                        </label>
                                    </label>
                                </div>
                            </div>
                        </div>
                        {/* Limit (Per period): */}
                    </div>
                </div>
            </div>
        </>
    )
}

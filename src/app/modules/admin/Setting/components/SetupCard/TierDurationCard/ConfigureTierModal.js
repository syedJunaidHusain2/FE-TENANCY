/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useRef, useEffect} from 'react'

import {
    defaultCreateAppData,
    ICreateAppData,
} from '../../../../../../../_metronic/partials/modals/create-app-stepper/IAppModels'
import {addTierLevelService, deleteTierService} from '../../../../../../../services/Services'
import Edit from '../../../../sequidocs/Icon/edit.png'
import CustomLoader from '../../../../../../../customComponents/customLoader/CustomLoader'
import CustomModal from '../../../../../../../customComponents/customModal/CustomModal'

const ConfigureTierModal = ({
    show,
    handleClose,
    configuredata,
    getTierLevel,
    loading,
    setLoading,
}) => {
    const [array, setArray] = useState([])

    const [id, setId] = useState('')
    const [redline_shift, setredline_shift] = useState('')
    const [installs_to, setinstalls_to] = useState()
    const [installs_from, setinstalls_from] = useState()
    const [btn, setBtn] = useState('')
    useEffect(() => {
        if (configuredata.Configure) {
            setArray(configuredata.Configure)
        }
    }, [configuredata])

    const [hasError, setHasError] = useState(false)
    const handleremove = (id) => {
        setId('')
        setinstalls_from('')
        setinstalls_to('')
        setredline_shift('')
        setId('')
        setBtn('')
        const filteredArray = array.filter((item) => item?.id !== id)
        setArray(filteredArray)
    }
    const handleEdit = (id) => {
        setId(id.id)
        setBtn(id.installs_to)
        setinstalls_to(id.installs_to)
        setredline_shift(id.redline_shift)
        setinstalls_from(id.installs_from)
    }

    const handleTo = (event) => {
        setinstalls_to(event.target.value)
    }

    const handleShift = (event) => {
        setredline_shift(event.target.value)
    }
    const handleFrom = (event) => {
        setinstalls_from(event.target.value)
    }
    const addTier = () => {
        if (id != '') {
            const index = array.findIndex((item) => item.id === id)
            array[index] = {...array[index], installs_from, installs_to, redline_shift}
            setArray([...array])
            setinstalls_from('')
            setinstalls_to('')
            setredline_shift('')
            setId('')
            setBtn('')
        } else {
            var id1 = array.length + 1
            var body = {
                id: id1,
                installs_from: installs_from,
                installs_to: installs_to,
                redline_shift: redline_shift,
            }
            array.push(body)
            setinstalls_from('')
            setinstalls_to('')
            setredline_shift('')
            setId('')
            setBtn('')
        }
    }
    const handlesave = () => {
        setLoading(true)
        var body = {tier_type_id: configuredata.id, data: array}
        addTierLevelService(body).then((res) => {
            getTierLevel()
            handleClose()
        })
    }
    const handledelet = () => {
        deleteTierService(configuredata.id).then((res) => {
            handleClose()
            getTierLevel()
        })
    }
    return (
        <CustomModal show={show} onHide={handleClose} maxWidth='1000' title={'Configure Tiers'}>
            <CustomLoader full visible={loading} />
            <div className='d-flex align-items-center justify-content-center justify-content-between ms-2 ms-9'>
                <h2
                    className='ms-2 mt-6 w-100'
                    style={{fontSize: '16px', fontFamily: 'Manrope', fontWeight: '600'}}
                >
                    <label className='d-flex align-items-center justify-content-center text-cmBlack'>
                        Configure Tiers
                    </label>
                </h2>
                {/* begin::Close */}
                <div
                    className='btn btn-sm me-4  mt-2 btn-icon btn-active-color-primary'
                    onClick={handleClose}
                >
                    <i className='bi bi-x-circle text-cmGrey700' style={{fontSize: '22px'}}></i>
                </div>
            </div>
            <div className='mt-2' style={{borderBottom: '1px solid #EFF2F5'}}></div>
            {/* <div className='modal-header '></div> */}
            <div className=''>
                <div className='modal-body py-lg-7 px-lg-10'>
                    <div className='py-lg-0 ms-sm-12 d-flex align-items-center justify-content-center'>
                        <div className='row ms-1'>
                            <div
                                className='ms-sm-20 mb-4'
                                style={{fontFamily: 'Manrope', fontSize: '16px', fontWeight: '600'}}
                            >
                                <label className='ms-sm-20'>Define Tiers1</label>
                            </div>
                            <div className='d-flex align-items-center'>
                                <div
                                    className='container d-flex align-items-center justify-content-center text-cmGrey700'
                                    style={{fontWeight: '600'}}
                                >
                                    <div className='row w-md-550px '>
                                        <div
                                            className='col-sm-4'
                                            style={{fontFamily: 'Manrope', fontSize: '14px'}}
                                        >
                                            Installs From
                                            <input
                                                type='number'
                                                style={{
                                                    borderRadius: '6px',
                                                }}
                                                onChange={(event) => handleFrom(event)}
                                                className='p-3 d-flex align-items-center w-150px h-50px mt-1 text-cmGrey800 bg-cmbg border border-cmDisabled'
                                                placeholder='Enter'
                                                value={installs_from}
                                            ></input>
                                        </div>
                                        <div
                                            className='col-sm-4'
                                            style={{fontFamily: 'Manrope', fontSize: '14px'}}
                                        >
                                            Redline Shift
                                            <input
                                                style={{
                                                    borderRadius: '6px',
                                                }}
                                                type='number'
                                                onChange={(event) => handleShift(event)}
                                                className='w-150px p-3 d-flex align-items-center h-50px mt-1 text-cmGrey800 bg-cmbg border border-cmDisabled'
                                                placeholder='Enter'
                                                value={redline_shift}
                                            ></input>
                                        </div>
                                        <div
                                            className='col-sm'
                                            style={{
                                                fontFamily: 'Manrope',
                                                fontSize: '14px',
                                                marginLeft: '-0px',
                                            }}
                                        >
                                            Installs To
                                            <input
                                                style={{
                                                    borderRadius: '6px',
                                                }}
                                                type='number'
                                                value={installs_to}
                                                onChange={(event) => handleTo(event)}
                                                className='w-150px p-3 d-flex align-items-center h-50px mt-1 text-cmGrey800 bg-cmbg border border-cmDisabled'
                                                placeholder='Enter'
                                            ></input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='d-flex align-items-center justify-content-center mt-4 mb-4'>
                <button
                    type='button'
                    className='text-white bg-cmBlue-Crayola'
                    style={{
                        height: '46px',
                        width: '164px',
                        borderRadius: '6px',
                        fontSize: '16px',
                        borderWidth: 0,
                        fontWeight: '700',
                    }}
                    onClick={() => addTier()}
                >
                    {btn === '' ? <font>Add Tier</font> : <font>Update Tier</font>}
                </button>
            </div>

            <div
                style={{}}
                className='w-100 mb-sm-20 d-flex align-items-center justify-content-center'
            >
                {array.length > 0 && (
                    <table
                        id='get'
                        className='table  mt-6 w-md-450px'
                        style={{
                            height: 'auto',
                        }}
                    >
                        <thead
                            style={{
                                fontFamily: 'Manrope',
                                fontSize: '13.84px',
                                fontWeight: '600',
                            }}
                            className='text-cmGrey900 bg-cmGrey300 '
                        >
                            <tr className='d-flex align-items-center flex-row justify-content-between me-4'>
                                <th className='d-flex align-items-center ms-4' scope='col'>
                                    Installs from
                                </th>
                                <th className='d-flex align-items-center ms-4' scope='col'>
                                    Redline Shift
                                </th>
                                <th scope='col'>Installs to</th>
                                <th scope='col'></th>
                            </tr>
                        </thead>
                        <tbody
                            className='text-cmGrey800'
                            style={{fontWeight: 600, fontSize: '16px'}}
                        >
                            {array.map((i, index) => (
                                <>
                                    {(index + 1) % 2 === 0 ? (
                                        <tr
                                            className='d-flex align-items-center flex-row justify-content-between'
                                            key={index}
                                        >
                                            <th
                                                className='d-flex align-items-center ms-7'
                                                scope='col'
                                            >
                                                {i.installs_from}
                                            </th>
                                            <th
                                                className='d-flex align-items-center ms-20'
                                                scope='col'
                                            >
                                                {i.redline_shift}
                                            </th>
                                            <th
                                                scope='col'
                                                className='d-flex align-items-center ms-20'
                                            >
                                                {i.installs_to}
                                            </th>
                                            <th
                                                scope='col'
                                                className='d-flex align-items-center me-3'
                                            >
                                                <img
                                                    src={Edit}
                                                    alt=''
                                                    style={{width: '34px', cursor: 'pointer'}}
                                                    onClick={() => handleEdit(i)}
                                                    className='me-3'
                                                />

                                                <i
                                                    className='bi bi-x-circle text-cmError'
                                                    onClick={() => handleremove(i.id)}
                                                    style={{fontSize: '18px', cursor: 'pointer'}}
                                                ></i>
                                            </th>
                                        </tr>
                                    ) : (
                                        <tr
                                            style={{background: '#F9F9F9 '}}
                                            className='d-flex align-items-center flex-row justify-content-between'
                                        >
                                            <th
                                                className='d-flex align-items-center ms-7'
                                                scope='col'
                                            >
                                                {i.installs_from}
                                            </th>
                                            <th
                                                className='d-flex align-items-center ms-20'
                                                scope='col'
                                            >
                                                {i.installs_to}
                                            </th>
                                            <th
                                                scope='col'
                                                className='d-flex align-items-center ms-20'
                                            >
                                                {i.redline_shift}
                                            </th>
                                            <th
                                                scope='col'
                                                className='d-flex align-items-center me-3'
                                            >
                                                <img
                                                    src={Edit}
                                                    alt=''
                                                    style={{width: '34px', cursor: 'pointer'}}
                                                    onClick={() => handleEdit(i)}
                                                    className='me-3'
                                                />

                                                <i
                                                    className='bi bi-x-circle text-cmError'
                                                    onClick={() => handleremove(i.id)}
                                                    style={{fontSize: '18px', cursor: 'pointer'}}
                                                ></i>
                                            </th>
                                        </tr>
                                    )}
                                </>
                            ))}
                            {/* <tr className='d-flex align-items-center flex-row justify-content-between'>
              <th className='d-flex align-items-center ms-7' scope='col'>
                0
              </th>
              <th className='d-flex align-items-center ms-20' scope='col'>
                -0.01
              </th>
              <th scope='col' className='d-flex align-items-center ms-20'>
                3.0
              </th>
              <th scope='col' className='d-flex align-items-center me-3'>
                <i
                  className='bi bi-pencil-square me-3'
                  style={{color: '#6078EC', fontSize: '18px'}}
                ></i>

                <i className='bi bi-x-circle' style={{fontSize: '18px', color: '#ED3A3A'}}></i>
              </th>
            </tr> */}
                        </tbody>
                    </table>
                )}
            </div>

            <div
                style={{marginTop: '0px'}}
                className='d-flex align-items-center justify-content-center  mb-12'
            >
                <button
                    type='button'
                    className=' me-8 text-cmError'
                    style={{
                        height: '46px',
                        width: '134px',
                        fontWeight: 700,
                        borderRadius: '6px',
                        fontSize: '16px',
                        borderWidth: 0,
                        backgroundColor: 'rgba(255, 51, 51, 0.1)',
                    }}
                    onClick={() => {
                        handledelet()
                    }}
                >
                    Cancel
                </button>
                <button
                    type='button'
                    className='text-white bg-cmBlue-Crayola'
                    style={{
                        height: '46px',
                        width: '134px',
                        fontWeight: '700',
                        borderRadius: '6px',
                        fontSize: '16px',
                        borderWidth: 0,
                    }}
                    onClick={() => handlesave()}
                >
                    Save Tier
                </button>
            </div>
        </CustomModal>
    )
}

export {ConfigureTierModal}

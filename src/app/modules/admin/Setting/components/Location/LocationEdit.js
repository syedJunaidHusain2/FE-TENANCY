/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useRef, useEffect} from 'react'
import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'
import Select from '../../Icon/select.png'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {
    addLocationService,
    deletLocationService,
    getRecuiterFilterService,
    getStateListService,
    updateLocationService,
} from '../../../../../../services/Services'
import {getCityListService} from '../../../../../../services/Services'

import {
    defaultCreateAppData,
    ICreateAppData,
} from '../../../../../../_metronic/partials/modals/create-app-stepper/IAppModels'
// import {KTSVG} from '../../../helpers'
import CustomDatePicker from '../../../../../../customComponents/customInputs/customDatePicker/CustomDatePicker'
import CustomImage from '../../../../../../customComponents/customImage/CustomImage'
import {getErrorMessageFromResponse} from '../../../../../../helpers/CommonHelpers'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import CustomModal from '../../../../../../customComponents/customModal/CustomModal'

const modalsRoot = document.getElementById('root-modals') || document.body

const LocationEdit = ({show, handleClose, data, handleClose1, getlocation, setLoader}) => {
    const stepperRef = useRef()
    const stepper = useRef()
    const [hasError, setHasError] = useState(false)
    const [selectedOption, setSelectedOption] = useState(null)
    const [statelist, setStateList] = useState([])
    const [state, setState] = useState()
    const [city, setCity] = useState()
    const [state1, setState1] = useState()
    const [city1, setCity1] = useState()
    const [partner, setPartner] = useState()
    const [min, setMin] = useState()
    const [max, setMax] = useState()
    const [standard, setStandard] = useState()
    const [marketting, setMarketting] = useState(false)
    const [markettingdeal, setMarkettingdeal] = useState({
        url: '',
        first_name: '',
        last_name: '',
        id: '',
        image: '',
    })
    const [mar, setMar] = useState('')
    useEffect(
        function () {
            getStateListService()
                .then((res) => {
                    setStateList(res.data)
                })
                .catch((e) => {
                    setStateList([])
                })
            if (data === '') {
            } else {
                setCity(data.city)
                setState(data.state)
                setStandard(data.redline_standard)
                setMin(data.redline_min)
                setMax(data.redline_max)
                setPartner(data.installation_partner)
                setMar(data.marketing_deal_name)
                setCity1(data.city_id)
                setState1(data.state_id)
                setMarkettingdeal({...markettingdeal, image: data.marketing_deal_image})
            }
        },
        [data]
    )
    const [citylist, setCityList] = useState([])
    const addLocation = () => {
        var body = {
            state_id: state1,
            city_id: city1,
            installation_partner: partner,
            redline_min: min,
            redline_standard: standard,
            redline_max: max,
            marketing_deal_person_id:
                markettingdeal.id === '' ? data.marketing_deal_person_id : markettingdeal.id,
            type: 'Branch',
            id: data.id,
        }
        updateLocationService(body)
            .then((res) => {
                setLoader(true)
                getlocation()
                handleClose()
            })
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
    }

    useEffect(function () {}, [])
    const getcitylist = (event) => {
        var id = event.target.value
        getCityListService(id)
            .then((res) => {
                setCityList(res.data)
            })
            .catch((e) => {
                setCityList([])
            })
    }
    const [filterdata, setFilterDate] = useState([])
    useEffect(function () {
        var data = 'na'
        getRecuiterFilterService(data).then((res) => {
            setFilterDate(res.data)
        })
    }, [])
    const filter = (event) => {
        getRecuiterFilterService(event.target.value).then((res) => {
            setFilterDate(res.data)
        })
    }
    const deleteLocation = () => {
        deletLocationService(data.id).then((res) => {
            handleClose()
            setLoader(true)
            getlocation()
        })
    }
    return (
        <CustomModal show={show} onHide={handleClose} title='Edit Location' maxWidth='650'>
            <div className='mt-2 border border-gray-200'></div>
            {/* <div className='modal-header '></div> */}
            <div className=''>
                <div className='modal-body  py-lg-7 px-lg-10'>
                    <div className='container d-flex justify-content-center'>
                        <div className='row w-500px'>
                            <div
                                className='col-6 text-cmGrey700'
                                style={{fontFamily: 'Manrope', fontSize: '14px', fontWeight: 600}}
                            >
                                State <label className='text-cmError'>*</label>
                                <label className='mt-1 d-flex flex-row h-50px' style={{}}>
                                    <select
                                        style={{
                                            fontWeight: '600',
                                            fontSize: '14px',
                                        }}
                                        onChange={(e) => {
                                            getcitylist(e)
                                            setState(e.target.value)
                                            setState1(e.target.value)
                                        }}
                                        name='status'
                                        data-control='select2'
                                        data-hide-search='true'
                                        className='form-select form-select-black form-select-sm text-cmGrey800 bg-cmbg cursor-pointer'
                                    >
                                        <option selected disabled hidden>
                                            {state}
                                        </option>
                                        {statelist.map((item) => (
                                            <option
                                                style={{
                                                    fontWeight: '600',
                                                }}
                                                value={item.id}
                                            >
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                <div
                                    className='text-cmGrey600 mt-2   '
                                    style={{fontSize: '12px', fontWeight: 500}}
                                >
                                    State Codes must match the state code in the CRM Data
                                </div>
                            </div>
                            <div
                                className='col-6 text-cmGrey700'
                                style={{
                                    fontFamily: 'Manrope',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                }}
                            >
                                City
                                <label className='mt-1 d-flex flex-row w-225px h-50px'>
                                    <select
                                        style={{
                                            fontWeight: '600',
                                            color: '#424242',
                                            fontSize: '14px',
                                        }}
                                        name='statu345s'
                                        data-control='sele4ct2'
                                        data-hide-search='true'
                                        className='form-select form-select-black form-select-sm text-cmGrey800 bg-cmbg cursor-pointer'
                                        onChange={(e) => {
                                            setCity1(e.target.value)
                                            setCity(e.target.value)
                                        }}
                                    >
                                        <option selected disabled hidden>
                                            {city}
                                        </option>
                                        <option>-Select City-</option>
                                        {citylist.map((item) => (
                                            <option value={item.id}>{item.name}</option>
                                        ))}
                                    </select>
                                </label>
                                {/* <input
                  onChange={(e) => setCity(e.target.value)}
                  style={{borderRadius: '6px', background: '#FAFAFA', border: '1px solid #D8D8D8'}}
                  className='w-225px  p-3 d-flex h-50px mt-1'
                  placeholder='Enter'
                ></input> */}
                            </div>
                            <div className='mt-5'>
                                <div className='form-check form-check-custom bg-white  form-check-lg'>
                                    <input
                                        className='form-check-input w-25px h-25px'
                                        type='checkbox'
                                        value=''
                                        id='flexCheckboxLg'
                                    />
                                    <label
                                        className='form-check-label text-cmGrey700'
                                        style={{fontSize: '14px'}}
                                        for='flexCheckboxLg'
                                    >
                                        Branch Location
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='container py-lg-7 px-lg-10 d-flex justify-content-center'>
                        <div className='row d-flex w-500px justify-content-center'>
                            <div
                                className='col text-cmGrey700'
                                style={{
                                    fontFamily: 'Manrope',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                }}
                            >
                                Installation Partner
                                <input
                                    onChange={(e) => setPartner(e.target.value)}
                                    style={{
                                        borderRadius: '6px',
                                        fontWeight: 600,
                                    }}
                                    value={partner}
                                    className='p-3 d-flex h-50px w-md-475px text-cmGrey800 bg-cmbg border border-cmDisabled'
                                    placeholder='Enter'
                                ></input>
                            </div>
                        </div>
                    </div>

                    <div className='py-lg-0 ms-sm-12'>
                        <div className='row ms-1'>
                            <div
                                className='text-cmGrey700'
                                style={{fontFamily: 'Manrope', fontSize: '14px', fontWeight: 600}}
                            >
                                Redline
                            </div>
                            <div
                                style={{fontFamily: 'Manrope', fontSize: '14px'}}
                                className='d-sm-flex flex-row justify-content-between w-500px'
                            >
                                <div className='d-flex flex-row mt-1'>
                                    <label
                                        className='me-2 text-cmGrey600'
                                        style={{fontWeight: 600}}
                                    >
                                        {' '}
                                        Min{' '}
                                    </label>
                                    <input
                                        type='radio'
                                        style={{marginTop: '1px'}}
                                        id='specifyColor'
                                        name='radio7'
                                        value='GFG'
                                        checked
                                        readOnly
                                    />
                                </div>

                                <div className='d-flex flex-row mt-1'>
                                    <label
                                        className='me-2 text-cmGrey600'
                                        style={{fontWeight: 600}}
                                    >
                                        Standard <label className='text-cmError'>*</label>{' '}
                                    </label>
                                    <input
                                        type='radio'
                                        style={{marginTop: '1px'}}
                                        id='specifyColor1'
                                        name='radio1'
                                        value='GFG'
                                        checked
                                        readOnly
                                    />
                                </div>

                                <div className='d-flex flex-row mt-1 me-20'>
                                    <label
                                        className='me-2 text-cmGrey600'
                                        style={{fontWeight: 600}}
                                    >
                                        Max{' '}
                                    </label>
                                    <input
                                        type='radio'
                                        style={{marginTop: '1px'}}
                                        id='specifyColor2'
                                        name='radio2'
                                        value='GFG'
                                        checked
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div
                                style={{fontFamily: 'Manrope', fontSize: '14px'}}
                                className='d-flex d-sm-flex me-sm-6 flex-row justify-content-between w-500px'
                            >
                                <div className='d-flex flex-row mt-1'>
                                    <label
                                        style={{fontSize: '16px', fontWeight: 800}}
                                        className='me-2 mt-5 text-cmGrey800 '
                                    >
                                        ${' '}
                                    </label>
                                    <input
                                        style={{
                                            borderRadius: '6px',
                                            fontWeight: 600,
                                        }}
                                        value={min}
                                        onChange={(e) => setMin(e.target.value)}
                                        className='p-3 w-100px h-50px mt-1 text-cmGrey800 bg-cmbg border border-cmDisabled'
                                        placeholder='3.65'
                                    ></input>
                                </div>

                                <div className='d-flex flex-row mt-1'>
                                    <label
                                        s
                                        style={{fontSize: '16px', fontWeight: 800}}
                                        className='me-2 mt-5 text-cmGrey800 '
                                    >
                                        ${' '}
                                    </label>
                                    <input
                                        value={standard}
                                        onChange={(e) => setStandard(e.target.value)}
                                        style={{
                                            borderRadius: '6px',
                                            fontWeight: 600,
                                        }}
                                        className='p-3 w-100px h-50px mt-1 text-cmGrey800 bg-cmbg border border-cmDisabled'
                                        placeholder='3.65'
                                    ></input>{' '}
                                </div>

                                <div className='d-flex flex-row mt-1 me-3'>
                                    <label
                                        style={{fontSize: '16px', fontWeight: 800}}
                                        className='me-2 mt-5 text-cmGrey800 '
                                    >
                                        ${' '}
                                    </label>
                                    <input
                                        onChange={(e) => setMax(e.target.value)}
                                        value={max}
                                        style={{
                                            borderRadius: '6px',
                                            fontWeight: 600,
                                        }}
                                        className='p-3 w-100px h-50px mt-1 text-cmGrey800 bg-cmbg border border-cmDisabled'
                                        placeholder='3.65'
                                    ></input>
                                </div>
                            </div>
                            <div
                                className='mt-10 d-flex align-items-center gap-5 '
                                style={{fontFamily: 'Manrope', fontSize: '14px'}}
                            >
                                <div className='text-cmGrey700' style={{fontWeight: 600}}>
                                    Effective from
                                </div>
                                <div>
                                    <CustomDatePicker isModal />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='container mt-7 d-flex justify-content-center'>
                        <div className='row w-500px'>
                            <div
                                className='col text-cmGrey700'
                                style={{fontFamily: 'Manrope', fontSize: '14px', fontWeight: 600}}
                            >
                                Marketing Deal
                                <label
                                    className='mt-1 d-flex flex-row w-475px h-50px bg-cmGrey200 rounded cursor-pointer'
                                    onClick={(e) => {
                                        setMarketting(true)
                                    }}
                                >
                                    {' '}
                                    <CustomImage
                                        src={markettingdeal.image}
                                        className='avatar mt-3 ms-3'
                                        alt=''
                                    />
                                    <div className='w-400px mt-5 ms-4'>
                                        {mar === '' ? (
                                            <>
                                                {markettingdeal.first_name}{' '}
                                                {markettingdeal.last_name}
                                            </>
                                        ) : (
                                            <>{mar}</>
                                        )}
                                    </div>
                                    {/* <select
                    style={{
                      background: '#EEEEEE',
                      fontWeight: '800px',
                      color: '#424242',
                      fontSize: '14px',
                    }}
                    name='status'
                    data-control='select2'
                    data-hide-search='true'
                    onChange={(e) => {
                      setMarketting(true)
                      setMarkettingdeal(e.target.value)
                    }}
                    className='form-select form-select-black form-select-sm'
                    defaultValue='1'
                  ></select> */}
                                </label>
                                {/* <input
                  style={{borderRadius: '6px', background: '#FAFAFA', border: '1px solid #D8D8D8'}}
                  className='w-225px p-3 d-flex h-50px mt-1'
                  placeholder='Enter'
                ></input> */}
                            </div>
                        </div>
                    </div>

                    {marketting === false ? (
                        <b></b>
                    ) : (
                        <div className='' style={{marginLeft: '-5.5%'}}>
                            <div
                                className=''
                                style={{
                                    position: 'absolute',
                                    width: '100%',
                                    background: '#EEEEEE',
                                    color: 'black',
                                }}
                            >
                                <input
                                    className='p-3 m-4'
                                    placeholder='type to Search...'
                                    type='text'
                                    onChange={(e) => filter(e)}
                                    style={{background: 'white', width: '96%', border: '#EEEEEE'}}
                                ></input>
                                <div className='ms-5  mt-3'>
                                    {filterdata.map((item) => (
                                        <div className='d-flex flex-row mb-2'>
                                            <CustomImage src={item.image} className='avatar me-3' />
                                            <div
                                                onClick={() => {
                                                    // setPhoneperKW(item.direct_per_kw)
                                                    setMarketting(false)
                                                    setMar('')
                                                    setMarkettingdeal({
                                                        url: '',
                                                        first_name: item.first_name,
                                                        last_name: item.last_name,
                                                        id: item.id,
                                                        image: item.image,
                                                    })
                                                }}
                                                className=''
                                                style={{
                                                    fontFmaily: 'Manrope ms-10 mt-5',
                                                    cursor: 'pointer',
                                                    fontSize: '14px',
                                                }}
                                            >
                                                <p className='mt-2'>
                                                    {item.first_name} {item.last_name}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className='d-flex justify-content-center mt-sm-20 mb-8'>
                <button
                    type='button'
                    className=' me-8 text-cmError bg-cmError bg-opacity-10'
                    style={{
                        height: '46px',
                        width: '134px',
                        borderRadius: '6px',
                        fontSize: '16px',
                        fontWeight: 700,
                        borderWidth: 0,
                    }}
                    onClick={deleteLocation}
                >
                    Delete
                </button>
                <button
                    type='button'
                    className='text-cmwhite bg-cmBlue-Crayola'
                    style={{
                        height: '46px',
                        width: '134px',
                        borderRadius: '6px',
                        fontSize: '16px',
                        borderWidth: 0,
                        fontWeight: 700,
                    }}
                    onClick={addLocation}
                >
                    Save
                </button>
            </div>
        </CustomModal>
    )
}

export {LocationEdit}

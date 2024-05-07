import {useEffect, useState} from 'react'
// import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import clsx from 'clsx'
import {KTSVG} from '../../../../../../_metronic/helpers'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import Pagination from '../../../sequidocs/component/Pagination'
import PerEmpTable from './PerEmpTable'
import CustomDropdown from '../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../customComponents/customInputs/customInput/CustomInput'

const PersonEmplyoeCard = () => {
    const [open, setOpen] = useState(false)
    const [config, setConfig] = useState(false)
    const [tableData, setTableData] = useState([])
    const [page, setPage] = useState(1)
    const [totalData, setTotalData] = useState(null)
    const [loader, setLoader] = useState(true)
    const [id, setid] = useState()
    const handleClose = () => {
        setOpen(false)
        setid(null)
    }
    const handleConfig = () => {
        setConfig(false)
    }
    const data = {
        page: page,
    }
    useEffect(() => {
        // getonbording()
    }, [page])
    const handleEditHire = () => {
        setOpen(false)
    }
    //   const getonbording = () => {
    //     getOnBoardingEmployeeListService(data)
    //       .then((res) => {
    //         setTableData(res?.data?.data)
    //         setTotalData(res?.data?.total)
    //       })
    //       .finally(() => {
    //         setLoader(false)
    //       })
    //   }
    return (
        <div className=''>
            <div
                className='d-sm-flex justify-content-between bg-white h-auto my-10 px-10 py-5 rounded '
                style={{fontSize: '14px', fontFamily: 'Manrope'}}
            >
                <div className='d-flex align-items-center'>
                    <div>Location</div>{' '}
                    <CustomDropdown
                        // options= {'Tennessee'}
                        value='Tennessee'
                        placeholder='Tennessee'
                        // onChange={onChangePayFrequency}
                        style={{width: '125px'}}
                        className='bg-cmwhite border border-0'
                    />
                </div>
                <div
                    href='/'
                    className={clsx('btn btn-sm btn-flex text-cmGrey600 bg-cmGrey100 ')}
                    data-kt-menu-trigger='click'
                    data-kt-menu-placement='bottom-end'
                    style={{
                        fontSize: '14px',
                        fontFamily: 'Manrope',
                        fontWeight: 600,
                        width: '98px',
                        height: '43px',
                    }}
                >
                    <i className='bi bi-funnel fs-5'></i>
                    Filter
                </div>
            </div>
            <div className={`card shadow `} style={{fontFamily: 'Manrope'}}>
                <div className='card-body shadow-none py-0 px-0 mx-0'>
                    <div
                        className='card bg-white h-auto'
                        style={{fontSize: '14px', fontFamily: 'Manrope'}}
                    >
                        <div className='w-100 mt-4 ms-sm-7 mb-3 d-flex flex-wrap justify-content-between align-items-center'>
                            {/* Search form */}
                            <div
                                style={{height: '43px', borderRadius: '20px'}}
                                className='w-md-300px mb-1 me-sm-12 mx-sm-0 mx-auto'
                                id='kt_chat_contacts_header'
                            >
                                <form
                                    className='position-relative '
                                    style={{borderRadius: '90px'}}
                                    autoComplete='off'
                                >
                                    <CustomInput type={INPUT_TYPE.search} name='search' />
                                    {/* <KTSVG
                                        path='/media/icons/duotune/general/gen021.svg'
                                        className='svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 ms-3 translate-middle-y'
                                    />

                                    <input
                                        style={{borderRadius: '10px'}}
                                        type='text'
                                        className='form-control form-control-solid px-12 text-cmGrey600 bg-cmGrey100'
                                        name='search'
                                        placeholder='Search...'
                                    /> */}
                                </form>
                            </div>

                            <div className='me-sm-20 d-sm-flex gap-5 text-center'>
                                {/* filter button */}
                                <div
                                    href='/'
                                    className={clsx(
                                        'btn btn-sm btn-flex text-cmGrey600 bg-cmGrey100 me-sm-0 me-5'
                                    )}
                                    data-kt-menu-trigger='click'
                                    data-kt-menu-placement='bottom-end'
                                    style={{
                                        fontSize: '14px',
                                        fontFamily: 'Manrope',
                                        fontWeight: 600,
                                        width: '98px',
                                        height: '43px',
                                    }}
                                >
                                    <i className='bi bi-funnel fs-5'></i>
                                    Filter
                                </div>

                                <button
                                    className={clsx(
                                        'btn btn-sm text-cmwhite bg-cmBlue-Crayola mt-sm-0 mt-5'
                                    )}
                                    onClick={() => setOpen(true)}
                                    style={{
                                        fontSize: '14px',
                                        fontFamily: 'Manrope',
                                        width: '99px',
                                        height: '43px',
                                        fontWeight: '600',
                                    }}
                                >
                                    Add New
                                </button>
                                <a className='me-0'>
                                    <button
                                        style={{
                                            fontSize: '14px',
                                            fontStyle: 'bold',
                                        }}
                                        className='btn btn-sm btn-icon mt-2 btn-bg-white btn-active-color-primary '
                                        data-kt-menu-trigger='click'
                                        data-kt-menu-placement='top-end'
                                        data-kt-menu-flip='bottom-end'
                                    >
                                        <i
                                            style={{marginTop: '-6px'}}
                                            className='bi ms-4 bi-three-dots-vertical fs-3 text-smGrey600'
                                        ></i>
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <CustomLoader full visible={loader}></CustomLoader> */}
            </div>
            <PerEmpTable />
            <Pagination setPage={setPage} page={page} totalData={totalData} />
        </div>
    )
}

export default PersonEmplyoeCard

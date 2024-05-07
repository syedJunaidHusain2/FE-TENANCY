import {useEffect, useState} from 'react'
// import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import clsx from 'clsx'
import {KTSVG} from '../../../../../_metronic/helpers'
import CustomLoader from '../../../../../customComponents/customLoader/CustomLoader'
import Pagination from '../../sequidocs/component/Pagination'
import MdTable from './MdTable'
import MdList from './MdList'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../customComponents/customInputs/customInput/CustomInput'

const MdCard = () => {
    // uselessfile
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
        <div className='d-sm-flex justify-content-between'>
            <div className='w-sm-900px '>
                <div className={`card shadow-nones `} style={{fontFamily: 'Manrope'}}>
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
                                    {/* Sort */}
                                    <div
                                        onClick={() => setConfig(true)}
                                        className={clsx('btn btn-sm bg-cmGrey100 text-cmGrey600 ')}
                                        data-kt-menu-trigger='click'
                                        data-kt-menu-placement='bottom-end'
                                        style={{
                                            fontSize: '12px',
                                            fontFamily: 'Manrope',
                                            fontWeight: 600,
                                            width: '87px',
                                            height: '40px',
                                        }}
                                    >
                                        <i className='bi bi-sort-down-alt fs-5'></i>
                                        Sort
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
                                            className='btn btn-sm btn-icon mt-2 btn-bg-white btn-active-color-primary text-smGrey600'
                                            data-kt-menu-trigger='click'
                                            data-kt-menu-placement='top-end'
                                            data-kt-menu-flip='bottom-end'
                                        >
                                            <i
                                                style={{marginTop: '-6px'}}
                                                className='bi ms-4 bi-three-dots-vertical fs-3'
                                            ></i>
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <CustomLoader full visible={loader}></CustomLoader> */}
                </div>
                <MdTable />
                <Pagination setPage={setPage} page={page} totalData={totalData} />
            </div>

            <div className='w-sm-250px mt-sm-0 mt-10'>
                <MdList />
            </div>
        </div>
    )
}

export default MdCard

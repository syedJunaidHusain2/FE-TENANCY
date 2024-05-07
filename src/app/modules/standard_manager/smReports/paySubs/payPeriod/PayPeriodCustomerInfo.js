import clsx from 'clsx'
import {KTSVG} from '../../../../../../_metronic/helpers'
import Pagination from '../../../../admin/sequidocs/component/Pagination'
import {ProgressBar} from 'react-bootstrap'
import ViewCostomer from '../../../../admin/reports/component/sales/ViewCostomer'
import PayPeriodSidemodal from './PayPeriodSidemodal'

// import ViewCostomer from './ViewCostomer'

const PayPeriodCustomerInfo = ({reportData}) => {
    return (
        <>
            <ViewCostomer />
            <div
                className={`card shadow mt-7`}
                style={{fontFamily: 'Manrope', borderRadius: '10px'}}
            >
                <div className='card-body py-0 px-0 mx-0'>
                    <div
                        className='card bg-white h-auto'
                        style={{fontSize: '14px', fontFamily: 'Manrope'}}
                    >
                        <div className='mt-4 ms-sm-7 me-sm-20 mb-3 d-sm-flex flex-wrap justify-content-between align-items-center'>
                            {/* customer info */}
                            <div
                                style={{
                                    fontFamily: 'Manrope',
                                    fontWeight: '700',
                                    fontSize: '17px',
                                }}
                                className='mx-sm-0 ps-sm-0 ps-5 text-cmGrey900'
                            >
                                Customer Info
                            </div>

                            {/* Search form */}
                            <div
                                style={{borderRadius: '20px'}}
                                className='w-md-300px w-75 mx-sm-0 mx-auto mb-1'
                            >
                                <form
                                    className='position-relative'
                                    style={{borderRadius: '90px'}}
                                    autoComplete='off'
                                >
                                    <KTSVG
                                        path='/media/icons/duotune/general/gen021.svg'
                                        className='svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 ms-3 translate-middle-y'
                                    />

                                    <input
                                        style={{borderRadius: '10px', fontWeight: '600'}}
                                        type='text'
                                        className='form-control form-control-solid px-12 bg-cmGrey100 text-cmGrey600'
                                        name='search'
                                        placeholder='Search...'
                                    />
                                </form>
                            </div>

                            {/* <div className='me-sm-20'>
                <a
                  href='/'
                  className={clsx('btn btn-sm btn-flex fw-bold bg-cmGrey100 text-cmGrey600 me-10')}
                  data-kt-menu-trigger='click'
                  data-kt-menu-placement='bottom-end'
                  style={{
                    fontSize: '14px',
                    fontFamily: 'Manrope',
                    width: '99px',
                    height: '43px',
                    fontWeight: '600',
                  }}
                >
                  <KTSVG
                    path='/media/icons/duotune/general/gen031.svg'
                    className='me-3 svg-icon-6 svg-icon-muted me-1'
                  />
                  Filter
                </a>

                <a className='me-0'>
                  <button
                    className='btn btn-sm btn-icon mt-2 btn-bg-white btn-active-color-primary'
                    data-kt-menu-trigger='click'
                    data-kt-menu-placement='top-end'
                    data-kt-menu-flip='bottom-end'
                  >
                    <i
                      style={{marginTop: '-6px'}}
                      className='bi ms-4 bi-three-dots-vertical text-cmGrey600 fs-1'
                    ></i>
                  </button>
                </a>
              </div> */}
                        </div>
                    </div>
                    <div className='table-responsive shadow-none overflow-auto'>
                        <table className='table'>
                            <thead>
                                <tr
                                    className=' text-cmGrey800 bg-cmGrey300 text-center'
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: '800',
                                        fontFamily: 'Manrope',
                                    }}
                                >
                                    <th className='w-auto py-3'>PID</th>

                                    <th className='w-auto py-3'>Customer</th>
                                    <th className='w-auto py-3'>State</th>

                                    <th className='w-auto py-3'>Setter</th>
                                    <th className='w-auto py-3'>KW</th>
                                    <th className='w-auto py-3 text-nowrap'>Net EPC</th>
                                    <th className='w-auto py-3'>Cancel</th>
                                    <th className='w-auto py-3'>M1</th>
                                    <th className='w-auto py-3'>M2</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    className=' text-cmGrey700 text-center'
                                    style={{
                                        fontWeight: '500',
                                        fontSize: '14px',
                                        fontFamily: 'Manrope',
                                    }}
                                >
                                    <td className='p-5 text-cmGrey800'>TSP67701</td>

                                    <td
                                        className='p-5 text-decoration-underline'
                                        style={{fontWeight: '600', cursor: 'pointer'}}
                                        data-bs-toggle='offcanvas'
                                        data-bs-target='#offcanvasRight3'
                                        aria-controls='offcanvasRight'
                                    >
                                        Jenifer Brown
                                        {/* <div className='d-flex justify-content-center gap-2 align-items-center mt-2'>
                      <ProgressBar
                        variant='success'
                        now={40}
                        className='h-5px'
                        style={{width: '100px '}}
                      />
                      <span
                        className='text-cmGrey500 text-decoration-underline'
                        style={{fontSize: '10px', fontWeight: '500'}}
                      >
                        20%
                      </span>
                    </div> */}
                                    </td>

                                    <td className='p-5'>SD</td>

                                    <td className='p-5'>Brooklyn Simmons</td>

                                    <td className='p-5'>4.23</td>

                                    <td className='p-5'>9.520</td>

                                    <td className='p-5 text-cmError'>11/11/2020</td>
                                    <td className='p-5'>
                                        <span
                                            className='text-cmGrey800 me-4'
                                            style={{fontWeight: '600'}}
                                        >
                                            $475.22
                                        </span>
                                        <span>11/11/2020</span>
                                    </td>

                                    <td className='p-5'>
                                        <span
                                            className='text-cmGrey800 me-4'
                                            style={{fontWeight: '600'}}
                                        >
                                            $475.22
                                        </span>
                                        <span>11/11/2020</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <PayPeriodSidemodal />
        </>
    )
}

export default PayPeriodCustomerInfo

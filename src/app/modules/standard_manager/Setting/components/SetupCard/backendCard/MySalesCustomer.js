import {useState, useEffect} from 'react'
import Pagination from '../../../../../../../app/modules/admin/sequidocs/component/Pagination'
import CustomLoader from '../../../../../../../customComponents/customLoader/CustomLoader'

import {formattedNumberFields} from '../../../../../../../helpers/CommonHelpers'
import ViewCostomer from '../../../../../admin/reports/component/sales/ViewCostomer'
import RedirectToEmployeeProfile from '../../../../../../../customComponents/redirectToEmployeeProfile/RedirectToEmployeeProfile'
import {AddRepPopup} from '../../../../../admin/reports/component/sales/AddRepPopup'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomCheckbox from '../../../../../../../customComponents/customCheckbox/CustomCheckbox'
import {getValidDate} from '../../../../../../../constants/constants'
import {CustomSortSvg} from '../../../../../../../_metronic/helpers/components/CustomSortSVG'

let CheckBoxTitle = [
    {name: 'Closed', isChecked: false},
    {name: 'M1', isChecked: false},
    {name: 'M2', isChecked: false},
]
const MySalesCustomer = ({
    reportData,
    onSearchChange,
    loading,
    onPageChange,
    activePage,
    headerFilterChnage,
    getSaleData,
    onPress,
    sortValue,
    sortingOrder,
}) => {
    const [open, setOpen] = useState(false)
    const [btn, setBtn] = useState(false)
    const [tableData, setTableData] = useState(null)
    const [search, setSearch] = useState('')
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedId, setSelectedId] = useState(null)
    const [addRepOpen, setAddRepOpen] = useState(false)
    const [selectedSaleData, setSelectedSaleData] = useState(null)

    useEffect(() => {
        setTableData(reportData)
    })
    const handleSearchChange = (e) => {
        setSearch(e.target.value)
        onSearchChange(e.target.value)
    }
    const headerFilterChange = (e) => {
        CheckBoxTitle = CheckBoxTitle.map((el) =>
            el.name === e?.target?.value ? {...el, isChecked: !el.isChecked} : el
        )
        headerFilterChnage(e?.target?.value, e?.target?.checked)
    }

    return (
        <>
            <div className={`card shadow`} style={{fontFamily: 'Manrope', borderRadius: '10px'}}>
                <CustomLoader full visible={loading} />
                <div className='card-body py-0 px-0 mx-0'>
                    <div
                        className='card bg-white'
                        style={{fontSize: '14px', fontFamily: 'Manrope'}}
                    >
                        <div className='w-100 mt-4 ms-sm-7 mb-3 d-sm-flex flex-wrap justify-content-between align-items-center'>
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
                            <div className='d-flex gap-10 flex-wrap align-items-center'>
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
                                        {/* Customer Info table Search Input */}
                                        <CustomInput
                                            type={INPUT_TYPE.search}
                                            name='search'
                                            onChange={handleSearchChange}
                                            value={search}
                                        />
                                        {/* <KTSVG
                                            path='/media/icons/duotune/general/gen021.svg'
                                            className='svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 ms-3 translate-middle-y'
                                        />

                                        <input
                                            style={{borderRadius: '10px', fontWeight: '600'}}
                                            type='text'
                                            className='form-control form-control-solid px-12 bg-cmGrey100 text-cmGrey600'
                                            name='search'
                                            placeholder='Search...'
                                            onChange={handleSearchChange}
                                            value={search}
                                        /> */}
                                    </form>
                                </div>
                            </div>
                            <div className='d-flex gap-10 flex-wrap align-items-center '>
                                <div
                                    style={{borderRadius: '20px'}}
                                    className='w-md-300px w-75 mx-sm-0 mx-auto mb-1'
                                >
                                    <form
                                        className='d-flex gap-6'
                                        style={{borderRadius: '90px'}}
                                        autoComplete='off'
                                    >
                                        {CheckBoxTitle?.map((item, index) => (
                                            <div
                                                className=' gap-2 d-flex align-items-center'
                                                key={item?.name}
                                            >
                                                <CustomCheckbox
                                                    onChange={headerFilterChange}
                                                    value={item?.name}
                                                    checked={item.isChecked ? true : false}
                                                />
                                                {/* <input
                                                    style={{width: '15px', height: '15px'}}
                                                    className='cursor-pointer'
                                                    type='checkbox'
                                                    //   checked={permission.checked}
                                                    onChange={headerFilterChange}
                                                    value={item?.name}
                                                /> */}
                                                <label className='form-check-label text-cmGrey700'>
                                                    {item.name}
                                                </label>
                                            </div>
                                        ))}
                                    </form>
                                </div>
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
                                    className=' text-cmGrey800 bg-cmGrey300'
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: '800',
                                        fontFamily: 'Manrope',
                                    }}
                                >
                                    <th className='w-auto p-5'>PID</th>
                                    <th className='w-auto p-5'>Customer</th>
                                    <th className='w-auto p-5'>State</th>
                                    <th className='w-auto p-5'>Setter </th>
                                    <th className='w-auto p-5'>Closer</th>
                                    <th className='w-auto p-5 text-nowrap'>
                                        <div className='d-flex'>
                                            Net EPC
                                            <CustomSortSvg
                                                sortingOrder={
                                                    sortValue === 'net_epc' ? sortingOrder : null
                                                }
                                                onClick={() => onPress('net_epc')}
                                            />
                                        </div>
                                    </th>
                                    <th className='w-auto p-5'>
                                        <div className='d-flex'>
                                            KW
                                            <CustomSortSvg
                                                sortingOrder={
                                                    sortValue === 'kw' ? sortingOrder : null
                                                }
                                                onClick={() => onPress('kw')}
                                            />
                                        </div>
                                    </th>
                                    <th className='w-auto p-5'>Cancel</th>
                                    <th className='w-auto p-5'>
                                        <div className='d-flex'>
                                            M1
                                            <CustomSortSvg
                                                sortingOrder={
                                                    sortValue === 'm1' ? sortingOrder : null
                                                }
                                                onClick={() => onPress('m1')}
                                            />
                                        </div>
                                    </th>
                                    <th className='w-auto p-5'>
                                        <div className='d-flex'>
                                            M2
                                            <CustomSortSvg
                                                sortingOrder={
                                                    sortValue === 'm2' ? sortingOrder : null
                                                }
                                                onClick={() => onPress('m2')}
                                            />
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData?.data?.length > 0 ? (
                                    <>
                                        {tableData.data?.map((item, i) => {
                                            return (
                                                <tr
                                                    key={item?.pid}
                                                    className={`text-cmGrey700 ${
                                                        (i + 1) % 2 === 0 ? 'bg-cmGrey100' : ''
                                                    }`}
                                                    style={{
                                                        fontWeight: '500',
                                                        fontSize: '14px',
                                                        fontFamily: 'Manrope',
                                                    }}
                                                >
                                                    <td className='p-5 text-cmGrey800'>
                                                        {item?.pid}
                                                    </td>

                                                    <td
                                                        className='p-5 text-decoration-underline engage-demos-toggle cursor-pointer'
                                                        id='kt_engage_demos_toggle2'
                                                        data-bs-placement='left'
                                                        data-bs-dismiss='click'
                                                        data-bs-trigger='hover'
                                                        style={{fontWeight: '600'}}
                                                        onClick={() => {
                                                            setModalOpen(true)
                                                            setSelectedId({
                                                                id: item?.pid,
                                                                name: item?.customer_name,
                                                            })
                                                        }}
                                                    >
                                                        {item?.customer_name}
                                                    </td>

                                                    <td className='p-5'>{item?.state}</td>
                                                    <td className='p-5 cursor-pointer '>
                                                        {
                                                            <RedirectToEmployeeProfile
                                                                employeeId={item?.setter_id}
                                                            >
                                                                {item?.setter}
                                                            </RedirectToEmployeeProfile>
                                                        }
                                                        {!item?.setter && (
                                                            <a
                                                                className='cursor-pointer text-decoration-underline text-cmBlue-Crayola'
                                                                onClick={() => {
                                                                    setSelectedSaleData(item)
                                                                    setAddRepOpen(true)
                                                                }}
                                                            >
                                                                Add Rep
                                                            </a>
                                                        )}
                                                    </td>
                                                    <td className='p-5 cursor-pointer'>
                                                        <RedirectToEmployeeProfile
                                                            employeeId={item?.closer_id}
                                                        >
                                                            {item?.closer ?? '-'}
                                                        </RedirectToEmployeeProfile>
                                                    </td>

                                                    <td className='p-5'>
                                                        {formattedNumberFields(item?.net_epc, '')}
                                                    </td>

                                                    <td className='p-5'>
                                                        {formattedNumberFields(item?.kw, '')}
                                                    </td>

                                                    <td className='p-5 text-cmError'>
                                                        {item?.date_cancelled ?? '-'}
                                                    </td>

                                                    <td className='p-5'>
                                                        <span
                                                            className={
                                                                Number(item?.m1_amount ?? 0) < 0
                                                                    ? 'bi bi-exclamation-triangle text-cmError me-2'
                                                                    : ''
                                                            }
                                                        ></span>
                                                        <b>
                                                            {formattedNumberFields(
                                                                item?.m1_amount
                                                            ) ?? '0'}
                                                        </b>{' '}
                                                        | {getValidDate(item?.m1_date) ?? '-'}{' '}
                                                    </td>
                                                    <td className='p-5'>
                                                        <span
                                                            className={
                                                                Number(item?.m2_amount ?? 0) < 0
                                                                    ? 'bi bi-exclamation-triangle text-cmError me-2'
                                                                    : ''
                                                            }
                                                        ></span>
                                                        <b>
                                                            {formattedNumberFields(
                                                                item?.m2_amount
                                                            ) ?? '0'}
                                                        </b>{' '}
                                                        | {getValidDate(item?.m2_date) ?? '-'}
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </>
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={15}
                                            style={{
                                                textAlign: 'center',
                                                fontFamily: 'Manrope',
                                                fontWeight: '500',
                                                fontSize: 14,
                                                paddingTop: 20,
                                                paddingBottom: 20,
                                            }}
                                        >
                                            No data found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {tableData?.data?.length > 0 ? (
                            <Pagination
                                page={activePage && activePage}
                                totalPages={tableData?.last_page}
                                setPage={(changedPage) => onPageChange(changedPage)}
                            />
                        ) : null}
                    </div>
                </div>
            </div>
            <ViewCostomer open={modalOpen} onClose={() => setModalOpen(false)} id={selectedId} />
            <AddRepPopup
                show={addRepOpen}
                handleClose={() => setAddRepOpen(false)}
                // type={cstype}
                csObj={selectedSaleData}
                getSaleData={getSaleData}
                // closerSetterList={{closer: closerDropList, setter: setterDropList}}
            />
        </>
    )
}

export default MySalesCustomer

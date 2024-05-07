/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import {KTSVG} from '../../../helpers'
import Select from '../../../../app/modules/admin/Setting/Icon/select.png'
import Menu from '../../../../app/modules/admin/Setting/Icon/shape.png'
import {EditCostModal} from '../../../../app/modules/admin/Setting/components/CostCenter/EditCostModal'
import {getCostCenterListbyIDService, getCostCenterListService} from '../../../../services/Services'
import axios from 'axios'
import CustomArrow, {ARROW_DIRECTION} from '../../../../customComponents/customIcons/CustomIcons'

export const CommonRowForCostCenter = ({
    item,
    setShowChild = () => {},
    showChild = false,
    onEditPress = () => {},
    Showbutton,
    setData,
}) => (
    <tr>
        <td></td>
        <td>
            <div className=' ms-14 form-check form-check-sm form-check-custom form-check-solid'>
                {/* <input className='form-check-input widget-13-check' type='checkbox' value='1' /> */}
            </div>
        </td>
        <td className='p-4 ' style={{color: '#424242', fontSize: '14px', fontStyle: 'Medium'}}>
            {item?.name}{' '}
            {Showbutton && (
                <CustomArrow
                    arrowDirection={!showChild ? ARROW_DIRECTION.right : ARROW_DIRECTION.down}
                    onClick={() => setShowChild(!showChild)}
                />
            )}
        </td>
        <td
            className='p-4'
            style={{
                color: '#9E9E9E',
                fontWeight: '400',
                fontSize: '14px',
                fontStyle: 'Medium',
            }}
        >
            {item?.sub_costCenter_count}
        </td>
        <td className='p-4'> {item?.code}</td>
        <td
            className='p-4'
            style={{
                color: '#9E9E9E',
                fontWeight: '400',
                fontSize: '14px',
                fontStyle: 'Medium',
            }}
        >
            {item?.description}
        </td>
        {item?.status == 1 && <td>Active</td>}
        {item?.status == 0 && <td>Inactive</td>}

        <td>
            {' '}
            <button
                className=' btn btn-sm btn-icon  btn-bg-light btn-active-color-primary'
                data-kt-menu-trigger='click'
                data-kt-menu-placement='bottom-end'
                data-kt-menu-flip='top-end'
                onClick={() => {
                    onEditPress()
                    setData(item)
                }}
            >
                <img
                    style={{width: '14px'}}
                    src='https://img.icons8.com/ultraviolet/40/null/pencil--v1.png'
                />
                {/* <i className='bi bi-three-dots fs-3'></i> */}
            </button>
        </td>
    </tr>
)

export const CostCenterTableRow = ({item, onEditPress, setData}) => {
    const [showChild, setShowChild] = useState(false)
    const [childCostCenterData, setChildCostCenterData] = useState([])
    const [childLoading, setChildLoading] = useState(true)
    useEffect(() => {
        if (showChild) {
            getCostCenterListbyIDService(item?.id).then((res) => {
                setChildCostCenterData(res?.costCenter)
                setChildLoading(false)
            })
        }
    }, [showChild])

    return (
        <>
            <CommonRowForCostCenter
                key={item?.id}
                item={item}
                showChild={showChild}
                setShowChild={setShowChild}
                onEditPress={onEditPress}
                Showbutton={true}
                setData={setData}
            />
            {/* {childLoading && childCostCenterData.id && (
        <div className='m-15'>
          <span className='spinner-border text-dark'></span>
        </div>
      )} */}
            {showChild &&
                !childLoading &&
                (childCostCenterData.id ? (
                    <CommonRowForCostCenter item={childCostCenterData} />
                ) : (
                    <p>No Data Found</p>
                ))}
        </>
    )
}

const CostCenterTabel = ({className, reload}) => {
    const [open, setOpen] = useState(false)
    const [tableData, setTableData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState('')
    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        getCostCenterListService()
            .then((res) => {
                setTableData(res.costCenters)
                setIsLoading(false)
            })
            .catch((error) => {})
    }, [reload])
    return (
        <>
            <div className={`card  ${className}`}>
                {/* begin::Header */}
                <div className='card-body py-0 px-0 mx-0' style={{marginTop: '-5px'}}>
                    {/* begin::Table container */}
                    <div className='table-responsive'>
                        {/* begin::Table */}

                        <table
                            style={{height: '50px'}}
                            className='table table-row-bordered table-row-gray-100 gs-0 gy-3'
                        >
                            {/* begin::Table head */}
                            <thead>
                                <tr
                                    className='text-muted'
                                    style={{
                                        background: '#EEEEEE',
                                        color: '#424242',
                                        height: '48px',
                                        fontSize: '14px',
                                        fontFamily: 'Manrope',
                                    }}
                                >
                                    <th></th>
                                    <th className='w-25px'>
                                        <div className='form-check form-check-sm form-check-custom form-check-solid'>
                                            <input
                                                className='form-check-input'
                                                type='checkbox'
                                                value='1'
                                                data-kt-check='true'
                                                data-kt-check-target='.widget-13-check'
                                            />
                                        </div>
                                    </th>
                                    {/* <th className='min-w-150px'>Order Id</th> */}
                                    <th className='min-w-140px p-5' style={{color: '#424242'}}>
                                        Name
                                    </th>
                                    <th className='min-w-120px p-5' style={{color: '#424242'}}>
                                        Sub Centers
                                    </th>
                                    <th className='min-w-120px p-5' style={{color: '#424242'}}>
                                        Code
                                    </th>
                                    <th className='min-w-120px p-5' style={{color: '#424242'}}>
                                        Description
                                    </th>
                                    <th className='min-w-140px p-5' style={{color: '#424242'}}>
                                        Status{' '}
                                    </th>
                                    {/* <th className='min-w-100px' style={{color: '#212121'}}>
                  People
                </th> */}
                                    <th className='min-w-120px'></th>
                                    <th className='min-w-140px'></th>
                                </tr>
                            </thead>
                            {/* end::Table head */}
                            {/* begin::Table body */}
                            {isLoading && (
                                <div className='m-10'>
                                    <span className='spinner-border text-dark'></span>
                                </div>
                            )}
                            {!isLoading && (
                                <tbody>
                                    {tableData.map((item, index) => (
                                        <CostCenterTableRow
                                            key={item?.id}
                                            item={item}
                                            onEditPress={() => setOpen(true)}
                                            setData={setData}
                                        />
                                    ))}
                                </tbody>
                            )}

                            {/* end::Table body */}
                        </table>
                        {/* end::Table */}
                    </div>
                    {/* end::Table container */}
                </div>
                {/* begin::Body */}
            </div>
            <EditCostModal show={open} handleClose={handleClose} data={data} />
        </>
    )
}

export {CostCenterTabel}

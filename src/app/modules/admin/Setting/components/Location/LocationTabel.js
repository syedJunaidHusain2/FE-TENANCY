/* eslint-disable jsx-a11y/anchor-is-valid */
import NoDataImg from '../../../customImages/NoDataImg.png'
import Menu from '../../Icon/shape.png'
import Pagination from '../../../sequidocs/component/Pagination'
import AccessRights from '../../../../../../accessRights/AccessRights'
import {
    TABLE_BORDER,
    formattedNumberFields,
    formattedNumberFieldsWithoutDecimal,
    getLocationRedlineHelper,
} from '../../../../../../helpers/CommonHelpers'
import CustomDialog from '../../../../../../customComponents/customDialog/CustomDialog'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import {deleteLocationService} from '../../../../../../services/Services'
import CustomEditIcon from '../../../../../../customComponents/customIcons/CustomEditIcon'
import CustomDelete from '../../../../../../customComponents/customIcons/CustomDelete'
import {allPermissionsAccess} from '../../../../../../accessRights/useCustomAccessRights'
import {CustomSortSvg} from '../../../../../../_metronic/helpers/components/CustomSortSVG'

const LocationTabel = ({
    className,
    locationsData,
    setLocationData,
    loader,
    onEditLocation,
    ifThereIsNoLocation,
    setLoader,
    getlocation,
    handleClose1,
    totalData,
    page,
    setPage,
    sortValue,
    sortingOrder,
    onPress,
}) => {
    const deleteLocation = (id) => {
        let tempData = [...locationsData]
        tempData = tempData?.filter((item) => item?.id !== id)

        setLocationData(tempData)
        CustomToast.success('Location Deleted Successfully')

        // setLoader(true)
        deleteLocationService(id).finally((res) => {
            // getlocation()
        })
    }

    const headerStyle = {}

    return (
        <div className={`m-0 p-0`}>
            <div className='table-responsive'>
                <table className='table'>
                    <thead className={TABLE_BORDER}>
                        <tr
                            className='text-cmGrey900 bg-cmGrey300 '
                            style={{
                                fontSize: '14px',
                                fontWeight: '700',
                                fontFamily: 'Manrope',
                            }}
                        >
                            {/* <th className=''></th> */}
                            <th className='p-5 text-nowrap'>
                                <div className='d-flex'>
                                    State
                                    <CustomSortSvg
                                        sortingOrder={sortValue === 'state' ? sortingOrder : null}
                                        onClick={() => onPress('state')}
                                    />
                                </div>
                            </th>
                            <th className='p-5 text-nowrap'>General Code</th>
                            <th className=' p-5 text-nowrap'>Office Name </th>
                            <th className=' p-5 text-nowrap'>Work Site ID </th>
                            <th className=' p-5 text-nowrap'>Installer</th>
                            <th className=' p-5 text-nowrap'>
                                <div className='d-flex'>
                                    Standard Redline
                                    <CustomSortSvg
                                        sortingOrder={sortValue === 'redline' ? sortingOrder : null}
                                        onClick={() => onPress('redline')}
                                    />
                                </div>
                            </th>
                            <th className=' p-5 text-nowrap'>
                                <div className='d-flex'>
                                    People
                                    <CustomSortSvg
                                        sortingOrder={sortValue === 'people' ? sortingOrder : null}
                                        onClick={() => onPress('people')}
                                    />
                                </div>
                            </th>
                            <AccessRights
                                customCondition={
                                    allPermissionsAccess.administrator.setting.locations.edit
                                }
                            >
                                <th className='p-5'></th>
                            </AccessRights>
                        </tr>
                    </thead>

                    <tbody className={TABLE_BORDER}>
                        {locationsData?.length > 0 ? (
                            locationsData?.map((item, index) => (
                                <tr
                                    className='stripRow '
                                    key={index}
                                    style={{verticalAlign: 'baseline'}}
                                >
                                    {/* <td className=''></td> */}
                                    <td
                                        className='text-cmGrey800 p-5'
                                        style={{fontWeight: 500, fontSize: '14px'}}
                                    >
                                        {item?.state}
                                    </td>

                                    <td
                                        className=' text-cmGrey800 p-5'
                                        style={{fontWeight: 500, fontSize: '14px'}}
                                    >
                                        {item?.general_code ?? ''}
                                        {/* {item.type == 'Office' ? (
                                                    <b
                                                        style={{
                                                            fontSize: '14px',
                                                            fontWeight: '400',
                                                        }}
                                                        className='ms-3 badge bg-cmGrey200  text-cmPurple'
                                                    >
                                                        Office
                                                    </b>
                                                ) : null} */}
                                    </td>
                                    <td className='p-5'>{item?.office_name ?? '-'}</td>

                                    <td className='p-5'>
                                        {item?.work_site_id && <span className='bi bi-geo-alt' />}{' '}
                                        {item?.work_site_id ?? '-'}
                                    </td>

                                    <td className='p-5 text-cmGrey800' style={{fontWeight: 500}}>
                                        {item.installation_partner}
                                    </td>
                                    <td className=' text-cmGrey800 p-5' style={{fontWeight: 500}}>
                                        {formattedNumberFields(
                                            getLocationRedlineHelper(item)?.current
                                                ?.redline_standard,
                                            ''
                                        )}
                                    </td>
                                    <td className='p-5'>
                                        {item?.type == 'Office' && (
                                            <div className=' d-flex align-items-center '>
                                                <img className='w-10px h-6' src={Menu} alt='icon' />
                                                <b
                                                    className='ms-4 text-cmGrey500'
                                                    style={{
                                                        fontSize: '14px',
                                                        marginLeft: '5px',
                                                        fontWeight: '500',
                                                    }}
                                                >
                                                    {formattedNumberFieldsWithoutDecimal(
                                                        item?.user_count,
                                                        ''
                                                    )}
                                                </b>
                                            </div>
                                        )}
                                    </td>

                                    <AccessRights
                                        customCondition={
                                            allPermissionsAccess.administrator.setting.locations
                                                .edit
                                        }
                                    >
                                        <td className='p-5'>
                                            <div className='d-flex align-items-center gap-2'>
                                                <div className=''>
                                                    <CustomEditIcon
                                                        onClick={() => {
                                                            onEditLocation(item)
                                                        }}
                                                    />
                                                </div>
                                                <div className=''>
                                                    {Number(item?.user_count ?? 0) <= 0 &&
                                                    Number(item?.redline_sales_count ?? 0) <= 0 ? (
                                                        <CustomDelete
                                                            onClick={() => {
                                                                CustomDialog.warn(
                                                                    'Are you sure you want to delete ?',
                                                                    () => {
                                                                        deleteLocation(item?.id)
                                                                    }
                                                                )
                                                            }}
                                                        />
                                                    ) : null}
                                                </div>
                                            </div>
                                        </td>
                                    </AccessRights>
                                </tr>
                            ))
                        ) : (
                            <tr key='no-data'>
                                <td
                                    colSpan={6}
                                    style={{
                                        textAlign: 'center',
                                        fontFamily: 'Manrope',
                                        fontWeight: '500',
                                        fontSize: 14,
                                        paddingTop: 20,
                                        paddingBottom: 20,
                                    }}
                                >
                                    {ifThereIsNoLocation ? (
                                        <div className='text-center m-20'>
                                            <img src={NoDataImg} alt='' width={136} />
                                            <br />
                                            <br />
                                            <div
                                                className='text-cmGrey500'
                                                style={{
                                                    fontWeight: '600',
                                                    fontSize: '14px',
                                                }}
                                            >
                                                Locations with Redlines and Installation Partner
                                                information are displayed on this page. <br /> To
                                                add a new location, simply press the{' '}
                                                <b className='text-cmGrey600'>"Add New"</b> button.
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            className='text-cmGrey500'
                                            style={{fontWeight: '600', fontSize: '14px'}}
                                        >
                                            No location found
                                        </div>
                                    )}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {locationsData?.length ? (
                <Pagination setPage={setPage} page={page} totalPages={totalData} />
            ) : null}
        </div>
    )
}

export {LocationTabel}

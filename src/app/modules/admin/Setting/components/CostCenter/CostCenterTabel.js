import {useState} from 'react'
import {EditCostModal} from './EditCostModal'

import NoCostimg from '../../../customImages/NoCostimg.png'
import AccessRights, {
    PERMISSIONS_GROUP,
    PERMISSION_TYPE,
} from '../../../../../../accessRights/AccessRights'
import CustomEllipsis from '../../../../../../customComponents/customEllipsis/CustomEllipsis'
import {
    TABLE_BORDER,
    formattedNumberFieldsWithoutDecimal,
} from '../../../../../../helpers/CommonHelpers'
import CustomEditIcon from '../../../../../../customComponents/customIcons/CustomEditIcon'
import {allPermissionsAccess} from '../../../../../../accessRights/useCustomAccessRights'
import {fontsFamily} from '../../../../../../assets/fonts/fonts'

export const CommonRowForCostCenter = ({
    item,
    setShowChild = () => {},
    showChild = false,
    onEditPress = () => {},
    Showbutton,
    setData,
    isChild = false,
    index,
}) => (
    <tr className={` stripRow ${TABLE_BORDER}`} key={item?.id}>
        <td className='ps-10 text-start text-cmGrey800' style={{fontSize: '14px', fontWeight: 600}}>
            {isChild ? '-' : ''} {item?.name}{' '}
            {Showbutton && (
                <>
                    {item.chields.length > 0 ? (
                        <i
                            style={{fontWeight: 'bold', fontSize: '18px', marginTop: '1px'}}
                            onClick={() => setShowChild(!showChild)}
                            className={`
                ml-5 text-cmBlack ${
                    !showChild
                        ? 'bi bi-caret-right-fill fs-5 cursor-pointer ms-1 text-cmGrey800'
                        : 'bi bi-caret-down-fill fs-5 cursor-pointer ms-1 text-cmGrey800'
                }
              `}
                        ></i>
                    ) : (
                        <b></b>
                    )}
                </>
            )}
        </td>

        <td
            className='p-5 text-cmGrey500 '
            style={{
                fontWeight: '500',
                fontSize: '14px',
            }}
        >
            {formattedNumberFieldsWithoutDecimal(item?.chields?.length)}
        </td>
        <td className='text-nowrap p-5 text-cmGrey700' style={{fontWeight: 600, fontSize: '14px'}}>
            {' '}
            {item?.code}
        </td>
        <td className='p-5' style={{}}>
            <CustomEllipsis
                style={{
                    fontFamily: 'Manrope',
                    color: '#757575',
                    whiteSpace: 'nowrap',
                    fontSize: '12px',
                    width: '150px',
                }}
                text={item?.description}
            >
                {item?.description}
            </CustomEllipsis>
        </td>

        {item?.status == null && (
            <td className='text-cmGrey800 p-5' style={{fontWeight: 500, fontSize: '14px'}}>
                --
            </td>
        )}
        {item?.status == 1 && (
            <td className='text-cmGrey800 p-5' style={{fontWeight: 800, fontSize: '14px'}}>
                Active
            </td>
        )}
        {item?.status == 0 && (
            <td className='text-cmGrey800 p-5' style={{fontWeight: 800, fontSize: '14px'}}>
                Inactive
            </td>
        )}

        <AccessRights
            permission={PERMISSIONS_GROUP.administrator.setting.costTracking}
            type={PERMISSION_TYPE.edit}
        >
            <td className='px-5 text-center'>
                <CustomEditIcon
                    onClick={() => {
                        onEditPress()
                        setData(item)
                    }}
                />
            </td>
        </AccessRights>
    </tr>
)

export const CostCenterTableRow = ({item, onEditPress, setData, index}) => {
    const [showChild, setShowChild] = useState(false)

    return (
        <>
            <CommonRowForCostCenter
                key={item?.id}
                item={item}
                index={index}
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
            {showChild && item?.chields.length > 0 ? (
                <>
                    {item?.chields?.map((ite) => (
                        <CommonRowForCostCenter
                            key={ite?.id}
                            item={ite}
                            isChild={true}
                            showChild={showChild}
                            setShowChild={setShowChild}
                            onEditPress={onEditPress}
                            Showbutton={false}
                            setData={setData}
                        />
                    ))}
                </>
            ) : null}
        </>
    )
}

const CostCenterTabel = ({
    className,
    costTrackingData,
    data,
    setData,
    open,
    setOpen,
    handleClose,
    setLoader,
    getcostcenter,
}) => {
    return (
        <>
            <div className={`card  ${className}`}>
                {/* begin::Header */}
                <div className='card-body py-0 px-0 mx-0' style={{marginTop: '-5px'}}>
                    {/* begin::Table container */}
                    {
                        <div className='table-responsive'>
                            {/* begin::Table */}

                            <table className='table'>
                                {/* begin::Table head */}
                                <thead className={TABLE_BORDER}>
                                    <tr
                                        className={`${TABLE_BORDER} text-cmGrey900 bg-cmGrey300`}
                                        style={{
                                            fontSize: '14px',
                                            fontWeight: '700',
                                            fontFamily: fontsFamily.manrope,
                                        }}
                                    >
                                        {/* <th className='min-w-150px'>Order Id</th> */}
                                        <th className='w-auto p-5 ps-10 text-nowrap'>Name</th>
                                        <th className='w-auto p-5 text-nowrap'>Sub Heads</th>
                                        <th className='w-auto p-5 text-nowrap'>Code</th>
                                        <th className='w-auto p-5 text-nowrap'>Description</th>
                                        <th className='w-auto p-5 text-nowrap'>Status</th>
                                        {/* <th className='min-w-100px' style={{color: '#212121'}}>
                  
                </th> */}
                                        <AccessRights
                                            customCondition={
                                                allPermissionsAccess.administrator.setting
                                                    .costTracking.edit
                                            }
                                        >
                                            <th className='w-auto'></th>
                                        </AccessRights>
                                    </tr>
                                </thead>
                                <tbody>
                                    {costTrackingData?.data?.length > 0 ? (
                                        costTrackingData?.data?.map((item, index) => (
                                            <CostCenterTableRow
                                                key={index}
                                                item={item}
                                                index={index}
                                                onEditPress={() => setOpen(true)}
                                                setData={setData}
                                            />
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
                                                No data found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>

                                {/* end::Table body */}
                            </table>
                            {/* end::Table */}
                        </div>
                    }
                    {costTrackingData?.length === 0 ? (
                        <div className='text-center m-20'>
                            <img src={NoCostimg} alt='' width={136} />
                            <br />
                            <br />
                            <div
                                className='text-cmGrey500'
                                style={{fontWeight: '600', fontSize: '14px'}}
                            >
                                Keep track of your expenses using our cost tracking feature by
                                creating cost heads. <br /> To start a new one, simply press the
                                <b className='text-cmGrey600'>"Create New"</b> button.
                            </div>
                        </div>
                    ) : null}
                    {/* end::Table container */}
                </div>
                {/* begin::Body */}
            </div>
            {open ? (
                <EditCostModal
                    show={open}
                    handleClose={handleClose}
                    data={data}
                    setLoader={setLoader}
                    getcostcenter={getcostcenter}
                />
            ) : null}
        </>
    )
}

export default CostCenterTabel

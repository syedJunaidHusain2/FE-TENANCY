import React from 'react'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import {TABLE_BORDER} from '../../../../../../helpers/CommonHelpers'

const PermissionsPoliciesTable = ({policiesData}) => {
    const DummyData = [1, 2, 3]
    return (
        <div>
            <div className={` bg-cmwhite`} style={{position: 'relative'}}>
                {/* <CustomLoader visible={loading} full /> */}
                <div className='py-0 px-0 mx-0'>
                    <div id='get1' className='table-responsive overflow-auto'>
                        <table className='table' style={{width: '100'}}>
                            <thead className={TABLE_BORDER}>
                                <tr
                                    className=' bg-cmGrey300 text-cmGrey900  '
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        fontFamily: 'Manrope',
                                    }}
                                >
                                    {/* <th st></th> */}
                                    <th className=' p-5 text-nowrap'>ID</th>
                                    <th className=' p-5 text-nowrap text-start'>Policies</th>
                                    <th className=' p-5 text-nowrap text-start'>Permissions for</th>
                                </tr>
                            </thead>
                            <tbody className={TABLE_BORDER}>
                                {policiesData?.length > 0 ? (
                                    <>
                                        {policiesData?.map((item, index) => (
                                            <tr
                                                key={index}
                                                className={` stripRow `}
                                                style={{
                                                    fontSize: '14px',
                                                    fontFamily: 'Manrope',
                                                    fontWeight: '600',
                                                }}
                                            >
                                                <td
                                                    className='p-5 text-cmGrey800'
                                                    style={{fontWeight: '700'}}
                                                >
                                                    {item?.id}
                                                </td>

                                                <td className='p-5 text-cmGrey900'>
                                                    {item?.policies}
                                                </td>

                                                <td className='p-5 text-cmGrey900'>
                                                    {item?.permissions_for
                                                        .map((item2) => item2?.tabs)
                                                        ?.join(', ')}
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={4}
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PermissionsPoliciesTable

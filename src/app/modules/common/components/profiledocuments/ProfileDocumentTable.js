import Edit from '../../../admin/sequidocs/Icon/edit.png'
import CustomLoader from '../../../../../customComponents/customLoader/CustomLoader'
import {saveAs} from 'file-saver'
import {getServerImage} from '../../../../../helpers/CommonHelpers'
import EachDocTypeRow from '../../../employee/components/EmployeePackageSteps.js/EachDocTypeRow'

const ProfileDocumentTable = ({onSelectedModal, loading, documentData, deleteDocument, userId}) => {
    function downloadDoc(file) {
        const fileName = file?.document?.split('/')?.[1]
        saveAs(getServerImage(file?.document), fileName)
    }

    return (
        <div
            className='table-responsive shadow-sm overflow-auto bg-cmwhite '
            style={{borderRadius: '10px', position: 'relative'}}
        >
            <CustomLoader visible={loading} full />
            <table className='table text-center'>
                <thead>
                    <tr
                        className='bg-cmGrey300 text-cmGrey900'
                        style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            fontFamily: 'Manrope',
                        }}
                    >
                        {/* <th className='w-auto py-5'>Sr. No.</th>
            <th className='w-auto py-5'>Date</th>
            <th className='w-auto py-5'>Type</th>
            <th className='w-auto py-5'>Description</th>
            <th className='w-auto py-5'>Attachments</th> */}
                        <th className='w-auto p-sm-6 p-1 text-nowrap'>Type</th>
                        <th className='w-auto p-sm-6 p-1 text-nowrap'>Uploaded Date</th>
                        <th className='w-auto p-sm-6 p-1 text-nowrap'>Attachments</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/* {tableData?.data?.map((item, index) => ( */}
                    {documentData?.length > 0 ? (
                        <>
                            {documentData?.map((item) => (
                                <EachDocTypeRow item={item} userId={userId} />

                                // <tr
                                //   style={{
                                //     fontSize: '14px',
                                //     fontFamily: 'Manrope',
                                //     fontWeight: '600',
                                //   }}
                                //   // className={(index + 1) % 2 === 0 ? `text-cmGrey700 bg-cmbg` : `text-cmGrey700`}
                                //   className='bg-cmwhite'
                                // >
                                //   <td className='p-5 text-cmGrey700'>{item?.id}</td>
                                //   <td className='p-5 text-cmGrey700'>
                                //     {/* {item?.first_name} {item?.created_at} */}
                                //     {item?.created_at}
                                //   </td>
                                //   <td className='p-5 text-cmGrey900'>{item?.type} </td>

                                //   <td className='p-5 text-cmGrey800'>{item?.description}</td>

                                //   <td className='p-5 '>
                                //     {/* {item?.email} */}

                                //     {item?.document.map((doc, docIndex) => (
                                //       <>
                                //         <button
                                //           onClick={() => downloadDoc(doc)}
                                //           className=' btn btn-sm btn-icon  btn-bg-light btn-active-color-primary'
                                //           style={{marginRight: 10}}
                                //         >
                                //           <i className='bi bi-paperclip text-cmBlue-Crayola'></i>{' '}
                                //           <span>{docIndex + 1}</span>
                                //         </button>

                                //         {/* </div> */}
                                //       </>
                                //     ))}
                                //     {/* <i className='bi bi-paperclip text-cmBlue-Crayola'></i> <span>{item?.attachments}</span> */}
                                //   </td>
                                //   <td className='p-5 d-flex justify-content-evenly align-items-center'>
                                //     <span>
                                //       <button
                                //         onClick={() => onSelectedModal(item, 'edit')}
                                //         className=' btn btn-sm btn-icon  btn-bg-light btn-active-color-primary'
                                //       >
                                //         <img src={Edit} alt='' width={32} />
                                //       </button>
                                //     </span>
                                //     <span className='btn btn-sm btn-icon bg-cmError bg-opacity-10'>
                                //       <button
                                //         onClick={() => deleteDocument(item?.id)}
                                //         className=' btn btn-sm btn-icon  btn-bg-light btn-active-color-primary'
                                //       >

                                //       </button>
                                //     </span>
                                //   </td>
                                // </tr>
                            ))}
                        </>
                    ) : (
                        <tr>
                            <td
                                colSpan={5}
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
                    {/* ))} */}
                </tbody>
            </table>
        </div>
    )
}

export default ProfileDocumentTable

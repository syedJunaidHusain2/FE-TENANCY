import CustomLoader from '../../../../../../../customComponents/customLoader/CustomLoader'
import {TABLE_BORDER} from '../../../../../../../helpers/CommonHelpers'
import EachDocTypeRow from '../../../../../employee/components/EmployeePackageSteps.js/EachDocTypeRow'

const DocumentTable = ({
    employeeData,
    onSelectedModal,
    loading,
    documentData,
    deleteDocument,
    userId,
    getDocument,
}) => {
    return (
        <div
            className='table-responsive shadow-sm overflow-auto bg-cmwhite '
            style={{borderRadius: '10px', position: 'relative'}}
        >
            <CustomLoader visible={loading} full />
            <table className='table'>
                <thead className={TABLE_BORDER}>
                    <tr
                        className='bg-cmGrey300 text-cmGrey900'
                        style={{
                            fontSize: '14px',
                            fontWeight: '700',
                            fontFamily: 'Manrope',
                        }}
                    >
                        <th className='w-auto p-5 text-nowrap'>Type</th>
                        <th className='w-auto p-5 text-nowrap'>Uploaded Date</th>
                        <th className='w-auto p-5 text-nowrap'>Attachments</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className={TABLE_BORDER}>
                    {documentData?.length > 0 ? (
                        <>
                            {documentData?.map(
                                (item, index) =>
                                    (item?.document?.length > 0 || !item?.is_deleted) && (
                                        <EachDocTypeRow
                                            employeeData={employeeData}
                                            item={item}
                                            index={index}
                                            userId={userId}
                                            key={index}
                                            getDocument={getDocument}
                                        />
                                    )
                            )}
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
                </tbody>
            </table>
        </div>
    )
}

export default DocumentTable

/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useCallback} from 'react'

import {
    assignSequiDocsTemplateService,
    getRecuiterFilterService,
} from '../../../../../../services/Services'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import CustomImage from '../../../../../../customComponents/customImage/CustomImage'
import debounce from 'lodash.debounce'
import arr084 from '../../../../standard_manager/management/component/team/assets/arr084.png'
import {getErrorMessageFromResponse} from '../../../../../../helpers/CommonHelpers'
import CustomModal from '../../../../../../customComponents/customModal/CustomModal'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../customComponents/customInputs/customInput/CustomInput'

const UseModal = ({show, handleClose, selectedTemplate, handleUse, onSelectedTemplate}) => {
    const [selectedEmployees, setSelectedEmployees] = useState(null)
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState(null)
    const [teamMember, setTeamMember] = useState([])
    const [tableLoder, setTableLoader] = useState(false)

    const onSelectEmployee = useCallback(
        (value) => {
            const isExist = selectedEmployees?.find((item) => item?.id == value?.id)
            const data = [...selectedEmployees]
            if (!isExist) {
                data.push(value)
                setSelectedEmployees(data)
            }
        },
        [selectedEmployees]
    )

    // const onSeachRecruiter = useCallback(
    //   (searchText) =>
    //     new Promise((resolve) => {
    //       getRecuiterFilterService(searchText)
    //         .then((res) => {
    //           const data = res?.data?.map((item) => ({
    //             ...item,
    //             name: `${item?.first_name} ${item?.last_name}`,
    //           }))
    //           resolve(data)
    //         })
    //         .catch(() => {
    //           resolve([])
    //         })
    //     }),
    //   []
    // )

    const onRemovePress = useCallback(
        (id) => {
            const updateTeam = teamMember?.filter((item) => item?.id !== id)
            setTeamMember(updateTeam)
        },
        [teamMember]
    )

    const onClose = useCallback(() => {
        setSelectedEmployees([])
        handleClose()
    }, [handleClose])

    const onSavePress = useCallback(() => {
        const userIds = teamMember?.map((item) => item?.id)
        if (userIds?.length <= 0) return CustomToast.error('Select employee')
        else {
            const body = {
                template_id: selectedTemplate?.id,
                user_id: userIds,
            }
            setLoading(true)
            assignSequiDocsTemplateService(body)
                .then(() => {
                    CustomToast.success('Template assigned')
                    onClose()
                })
                .catch((e) => {
                    CustomToast.error(getErrorMessageFromResponse(e))
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [onClose, teamMember, selectedTemplate?.id])
    const onSeachRecruiter = useCallback(
        (searchText) =>
            new Promise((resolve) => {
                setTableLoader(true)
                getRecuiterFilterService(searchText)
                    .then((res) => {
                        const data = res?.data?.map((item) => ({
                            ...item,
                            name: `${item?.first_name} ${item?.last_name}`,
                        }))
                        setTableLoader(false)
                        setSelectedEmployees(data)
                        resolve(data)
                    })
                    .catch(() => {
                        resolve([])
                    })
            }),
        []
    )

    const onOptionPress = useCallback((item) => {
        setTeamMember((val) => [
            ...val,
            {
                first_name: item?.first_name,
                last_name: item?.last_name,
                id: item?.id,
                image: item?.image,
            },
        ])
        // setSelectedEmployee(null)
    }, [])
    const onChangeSearch = (e) => {
        delaySearch(e?.target?.value)
    }
    const delaySearch = useCallback(
        debounce((value) => {
            setSearch(value)
            onSeachRecruiter(value)
        }, 500),
        []
    )
    return (
        <CustomModal show={show} onHide={handleClose} title='Assign Templates' maxWidth='650'>
            {/* <div className='modal-header '></div> */}
            <div className=''>
                <div className=''>
                    <div
                        className='d-flex justify-content-center mb-5'
                        style={{color: '#424242', fontWeight: '600', fontSize: '16px'}}
                    >
                        Templates:{' '}
                        <label
                            className='btn ms-0 cursor-pointer'
                            style={{
                                fontWeight: '700',
                                fontSize: '14px',
                                color: '#6078EC',
                                marginTop: '-7px',
                            }}
                            onClick={() => {
                                handleUse(selectedTemplate)
                            }}
                        >
                            {selectedTemplate?.template_name}
                        </label>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <div className='row w-100'>
                            <div className='d-flex justify-content-center gap-10 w-100 overflow-auto mb-10'>
                                {teamMember?.map((item, index) => (
                                    <div key={`employee-${item?.id}`} className='text-center'>
                                        <div
                                            className='ms-16 bi bi-x-circle-fill'
                                            onClick={() => onRemovePress(item?.id)}
                                            style={{
                                                cursor: 'pointer',
                                                // marginBottom: '-20px',
                                                zIndex: '450',
                                                left: '50',
                                                fontSize: '18px',
                                                color: '#6078EC',
                                            }}
                                        />
                                        <div style={{zIndex: '50px'}}>
                                            <CustomImage
                                                src={item?.image}
                                                className='avatar'
                                                style={{width: '48px', height: '48px'}}
                                                alt=''
                                            />
                                        </div>
                                        <div
                                            style={{
                                                fontWeight: '500',
                                                fontSize: '12px',
                                                color: '#868686',
                                            }}
                                        >{`${item?.first_name} ${item?.last_name}`}</div>
                                    </div>
                                ))}
                            </div>
                            <div className='d-sm-flex justify-content-center'>
                                <div className='w-100'>
                                    <div
                                        // style={{background: '#F5F5F5', height: '43px', borderRadius: '20px'}}
                                        className='w-md-100 mb-0'
                                        id='kt_chat_contacts_header'
                                    >
                                        <CustomInput
                                            type={INPUT_TYPE.search}
                                            name='search'
                                            onChange={onChangeSearch}
                                            value={search}
                                        />
                                        {/* <input
                                            style={{background: '#EEEEEE', borderRadius: '10px'}}
                                            type='text'
                                            className='form-control form-control-solid px-12 '
                                            name='search'
                                            placeholder='Search...'
                                            onChange={onChangeSearch}
                                        /> */}
                                    </div>
                                    {search && (
                                        <div className=' h-sm-250px h-150px px-sm-5 overflow-auto'>
                                            <CustomLoader visible={tableLoder} />

                                            {selectedEmployees?.map((item) => {
                                                const isThereInTeamList = teamMember?.some(
                                                    (tItem) => tItem?.id == item?.id
                                                )
                                                return (
                                                    <div
                                                        className='d-flex my-5 bg-cmwhite cursor-pointer shadow-sm justify-content-between py-2 px-5'
                                                        style={{
                                                            backgroundColor: '#F5F5F5',
                                                            borderRadius: '10px',
                                                        }}
                                                        onClick={() => {
                                                            !isThereInTeamList &&
                                                                onOptionPress(item)
                                                        }}
                                                    >
                                                        <div className=''>
                                                            <span
                                                                style={{
                                                                    color: '#424242',
                                                                    fontWeight: '500',
                                                                    fontSize: '14px',
                                                                    fontFamily: 'Manrope',
                                                                }}
                                                            >
                                                                <CustomImage
                                                                    src={item?.image}
                                                                    className='avatar me-3'
                                                                />
                                                            </span>
                                                            <span
                                                                style={{
                                                                    fontSize: '14px',
                                                                    fontWeight: '500',
                                                                    color: '#5E6278',
                                                                }}
                                                            >
                                                                {item?.name}({' '}
                                                                {
                                                                    item?.position_detail
                                                                        ?.position_name
                                                                }{' '}
                                                                )
                                                            </span>
                                                        </div>
                                                        {isThereInTeamList && (
                                                            <div className=''>
                                                                <img
                                                                    src={arr084}
                                                                    alt=''
                                                                    className='avatar me-3'
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='d-flex justify-content-center gap-10 align-items-center mt-10'>
                                <CustomButton
                                    type='submit'
                                    buttonType={BUTTON_TYPE.primary}
                                    buttonLabel='Send Now'
                                    onClick={onSavePress}
                                />
                                <CustomButton
                                    buttonType={BUTTON_TYPE.error}
                                    buttonLabel='Close'
                                    onClick={handleClose}
                                    className={'ms-5'}
                                />
                            </div>
                            {/* button ends*/}
                        </div>
                    </div>
                </div>
            </div>
            <CustomLoader full visible={loading} />
        </CustomModal>
    )
}

export {UseModal}

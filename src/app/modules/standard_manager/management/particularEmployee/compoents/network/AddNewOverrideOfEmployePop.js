import {useState, useCallback, useMemo} from 'react'
import {
    addManualOverrideFromService,
    getRecuiterFilterService,
} from '../../../../../../../services/Services'
import CustomLoader from '../../../../../../../customComponents/customLoader/CustomLoader'
import CustomToast from '../../../../../../../customComponents/customToast/CustomToast'
import CustomImage from '../../../../../../../customComponents/customImage/CustomImage'
import debounce from 'lodash.debounce'
import arr084 from '../../../../../standard_manager/management/component/team/assets/arr084.png'
import {
    getErrorMessageFromResponse,
    isEmptyObjectValue,
    percentageLimitCheck,
} from '../../../../../../../helpers/CommonHelpers'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomModal from '../../../../../../../customComponents/customModal/CustomModal'
import CustomDropdown from '../../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomDatePicker from '../../../../../../../customComponents/customInputs/customDatePicker/CustomDatePicker'
import {OVERRIDE_TYPE, getValidDate} from '../../../../../../../constants/constants'
import useValidation from '../../../../../../../hooks/useValidation'
import {
    ADD_MANUAL_OVERRIDE,
    AddNewOverrideOfEmploye,
} from '../../../../../../../validations/validations'
import {fontsFamily} from '../../../../../../../assets/fonts/fonts'

const AddNewOverrideOfEmployePop = ({show, handleClose, employeeData, manualOverrideData}) => {
    const [selectedEmployee, setSelectedEmployee] = useState(null)
    const [overrideAmount, setOverrideAmount] = useState(null)
    const [overrideType, setOverrideType] = useState('per sale')
    const [loading, setLoading] = useState(false)
    const [teamMember, setTeamMember] = useState([])
    const [search, setSearch] = useState(null)
    const [searchVal, setSearchVal] = useState(null)
    const [effectiveDate, setEffectiveDate] = useState(null)
    const [selectedEmployees, setSelectedEmployees] = useState(null)
    const [tableLoder, setTableLoader] = useState(false)
    const [validateOverrideData, OverrideErrorData] = useValidation()
    const [addError, setAddError] = useState(ADD_MANUAL_OVERRIDE)

    const manualOverrideUsers = useMemo(() => {
        return manualOverrideData?.map((item) => item?.id)
    }, [manualOverrideData])

    const onSeachRecruiter = useCallback(
        (searchText) =>
            new Promise((resolve) => {
                setTableLoader(true)
                getRecuiterFilterService(searchText)
                    .then((res) => {
                        const filteredData = res?.data?.filter(
                            (item) => !manualOverrideUsers.includes(item?.id)
                        )
                        const data = filteredData?.map((item) => ({
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
    const validate = (body) => {
        const validationErrors = AddNewOverrideOfEmploye(body)
        setAddError(validationErrors)
        return isEmptyObjectValue(validationErrors)
    }

    const addOverride = (e) => {
        e.preventDefault()
        const userIds = teamMember?.map((item) => item?.id)

        // if (userIds?.length <= 0) return CustomToast.error('Please select a employee')
        // if (!effectiveDate) return CustomToast.error('Please select efective date')
        // if (!overrideAmount) return CustomToast.error('Please select a override amount')
        // if (!overrideType) return CustomToast.error('Please select a override type')

        let body = {
            manual_user_id: userIds,
            user_id: employeeData?.id,
            effective_date: getValidDate(effectiveDate, 'YYYY-MM-DD'),
            overrides_amount: overrideAmount,
            overrides_type: overrideType,
        }
        if (validate(body)) {
            setLoading(true)
            addManualOverrideFromService(body)
                .then(() => {
                    CustomToast.success('Added manual override')
                    handleClose()
                })
                .catch((e) => {
                    CustomToast.error(getErrorMessageFromResponse(e))
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }
    const onChangeSearch = (e) => {
        setSearchVal(e?.target?.value)
        delaySearch(e?.target?.value)
    }
    const delaySearch = useCallback(
        debounce((value) => {
            setSearch(value)
            onSeachRecruiter(value)
        }, 500),
        []
    )
    const onRemovePress = useCallback(
        (id) => {
            const updateTeam = teamMember?.filter((item) => item?.id !== id)
            setTeamMember(updateTeam)
        },
        [teamMember]
    )

    const onChangeOverridesType = (e) => {
        setOverrideAmount(null)
        setOverrideType(e.target.value)
    }

    const onChangeInputDataWithLimit = (e) => {
        if (percentageLimitCheck(100, e.target.value)) setOverrideAmount(e.target.value)
    }

    const onChnageOverrideAmount = (e) => {
        setOverrideAmount(e.target.value)
    }
    return (
        <CustomModal
            show={show}
            onHide={handleClose}
            maxWidth='500'
            title=' Add new | Manual Override'
        >
            <form onSubmit={addOverride}>
                {/* body */}
                <div
                    className='w-sm-100 mb-20 mx-sm-auto mx-5'
                    style={{fontFamily: 'Manrope', fontSize: '14px', position: 'relative'}}
                >
                    <CustomLoader full visible={loading} />

                    <div style={{zIndex: 10}}>
                        <div className='modal-body  py-lg-7'>
                            <div className='d-flex justify-content-center gap-10 mb-5 w-100 overflow-auto mx-auto'>
                                {teamMember?.map((item, index) => (
                                    <div key={`employee-${item?.id}`} className='text-center'>
                                        <div
                                            className='ms-16 bi bi-x-circle-fill'
                                            onClick={() => onRemovePress(item?.id)}
                                            style={{
                                                cursor: 'pointer',
                                                marginBottom: '-20px',
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
                            <div className='container d-flex justify-content-center'>
                                <div className='row w-sm-800px' style={{position: 'relative'}}>
                                    <div className='d-sm-flex mb-3 justify-content-center'>
                                        <div className='w-sm-325px'>
                                            <div
                                                className='text-cmGrey700 required mb-1'
                                                style={{fontWeight: '600', fontSize: '15px'}}
                                            >
                                                {' '}
                                                Override from
                                            </div>
                                            <div className='w-md-100 mb-0'>
                                                <input
                                                    autoComplete='off'
                                                    style={{
                                                        background: '#EEEEEE',
                                                        borderRadius: '10px',
                                                    }}
                                                    type='text'
                                                    className='form-control form-control-solid px-5'
                                                    name='search'
                                                    value={searchVal}
                                                    placeholder='Search...'
                                                    onChange={onChangeSearch}
                                                />
                                                {addError.manual_user_id ? (
                                                    <p
                                                        className='text-cmError'
                                                        style={{
                                                            fontSize: '12px',
                                                            fontFamily: fontsFamily.manrope,
                                                            fontWeight: 600,
                                                        }}
                                                    >
                                                        {addError.manual_user_id}
                                                    </p>
                                                ) : null}
                                            </div>
                                            {search ? (
                                                <div
                                                    className='shadow'
                                                    style={{
                                                        zIndex: 100,
                                                        position: 'absolute',
                                                        backgroundColor: 'white',
                                                        borderBottomLeftRadius: 10,
                                                        borderBottomRightRadius: 10,
                                                    }}
                                                >
                                                    <div
                                                        className=' h-150px '
                                                        style={{
                                                            overflowY: 'scroll',
                                                        }}
                                                    >
                                                        <CustomLoader visible={tableLoder} />
                                                        {search &&
                                                            selectedEmployees?.map((item) => {
                                                                const isThereInTeamList =
                                                                    teamMember?.some(
                                                                        (tItem) =>
                                                                            tItem?.id == item?.id
                                                                    )
                                                                return (
                                                                    item?.id !=
                                                                        employeeData?.id && (
                                                                        <div
                                                                            key={item?.id}
                                                                            className='d-flex my-5 mx-5 bg-cmwhite cursor-pointer shadow-sm justify-content-between py-2 px-5'
                                                                            style={{
                                                                                backgroundColor:
                                                                                    '#F5F5F5',
                                                                                borderRadius:
                                                                                    '10px',
                                                                            }}
                                                                            onClick={() => {
                                                                                !isThereInTeamList &&
                                                                                    onOptionPress(
                                                                                        item
                                                                                    )
                                                                            }}
                                                                        >
                                                                            <div className=''>
                                                                                <span
                                                                                    style={{
                                                                                        color: '#424242',
                                                                                        fontWeight:
                                                                                            '500',
                                                                                        fontSize:
                                                                                            '14px',
                                                                                        fontFamily:
                                                                                            'Manrope',
                                                                                    }}
                                                                                >
                                                                                    <CustomImage
                                                                                        src={
                                                                                            item?.image
                                                                                        }
                                                                                        className='avatar me-3'
                                                                                    />
                                                                                </span>
                                                                                <span
                                                                                    style={{
                                                                                        fontSize:
                                                                                            '14px',
                                                                                        fontWeight:
                                                                                            '500',
                                                                                        color: '#5E6278',
                                                                                    }}
                                                                                >
                                                                                    {item?.name}({' '}
                                                                                    {
                                                                                        item
                                                                                            ?.subposition_detail
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
                                                                )
                                                            })}
                                                    </div>
                                                    {search ? (
                                                        <div className='text-center mb-5 mx-5'>
                                                            <button
                                                                className='btn bg-cmBlue-Crayola text-cmwhite w-sm-250px py-2 mt-5 px-0'
                                                                style={{
                                                                    fontWeight: 700,
                                                                    fontSize: '16px',
                                                                }}
                                                                onClick={(e) => {
                                                                    setSearch('')
                                                                }}
                                                            >
                                                                Close
                                                            </button>
                                                        </div>
                                                    ) : null}
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                    {/* button ends*/}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{zIndex: -1}}>
                        <div className='d-flex gap-sm-10 gap-5 my-10 w-sm-75 mx-auto align-items-end'>
                            <div className='w-100'>
                                <div className='w-100'>
                                    <CustomDatePicker
                                        required
                                        label={'Effective date'}
                                        name='effective_date'
                                        onChange={(e) => setEffectiveDate(e?.target?.value)}
                                        value={effectiveDate}
                                        placeholder='Select / Effective Date'
                                        errorMessage={addError?.effective_date}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='d-flex gap-sm-10 gap-5 mb-10 w-sm-75 mx-auto align-items-end'>
                            <div className=''>
                                <div className=''>
                                    <CustomInput
                                        label={`Override for ${employeeData?.first_name} ${employeeData?.last_name}`}
                                        prefixText={overrideType == 'percent' ? '%' : '$'}
                                        required
                                        type={INPUT_TYPE.number}
                                        placeholder={
                                            overrideType == 'percent'
                                                ? 'Enter Percent'
                                                : 'Enter Amount'
                                        }
                                        value={overrideAmount}
                                        onChange={
                                            overrideType == 'percent'
                                                ? onChangeInputDataWithLimit
                                                : onChnageOverrideAmount
                                        }
                                        errorMessage={addError.overrides_amount}
                                    />
                                </div>
                            </div>
                            <div>
                                <CustomDropdown
                                    options={OVERRIDE_TYPE}
                                    onChange={onChangeOverridesType}
                                    value={overrideType}
                                    searching={false}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='text-center mb-10'>
                        <button
                            // type='submit'
                            className='btn bg-cmBlue-Crayola text-cmwhite w-sm-250px '
                            style={{fontWeight: 700, fontSize: '16px'}}
                            onClick={(e) => addOverride(e)}
                        >
                            Add Override
                        </button>
                    </div>
                </div>
            </form>
        </CustomModal>
    )
}

export {AddNewOverrideOfEmployePop}

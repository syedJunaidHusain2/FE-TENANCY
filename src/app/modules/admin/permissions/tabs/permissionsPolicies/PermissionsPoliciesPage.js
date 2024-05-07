import React, {useEffect, useState, useCallback} from 'react'
import {KTSVG} from '../../../../../../_metronic/helpers'
import Pagination from '../../../sequidocs/component/Pagination'
import PermissionsPoliciesTable from './PermissionsPoliciesTable'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import {getPermissionPoliciesListAction} from '../../../../../../redux/actions/PermissionsActions'
import {useSelector} from 'react-redux'
import {getPermissionsPoliciesListSelector} from '../../../../../../redux/selectors/PermissionsSelectors'
import {useDispatch} from 'react-redux'
import debounce from 'lodash.debounce'
import {getGlobalSearchData} from '../../../../../../helpers/CommonHelpers'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../customComponents/customInputs/customInput/CustomInput'

const PermissionsPoliciesPage = () => {
    const dispatch = useDispatch()
    const allPoliciesData = useSelector(getPermissionsPoliciesListSelector)
    const [policiesData, setPoliciesData] = useState(allPoliciesData)
    const [searchValue, setSearchValue] = useState('')

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setPoliciesData(allPoliciesData)
    }, [allPoliciesData])

    useEffect(() => {
        dispatch(getPermissionPoliciesListAction()).finally(() => {
            setLoading(false)
        })
    }, [])

    const handleSearchChange = (e) => {
        delaySaveToDb(e.target.value)
        setSearchValue(e.target.value)
    }
    const delaySaveToDb = useCallback(
        debounce((val) => {
            let filterData = getGlobalSearchData(policiesData, ['policies'], val)
            if (val) {
                setPoliciesData(filterData && filterData)
            } else {
                setPoliciesData(allPoliciesData)
            }
        }, 500),
        []
    )

    return (
        <div style={{position: 'relative'}}>
            <CustomLoader visible={policiesData?.length <= 0 && loading} full />{' '}
            <div
                className='bg-white'
                style={{
                    fontSize: '14px',
                    fontFamily: 'Manrope',
                    borderRadius: '0px 10px 10px 10px',
                    boxShadow:
                        'rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
                }}
            >
                <div
                    style={{borderRadius: '20px'}}
                    className=' px-5 py-5 d-flex '
                    id='kt_chat_contacts_header'
                >
                    <form
                        className='position-relative'
                        style={{borderRadius: '90px'}}
                        autoComplete='off'
                    >
                        {/* Permissions Policies Table Search Input */}
                        <CustomInput
                            type={INPUT_TYPE.search}
                            name='search'
                            onChange={handleSearchChange}
                            value={searchValue ?? ''}
                        />
                        {/* <KTSVG
                            path='/media/icons/duotune/general/gen021.svg'
                            className='svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 ms-3 translate-middle-y'
                        />
                        <input
                            style={{borderRadius: '10px'}}
                            type='text'
                            className='form-control form-control-solid px-18 bg-cmGrey100'
                            placeholder='Search...'
                            name='search'
                            onChange={handleSearchChange}
                        /> */}
                    </form>
                    <CustomLoader visible={policiesData?.length > 0 && loading} size={50} />{' '}
                </div>
                <div className='mb-5'>
                    <PermissionsPoliciesTable policiesData={policiesData} />
                </div>
            </div>
        </div>
    )
}

export default PermissionsPoliciesPage

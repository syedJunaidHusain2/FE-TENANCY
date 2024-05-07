import React, {useCallback, useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import {getDocumentTypesAction} from '../../../../../../redux/actions/SettingActions'
import {getDocumentTypessSelector} from '../../../../../../redux/selectors/SettingsSelectors'
import {
    getDocumentsListService,
    getNewDocumentsListService,
} from '../../../../../../services/Services'
import {KTSVG} from '../../../../../../_metronic/helpers'
import _ from 'lodash'

import DocumentTable from './DocumentsTable'
import CustomDropdown from '../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../customComponents/customInputs/customInput/CustomInput'
export default function Documents() {
    const dispatch = useDispatch()
    const [btn, setBtn] = useState(false)
    const [loader, setLoader] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState('')
    const [tableData, setTableData] = useState([])
    const [searchText, setSearchText] = useState(null)
    const docType = useSelector(getDocumentTypessSelector)
    const [page, setPage] = useState(1)
    const [searchVal, setSearchVal] = useState('')

    useEffect(() => {
        dispatch(getDocumentTypesAction())
    }, [])

    useEffect(() => {
        getDocumentApi()
    }, [page, searchVal])

    const getDocumentApi = useCallback(() => {
        setLoader(true)
        const body = {
            page: page,
            search_key: searchVal,
        }
        getNewDocumentsListService(body)
            .then((res) => setTableData(res?.data))
            .finally(() => setLoader(false))
    }, [page, searchVal])

    const onSearchChange = (e) => {
        setSearchText(e?.target?.value)
        searchSequiDocsTemplate(e?.target?.value)
    }
    const searchSequiDocsTemplate = useCallback(
        _.debounce((val) => {
            setSearchVal(val)
        }, 500),
        []
    )

    const handlePageChange = (val) => {
        setPage(val)
    }

    const onChangeCategoryDropDowmn = (e) => {
        setSelectedCategory(e.target.value)
    }

    return (
        <div
            style={{
                boxShadow:
                    'rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
            }}
        >
            <div
                className='bg-cmwhite card'
                style={{
                    fontSize: '14px',
                    fontFamily: 'Manrope',
                    borderRadius: '0px 10px 10px 10px',
                }}
            >
                <div className='w-100 px-8 py-5 d-flex flex-wrap gap-5 justify-content-between'>
                    <div>
                        <CustomInput
                            type={INPUT_TYPE.search}
                            name='search'
                            value={searchText ?? ''}
                            onChange={onSearchChange}
                            placeholder='Search Document'
                        />
                    </div>
                    {/* <div className=''>
                    <CustomDropdown
                            searching={false}
                            value={selectedCategory ?? ''}
                            options={docType}
                            displayKey='field_name'
                            valueKey='id'
                            placeholder='Select Category'
                            onChange={onChangeCategoryDropDowmn}
                        />
                </div> */}
                </div>
            </div>
            <DocumentTable
                className='mx-0 px-0'
                tableData={tableData}
                loading={loader}
                page={page}
                onPageChange={handlePageChange}
            />
        </div>
    )
}

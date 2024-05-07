import React, {useEffect, useState} from 'react'
import {Paginator} from 'primereact/paginator'
import CustomText from '../../../../../customComponents/customText/CustomText'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../customComponents/customInputs/customInput/CustomInput'
export default function Pagination({page = 0, setPage = () => {}, totalPages = 0}) {
    const [first, setFirst] = useState(0)
    const totalRecords = totalPages * 10

    const onPageChange = (event) => {
        setFirst(event.first)
        setPage(event.page + 1)
    }

    const handleInput = (e) => {
        setPage(e.target.value)
    }

    useEffect(() => {
        let pageVal = page * 10 - 10
        setFirst(pageVal)
    }, [page])

    return (
        <>
            {totalPages > 1 ? (
                <div className='d-flex align-items-center gap-10 justify-content-end w-sm-50 float-end'>
                    <Paginator
                        className='bg-transparent'
                        first={first}
                        rows={10}
                        totalRecords={totalRecords}
                        rowsPerPageOptions={10}
                        // template='FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink'
                        template='PrevPageLink PageLinks NextPageLink CurrentPageReport'
                        onPageChange={onPageChange}
                    />
                </div>
            ) : null}
        </>
    )
}

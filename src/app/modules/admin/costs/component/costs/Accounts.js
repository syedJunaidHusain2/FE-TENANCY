import React from 'react'
import CustomEllipsis from '../../../../../../customComponents/customEllipsis/CustomEllipsis'
export default function Accounts({accountData}) {
    const background = ['#6078EC', '#50CD89', '#FE679D', '#FFE16A', '#B076FC']
    return (
        <>
            <div className='container'>
                <div className='d-flex flex-wrap g-2 p-1'>
                    {accountData?.data?.map((item, i) => (
                        <div className='col-sm d-flex flex-row flex-wrap mt-4' key={i}>
                            <label className='ms-1 d-flex'>
                                <label
                                    className='mt-1'
                                    style={{
                                        width: '11px',
                                        height: '11px',
                                        borderRadius: '20px',
                                        background: background[i],
                                        marginRight: 5,
                                    }}
                                />

                                <CustomEllipsis
                                    style={{
                                        fontFamily: 'Manrope',
                                        color: '#757575',
                                        whiteSpace: 'nowrap',
                                        fontSize: '12px',
                                    }}
                                    text={item?.name}
                                >
                                    {item?.name}
                                    <br />
                                    <label
                                        style={{
                                            color: '#757575',
                                            opacity: 0.7,
                                        }}
                                    >
                                        ${item?.amount ?? 0}
                                    </label>
                                </CustomEllipsis>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

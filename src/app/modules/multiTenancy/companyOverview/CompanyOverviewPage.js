import React from 'react'
import {useNavigate} from 'react-router-dom'
import {KTSVG} from '../../../../_metronic/helpers'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../customComponents/customButtton/CustomButton'
import {TABLE_BORDER, formattedNumberFields} from '../../../../helpers/CommonHelpers'
import {fontsFamily} from '../../../../assets/fonts/fonts'
import Pagination from '../../admin/sequidocs/component/Pagination'
import {getValidDate} from '../../../../constants/constants'
import CustomLink from '../../../../customComponents/customButtton/CustomLink'
import CustomImage from '../../../../customComponents/customImage/CustomImage'
import CustomArrow, {ARROW_DIRECTION} from '../../../../customComponents/customIcons/CustomIcons'

const CompanyOverviewPage = () => {
    const naviagte = useNavigate()

    return (
        <div className='row container gap-10 mx-auto'>
            {/* Big body */}
            <div className='col-lg'>
                <div className='d-flex justify-content-between align-items-center gap-sm-10 gap-5 mb-10 flex-wrap'>
                    <div className='d-flex align-items-center gap-3'>
                        <div>
                            <KTSVG
                                path='/media/icons/duotune/art/back-square.svg'
                                svgClassName='h-25px w-25px cursor-pointer'
                                onClick={() => naviagte(-1)}
                            />
                        </div>
                        <div
                            className='text-cmGrey900'
                            style={{fontSize: 20.58, fontWeight: 500}}
                        >
                            Flex Power | Overview
                        </div>
                    </div>
                    <div>
                        <CustomButton buttonLabel='Edit Client' buttonSize={BUTTON_SIZE.small} />
                    </div>
                </div>
                {/* Top cards starts */}
                <div className='row gap-xxl-10 gap-5 mb-10'>
                    <div className='col-sm'>
                        <CommonTopCards
                            heading={formattedNumberFields(20678.93)}
                            content={'qweq'}
                        />
                    </div>
                    <div className='col-sm'>
                        <CommonTopCards
                            heading={formattedNumberFields(20678.93)}
                            content={'qweq'}
                        />
                    </div>
                    <div className='col-sm'>
                        <CommonTopCards
                            heading={formattedNumberFields(20678.93)}
                            content={'qweq'}
                        />
                    </div>
                    <div className='col-sm'>
                        <CommonTopCards
                            heading={formattedNumberFields(20678.93)}
                            content={'qweq'}
                        />
                    </div>
                </div>
                {/* Payment Records */}
                <div className='mb-10'>
                    <PaymentRecordsTable />
                </div>
                <div className='mb-10'>
                    <AdministrativeSetupTable />
                </div>
            </div>
            {/* side pannel */}
            <div className='col-lg-3 '>
                <div className='mb-10'>
                    <CompanyDetailCard />
                </div>
                <div className='row flex-wrap'>
                    <div className='col-sm mb-10 '>
                        <IntegartionCard />
                    </div>
                    <div className='col-sm mb-10'>
                        <ModulesCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyOverviewPage

// Inner components
const CommonTopCards = ({background, className, heading, content}) => (
    <div
        className={`card card-flush ${className} border border-dashed border-cmGrey300 border-2 px-5 py-3 shadow-sm`}
        style={{
            backgroundColor: background,
            fontFamily: fontsFamily.manrope,
        }}
    >
        <div
            className='text-cmGrey900'
            style={{fontWeight: '800', fontSize: '24px', lineHeight: '32px'}}
        >
            {heading}
        </div>
        <div
            className='text-cmGrey700'
            style={{
                fontWeight: '500',
                fontSize: '14px',
            }}
        >
            {content}
        </div>
    </div>
)
const PaymentRecordsTable = ({}) => {
    return (
        <div className='bg-cmwhite shadow-sm' style={{borderRadius: 10}}>
            <div
                className='px-sm-10 px-5 py-5 text-cmGrey800'
                style={{fontSize: 16, fontWeight: 800, lineHeight: '21.8px'}}
            >
                Payment Records
            </div>
            <div className='table-responsive'>
                <table className='table' style={{fontSize: '14px'}}>
                    <thead className={TABLE_BORDER}>
                        <tr
                            className='text-cmGrey800 bg-cmGrey300 text-nowrap'
                            style={{fontWeight: 700, lineHeight: '21px'}}
                        >
                            <td className='p-5 ps-sm-10'>Invoice no.</td>
                            <td className='p-5'>Bill Date</td>
                            <td className='p-5'>Status</td>
                            <td className='p-5'>Amount</td>
                            <td className='p-5'></td>
                        </tr>
                    </thead>
                    <tbody className='text-cmGrey600' style={{fontSize: '14px', fontWeight: 600}}>
                        <tr className={TABLE_BORDER}>
                            <td className='p-5 ps-sm-10'>267400</td>
                            <td className='p-5'>{getValidDate('08/01/2023')}</td>
                            <td className='p-5 text-cmSuccess' style={{fontWeight: 700}}>
                                Paid
                            </td>

                            <td className='p-5 text-cmGrey800' style={{fontWeight: 700}}>
                                {formattedNumberFields(12321.53)}
                            </td>

                            <td className='p-5 text-nowrap'>
                                <CustomLink label={'View Invoice'} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='pb-5 pe-5'>
                <Pagination />
            </div>
        </div>
    )
}
const AdministrativeSetupTable = ({}) => {
    return (
        <div className='bg-cmwhite shadow-sm' style={{borderRadius: 10}}>
            <div
                className='px-sm-10 px-5 py-5 text-cmGrey800 d-flex flex-wrap justify-content-between'
                style={{fontSize: 16, fontWeight: 800, lineHeight: '21.8px'}}
            >
                <div>Administrative Setup</div>
                <div
                    className='text-cm'
                    style={{fontSize: '14px', fontWeight: 500, lineHeight: '19.12px'}}
                >
                    <span
                        className='text-cmGrey900'
                        style={{fontSize: '20px', fontWeight: 800, lineHeight: '27.3px'}}
                    >
                        4
                    </span>{' '}
                    Super Admins
                </div>
            </div>
            <div className='table-responsive'>
                <table
                    className='table'
                    style={{
                        fontSize: '14px',
                        tableLayout: 'fixed',
                        verticalAlign: 'middle',
                        width: '100%',
                    }}
                >
                    <thead className={TABLE_BORDER}>
                        <tr
                            className='text-cmGrey800 bg-cmGrey300 text-nowrap'
                            style={{fontWeight: 700, lineHeight: '21px'}}
                        >
                            <td className='p-5 ps-sm-10 w-150px'>Name</td>
                            <td className='p-5 w-200px'>Email ID</td>
                            <td className='p-5 w-75px'>Actions</td>
                        </tr>
                    </thead>
                    <tbody className='text-cmGrey600' style={{fontSize: '14px', fontWeight: 600}}>
                        <tr className={TABLE_BORDER}>
                            <td className='p-5 ps-sm-10'>
                                <div className='d-flex flex-wrap align-items-center gap-3'>
                                    <CustomImage className={'w-30px h-30px'} />
                                    <div
                                        className='text-decoration-underline text-cmGrey800'
                                        style={{fontWeight: 700}}
                                    >
                                        Peter Styles
                                    </div>
                                    <div
                                        className='badge rounded-pill bg-cminfo bg-opacity-10 text-cminfo px-3'
                                        style={{fontWeight: 600, lineHeight: '21px'}}
                                    >
                                        Company Owner
                                    </div>
                                </div>
                            </td>

                            <td
                                className='p-5 text-cmGrey800'
                                style={{
                                    fontWeight: 600,
                                    wordWrap: 'break-word',
                                }}
                            >
                                Peterstyles@Flexpower.com
                            </td>

                            <td className='p-5 text-nowrap'>
                                <div className=''>
                                    <span
                                        className='bi bi-three-dots-vertical fs-2 text-cmGrey500 cursor-pointer text-hover-dark'
                                        data-bs-toggle='dropdown'
                                        aria-expanded='false'
                                        style={{
                                            width: 'fit-content',
                                        }}
                                    />
                                    <ul className='dropdown-menu' style={{fontSize: 14}}>
                                        <li
                                            className='dropdown-item cursor-pointer text-cmGrey800 border-bottom border-cmGrey200'
                                            style={{fontWeight: 600}}
                                        >
                                            Suspend access
                                        </li>
                                        <li
                                            className='dropdown-item cursor-pointer text-cmGrey800'
                                            style={{fontWeight: 600}}
                                        >
                                            Make Company Admin
                                        </li>
                                        {/* )} */}
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='pb-5 pe-5'>
                <Pagination />
            </div>
        </div>
    )
}

// Side Cards
const CompanyDetailCard = () => {
    return (
        <div className='p-5 bg-cmwhite shadow-sm' style={{borderRadius: 10, fontSize: 14}}>
            {/* Header */}
            <div className='text-center border-bottom-dashed pb-5 mb-5 border-cmDisabled'>
                <div className='w-65px h-65px mx-auto rounded bg-cmGrey100 d-flex flex-center'>
                    <CustomImage className={'w-50px h-50px'} />
                </div>
                <div
                    className='my-2 text-cmmGrey900'
                    style={{fontWeight: 700, fontSize: 20, lineHeight: '27.3px'}}
                >
                    Flex Power
                </div>
                <div className='badge bg-cmOrange text-cmOrange bg-opacity-10 px-5 rounded-pill'>
                    Solar
                </div>
            </div>
            {/* Body */}
            <div style={{fontWeight: 600}}>
                {/* line 1 */}
                <div className='mb-5'>
                    <div
                        className='text-cmGrey800 mb-1'
                        style={{fontWeight: 700, lineHeight: '19.12px'}}
                    >
                        Client ID
                    </div>
                    <div className='text-cmGrey600' style={{fontWeight: 600, lineHeight: '21px'}}>
                        267400
                    </div>
                </div>
                {/* line 2 */}
                <div className='mb-5'>
                    <div
                        className='text-cmGrey800 mb-1'
                        style={{fontWeight: 700, lineHeight: '19.12px'}}
                    >
                        Billing Frequency
                    </div>
                    <div
                        className='text-cmGrey600 d-flex gap-4'
                        style={{fontWeight: 600, lineHeight: '21px'}}
                    >
                        <span className='text-cmGrey600'>Monthly</span>{' '}
                        <span className='d-flex gap-2 ' style={{fontSize: 12, lineHeight: '23px'}}>
                            <span>Started:</span>
                            <span> {getValidDate('01/01/2023')}</span>
                        </span>
                    </div>
                </div>
                {/* line 3 */}
                <div className='mb-5'>
                    <div
                        className='text-cmGrey800 mb-1'
                        style={{fontWeight: 700, lineHeight: '19.12px'}}
                    >
                        No. of Users
                    </div>
                    <div className='text-cmGrey600' style={{fontWeight: 600, lineHeight: '21px'}}>
                        600
                    </div>
                </div>
                {/* line 4 */}
                <div className='mb-5'>
                    <div
                        className='text-cmGrey800 mb-1'
                        style={{fontWeight: 700, lineHeight: '19.12px'}}
                    >
                        Subdomain
                    </div>
                    <div className='text-cmGrey600' style={{fontWeight: 600, lineHeight: '21px'}}>
                        @flexpowermarketing.com
                    </div>
                </div>
                {/* line 5 */}
                <div className='mb-5'>
                    <div
                        className='text-cmGrey800 mb-1'
                        style={{fontWeight: 700, lineHeight: '19.12px'}}
                    >
                        EIN No.
                    </div>
                    <div className='text-cmGrey600' style={{fontWeight: 600, lineHeight: '21px'}}>
                        629027E42G827
                    </div>
                </div>
                {/* line 6 */}
                <div className='mb-5'>
                    <div
                        className='text-cmGrey800 mb-1'
                        style={{fontWeight: 700, lineHeight: '19.12px'}}
                    >
                        Pricing
                    </div>
                    <div
                        className='text-cmGrey600 d-flex gap-1 align-items-center'
                        style={{fontWeight: 600, lineHeight: '21px'}}
                    >
                        <span className='text-cmGrey600'>$ 0.05/watt</span>{' '}
                        <span className='text-cmGrey800' style={{fontWeight: 700}}>
                            Unique PID’s
                        </span>
                        <KTSVG
                            path='/media/icons/duotune/art/percentage.svg'
                            svgClassName='w-15px h-15px cursor-pointer'
                        />
                    </div>
                    <div
                        className='text-cmGrey600 d-flex gap-1 align-items-center'
                        style={{fontWeight: 600, lineHeight: '21px'}}
                    >
                        <span className='text-cmGrey600'>$ 0.05/watt</span>{' '}
                        <span className='text-cmGrey800' style={{fontWeight: 700}}>
                            M2 Completed
                        </span>
                        <KTSVG
                            path='/media/icons/duotune/art/percentage.svg'
                            svgClassName='w-15px h-15px cursor-pointer'
                        />
                    </div>
                </div>
                {/* line 7 */}
                <div className='mb-5'>
                    <div
                        className='text-cmGrey800 mb-1'
                        style={{fontWeight: 700, lineHeight: '19.12px'}}
                    >
                        Recovery email
                    </div>
                    <div className='text-cmGrey600' style={{fontWeight: 600, lineHeight: '21px'}}>
                        recover@flexpower.com
                    </div>
                </div>
                {/* line 8 */}
                <div className='mb-5'>
                    <div
                        className='text-cmGrey800 mb-1'
                        style={{fontWeight: 700, lineHeight: '19.12px'}}
                    >
                        Support URL
                    </div>
                    <div
                        className='text-cmGrey600'
                        style={{fontWeight: 600, lineHeight: '21px', wordWrap: 'break-word'}}
                    >
                        http://3893034567uhbnjkiuy78uhjgytghy
                    </div>
                </div>
            </div>
        </div>
    )
}

const IntegartionCard = () => {
    return (
        <div className='p-5 bg-cmwhite shadow-sm w-100' style={{borderRadius: 10, fontSize: 14}}>
            {/* Heading */}
            <div className='d-flex gap-2 mb-5'>
                <div
                    className='text-cmmGrey800'
                    style={{fontWeight: 700, fontSize: 16, lineHeight: '21.8px'}}
                >
                    Integrations
                </div>
                <CustomArrow arrowDirection={ARROW_DIRECTION.down} />
            </div>
            {/* line 1 */}
            <div className='d-flex flex-start gap-5 mb-5'>
                <div className='w-40px h-40px   rounded bg-cmGrey100 d-flex flex-center'>
                    <CustomImage className={'w-25px h-25px'} />
                </div>
                <div>
                    <div
                        className='text-cmGrey900 p-0'
                        style={{lineHeight: '22.5px', fontWeight: 600}}
                    >
                        HubSpot
                    </div>
                    <div
                        className='text-cmGrey500 p-0'
                        style={{
                            fontSize: 10.5,
                            letterSpacing: '3%',
                            lineHeight: '17.2spx',
                            fontWeight: 600,
                        }}
                    >
                        CRM
                    </div>
                </div>
            </div>
            {/* line 2 */}
            <div className='d-flex flex-start gap-5 mb-5'>
                <div className='w-40px h-40px   rounded bg-cmGrey100 d-flex flex-center'>
                    <CustomImage className={'w-25px h-25px'} />
                </div>
                <div>
                    <div
                        className='text-cmGrey900 p-0'
                        style={{lineHeight: '22.5px', fontWeight: 600}}
                    >
                        Everee
                    </div>
                    <div
                        className='text-cmGrey500 p-0'
                        style={{
                            fontSize: 10.5,
                            letterSpacing: '3%',
                            lineHeight: '17.2spx',
                            fontWeight: 600,
                        }}
                    >
                        Payroll
                    </div>
                </div>
            </div>
        </div>
    )
}

const ModulesCard = () => {
    return (
        <div className='p-5 bg-cmwhite shadow-sm w-100' style={{borderRadius: 10, fontSize: 14}}>
            {/* Heading */}
            <div className='d-flex gap-2 mb-5'>
                <div
                    className='text-cmmGrey800'
                    style={{fontWeight: 700, fontSize: 16, lineHeight: '21.8px'}}
                >
                    Modules
                </div>
                <CustomArrow arrowDirection={ARROW_DIRECTION.down} />
            </div>
            {/* line 1 */}
            <div className='d-flex align-items-center gap-5 mb-5'>
                <div className='w-40px h-40px   rounded bg-cmGrey100 d-flex flex-center'>
                    <KTSVG
                        path='/media/icons/duotune/art/SequiDocBlueIcon.svg'
                        svgClassName='w-25px h-25px cursor-pointer'
                    />
                </div>

                <div className='text-cmGrey900 p-0' style={{lineHeight: '22.5px', fontWeight: 600}}>
                    Sequidocs
                </div>
            </div>
            {/* line 2 */}
            <div className='d-flex align-items-center gap-5 mb-5'>
                <div className='w-40px h-40px   rounded bg-cmGrey100 d-flex flex-center'>
                    {' '}
                    <KTSVG
                        path='/media/icons/duotune/art/HiringGroup.svg'
                        svgClassName='w-25px h-25px cursor-pointer'
                    />
                </div>

                <div className='text-cmGrey900 p-0' style={{lineHeight: '22.5px', fontWeight: 600}}>
                    Hiring
                </div>
            </div>
            {/* line 2 */}
            <div className='d-flex align-items-center gap-5 mb-5'>
                <div className='w-40px h-40px   rounded bg-cmGrey100 d-flex flex-center'>
                    <KTSVG
                        path='/media/icons/duotune/art/HiringGroup.svg'
                        svgClassName='w-25px h-25px cursor-pointer'
                    />
                </div>

                <div className='text-cmGrey900 p-0' style={{lineHeight: '22.5px', fontWeight: 600}}>
                    Marketing Deal
                </div>
            </div>
        </div>
    )
}

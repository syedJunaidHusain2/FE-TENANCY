import React, {forwardRef, useCallback, useImperativeHandle, useRef, useState} from 'react'
import {OverlayPanel} from 'primereact/overlaypanel'
import CustomButton, {BUTTON_SIZE, BUTTON_TYPE} from '../customButtton/CustomButton'
import {fontsFamily} from '../../assets/fonts/fonts'
import Badge from '@mui/material/Badge'
import {displayfilterCounts} from '../../helpers/CommonHelpers'

const CustomFilterButton = forwardRef(
    (
        {
            children,
            onApplyClick = () => {},
            onResetClick = () => {},
            onCancelClick = () => {},
            onClosePress = () => {},
            // filterCount = null,
            // calulateFilterCount = () => {},
            filterData = null,
        },
        ref
    ) => {
        const overlayPanelRef = useRef(null)
        const [filterCount, setFilterCount] = useState(null)

        const calulateFilterCount = useCallback(() => {
            let count = displayfilterCounts(filterData)
            setFilterCount(count)
        }, [filterData])
        /**
         * On Filter Button Click
         */
        const onFilterButtonPress = useCallback((e) => {
            overlayPanelRef.current.toggle(e)
        }, [])

        /**
         * On Apply Button Click
         */
        const onInnerApplyClick = useCallback(
            (e) => {
                onApplyClick(e)
                overlayPanelRef?.current?.hide()
                calulateFilterCount()
            },
            [calulateFilterCount, onApplyClick]
        )

        /**
         * On Reset Button Click
         */
        const onInnerResetClick = useCallback(
            (e) => {
                setFilterCount(null)
                overlayPanelRef?.current?.hide()
                onResetClick(e)
            },
            [onResetClick]
        )

        /**
         * On Close Button Click
         */
        const onInnerClosePress = useCallback(
            (e) => {
                overlayPanelRef?.current?.hide()
                onClosePress(e)
                onCancelClick()
            },
            [onCancelClick, onClosePress]
        )

        useImperativeHandle(
            ref,
            () => {
                return {
                    resetFilter: onInnerResetClick,
                    applyFilter: onInnerApplyClick,
                    closeFilter: onInnerClosePress,
                }
            },
            []
        )
        return (
            <div className='card flex justify-content-center'>
                <Badge color='error' badgeContent={filterCount}>
                    <CustomButton
                        buttonType={BUTTON_TYPE.disabled}
                        buttonSize={BUTTON_SIZE.small}
                        buttonLabel='Filter'
                        icon={'bi bi-funnel'}
                        onClick={onFilterButtonPress}
                    ></CustomButton>
                </Badge>

                <OverlayPanel ref={overlayPanelRef} style={{width: '300px'}} dismissable>
                    <div className='d-flex flex-column'>
                        <div className='d-flex align-items-center justify-content-between'>
                            <span
                                style={{
                                    fontFamily: fontsFamily.manrope,
                                    fontSize: '14px',
                                    fontWeight: '600',
                                }}
                            >
                                Filter Options
                            </span>
                            <span
                                className='d-flex align-items-center justify-content-center h-25px w-25px cursor-pointer'
                                onClick={onInnerClosePress}
                            >
                                <i className='bi bi-x-circle fs-3' />
                            </span>
                        </div>
                        <hr className='mb-5' />
                        {children}
                        <hr className='mt-5' />
                        <div className='d-flex gap-5 align-items-center justify-content-end'>
                            <CustomButton
                                buttonLabel='Reset'
                                buttonType={BUTTON_TYPE.disabled}
                                onClick={onInnerResetClick}
                                buttonSize={BUTTON_SIZE.small}
                            />
                            <CustomButton buttonLabel='Apply' onClick={onInnerApplyClick} />
                        </div>
                    </div>
                </OverlayPanel>
            </div>
        )
    }
)

export default CustomFilterButton

const CustomSortSvg = ({className = '', onClick = () => {}, sortingOrder = null}) => {
    return (
        <span
            className={'cursor-pointer d-flex flex-column ms-2 mb-0' || className}
            onClick={onClick}
        >
            {sortingOrder !== 'asc' ? (
                <i class='bi bi-caret-up-fill text-cmGrey600'></i>
            ) : (
                <i class='bi bi-caret-up-fill text-cmGrey900'></i>
            )}
            {sortingOrder !== 'desc' ? (
                <i class='bi bi-caret-down-fill text-cmGrey600'></i>
            ) : (
                <i class='bi bi-caret-down-fill text-cmGrey900'></i>
            )}
        </span>
    )
}

export {CustomSortSvg}

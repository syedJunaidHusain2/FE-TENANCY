import {useState, useEffect, useCallback, useMemo} from 'react'
import {LocationTabel} from './LocationTabel'
import GoogleMapReact from 'google-map-react'
import ManageLocation from './ManageLocation'
import debounce from 'lodash.debounce'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import {GOOGLE_MAPS_KEY} from '../../../../../../constants/constants'
import AccessRights from '../../../../../../accessRights/AccessRights'
import {
    exportLocationDataService,
    getLocationsListService,
} from '../../../../../../services/Services'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'
import LocationFilter from '../../../filters/LocationFilter'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../customComponents/customInputs/customInput/CustomInput'
import {allPermissionsAccess} from '../../../../../../accessRights/useCustomAccessRights'
import moment from 'moment'
import {downloadAnyFileHelper} from '../../../../../../helpers/CommonHelpers'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'

const AnyReactComponent = ({text}) => (
    <div
        style={{
            color: 'black',
            fontWeight: '800',
            padding: '15px 10px',
            display: 'inline-flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '100%',
            transform: 'translate(-50%, -50%)',
        }}
        className='fs-6'
    >
        <div className='bi bi-geo-alt-fill fs-1 text-danger w-25 h-100 pe-5' />
        {text}
    </div>
)
const initialFilter = {
    location: '',
    state: '',
}
export default function LocationCard() {
    const [map, setMap] = useState(false)
    const [selectedLocation, setSelectedLocation] = useState(null)
    const [page, setPage] = useState(1)
    const [filterData, setFilterData] = useState(initialFilter)
    const [totalData, setTotalData] = useState(null)
    const [showCreateAppModal, setShowCreateAppModal] = useState(false)
    const [ifThereIsNoLocation, setIfThereIsNoLocation] = useState(false)
    const handleClose = () => {
        getlocation()
        setShowCreateAppModal(false)
        setSelectedLocation(null)
    }
    const [locationsData, setLocationData] = useState(null)
    const [loader, setLoader] = useState(true)
    const [firstTimeApiCalled, setFirstTimeApiCalled] = useState(false)
    const [locationType, setLocationType] = useState('')
    const [searchText, setSearchText] = useState(null)
    const [searchVal, setSearchVal] = useState(null)
    const [sortValue, setSortValue] = useState(null)
    const [sortingOrder, setSortingOrder] = useState(null)

    // const [saleSearchParam, setSaleSearchParam] = useQueryString()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getlocation()
    }, [page, locationType, sortValue, sortingOrder, searchVal, filterData])

    const getlocation = () => {
        setLoader(true)
        const body = {
            filter: filterData?.location,
            state: filterData?.state,
            search: searchVal,
            type: locationType,
            page: page,
            sort: sortValue,
            sort_val: sortingOrder,
        }
        getLocationsListService(body)
            .then((res) => {
                if (!firstTimeApiCalled) setIfThereIsNoLocation(res?.locations?.data?.length == 0)
                setFirstTimeApiCalled(true)
                setTotalData(res?.locations?.last_page)
                setLocationData(res?.locations?.data)
            })
            .finally(() => {
                setLoader(false)
            })
    }
    const onEditLocation = useCallback((item) => {
        setSelectedLocation(item)
        setShowCreateAppModal(true)
    }, [])

    const mapData = useMemo(() => {
        const finalData =
            locationsData?.length > 0
                ? locationsData
                      ?.filter((item) => item?.lat && item?.long)
                      ?.map((item) => ({
                          ...item,
                          stateCityName: item?.general_code
                              ? `${item?.state} (${item?.general_code})`
                              : item?.state,
                      }))
                : []

        const arrayUniqueByKey = [
            ...new Map(finalData.map((item) => [item['stateCityName'], item])).values(),
        ]
        return arrayUniqueByKey
    }, [locationsData])

    const MapProps = {
        center: {
            lat: mapData && mapData[0]?.lat,
            lng: mapData && mapData[0]?.long,
        },
        zoom: 0,
    }
    const onApplyFilter = (filters) => {
        setPage(1)
        setSearchText('')
        setSearchVal('')
        setFilterData(filters)
    }
    const handleSearchChange = (e) => {
        // setFilterData(initialFilter)
        delaySave(e?.target?.value)
        setSearchText(e?.target?.value)
    }
    const delaySave = useCallback(
        debounce((val) => {
            setSearchVal(val)
            setLoading(true)
        }, 500),
        [searchVal]
    )

    const onResetFilter = () => {
        setSearchVal('')
        setSearchText('')
        setPage(1)
        setFilterData(initialFilter)
        // getlocation()
    }
    const onExportLocationData = useCallback(() => {
        exportLocationDataService().then((res) => {
            const fileName = `Location List - ${moment(new Date()).format('DD MMM YY hh:mm')}.csv`
            downloadAnyFileHelper(res, fileName)
            CustomToast.success('File Downloaded Successfully')
        })
    }, [])

    return (
        <>
            <div
                className=' h-auto shadow-sm'
                style={{fontSize: '14px', borderRadius: 10, fontFamily: 'Manrope'}}
            >
                <div className='w-100 gap-2 p-5  d-flex flex-wrap justify-content-between align-itmes-center mx-auto'>
                    <div
                        className='text-cmGrey600'
                        style={{
                            fontSize: '16px',
                            fontFamily: 'Manrope',
                            fontWeight: 600,
                            alignSelf: 'center',
                        }}
                    >
                        Add Branch Locations and State Redlines
                    </div>
                    <div className='' style={{alignSelf: 'center'}}>
                        <CustomInput
                            type={INPUT_TYPE.search}
                            onChange={handleSearchChange}
                            value={searchText}
                        />
                    </div>
                    <div className='d-flex align-items-center flex-wrap gap-3'>
                        <CustomButton
                            buttonType={BUTTON_TYPE.secondary}
                            buttonSize={BUTTON_SIZE.small}
                            buttonLabel={map === true ? 'List' : 'Map'}
                            onClick={() => {
                                if (map === true) {
                                    setMap(false)
                                } else {
                                    setMap(true)
                                }
                            }}
                            icon={map ? 'bi bi-list fw-bolder' : 'bi bi-map fw-bolder  '}
                        />

                        <LocationFilter
                            initialFilter={initialFilter}
                            onApplyFilter={(updatedFilter) => onApplyFilter(updatedFilter)}
                            resetFilter={onResetFilter}
                        />

                        <AccessRights
                            customCondition={
                                allPermissionsAccess.administrator.setting.locations.add
                            }
                        >
                            <CustomButton
                                buttonType={BUTTON_TYPE.primary}
                                buttonLabel='Add New'
                                buttonSize={BUTTON_SIZE.small}
                                onClick={() => setShowCreateAppModal(true)}
                            />
                        </AccessRights>
                        <div className=''>
                            <CustomButton
                                buttonType={BUTTON_TYPE.disabled}
                                buttonLabel='Export'
                                onClick={onExportLocationData}
                                buttonSize={BUTTON_SIZE.small}
                                icon={'pi pi-file-export'}
                            />
                        </div>
                    </div>
                </div>
                {map === false ? (
                    <LocationTabel
                        page={page}
                        setPage={setPage}
                        // className='mx-0 px-0'
                        locationsData={locationsData}
                        ifThereIsNoLocation={ifThereIsNoLocation}
                        setLocationData={setLocationData}
                        loader={loader}
                        setLoader={setLoader}
                        getlocation={getlocation}
                        handleClose={handleClose}
                        totalData={totalData}
                        onEditLocation={onEditLocation}
                        onPress={(item) => {
                            setSortValue(item)
                            setSortingOrder(
                                sortValue !== item ? 'asc' : sortingOrder === 'asc' ? 'desc' : 'asc'
                            )
                            setPage(1)
                        }}
                        sortingOrder={sortingOrder}
                        sortValue={sortValue}
                    />
                ) : (
                    <div style={{height: '536px', width: '100%'}}>
                        <GoogleMapReact
                            bootstrapURLKeys={{key: GOOGLE_MAPS_KEY}}
                            defaultCenter={MapProps.center}
                            defaultZoom={MapProps.zoom}
                        >
                            {mapData?.length > 0
                                ? mapData?.map((mark, index) => {
                                      return (
                                          <AnyReactComponent
                                              lat={mark.lat}
                                              lng={mark.long}
                                              text={mark?.stateCityName}
                                          />
                                      )
                                  })
                                : null}
                        </GoogleMapReact>
                    </div>
                )}
                <CustomLoader full visible={loader}></CustomLoader>
            </div>
            {showCreateAppModal && (
                <ManageLocation
                    selectedLocation={selectedLocation}
                    show={showCreateAppModal}
                    handleClose={handleClose}
                    setLoader={setLoader}
                />
            )}
        </>
    )
}

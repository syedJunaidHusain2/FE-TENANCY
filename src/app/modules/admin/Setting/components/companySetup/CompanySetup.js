import AccessRights, {
    PERMISSION_TYPE,
    PERMISSIONS_GROUP,
} from '../../../../../../accessRights/AccessRights'
import AlertsEmail from '../AlertPage/AlertsEmail'
import BackendCard from '../SetupCard/backendCard/BackendCard'
import CompanyMarginCard from '../SetupCard/companyMargin/CompanyMarginCard'
import OverridesCard from '../SetupCard/OverridesCard'
import SetupPayFrequency from '../SetupCard/setupPayFrequencyComponents/SetupPayFrequency'
import TierDurationCard from '../SetupCard/TierDurationCard/TierDurationCard'

const CompanySetup = () => {
    return (
        <div>
            <div className='mb-10'>
                <CompanyMarginCard />
            </div>
            <div>
                <BackendCard />
            </div>

            <div className='mt-10'>
                <SetupPayFrequency />
            </div>

            <OverridesCard />
            {/* <TierDurationCard /> */}
            {/* <MarkettingDealsCard /> */}
            {/* <MarginOfDiffrenceCard /> */}
            <div>
                <AlertsEmail />
            </div>
        </div>
    )
}

export default CompanySetup

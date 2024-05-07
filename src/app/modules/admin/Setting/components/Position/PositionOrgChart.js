import {Tree, TreeNode} from 'react-organizational-chart'

const PositionOrgChart = ({setLoader, chartData}) => {
    const UserNode = ({item, isLabel = false}) => (
        <div className='my-5' style={{fontFamily: 'Manrope'}}>
            <span className='text-cmGrey900' style={{fontWeight: 700}}>
                {item?.position_name}
                {!isLabel ? (
                    <span className='text-cmGrey700'>({item?.peoples_count ?? 0})</span>
                ) : null}
            </span>
        </div>
    )

    const ChildeNode = ({item}) => {
        return (
            <>
                {item?.org_chields?.length > 0 ? (
                    <TreeNode label={<UserNode item={item} />}>
                        {item?.org_chields?.length > 0 &&
                            item?.org_chields.map((item1) => <ChildeNode item={item1} />)}
                    </TreeNode>
                ) : (
                    <TreeNode label={<UserNode item={item} />} />
                )}
            </>
        )
    }

    return (
        <div className=' my-10 py-10 overflow-auto'>
            <Tree
                lineWidth={'2px'}
                lineColor={'grey'}
                lineHeight={'35px'}
                label={<UserNode item={chartData} isLabel={true} />}
            >
                {chartData?.org_chields?.length > 0 &&
                    chartData?.org_chields?.map((item) => <ChildeNode item={item} />)}
            </Tree>
        </div>
    )
}

export default PositionOrgChart

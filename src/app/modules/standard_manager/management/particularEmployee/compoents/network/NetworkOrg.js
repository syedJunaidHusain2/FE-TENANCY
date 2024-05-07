import React from 'react'
import {Tree, TreeNode} from 'react-organizational-chart'
import CustomImage from '../../../../../../../customComponents/customImage/CustomImage'

const NetworkOrg = ({chartData}) => {
    const UserNode = ({item, isYou = false}) => (
        <div className='my-5' style={{fontFamily: 'Manrope'}}>
            <div>
                <CustomImage
                    src={item?.image}
                    style={{width: '38.69px', height: '43.85px'}}
                    className='avatar'
                />
            </div>
            <div>
                <span className='text-cmGrey900' style={{fontWeight: 700}}>
                    {item?.first_name} {item?.last_name}
                </span>
                {isYou && (
                    <span
                        className='text-cmGrey700 ms-2'
                        style={{fontWeight: 500, fontSize: '12px'}}
                    >
                        You
                    </span>
                )}
            </div>
        </div>
    )

    const ChildeNode = ({item}) => {
        return (
            <>
                {item?.childs?.length > 0 ? (
                    <TreeNode label={<UserNode item={item} />}>
                        {item?.childs?.length > 0 &&
                            item?.childs.map((item1) => <ChildeNode item={item1} />)}
                    </TreeNode>
                ) : (
                    <TreeNode label={<UserNode item={item} />} />
                )}
            </>
        )
    }

    return (
        <div
            className='bg-cmwhite my-10 py-10 shadow-sm overflow-auto'
            style={{borderRadius: '10px'}}
        >
            <Tree
                lineWidth={'2px'}
                lineColor={'grey'}
                lineHeight={'35px'}
                label={<UserNode item={chartData} isYou />}
            >
                {chartData?.childs?.length > 0 &&
                    chartData?.childs?.map((item) => <ChildeNode item={item} />)}
            </Tree>
        </div>
    )
}

export default NetworkOrg

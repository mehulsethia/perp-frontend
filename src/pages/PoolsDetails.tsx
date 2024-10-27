import React from 'react'
import PoolDetailsStart from '../components/PoolDetailsStart'
import PoolsStats from '../components/PoolsStats'
import SpotPool from '../components/SpotPool'
import CustomBarChart from '../components/CustomBarChart'
import PerpetualPools from '../components/PerpetualPools'

const PoolsDetails = () => {
  return (
    <>
    <div className='container mx-auto'>
        <PoolDetailsStart />
        <PoolsStats />
        <SpotPool />
        <PerpetualPools />
    </div>
    </>
  )
}

export default PoolsDetails
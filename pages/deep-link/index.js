import React, { useEffect } from 'react'
import { getMobileOperatingSystemStr } from '../../src/utils/utils'


const DeepLink = () => {
  useEffect(() => {
    const osSystem = getMobileOperatingSystemStr()
    if (osSystem === 'unknown') {
      location.href = 'https://pinetree.vn'
    } else if (osSystem === 'Android') {
      location.href = 'https://play.google.com/store/apps/details?id=com.maple.toidoc'
    } else if (osSystem === 'iOS') {
      location.href = 'https://apps.apple.com/vn/app/id6450690393'
    }
  }, [])

  return (
    <div/>
  )
}

export default DeepLink

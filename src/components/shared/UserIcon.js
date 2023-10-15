import { minidenticon } from 'minidenticons'
import { useMemo } from 'react'

const UserIcon = ({ address, ...props }) => {
  const svgURI = useMemo(
    () => 'data:image/svg+xml;utf8,' + encodeURIComponent(minidenticon(address, 95, 45)),
    [address]
  )
  return (<img src={svgURI} alt={address} {...props} />)
}

export default UserIcon
import useEth from '@Hooks/useEth'
import React from 'react'

const PendingPopup = () => {

    const { pending } = useEth();

    return (
        <div>
            {
                pending?
                    <p>Pending transaction.</p>
                    :
                    <></>
            }
        </div>
    )
}

export default PendingPopup

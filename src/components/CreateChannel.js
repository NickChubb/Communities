import React from 'react'

/**
 * Channel which 
 * @returns 
 */
const CreateChannel = () => {
    
    const handleSubmit = async (evt) => {
        evt.preventDeafult();

        const res = await fetch('/api/channel', {
            body: JSON.stringify({

            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })

        const result = await res.json()
    }   
    
    return (
        <div>
            <form onSubmit={handleSubmit}> 
                <label htmlFor="name">Name</label>
                <input id="name" type="text" autoComplete="name" required />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default CreateChannel    
import React from 'react'
import { useForm } from "react-hook-form";
import styles from '@Styles/Home.module.css'

/**
 * Channel which 
 * @returns 
 */
const CreateChannel = () => {

    const { register, handleSubmit } = useForm();
    
    const onSubmit = async (evt) => {
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
        <>
            <h1 className={styles.content_title}>
                Create a Community
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <input {...register("communityName")} placeholder="Community name" />
                <input {...register("communitySize")} placeholder="Community size" />
                
                <select {...register("category")}>
                    <option value="">Select...</option>
                    <option value="A">Category A</option>
                    <option value="B">Category B</option>
                </select>
                <input type="submit" />
            </form>
        </>
    )
}

export default CreateChannel    
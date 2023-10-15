import React, { useContext } from "react"
import useEth from "@Hooks/useEth"
import { useForm } from "react-hook-form"
import Layout from "@Components/Layout"
import styles from "@Styles/Home.module.css"
import { createCommunity } from "@Helpers/communityHub"
import { TransactionPendingContext } from "@Helpers/context"

/**
 * @returns
 */
const Create = () => {
  const { signer } = useEth()
  const [pending, updatePending] = useContext(TransactionPendingContext)
  const { register, watch, getValues, handleSubmit } = useForm()

  // Watch for the communitySize field to be changed and display
  // errors under input.
  const watchCommunityName = watch("communityName", "")
  const getCommunityNameInformation = selection => {
    if (!selection) return
    if (selection.length > 42) return "Community name is too long."
  }

  // Watch for the communityDescription field to be changed and display
  // errors under input.
  const watchCommunityDescription = watch("communityDescription", "")
  const getCommunityDescriptionInformation = selection => {
    if (!selection) return
    if (selection.length > 100)
      return "You may make your community description as long as you'd like, but the longer it is the more it costs to create the community."
  }

  // Watch for the communitySize field to be changed and display
  // errors under input.
  const watchCommunitySize = watch("communitySize", 0)
  const getCommunitySizeInformation = selection => {
    if (!selection) return
    if (!Number.parseInt(selection))
      return "Error: Community Size must be an Integer."
  }

  // Watch for the communityImage field to be changed and display
  // errors under input.
  const watchCommunityImage = watch("communityImage", 0)
  const getCommunityImageInformation = selection => {
    if (!selection || selection.length == 0) return
  }

  // Watch for the visibility field to be changed and display
  // label depending on the value of the selection.
  const watchVisibility = watch("visibility", false)
  const getVisibilityInformation = selection => {
    switch (selection) {
      case "private":
        return "Only users with the access token can view the community. Once created, this cannot be changed."
      case "public":
        return "Anyone can view the community, but only members with a token can post. Once created, this cannot be changed."
      default:
        return ""
    }
  }

  /**
   * Handles the creation of a new community on form submit.
   * @param {Event} evt
   */
  const onSubmit = async evt => {
    const data = watch()

    // Append data to FormData
    const body = new FormData()
    body.append("communityName", data.communityName)
    body.append("communitySymbol", data.communitySymbol)
    body.append("communityDescription", data.communityDescription)
    body.append("communitySize", data.communitySize)
    body.append("private", data.visibility == "private") // Convert visibility to bool
    body.append("communityImage", data.communityImage[0])

    updatePending(true)

    // Upload to IPFS and get JSON CID
    let response = await fetch(`/api/ipfs`, {
      method: "post",
      body: body,
    })

    let metadata = await response.text()

    // Send transaction to Ethereum BC
    // Deploy Community smart contract
    let transaction = await createCommunity(signer, {
      name: data.communityName,
      symbol: data.communitySymbol,
      size: parseInt(data.communitySize),
      metadata: metadata,
    })

    // While BC transaction is pending, show pending
    /// notification on screen.
    transaction
      .wait()
      .catch(err => {
        console.log(err)
      })
      .then(receipt => {
        console.log(receipt)
        console.log(`Community created successfully!`)
      })
      .finally(() => {
        updatePending(false)
      })
  }

  return (
    <Layout>
      <h1 className={styles.content_title}>Create a Community</h1>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.form_field}>
          <input {...register("communityName")} placeholder="Community name" />
          <small className={styles.form_error}>
            {getCommunityNameInformation(watchCommunityName)}
          </small>
        </div>

        <div className={styles.form_field}>
          <input
            {...register("communitySymbol")}
            placeholder="Community symbol"
          />
        </div>

        <div className={styles.form_field}>
          <textarea
            {...register("communityDescription")}
            placeholder="Community description"
          />
          <small className={styles.textarea_length}>
            {watchCommunityDescription?.length}
          </small>
          <small className={styles.form_warning}>
            {getCommunityDescriptionInformation(watchCommunityDescription)}
          </small>
        </div>

        <div className={styles.form_field}>
          <label htmlFor="file-upload" className="custom-file-upload">
            Community Size
          </label>
          <input
            {...register("communitySize")}
            placeholder="10, 100, 1000000000, ..."
          />
          <small className={styles.form_error}>
            {getCommunitySizeInformation(watchCommunitySize)}
          </small>
        </div>

        <div className={styles.form_field}>
          <label htmlFor="file-upload" className="custom-file-upload">
            Community Token Image
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("communityImage")}
            placeholder="Community image"
          />
          <small className={styles.form_error}>
            {getCommunityImageInformation(watchCommunityImage)}
          </small>
        </div>

        <div className={styles.form_field}>
          <label>Select the visibility of your Community:</label>
          <select {...register("visibility")}>
            <option value="">Visibility...</option>
            <option value="private">Private</option>
            <option value="public">Public</option>
          </select>
          <small>{getVisibilityInformation(watchVisibility)}</small>
        </div>
        <input type="submit" />
      </form>
    </Layout>
  )
}

export default Create

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { getPosts } from "@Helpers/social"
import styles from "@Styles/Home.module.css"
import Loader from "react-loader-spinner"
import PostFeed from "@Components/feed/PostFeed"
import CommunityImage from "@Components/shared/CommunityImage"

const CommunityHomePage = ({ userId, communityId }) => {
  const [feed, setFeed] = useState()
  const [loading, setLoading] = useState(true)
  const { register, watch, handleSubmit } = useForm()

  useEffect(() => {
    const getFeed = async () => {
      setFeed(await getPosts(userId, { communityId: communityId }))
      setLoading(false)
    }

    getFeed()
  }, [communityId, loading, userId])

  const onSubmit = async () => {
    // Upload to Mongo
    let response = await fetch(`/api/social/post`, {
      method: "POST",
      body: JSON.stringify({
        post: watch("newPost", ""),
        userId: userId,
        communityId: communityId,
      }),
    })

    setLoading(true)
  }

  return (
    <div className={styles.community_home_page}>
      <CommunityImage communityId={communityId} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${styles.form} ${styles.add_post_form}`}
      >
        <textarea {...register("newPost")} placeholder="What's on your mind?" />
        <input type="submit" />
      </form>
      <div styles={styles.post_feed}>
        {loading ? (
          <Loader
            type="BallTriangle"
            style={{ marginTop: "100px" }}
            // type="Puff"
            color="#00BFFF"
            height={150}
            width={150} //3 secs
          />
        ) : (
          <PostFeed feed={feed} />
        )}
      </div>
    </div>
  )
}

export default CommunityHomePage

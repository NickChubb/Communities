import React from "react"
import styles from '@Styles/Home.module.css'
import PostCard from "./PostCard"

const PostFeed = ({ feed }) => {
  return (
    <div className={`${styles.post_feed} ${styles.home_post_feed}`}>
      {feed && feed.length > 0 ? (
        feed.map((post, key) => <PostCard post={post} key={key} />)
      ) : (
        <p>No posts yet in community... Say Hi!</p>
      )}
    </div>
  )
}

export default PostFeed

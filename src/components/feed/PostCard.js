import styles from '@Styles/Home.module.css'

const PostCard = ({ post, key }) => {
  return (
    <div className={styles.post_card} key={key}>
        <p><span>{post?.author}: </span><b>{post?.post}</b></p>
    </div>
  )
}

export default PostCard;
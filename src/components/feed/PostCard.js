import styles from "@Styles/Home.module.css"
import UserIcon from "@Components/shared/UserIcon"
import { shortenAddress } from "@Helpers/social"

const PostCard = ({ post, key }) => {
  return (
    <div className={styles.post_card} key={key}>
      <div className={styles.post_card_header}>
        <UserIcon address={post?.author} width={30} height={30} />
        <span>{shortenAddress(post?.author)}</span>
      </div>
      <div className={styles.post_card_content}>{post?.post}</div>
    </div>
  )
}

export default PostCard

import postEx from '@/lib/toyData/postEx'
import PostCard from './components/PostCard/PostCard'
import styles from './page.module.css'
import RandomUsers from './components/RandomUsers/RandomUser'

export default function Home() {
  return (
    <main className={styles['main']}>
      <div className={styles['left']}>
        <div>
          <h1>Your Top Posts:</h1>
          <div>Create Post?</div>
        </div>
        <div className={styles['posts']}>
          {postEx.map((post, idx) => (
            <PostCard post={post} key={idx} isSimple/>
          ))}
        </div>
      </div>
      <div className={styles['right']}>
        <div className={styles['posts']}>
          {postEx.map((post, idx) => (
            <PostCard post={post} key={idx} />
          ))}
          {postEx.map((post, idx) => (
            <PostCard post={post} key={idx} />
          ))}
        </div>
        <div>
          <h1>Random Users: </h1>
          <RandomUsers />
        </div>
      </div>
    </main>
  )
}

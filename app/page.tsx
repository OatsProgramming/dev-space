import postEx from '@/lib/toyData/postEx'
import PostCard from './components/PostCard/PostCard'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles['main']}>
      {postEx.map((post, idx) => (
        <PostCard post={post} key={idx} />
      ))}
    </main>
  )
}

// import postEx from '@/app/utils/toyData/postEx'
import styles from './page.module.css'
import RandomCards from './components/RandomCards/RandomCards'
import UserPosts from './components/UserPosts/UserPosts'

export default function Home() {

  return (
    <main className={styles['main']}>
      <div className={styles['left']}>
        <div>
          <h1>Your Top Posts:</h1>
          <div>Create Post?</div>
        </div>
        <div className={styles['posts']}>
          <UserPosts />
        </div>
      </div>
      <div className={styles['right']}>
        {/* FIXME: Random Posts is taking a small amnt of space while Random Users is taking more */}
        <div className={styles['posts']}>
          <h1>Random Posts: </h1>
          <RandomCards category='posts' />
        </div>
        <div className={styles['users']}>
          <h1>Random Users: </h1>
          <RandomCards category='users' />
        </div>
        <div className={styles['comments']}>
          <h1>Random Comments: </h1>
          <RandomCards category='comments' />
        </div>
      </div>
    </main>
  )
}

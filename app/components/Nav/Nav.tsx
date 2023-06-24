import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import styles from './nav.module.css'
// import SearchDialog from "./SearchDialog/SearchDialog"
// import Notif from "./Notif/Notif"
// import UserDialog from "./UserDialog/UserDialog"
// import CreatePost from "./CreatePost/CreatePost"
import Link from "next/link"
import Hamburger from "./Hamburger/Hamburger"

export default async function Nav() {
    const session = await getServerSession(authOptions)
    
    return (
        <nav className={styles['nav']}>
            <div className={styles['leftContainer']}>
                <Hamburger />
                <Link href="/">
                    Home
                </Link>
            </div>
            <div className={styles['rightContainer']}>
                {/* <SearchDialog /> */}
                {/* {session && <Notif />} */}
                {/* <CreatePost /> */}
                {/* <UserDialog session={session}/> */}
            </div>
        </nav>
    )
}
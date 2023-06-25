import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import styles from './navBar.module.css'
import SearchDialog from "./SearchDialog/SearchDialog"
// import UserDialog from "./UserDialog/UserDialog"
import CreatePost from "./CreatePost/CreatePost"
import Link from "next/link"
import Hamburger from "./Hamburger/Hamburger"
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch"
import Notif from "./Notif/Notif"
import Nav from "./Nav/Nav"

export default async function NavBar() {
    const session = await getServerSession(authOptions)

    return (
        <Nav>
            <div className={styles['leftContainer']}>
                <Hamburger />
                <Link href="/">
                    Home
                </Link>
            </div>
            <div className={styles['rightContainer']}>
                <SearchDialog />
                <ThemeSwitch />
                {session && <Notif />}
                <CreatePost />
                {/* <UserDialog session={session}/> */}
            </div>
        </Nav>
    )
}
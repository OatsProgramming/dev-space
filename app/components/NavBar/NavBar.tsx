import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import styles from './navBar.module.css'
import SearchDialog from "./SearchDialog/SearchDialog"
import UserDialog from "./UserDialog/UserDialog"
import CreatePost from "./CreatePost/CreatePost"
import Link from "next/link"
import Hamburger from "./Hamburger/Hamburger"
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch"
import Notif from "./Notif/Notif"
import Nav from "./Nav/Nav"
import logo from "@/public/logo"
import getTempServerSession from "@/lib/toyData/getTempServerSession"

export default async function NavBar() {
    const session = await 
        // getServerSession(authOptions)
        getTempServerSession()

    return (
        <Nav>
            <div className={styles['leftContainer']}>
                <Hamburger />
                <Link href='/' className="logo">
                    <img
                        src={logo}
                        alt='logo'
                    />
                </Link>
                <Link href="/">
                    Home
                </Link>
            </div>
            <div className={styles['rightContainer']}>
                <SearchDialog />
                <ThemeSwitch />
                {/* Temp */}
                <Notif userId={session.user.id}/> 
                {/* {session && <Notif />} */}
                <CreatePost />
                <UserDialog session={session}/>
            </div>
        </Nav>
    )
}
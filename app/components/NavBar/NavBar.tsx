'use client'

import styles from './navBar.module.css'
import SearchDialog from "./SearchDialog/SearchDialog"
import UserDialog from "./UserDialog/UserDialog"
import CreatePost from "./CreatePost/CreatePost"
import Link from "next/link"
import Hamburger from "./Hamburger/Hamburger"
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch"
import Nav from "./Nav/Nav"
import logo from "@/public/logo"
import { getSesh } from '../context/SeshProvider/SeshClient'
import dynamic from 'next/dynamic'

const Notif = dynamic(() =>
    import('./Notif/Notif')
)

export default function NavBar() {
    const sesh = getSesh()

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
                {sesh && <Notif userId={sesh.user.id} />}
                <CreatePost />
                <UserDialog sesh={sesh} />
            </div>
        </Nav>
    )
}
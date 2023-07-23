import Link from 'next/link'
import styles from './footer.module.css'
import logo from '@/public/logo'
import EmailContact from '../EmailContact/EmailContact'
import discord from '@/public/discord.svg'
import github from '@/public/github.svg'
import Image from 'next/image'

export default function Footer() {
    return (
        <footer className={styles['container']}>

            <div className={styles['flexContainer']}>
                <div className={styles['webInfo']}>
                    <Link href='/' className="logo">
                        <img
                            loading='lazy'
                            src={logo}
                            alt='logo'
                        />
                    </Link>
                    <Link href="/">
                        Dev Space
                    </Link>
                    <div>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel sed tempora dolorem corrupti aliquid dolor nemo laborum reprehenderit deserunt eum. Voluptas, labore aut
                    </div>
                </div>

                <div className={styles['contact']}>
                    <EmailContact />
                    <div className={styles['iconsContainer']}>
                        {/* Note: using <Image /> instead of <img /> since the latter won't work with svgs for some reason... maybe convert it to base64 later */}
                        <Link href='https://github.com/OatsProgramming/miruTV' target="_blank" rel='noreferrer noopener'>
                            <Image
                                loading='lazy'
                                src={github}
                                alt='Github Icon'
                                width={100}
                                height={100}
                            />
                        </Link>
                        <Link href='https://discord.gg/WUhmy8CaB' target='_blank' rel='noreferrer noopener'>
                            <Image
                                loading='lazy'
                                src={discord}
                                alt='Discord Icon'
                                width={100}
                                height={100}
                            />
                        </Link>
                    </div>
                </div>
            </div>

            <div className={styles['copyright']}>
                Dev Space © 2023
            </div>
        </footer>
    )
}
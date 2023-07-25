import Link from 'next/link'
import styles from './footer.module.css'
import logo from '@/public/logo'
import EmailContact from '../EmailContact/EmailContact'
import github from '@/public/github'
import discord from '@/public/discord'
import Icon from '../Icon/Icon'

export default function Footer() {
    return (
        <footer>

            <div className={styles['container']}>
                <div className={styles['text']}>
                    <Link href="/" className='logo'>
                        <img
                            src={logo}
                            alt='Dev Space logo'
                        />
                    </Link>
                    <h1>
                        Dev Space
                    </h1>
                    <div className={styles['details']}>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam, impedit eaque sint quas ea omnis? Asperiores nisi natus fugiat, fugit totam placeat dolores.
                    </div>
                    <div className={styles['iconsContainer']}>
                        <Link href='https://github.com/OatsProgramming/miruTV' target="_blank" rel='noreferrer noopener'>
                            <Icon
                                img={github}
                                alt='Github Icon'

                            />
                        </Link>
                        <Link href='https://discord.gg/WUhmy8CaB' target='_blank' rel='noreferrer noopener'>
                            <Icon
                                img={discord}
                                alt='Discord Icon'

                            />
                        </Link>
                    </div>
                </div>

                <div className={styles['contact']}>
                    <h1>Got A Suggestion?</h1>
                    <EmailContact />
                </div>
            </div>

            <div className={styles['copyright']}>
                Dev Space © 2023
            </div>
        </footer>
    )
}
import Link from 'next/link'


export const Header = () => {
    return (
        <header>
            <nav>
            <img />
            <Link href="/" passHref>
                Home
            </Link>
            <Link href="/events" passHref>
                Events
            </Link>
            <Link href="/about-us" passHref>
                About us
            </Link>
            </nav>
        </header>
    )
}
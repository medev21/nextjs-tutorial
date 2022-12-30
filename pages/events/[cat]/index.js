import Image from 'next/image'
import Link from 'next/link';


const EventCatPage = ({ data, pageName }) => {
    return <div>
        <h1>Events page in {pageName}</h1>

        {data.map(ev => (
            <Link key={ev.id} href={`/events/${ev.city}/${ev.id}`} passHref>
                <Image alt={ev.title} width={300} height={300} src={ev.image}/>
                <h2>{ev.title}</h2>
            </Link>
        ))}
    </div>
}


export default EventCatPage;

export async function getStaticPaths() {

    const {events_categories} = await import('/data/data')
    const allPaths = events_categories.map(ev => {
        return {
            params: {
                cat: ev.id.toString(),
            }
        }
    })

    return {
        paths:  allPaths,
        fallback: false,
    }
}

export async function getStaticProps(context) {

    const id = context?.params.cat;
    const { allEvents } = await import('/data/data')

    const data = allEvents.filter(ev => ev.city === id)

    return {
        props: { data, pageName: id }
    }
}

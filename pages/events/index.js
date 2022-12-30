import Image from 'next/image'
import Link from 'next/link';

const EventsPage = ({data}) => (
    <div>
        <h1>events page</h1>
        <div>
            {data.map(ev => (
                <Link key={ev.title} href={`/events/${ev.id}`} passHref>
                    <Image alt={ev.title} width={300} height={300} src={ev.image}/>
                    <h2>{ev.title}</h2>
                </Link>
            ))}
        </div>
    </div>
)

export default EventsPage;

export async function getStaticProps() {
    const {events_categories} = await import('/data/data')

    return {
        props: {
            data: events_categories,
        },
    };

}
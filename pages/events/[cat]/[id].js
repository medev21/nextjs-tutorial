import Image from 'next/image'

const EventPage = ({ data }) => {
    return (
        <div>
            <Image src={data.image} width={1000} height={500} alt={data.title} />
            <h1>{data.title}</h1>
            <p>{data.description}</p>
        </div>
        )
}

export default EventPage;

export async function getStaticPaths() {
    const data = await import('/data/data')
    const { allEvents } = data

    const allPaths = allEvents.map(event => {
        return {
            params: {
                cat: event.city,
                id: event.id,
            }
        }
    })

    return {
        paths: allPaths,
        fallback: false,
    }
}

export async function getStaticProps(context) {

    const id = context.params.id
    const { allEvents }= await import('/data/data')
    const eventData = allEvents.find(ev => ev.id === id)
    return {
        props: {data: eventData},
    }
}
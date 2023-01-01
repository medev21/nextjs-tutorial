import { useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

const EventPage = ({ data }) => {
    const inputEmail = useRef();
    const router = useRouter();
    const [message, setMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault(); // prevent from reloading the page on submit

        const emailValue = inputEmail.current.value;
        const eventId = router?.query.id;

        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!emailValue.match(validRegex)) {
            setMessage('Please introduce a correct email address');
        }

        try {
            //POST  fetch request
            // body emailValue and the eventId
            const resp = await fetch('/api/email-registration', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({email: emailValue, eventId})
            })
            if(!resp.ok) throw new Error(`Error: ${resp.status}`)
            const data = await resp.json();
            setMessage(data.message)
            inputEmail.current.value = ''
            
        } catch(e) {
            console.log(e, 'ERROR')
        }


    }

    return (
        <div>
            <Image src={data.image} width={1000} height={500} alt={data.title} />
            <h1>{data.title}</h1>
            <p>{data.description}</p>
            <form onSubmit={onSubmit} className="email_registration">
                <label> Get Registered for this event!</label>
                <input
                ref={inputEmail}
                type="email"
                id="email"
                placeholder="Please insert your email here"
                />
                <button type="submit"> Submit</button>
            </form>
            <p>{message}</p>
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
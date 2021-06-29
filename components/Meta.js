import Head from 'next/head'

const Meta = ({ title, description, keywords }) => {
    return (
        <Head>
            <title>{ title }</title>
            <meta charSet="UTF-8" />
            <meta name="description" content={ description } />
            <meta name="keywords" content={ keywords } />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="icon" type="svg" href="/images/ACE - Logo.svg" />
        </Head>
    )
}

Meta.defaultProps = {
    title : 'ACE - Alas Creative Events',
    description : 'Alas Creative Events of Tagum City where you can book events with international standard event planners/coordinators.',
    keywords : 'ACE, Alas, Event Planner, Event Organizer, Book Events, Wedding Organizer',
}

export default Meta

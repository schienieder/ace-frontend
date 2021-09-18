import Head from 'next/head'

const Meta = ({ title, description, keywords }) => {
    return (
        <Head>
            <title>{ title }</title>
            <meta charSet="UTF-8" />
            <meta name="description" content={ description } />
            <meta name="keywords" content={ keywords } />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="icon" type="svg" href="/images/logo.svg" />
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/reset-min.css" integrity="sha256-t2ATOGCtAIZNnzER679jwcFcKYfLlw01gli6F6oszk8=" crossOrigin="anonymous" />
        </Head>
    )
}

Meta.defaultProps = {
    title : 'Marahuyo - Alas Creative Events of Tagum City',
    description : 'Alas Creative Events of Tagum City where you can book events with international standard event planners/coordinators.',
    keywords : 'Marahuyo, Alas, Event Planner, Event Organizer, Book Events, Wedding Organizer',
}

export default Meta

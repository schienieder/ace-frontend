import React from 'react'
import EventCard from './EventCard'

const EventCards = () => {
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-5">
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
        </div>
    )
}

export default EventCards

import React from 'react'

const BookingDetailItem = ({ title, subtext }) => {
    return (
        <div className="flex flex-col gap-y-1">
            <h4 className="text-sm font-bold">{ title }</h4>
            <p className="text-xs">{ subtext }</p>
        </div>
    )
}

export default BookingDetailItem

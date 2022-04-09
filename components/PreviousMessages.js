import React from 'react'

const PreviousMessages = (prevMessages) => {
    console.log('These are the previous messages ', prevMessages)
    if (prevMessages.length) {
        return (
            messages.map((message, index) => (
                <div 
                    className={`${message.username === userName ? 'chatPositionEnd' : 'chatPositionStart'}`}
                    key={index}
                >
                    <div className='w-14 h-14 bg-white rounded-full shadow-sm'></div>
                    <div className={`${message.username === userName ? 'selfMessage' : 'chatMessage'}`}>
                        <h4 className='text-sm font-bold'>{ message.sender_name }</h4>
                        <p className='text-xs'>{ message.content }</p>
                    </div>
                </div>
            ))
        )
    }
    return null
}

export default PreviousMessages
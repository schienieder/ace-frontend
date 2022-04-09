import React from 'react'

const NewMessages = (newMessages) => {
    console.log('These are the new messages ', newMessages)
    if (newMessages.length) {
        return (
            newMessages.map((message, index) => {
                <div 
                    className={`${message.username === userName ? 'chatPositionEnd' : 'chatPositionStart'}`}
                    key={index}
                >
                    <div className='w-14 h-14 bg-white rounded-full shadow-sm'></div>
                    <div className={`${message.username === userName ? 'selfMessage' : 'chatMessage'}`}>
                        <h4 className='text-sm font-bold'>{ message.sender }</h4>
                        <p className='text-xs'>{ message.message }</p>
                    </div>
                </div>
            })
        )
    }
    return null
}

export default NewMessages
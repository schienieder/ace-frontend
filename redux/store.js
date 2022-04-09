import { configureStore } from '@reduxjs/toolkit'

import messagesSlice from './messages/messages.slice'

export const store = configureStore({
    reducer : {
        messagesState : messagesSlice
    }
})
import { configureStore } from '@reduxjs/toolkit'

import messagesSlice from './messages/messages.slice'
import chatRoomsSlice from './chatrooms/chatRooms.slice'
import eventsSlice from './events/events.slice'
import salesSlice from './sales/sales.slice'

export const store = configureStore({
    reducer : {
        messagesState : messagesSlice,
        chatRoomsState : chatRoomsSlice,
        eventsState : eventsSlice,
        salesState : salesSlice
    }
})
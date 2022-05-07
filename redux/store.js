import { configureStore } from '@reduxjs/toolkit'

import messagesSlice from './messages/messages.slice'
import chatRoomsSlice from './chatrooms/chatRooms.slice'
import eventsSlice from './events/events.slice'
import salesSlice from './sales/sales.slice'
import requestsSlice from './requests/requests.slice'
import partnersSlice from './partners/partners.slice'
import utilsSlice from './utils/utils.slice'
import transactionsSlice from './transactions/transactions.slice'

export const store = configureStore({
    reducer : {
        partnersState : partnersSlice,
        messagesState : messagesSlice,
        chatRoomsState : chatRoomsSlice,
        eventsState : eventsSlice,
        requestsState : requestsSlice,
        salesState : salesSlice,
        utilsState : utilsSlice,
        transactionState : transactionsSlice
    }
})
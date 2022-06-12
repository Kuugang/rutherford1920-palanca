import { configureStore } from '@reduxjs/toolkit';
import MessagesReducer from './MessageSlice';

export default configureStore({
	reducer: {
		fetchMessagesData: MessagesReducer,
	},
});
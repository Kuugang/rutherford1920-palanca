import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const get_api_url = () => {
    if (process.env.NODE_ENV === 'production'){
        const url = "https://rutherford-palanca.herokuapp.com/api/messages"
        return url
    }else{
        const url = "http://localhost:5000/api/messages"
        return url
    }
}

const api_url = get_api_url()

export const getMessagesAsync = createAsyncThunk(
	'messages/getMessagesAsync',
	async () => {
		const resp = await fetch(api_url);
		if (resp.ok) {
			const messages = await resp.json();
			return { messages };
		}
	}
);

export const MessageSlice = createSlice({
    name: 'fetchMessagesData',
    initialState: {
        messages: [{}],
        isLoading: true
    },
    reducers : {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getMessagesAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getMessagesAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.messages = action.payload.messages
            })
	},
})

export default MessageSlice.reducer;
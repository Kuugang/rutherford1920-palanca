import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getMessagesAsync } from '../redux/MessageSlice';

function Messages() {
  const dispatch = useDispatch()

	const {messages, isLoading} = useSelector((state) => state.fetchMessagesData);

    useEffect(() => {
		dispatch(getMessagesAsync());
	}, [dispatch]);

    return (
      <>
        {messages && messages.map((message, i) => 
          <div className="message" key = {i}>
            <h3>{message.codeName}</h3>
            <p>{message.message}</p>
          </div>
        )}
      </>
    )
  }
export default Messages
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getMessagesAsync } from '../redux/MessageSlice';

function Messages() {
  const dispatch = useDispatch()

	const {messages, isLoading} = useSelector((state) => state.fetchMessagesData);

    useEffect(() => {
		dispatch(getMessagesAsync());
	}, [dispatch]);

  
  const [countdown, setCountdown] = useState({
    days: '',
    hours: '',
    minutes: '',
    seconds: '',
    distance: ''
  })

  const {days, hours, minutes, seconds, distance} = countdown

  setInterval(function() {
    var now = new Date().getTime();
    var date2 = new Date("6/12/2027");
    var countDownDate = date2.getTime()
    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    setCountdown({
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        distance: distance
    })
  }, 1000)

    return (
      <div className='messages'>
        {distance > 0 ? <div className="countdown">
          <h2>{days} {days > 1 ? "days": "day"} {hours} {hours > 1 ? "hours" : "hour"} {minutes} {minutes > 1 ? "minutes" : "minute"} {seconds} {seconds > 1 ? "seconds" : "second"}</h2>
        </div>: ''}

        {messages > 1 ? messages.map((message, i) => 
          <div className="message" key = {i}>
            <h3>{message.codeName}</h3>
            <p>{message.message}</p>
          </div>
        ): ''}
      </div>
    )
  }
export default Messages
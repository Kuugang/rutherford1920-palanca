import CreateMessage from './CreateMessage' 
import Messages from './Messages';
import { useState } from 'react';

const Home = () => {
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

    return(
        <div className = "container">
            <div className = "form">
                <h1>Rutherford's Palanca</h1>
                <CreateMessage api_url = {api_url}/>
            </div>
            {/* {distance > 0 ? <div className="countdown">
            <h2>{days} {days > 1 ? "days": "day"} {hours} {hours > 1 ? "hours" : "hour"} {minutes} {minutes > 1 ? "minutes" : "minute"} {seconds} {seconds > 1 ? "seconds" : "second"}</h2>
            </div>: ''} */}
        </div>
    )
}

export default Home
import CreateMessage from './CreateMessage' 

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

    return(
        <div className = "container">
            <div className = "form">
                <h1>Rutherford's Palanca</h1>
                <CreateMessage api_url = {api_url}/>
            </div>
        </div>
    )
}

export default Home
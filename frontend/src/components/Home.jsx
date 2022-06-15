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
                <h1>Rutherford</h1>
                <h2>19-20</h2>
                <span><h2>P A L A N C A</h2></span>
                <CreateMessage api_url = {api_url}/>
            </div>
        </div>
    )
}

export default Home


https://prod.liveshare.vsengsaas.visualstudio.com/join?5E78E472AF84777A484D5246267CECF5EE5B

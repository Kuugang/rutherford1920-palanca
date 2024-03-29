import { useState } from 'react'
import { animated, useTransition} from 'react-spring'

function CreateMessage({api_url}) {

    const [isSending, setIsSending] = useState(false)

    const [formData, setFormData] = useState({
        recipient: '',
        codeName: '',
        message: ''
    })

    const { recipient, codeName, message } = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = async(e) =>{
        setIsSending(true)
        e.preventDefault()

        if ((formData.message).trim().length > 0 && (formData.codeName).trim().length > 0) {
            try {
                const resp = await fetch(api_url, {
                    method: "POST",
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify(formData)
                });
                                
                if (resp.ok){
                    setIsSending(false)
                    setFormData({
                        recipient: '',
                        codeName: '',
                        message: ''
                    })
                    return resp;
                }
            } catch (e) {
                return e;
            }   
        }else{
            alert("Please fill all the fields")
            setIsSending(false)
            return
        }
    }

    const names = [
        {"name" :"Amores, Carl", "email" : "nikkoboyamoress@gmail.com"},
        {"name" :"Bajo, Jake", "email" : "jakebajo21@gmail.com"},
        {"name" :"Bustaliño, Aidan", "email" : "SoheeGT0912@gmail.com"},
        {"name" :"Cagalitan, Jhon", "email" : "jhoncagalitan24@gmail.com"},
        {"name" :"Elumba, Lemuel", "email" : "lemuelelumba0729@gmail.com"},
        {"name" :"Garcia, Rudz", "email" : "rudzcullin12@gmail.com"},
        {"name" :"Herrera, Germaine", "email" : "germaineconan24@gmail.com"},
        {"name" :"Locsin, Jojene", "email" : "ianlocsin70@gmail.com"},
        {"name" :"Macatual, Cyril", "email" : "cyrilmacatual14@gmail.com"},
        {"name" :"Omaguing, Micole", "email" : "omaguing.nino007@gmail.com"},
        {"name" :"Orong, Marc", "email" : "marcorong.03@gmail.co`m "},
        {"name" :"Vergara, Jon", "email" : "Vergarajon30@gmail.com"},
        {"name" :"Villejo, Luigi", "email" : "villejolm@gmail.com"},
        {"name" :"Zapanta, Franz", "email" : "franzzapanta1033@gmail.com"},
        {"name" :"Alicante, Justine", "email" : "mizukijustine@gmail.com"},
        {"name" :"Banawan, Treshia", "email" : "treshiamae07@gmail.com"},
        {"name" :"Dengal, Arnee", "email" : "arneedengal4@gmail.com "},
        {"name" :"Duhaylungsod, Mabel", "email" : "mabelduhaylungsod@gmail.com"},
        {"name" :"Euhengco, Heart", "email" : "heuhengco9@gmail.com"},
        {"name" :"Luce, Kate", "email" : "kateluce570@gmail.com"},
        {"name" :"Mira, Keren", "email" : "kerenmichelle7@gmail.com"},
        {"name" :"Morandarte, Sol", "email" : "morandartesol@gmail.com"},
        {"name" :"Pacuyao, Ruth", "email" : "hisokagobrrt@gmail.com"},
        {"name" :"Panong, Kylla ", "email" : "kyllapanong@gmail.com"},
        {"name" :"Salas, Marnie", "email" : "marniesalas15@gmail.com"},
        {"name" :"Sinconiegue, Gale", "email" : "andreasinz447@gmail.com"},
        {"name" :"Sorronda, Melanie", "email" : "sorrondamelanie@gmail.com"},
        {"name" :"Tabañag, Althea", "email" : "tabanagag@gmail.com"},
        {"name" :"Villadarez, Niña", "email" : "villadareznn@gmail.com"}
    ]

    const fade_in = useTransition(isSending, {
        from : {opacity: 0},
        enter : {opacity: 1},
        leave: {opacity: 0},
        config: {duration: 200}
    })

    return (
        <div>
            <form autoComplete = "off" onSubmit={onSubmit} method="POST">
                <div className="section">
                    <div className = "field">
                        <label>Recipient</label>
                        <select
                        value = {recipient}
                        name = 'recipient'
                        required
                        onChange = {onChange}
                        >
                            <option value="" defaultValue disabled>Kinsa man?</option>
                            {names.map((name, i) =>
                                <option value={name.email} key = {i}>{name.name}</option>
                                )}
                        </select>
                    </div>

                    <div className = "field">
                        <label>CodeName</label>
                        <input 
                        className = "codename_field"
                        required
                        type="text"
                        placeholder='codename nimo ambut'
                        name = "codeName"
                        value = {codeName}
                        onChange = {onChange} />
                    </div>

                    </div>  
                        <label>Message</label>
                        <textarea 
                        type="text" 
                        className = "text-field"
                        required
                        name = 'message'
                        value = {message}
                        placeholder = "Your message..."
                        onChange={onChange}
                        rows= '10'
                        cols='10' 
                        />
                    <div>
                        <button className="submitBtn">Submit</button>
                    </div>
            </form>
            
            <div>
                {fade_in((style, item) => 
                item ? 
                <animated.div style = {style}>
                    <div className = "backdrop">
                        <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                        <h2>Sending Your Message</h2>
                        <h3>If you have any questions or encounter issues, please contact Jake Hamoy Bajo</h3>
                    </div>
                </animated.div>
                : ''
                )}
            </div>
        </div>
    )
}
export default CreateMessage
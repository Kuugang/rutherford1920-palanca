const asyncHandler = require('express-async-handler')
const Message = require('../models/messageModel')
var nodemailer = require('nodemailer')
const path = require('path')
const hbs = require('nodemailer-express-handlebars')
const { google } = require('googleapis')

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
)

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const currentDate = () => {
    let dt = new Date();
    year  = dt.getFullYear();
    month = 1 + dt.getMonth()
    day = dt.getDate()
    date_now = (month + "/" + day + "/" + year)
    return date_now
}

async function sendMail(accessToken, codeName, recipient, message){
    try{
        
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'rutherfordpalanca@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            }
        })

        const handlebarOptions = {
            viewEngine: {
                partialsDir: path.resolve(__dirname, '../views/'),
                defaultLayout: false,
            },
            viewPath: path.resolve(__dirname, '../views/'),
        };

        transport.use('compile', hbs(handlebarOptions))

        const mailOptions =  {
            from: 'Rutherford Palanca <rutherfordpalanca@gmail.com> ',
            to: recipient,
            subject: 'Rutherford Palanca',
            template: 'email',
            context: {
                codeName: codeName,
                recipient: recipient,
                message: message
            }
        }

        const result = await transport.sendMail(mailOptions);
        return result;

    }catch (error){
        return error
    }
}

const createMessage = asyncHandler(async (req, res) => {
    if (!req.body.message){
        res.status(400)
        throw new Error('Please add a text field')
    }

    const dbMessage = await Message.create({
        codeName: req.body.codeName,
        recipient: req.body.recipient,
        message: req.body.message
    })

    const accessToken = await oAuth2Client.getAccessToken()

    const codeName = req.body.codeName
    const recipient = req.body.recipient
    const message = req.body.message

    sendMail(accessToken, codeName, recipient, message)
    .then(result => {
        console.log(result)
        res.sendStatus(200)
        })
    .catch(error => console.log(error.message))
})

const getMessages = asyncHandler(async (req, res) => {
    const d_date = "6/12/2027"
    const current_date = currentDate()
    if (d_date === current_date){
        const messages = await Message.find({})
        console.log(messages)
        res.status(200).json(messages)
    }else{
        res.status(200)
    }
})

module.exports = {
    createMessage,
    getMessages
}
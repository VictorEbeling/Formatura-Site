if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser')

const cert = fs.readFileSync(
    path.resolve(__dirname, `./certificados/${process.env.EFI_CERT}`)
);

const agent = new https.Agent({
    pfx: cert,
    passphrase: '',

});

const credentials = Buffer.from(`${process.env.EFI_CLIENT_ID}:${process.env.EFI_CLIENT_SECRET}`).toString('base64');


const app = express();
app.use(bodyParser.json)
const port = 3000;
const router = express.Router();

app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    res.render('index')
});

app.get('/presentes', (req, res) => {
    res.render('gifts')
})

app.get('/checkout/:price', async (req, res) => {
    

    const price = parseInt(req.params.price)

    const authResponse = await axios({
        method: 'POST',
        url: `${process.env.EFI_ENDPOINT}/oauth/token`,
        headers: { 
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json'
        },
        httpsAgent: agent,
        data: {
            grant_type: 'client_credentials'
        }
    })

    app.post('/webhook(/pix)?', (req, res) => {
        console.log(req.body);
        res.send('200');
    });
    
    
    
    const accessToken = authResponse.data?.access_token;

    const reqEFI = axios.create({
        baseURL: process.env.EFI_ENDPOINT,
        httpsAgent: agent,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });

    const dataCob = {
        
        calendario: {
            'expiracao': 3600
        },
        valor: {
            original: `${price.toString()}.00`
        },
        chave: '72036087000',
        solicitacaoPagador: 'Obrigado Pelo Presente!'
    }

    const cobResponse = await reqEFI.post('v2/cob', dataCob);

    const qrcodeResponse = await reqEFI.get(`/v2/loc/${cobResponse.data.loc.id}/qrcode`)

    res.render('checkout', {qrcodeImage: qrcodeResponse.data.imagemQrcode})

})

app.listen(port, () => {
    console.log('running')
})

    





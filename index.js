const express = require('express');
const app = express();
const PORT = 8080;
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

app.use(express.json());

app.listen(
  PORT,
  () => console.log(`It's alive on http://localhost:${PORT}`)
);

app.post('/bomb', (req, res) => {
    
    const{ serial } = req.body;
    const{ batteries } = req.body;
    const{ ports } = req.body;
    const{ lit }  = req.body;
    const{ unlit } = req.body;
    const{ tfa } = req.body;

    let msg = `**Serial** \`\`\`${serial}\`\`\`
`
    if (batteries !== 'none'){
        var bats = batteries.substring(batteries.indexOf('batteries')-2, batteries.indexOf('batteries')-1)
        var hold = batteries.substring(batteries.indexOf('holders')-2, batteries.indexOf('holders')-1)
    msg = `${msg}**${bats}** __batteries__ 
**${hold}** __Battery Holders__
`
    }

    if (lit !== 'none'){
        let str = ''
        y = lit.split(" ")
        for (x in y){
            if (y[x] !== `then`){
                str = str + '⚪️' + y[x].toUpperCase() + ' '
            }else{

                continue
            }

        }
        msg= msg + str + `
`
    }

    if (unlit !== 'none'){
        let str = ''
        y = unlit.split(" ")
        for (x in y){
            if (y[x] !== `then`){
                str = str + '⚫️' + y[x].toUpperCase() + ' '
            }else{

                continue
            }

        }
        msg= msg + str + `
`
    }
    if (ports !== 'none'||'no'){
        y = 0
        str = ''
        x = ports.split("port")
        console.log(`This is x  ${x}`)
        for (port in x){
            console.log(`${x[port]} ${typeof(port)}`)
            strmod = y%2 == 0 ? "+" : "-";
            str = str + strmod + x[port].toUpperCase() + '\n'
            y++
        }
        msg = `${msg} \`\`\`diff
${str} 
        \`\`\`` 
    }


    const data = JSON.stringify({
        "content": msg
      });
    const xhr = new XMLHttpRequest()
    xhr.withCredentials = true
    
    xhr.addEventListener('readystatechange', function() {
        if (this.readyState === this.DONE) {
          console.log(this.responseText)
          res.status(200).send({
            sent: msg,
            discord: this.responseText
    
        })
        }
      })

    xhr.open('POST', 'https://discord.com/api/webhooks/879553257633103982/UhHZ40OhcuTui6O-UzsALQnkT-waQvo59Xk373mmbn_tag7o8lJ70eWAE-BdvKy2sFYk')
    xhr.setRequestHeader('Content-Type', 'application/json')
    //xhr.setRequestHeader('authorization', 'Bearer 123abc456def')
    xhr.send(data)
    
    

});
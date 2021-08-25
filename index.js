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
        y = batteries.split(" ")
        for (x in y){
        if (y[x] == "batteries" ){
           bats = y[x-1]
        } else if(y[x].includes("hold")){
            hold = y[x-1]
        }
    }
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

    xhr.open('POST', 'https://discordapp.com/api/webhooks/879900495538434069/OObLA_edZsZbVSc7za1dDjW_T67D4goVD3Mw8obwMtf8JwHVSJdy3D5Ir-a-GX9QfVva')
    xhr.setRequestHeader('Content-Type', 'application/json')
    //xhr.setRequestHeader('authorization', 'Bearer 123abc456def')
    xhr.send(data)
    
    

});
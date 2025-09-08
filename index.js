/*
    If you are complexed as to why some console.log() statements
    are commented out its because they are for debugging :O
*/

const express = require('express');
const apitestingJS = require('./apitesting')

const app = express();

const PORT = 3000;

let userDataArray = [];

app.use( express.json() )

app.listen(
    PORT,
    () => console.log(`Its alive on http://localhost:${PORT}`)
);

app.get('/help', (req,res) => {
    res.status(200).send({
        options: "To see all availible commands go see the github README at: https://github.com/bytepilotx/my-express-api"
    })
})

app.get('/tshirt', (req, res) => {
    res.status(200).send({
        brand: "Adidas",
        age: 2
    })
})

app.get('/kanyequote', (req, res) => {
    const quote = apitestingJS.getKanyeQuoteAPI().then(
        quote => {
            const formattedQuote = quote.quote;
            res.status(200).send({
                quote: formattedQuote,
                description: "YES i know i just called an API from an API but this is just to test my skills"
            })
        }
    )
})

app.post('/tshirt/:id', (req,res) => {
    const { id } = req.params;
    const { brand } = req.body;
    if (!brand) {
        res.status(400).send({
            message: "Body is missing"
        })
    }

    res.send(
        {
            tshirt: `T-shirt with brand, ${brand} and id of, ${id}`
        }
    )
})

app.post('/addArray', (req,res) => {

    const JSON = req.body;

    const JSONsize = Object.keys(JSON).length; 

    if ("name" in JSON && "age" in JSON && JSONsize <= 2) {

        const name = JSON["name"];

        const age = JSON["age"];

        if (scanArrayForExistingValues(name,age) == true) {

            res.status(400).send({
                message: "These values already exist in the saved array. This is to prevent duplication",
                dataArray: userDataArray
            })

        } else {

            userDataArray.push(`(${name},${age})`);

            //console.log(scanArrayForExistingValues(name,age));

            //console.log(userDataArray);

            //console.log(`{ name: '${name}', id: '${age}' }`);
        }
    } else {

        res.status(400).send({

            message: "Your keys are not formatted correctly. Your JSON should contain a 'name' and 'age' key."

        })
    }
    //console.log(JSONsize);
    res.status(200).send({
        message: "Your data has been saved to the array :D. The body key contains what you POSTed to the server",
        body: req.body,
        params: req.params,
        currentArray: userDataArray
    })
})

app.get('/getArray', (req,res) => {
    res.status(200).send({
        NameAndAgesArray: userDataArray
    })
})

function scanArrayForExistingValues(name,age) {

    if (userDataArray.includes(`(${name},${age})`)) {

        return true;

    } else {

        return false;

    }
}

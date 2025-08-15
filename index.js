const express = require('express');
const apitestingJS = require('./apitesting')

const app = express();

const PORT = 8080;

app.use( express.json() )

app.listen(
    PORT,
    () => console.log(`Its alive on http://localhost:${PORT}`)
);

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
        res.status(418).send({
            message: "Body is missing"
        })
    }

    res.send(
        {
            tshirt: `T-shirt with brand, ${brand} and id of, ${id}`
        }
    )
})
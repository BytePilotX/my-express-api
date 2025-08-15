const express = require('express');
const cors = require('cors');

const app = express();

const PORT = 8080;

app.use( express.json() )
app.use(cors());

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
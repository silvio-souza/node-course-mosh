const express = require ('express');
const Joi = require ('joi');

const app = express();

app.use(express.json());


function validateGenre(genres) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(genres, schema);
}

const genres = [
    {id: 1, name: "Action"},
    {id: 2, name: "Adventure"},
    {id: 3, name: "Romance"},
    {id: 4, name: "Fantasy"},
    {id: 5, name: "Horror"},
    {id: 6, name: "Science Fiction"},
    {id: 7, name: "Animation"}
];

app.get('/', (req, res) => {
    res.send('Welcome to Vidly!!');
});

app.get('/api/genres', (req, res) => {
    res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre ID was not found');
    res.send(genre);
})


app.post('/api/genres', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };

    genres.push(genre);
    res.send(genre);
    }
)

app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre ID was not found');
    res.send(genre);

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    genre.name = req.body.name;
    res.send(genre);
})

app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre ID was not found');
    res.send(genre);

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);
})


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
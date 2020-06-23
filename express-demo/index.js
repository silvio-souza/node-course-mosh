const express = require ('express');
const Joi = require ('joi');
const logger = require ('./logger');

const app = express();

app.use(express.json());
app.use(express.urlencoded( { extended: true} ));
app.use(express.static('public'));

app.use(logger.log);
app.use(logger.aut);

const courses = [
	{id: 1, name: 'course1'},
	{id: 2, name: 'course2'},
	{id: 3, name: 'course3'}
];


app.get('/', (req, res) => {
	res.send("Hello World");
});

app.get('/api/courses', (req, res) => {
	res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
	const course = courses.find(c => c.id === parseInt(req.params.id));
	if (!course) return res.status(404).send(`The course with the informed ID was not found.`);
	res.send(course);
});


app.post('/api/courses', (req, res) => {
	// //INICIO EXEMPLO VALIDACAO PADRAO EXPRESS
	// if (!req.body.name) {
	// 	// 400 bad request
	// 	res.status(400).send('Name is required');
	// 	return;
	// }
	// if (req.body.name.length < 3) {
	// 	// 400 bad request
	// 	res.status(400).send('Name should be minimum 3 characters')
	// 	return;
	// }
	// FIM VALIDACAO PADRAO EXPRESS
	


	//EXEMPLO VALIDACAO USANDO JOI
	const { error } = validateCourse(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	
	const course = {
		id: courses.length + 1,
		name: req.body.name
	};
	courses.push(course);
	res.send(course);
})


app.put('/api/courses/:id', (req, res) => {
	//Validar se o curso (ID) existe
	const course = courses.find(c => c.id === parseInt(req.params.id));
	if (!course) return res.status(404).send(`The course with the informed ID was not found.`);
	
	const { error } = validateCourse(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	//Update do resultado
	course.name = req.body.name;
	res.send(course);

})

app.delete('/api/courses/:id', (req, res) => {
	const course = courses.find(c => c.id === parseInt(req.params.id));
	if (!course) return res.status(404).send('The course with the informed ID was not found');

	//Delete
	const index = courses.indexOf(course);
	courses.splice(index, 1);
	
	res.send(course);
	
})

function validateCourse(course) {
	const schema = {
		name: Joi.string().min(3).required(),
	};

	return Joi.validate(course, schema);
}




const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
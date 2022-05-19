const { response } = require('express');
const express = require('express');
const app = express();
const port = 8080;

app.use(express.static('public'));

app.get('/', (require, response) => {
	response.sendFile(`${__dirname}/index.html`);
});

app.listen(port, () => {
	console.log(`App listen on port ${port}`);
});

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
// Middleware
app.use(cors());

// Tweets of a symbol or multiple symbols.
app.get('/symbols/:symbols', (req, res) => {
	console.log(req.params.symbols);
	const symbols = JSON.parse(req.params.symbols);
	const promises = symbols.map(async symbol => {
		const response = await axios.get(
			`https://api.stocktwits.com/api/2/streams/symbol/${symbol}.json`
		);
		return response.data;
	});

	Promise.all(promises)
		.then(data => {
			res.json(data);
		})
		.catch(err => {
			console.log(err);
			res.json(err);
		});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

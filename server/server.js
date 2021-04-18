const app = require('express')();
const cors = require('cors');
const parser = require('body-parser');
require('dotenv').config();

app.use(cors());
app.use(parser.json());

app.get('/', (req, res, next) => {
	res.send('Hi');
});

// Route imports
const userRouter = require('./routers/user.route');
app.use('/', userRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server up and running at ${port}`));

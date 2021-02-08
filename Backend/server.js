const express = require('express');
const app = express();
const routes = require('./app/routes/route.js');
const path = require('path')
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname + '/assets')));
app.use('/uploads', express.static('uploads'))
app.use(cors());

app.use('/app', routes);

app.listen(PORT, () => {
    console.log(`Server running at Port : ${PORT}`);
})
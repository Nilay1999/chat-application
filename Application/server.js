const express = require('express');
const app = express();
const routes = require('./app/routes/route.js');
const path = require('path')
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname + '/assets')));
app.use('/uploads', express.static('uploads'))

app.get('/', routes);

app.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}`);
})
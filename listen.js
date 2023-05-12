const app = require('./app/app.js');
const {PORT = 900} = process.env;

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}...`)
})
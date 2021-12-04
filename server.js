const app = require('./index')
const port = process.env.PORT || 3000

app.listen(port, (err) => {
    if (err) throw err
    console.log(`Server is running on port:${port}`)
})
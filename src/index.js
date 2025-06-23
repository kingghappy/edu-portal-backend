import express from 'express'

const app = express()

const PORT = 5000

app.post('/api', (req, res) => {
    res.json({message: 'hiii'})
})

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}` )
})
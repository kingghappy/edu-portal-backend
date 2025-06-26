import express from 'express'
import cors from 'cors'


import connDB from './config/db/connMongo.js'

import adminRoute from './routes/admin.route.js'
import authRoute from './routes/auth.route.js'
import userRoute from './routes/user.route.js'

const app = express()
app.use(express.json());
app.use(cors());

const PORT = 5000

app.use('/api/admin', adminRoute)
app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)


// connect to db
connDB()

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}` )
})
require('./models/User');
require('./models/Track');
const express = require('express'); 
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes')
const bodyParser = require('body-parser'); 
const requireAuth = require('./middlewares/requireAuth')

const app = express();

app.use(bodyParser.json())
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = 'mongodb+srv://shahab:shahab713@tracking.hooixnm.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongoUri)

mongoose.connection.on('connected',()=>{
    console.log("MongoDB is Connected!")
})

mongoose.connection.on('error',(err)=>{
    console.error('Error connecting MongoDB', err)
})

app.get('/', requireAuth, (req,res)=>{
    res.send(`Your Email:${req.user.email}`); 
}); 

app.listen(3000, ()=>{
    console.log('Listening on port 3000'); 
}); 


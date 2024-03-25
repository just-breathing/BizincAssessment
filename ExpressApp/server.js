const express = require("express");
const passport = require('passport');
const session = require("express-session")
const data = require("./data.json");
const requestLogger  = require("./Middleware/logger");
require('dotenv').config();
const userRoutes = require('./Routes/usersRoute.js');
const blogRoutes = require("./Routes/blogRoutes.js");
const { isAuthenticated ,localStrategy,extractAuthCreds} = require("./Middleware/Auth/Authentication.js");
const {Blogpool:pool} = require("./controllers/dbconnectionPool.js");
const { createUser } = require("./controllers/blogController.js");

const app = express()
const port = process.env.EXPRESS_SERVER_PORT||5200;


app.use(requestLogger)

passport.use(localStrategy);

// Middleware for session management
app.use(session({
    secret: 'Sundeep Reddy',
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge:60000*60
    }
}));


app.use(express.json())


// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user.email);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
    try {

        // Find user by ID in PostgreSQL
        const query = 'SELECT email,password FROM Users WHERE email = $1';
        const { rows } = await pool.query(query, [id]);
        done(null, rows[0]);
    } catch (error) {
        done(error);
    }
});

app.get("/", (req, res) => {
    res.json({msg:"hi"})
})


// create new User
app.post('/user', async (req, res) => {
    try {
      const {email,password,full_name,bio}=req.body;
      const data = await createUser(email,password,full_name,bio);
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: `new user creation error : ${err}` });
    }
  });

app.use('/api/v1/users', userRoutes);
app.use("/api/v1/blog",extractAuthCreds, passport.authenticate("local"), blogRoutes);



app.listen(port,()=>{
    console.log(`listening on port : ${port}`);
})
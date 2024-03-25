const {Strategy} = require('passport-local');
const {Blogpool:pool} = require('../../controllers/dbconnectionPool'); 
const {verifyHash} = require("../../Utils/passwordHash")


// Custom middleware to extract Basic Auth credentials from request headers
const extractAuthCreds = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Basic ')) {
        return res.status(401).json({ message: 'Unauthorized - Basic Auth credentials missing : ' });
    }

    // Extract username and password from the authorization header
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [email, password] = credentials.split(':');

    // Add username and password to request body
    req.body = {...req.body, email, password };

    next();
};


const localStrategy = new Strategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        // Log the email and password received by the local strategy


        // Find user by email in PostgreSQL
        const query = 'SELECT email,password FROM Users WHERE email = $1';
        const { rows } = await pool.query(query, [email]);

        // If user not found
        if (rows.length === 0) {
            return done(null, false, { message: 'Incorrect email or password' });
        }

        // Verify password
        const hashedPassword = rows[0].password;
        if (!(await verifyHash(password, hashedPassword))) {
            return done(null, false, { message: 'Incorrect email or password' });
        }

        // If user found and password matches
        return done(null, rows[0]);
    } catch (error) {
        return done(error);
    }
});





module.exports={localStrategy,extractAuthCreds}
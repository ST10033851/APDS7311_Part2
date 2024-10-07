import LoginAttempt from '../models/LoginAttempt.js'

const LoginAttemptLogger = async (req, res, next) => {
    // Store the original res.json function
    const originalJson = res.json.bind(res); // Ensure `this` context is bound to the response

    res.json = function (data) {
        // Get the username and IP address from the request
        const username = req.body.username;
        const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress;

        // Determine if the login attempt was successful
        const successfulLogin = !data.message || data.message !== 'Invalid credentials';

        // Create a new login attempt log
        LoginAttempt.create({ username, ipAddress, successfulLogin })
            .catch(err => console.log('Error logging login attempt:', err));

        // Call the original res.json function with the provided data
        originalJson(data); // Call the original function directly
    };

    // Call the next middleware
    next();
};

export default LoginAttemptLogger;
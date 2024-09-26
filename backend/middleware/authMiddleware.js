import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

const authMiddleware = (req, res, next) => {
    console.log(`Request Headers:`, req.header)

    const authHeader = req.header('Authorization');
    console.log('Authorization Header:', authHeader);

    if(!authHeader){
        return res.status(401).send('Access denied. No token provided.');
    }

    const parts = authHeader.split(' ');
    if(parts.length !== 2){
        return res.status(401).json({message: 'Authorization header format must be bearer token'})
    }

    const token = parts[1];
    console.log('Token:', token);

    if(!token){
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('Decoded:', decoded)
        req.user = decoded;
        next();
    } catch (err) {
        console.error('Token verification failed:', err);
        if(err.name === 'JsonWebTokenError'){
            return res.status(401).json({message:'Invalid token, Access Denied'});
        }
        else if (err.name === 'TokenExpiredError', err){
            return res.status(401).json({messsage:'Token has expired, Access Denied'});
        }
        res.status(500).json({message: 'Server error during authentication', error:err})
    }
};

export default authMiddleware;
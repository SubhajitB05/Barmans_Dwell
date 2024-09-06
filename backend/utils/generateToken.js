import jwt from 'jsonwebtoken';

const generateToken = (user)=>{
    const payload = {
        _id: user._id,
        name:user.firstName +" "+ user.middleName +" "+ user.lastName,
        email:user.email,
        phoneNumber:user.phoneNumber,
        aadhaarNumber:user.aadhaarNumber,
        role: user.role
    }
    const token = jwt.sign(payload,process.env.SECRET_KEY,{expiresIn: '2h'});
    return token;
}

export {generateToken};
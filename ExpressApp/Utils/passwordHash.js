const bcrypt = require("bcryptjs");
const saltRounds = 10; // Number of salt rounds


const generateHash = async (pwd) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(pwd, salt);
        return hash;
    } catch (error) {
        console.error('Error generating hash:', error);
        throw error;
    }
};

const verifyHash = async(password, hashedPassword)=>{
    if (!(await bcrypt.compare(password, hashedPassword))) {
        return false
    }

    // If user found and password matches
    return true;
}
module.exports={generateHash,verifyHash};
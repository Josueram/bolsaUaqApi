require("dotenv").config();
const jwt = require("jsonwebtoken");
exports.login = async (req,res,next) => {
    try {
        const { usuario, password } = req.body;
        if (usuario === "10949" && password === "10949.") {
    
            const token = jwt.sign(
                {
                  "userType":"admin",
                },
                process.env.JWT_SECRET
              );
    
            return res.status(200).json({
                message: token,
            });
    
        } else {
            return res.status(400).json({message: "Datos incorrectos"});
        }
    } catch (error) {
        console.log(error)
        return res
        .status(500)
        .json({ message: "Error del servidor" });
    }
}

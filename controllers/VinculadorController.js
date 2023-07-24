// POST /empresas/login Loggea a un vinculador
exports.login = async (req,res,next) => {
    try {
        const { usuario, password } = req.body.data;
        if (usuario === "10949" && password === "10949.") {
    
            const token = jwt.sign(
                {
                  "user":"ADMIN",
                },
                'debugkey'
              );
    
            return res.status(200).json({
                ok: true,
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

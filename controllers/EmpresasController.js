require("dotenv").config();
const { Empresas } = require("../models/");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
// POST /empresas/login Loggea a una empresa
exports.login = async (req,res,next) => {
    try {
        const { username, password } = req.body;
        const empresa = await Empresas.findOne({ where: { username: username, status:0 } });
        
        if (!empresa) {
            return res.status(400).json({
                message: "Usuario o contraseña incorrectos"
            });
        }
    
        const hashPassword = await bcrypt.compare(password, empresa.dataValues.password)
    
        if (!hashPassword) {
            return res.status(400).json({
                message: "Usuario o contraseña incorrectos"
            });
        }

        const token = jwt.sign(
            {
              "user":empresa.id,
              "userType":"company",
            },
            process.env.JWT_SECRET
          );
    
        return res.status(200).json({token});
    } catch (error) {
        console.log(error)
        return res
        .status(500)
        .json({ message: "Error del servidor" });
    }
}

// GET /changuePassword cambia la contraseña de la empresa logeada
exports.changuePassword = async (req,res,next) => {
  try {
    const {actualPassword,newPassword} = req.body
    const empresaId = req.user
    const empresa = await Empresas.findOne({where:{id:empresaId}})
    const hashPassword = await bcrypt.compare(actualPassword, empresa.dataValues.password)

    if (!hashPassword) {
        return res.status(500).json({
            message: "Contraseña incorrecta"
        });
    }
    const hash = await bcrypt.hash(newPassword, 10)
    empresa.password = hash;
    await empresa.save()

    return res.status(200).json({ message: `Contraseña cambiada exitosamente` });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error del servidor' });
  }
}

// GET /empresas obtiene todas las empresas
exports.getAll = async (req,res,next) => {
    try {
        const companies = await Empresas.findAll({ order: [['name', 'ASC']] });
        return res.status(200).json({ companies });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error del servidor' });
      }
}


// GET /empresas obtiene una empresa
exports.getOne = async (req,res,next) => {
  try {
      const { id } = req.params;
      const { userType } = req;
  
      switch (userType) {
        case 'admin':
            // obtiene la informacion de una empresa 
          const company = await Empresas.findOne({ where: { id } });
          return res.status(200).json({ company });
        case 'company':
          const companyId = req.user;
          if (companyId === id) {
            // obtiene la informacion de una empresa logeada
            const company = await Empresas.findOne({ where: { id } });
            return res.status(200).json({ company });
          } else {
            return res.status(403).json({
              message: 'No cuentas con los permisos necesarios.',
            });
          }
      }
  
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Error del servidor' });
    }
}


// POST /empresas crea una empresa
exports.post = async (req,res,next) => {
    try {
      const data = req.body
      await Empresas.create(data)
      return res.status(200).json({message: "Solicitud enviada correctamente y en espera de aprobación."
    });

    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Error del servidor" });
    }
}

// PUT /empresas Edita completamente una empresa logeada
exports.put = async (req,res,next) => {
    try {
      const data = req.body
      console.log(data)
      const empresaId = req.user
      const empresa = await Empresas.findOne({where:{empresaId:empresaId}})
      empresa.set(data)
      await empresa.save()
    
     return res.status(200).json({ message: `${empresa.nombreEmpresa} editada correctamente` });
    } catch (error) {
        console.log(error)
        return res
        .status(500)
        .json({ message: "Error del servidor" });
    }
}

// patch /empresas Edita el status de una empresa (solo a rejected,accepted,inRevision) 
exports.patch = async (req,res,next) => {
    try {
      const { status,password,username, } = req.body;
      const {id} = req.params
      const empresa = await Empresas.findOne({ where: { id } });
        // En caso de ser accepted se requiere un usuario y una contraseña
        if(status=='accepted'){
          empresa.username = username;
          const hash = await bcrypt.hash(password, 10)
          empresa.password = hash;
        }

        empresa.status = status;
        await empresa.save()

        return res.status(200).json({
            message: "Estatus de la empresa actualizada correctamente.",
        });
    } catch (error) {
        console.log(error)
        return res
        .status(500)
        .json({ message: "Error del servidor" });
    }
}

// PUT /empresas Setea el status de una empres a deleted TODO
exports.delete = async (req,res,next) => {
    try {
      const { id } = req.body;
      const empresa = await Empresas.findOne({ where: { id } });

      empresa.status = 'deleted';
      await empresa.save()

    } catch (error) {
        console.log(error)
        return res
        .status(500)
        .json({ message: "Error del servidor" });
    }
}
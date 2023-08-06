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
            'debugkey'
          );
    
        return res.status(200).json({token});
    } catch (error) {
        console.log(error)
        return res
        .status(500)
        .json({ message: "Error del servidor" });
    }
}


// GET /empresas?id=number obtiene todas las empresas, si se le da una id obtiene una sola empresa
// si una empresa logeada hace la solicitud obtiene solo lo de ella
// si un vinculador logeado hace la solicitud puede obtener todo
exports.get = async (req,res,next) => {
    try {
        const { id } = req.query;
        const { userType } = req;
    
        switch (userType) {
          case 'admin':
            if (typeof id === 'undefined') {
                // obtiene todas las empresas
                const companies = await Empresas.findAll({ order: [['name', 'ASC']] });
                return res.status(200).json({ companies });
            } else if (typeof id === 'number') {
                // obtiene una empresa
                const company = await Empresas.findOne({ where: { id } });
                return res.status(200).json({ company });
            }
            break;
    
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

// PUT /empresas Edita completamente una empresa
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

// PUT /empresas Edita el status de una empresa (solo a rejected,accepted,inRevision) o cambia su contraseña
// si una empresa logeada hace la solicitud no puede cambiar el status
exports.patch = async (req,res,next) => {
    try {
      const { status, id,password,username,actualPassword,newPassword } = req.body;
      // No mando el status lo que significa que esta cambiando la contraseña
      if(typeof status == 'undefined'){
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

      }else {
        const empresa = await Empresas.findOne({ where: { empresaId: id } });

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
      }

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
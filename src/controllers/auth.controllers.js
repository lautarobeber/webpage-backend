import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import { User } from "../models/sql_models/users.model.js";
import { Cart } from "../models/sql_models/cart.model.js";

export const register = async (req, res) => {
  const { email, name, surname, password } = req.body;
  if(!email) return res.status(400).send(['El email es requerido' ]);
  try {
    const userFound = await User.findOne({
      where: {
        email: email,
      },
    });
    if (userFound) return res.status(400).json(["El email ya esta en uso"]);
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email: email,
      firstName: name,
      lastName: surname,
      password: passwordHash,
    });

    const cartFound = await Cart.findOne({
      where: {
        id_user: email,
      },
    });

    if (cartFound){
      console.log("Se encontró un carrito ya para este usuario");
      return res.status(400).json(['este usuario ya tiene carrito'])
    }else{
      await Cart.create({
        id_user: email,
      });
    }
      

   

    /* const userSaved = await newUser.save(); */

    const token = await createAccessToken({ email: newUser.email });

    res.cookie("token", token);
    res.json({
      name: newUser.firstName,
      email: newUser.email,
      message: "successful registration!",
      /*  createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt, */
    });
  } catch (error) {
    res.status(500).json([error.message ]);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;


  if(!email) return res.status(500).json(['internal server error'])
  
  
  try {
    const userFound = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!userFound) {
      return res.status(400).json(["Usuario no encontrado" ]);
    }
    
    //devuelve true o false
    const isMatch = await bcrypt.compare(password, userFound.password);
    
    if (!isMatch) {
      return res.status(400).json(["Contraseña incorrecta"]);
    }
    
    const token = await createAccessToken({ email: userFound.email });
    
  

    res.cookie("token", token);
    res.json({
      

      email: userFound.email,
      name: userFound.firstName
    });
  } catch (error) {
    res.status(500).json([error.message] );
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {

  try{

    const userFound = await User.findById(req.user.id);
    
    if (!userFound) return res.status(400).json({ message: "profile not found" });
    
    return res.json({
    id: userFound._id,
    username: userFound.firstName,
    surname: userFound.lastName,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
}catch(e){
  console.log(e);
  return res.status(500).json({message:"Server Error"});
}
};

export const verifyToken = async (req, res) => {

  const { token } = req.cookies;

 
  if (!token) return res.status(401).json({ message: "not authorized" });
  try{


  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "not authorized" });
   
    const userFound = await User.findOne({
      where: {
        email: user?.email,
      },
    });
    if (!userFound) return res.status(401).json({ message: "not authorized" });

    return res.json({
      /* id: userFound._id, */
      name: userFound.firstName,
      surname: userFound.lastName,
      email: userFound.email,
      admin: userFound.admin
    });
  });
}catch(e){
    return res.status(500).send("Server error")
}
};


export const setAdmin = async (req, res) => {
  const {email} = req.body
  if(!email){
    return res.status(500).json({message: "Internal Server Error"})
  }
  try{
    const userFound = await User.findOne({
      where: {
        email: email,
      },
    });

    if(!userFound) return res.status(404).json({message: 'User not found'})

   
    //update user
    await userFound.update({ admin: true });

    res.status(200).json({ message: 'User updated successfully', user: userFound });

  }catch (error) {
    console.error('Error al actualizar usuario:', error);
  }
}
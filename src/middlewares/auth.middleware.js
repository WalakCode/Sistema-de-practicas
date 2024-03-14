const jwt = require("jsonwebtoken");


const authToken = (req, res, next) => {
  if (!req.cookies || !req.cookies.jwt) {
    const error = "Token de autenticación no encontrado.";
    console.log(error)
    return res.render('main.ejs');
  }

  let token = req.cookies.jwt;

  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }

  jwt.verify(token,process.env.SK || 'CLAVESECRETA', (err, decodedToken) => {
    if (err) {
      const error = "Token de autenticación inválido.";
      console.log(error)
      return res.render('main.ejs');
    } else {
      // Si el token es válido, puedes adjuntar la información del usuario decodificado a la solicitud
      req.user = decodedToken;
      next();
    }
  });
};

module.exports = {
  authToken
}

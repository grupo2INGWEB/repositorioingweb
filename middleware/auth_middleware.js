const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' })


module.exports = (req, res, next) => {
    // Obtiene el JWT que se envia en la consulta
    const authHeader = req.get('Authorization');

    if (authHeader) {
        try {
            // Separar el bearer del token
            // 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYjY4YWM5ZWRmMDdmMGMwZjY0MTMzNiIsIm5vbWJyZSI6IkNyaXN0aWFuIExvemFubyIsInJvbCI6ImFkbWluIiwiZW1haWwiOiJjcmlzZGF2bG96OThAZ21haWwuY29tIiwiaWF0IjoxNjIzMTcxMzA4fQ.L4wXFu6TpZ1VDVy4EaqMtqtd8GXP1PipnDoGcMEOZAQ'
            const token = authHeader.split(' ')[1];
            // VERIFICAR EL TOKEN
            const usuario = jwt.verify(token, process.env.SECRETA);
            // aGREAGR UNA PROPIEDAD
            // req={
            // pr1: asdasdasd
            // }
            req.usuario = usuario
            // req={
            // pr1: asdasdasd
            // usuario: 
            // }
        } catch (error) {
            req.error = "Error en el servidor"
            console.log("Error en el JWT. Function authenticatedUser");
            console.log(error);
        }
    } else {
        req.error = "No estas autorizado."
    }
    // PASAS AL SIGUIENTE METODO
    return next();
}
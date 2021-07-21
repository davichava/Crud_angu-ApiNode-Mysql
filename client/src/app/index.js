// ensayo de Json Web Token

const express = require('express'),
      bodyParser = require('body-parser'),
      jwt = require('jsonwebtoken'),
      app = express(); 
	  
const config = {
	llave : "miclaveultrasecreta3104371351*"
};

// 1
app.set('llave', config.llave);

// 2
app.use(bodyParser.urlencoded({ extended: true }));

// 3
app.use(bodyParser.json());

app.listen(3000,()=>{
    console.log('Servidor iniciado en el puerto 3000') 
});

// 4
app.get('/', function(req, res) {
    res.json({ message: 'recurso de entrada' });
});

// 5
app.post('/autenticar', (req, res) => {
    if(req.body.usuario === "david" && req.body.contrasena === "holamundo") {
		const payload = {
			check:  true
		};
		const token = jwt.sign(payload, app.get('llave'), {
			expiresIn: 1440
		});
		res.json({
			mensaje: 'Autenticación correcta',
			token: token
		});
    } else {
        res.json({ mensaje: "Usuario o contraseña incorrectos"})
    }
})

// 6
const rutasProtegidas = express.Router(); 
rutasProtegidas.use((req, res, next) => {
    const token = req.headers['access-token'];
	
    if (token) {
      jwt.verify(token, app.get('llave'), (err, decoded) => {      
        if (err) {
          return res.json({ mensaje: 'Token inválida' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.send({ 
          mensaje: 'Token no proveída.' 
      });
    }
 });

app.get('/datos', rutasProtegidas, (req, res) => {
	const datos = [
		{ id: 1, nombre: "David" },
		{ id: 2, nombre: "Jacke" },
		{ id: 3, nombre: "Yo" }
	];
	
	res.json(datos);
});
const http = require('http');
const express = require('express');

const app = express();
app.use(express.json());

app.get('/', function (req, res) {

  let pagina = req.query.url;
  let url_dividida = pagina.split('/');
  let host = url_dividida[2];
  
  if(host.includes('e.ruiz')){
    console.log('Verificando host de la peticion GET');
    console.log('Host identificado como sitio virtual: e.ruiz');
    console.log('Redirigiendo petición http GET a http://sophia.javeriana.edu.co/~eruiz/index.html' + '\n------------------\n');
    res.redirect('http://sophia.javeriana.edu.co/~eruiz/index.html');
  }else if(host.includes('r.paez')){
    console.log('Verificando host de la peticion GET');
    console.log('Host identificado como sitio virtual: r.paez');
    console.log('Redirigiendo petición http GET a http://sophia.javeriana.edu.co/~rpaez/index.html' + '\n------------------\n');
    res.redirect('http://sophia.javeriana.edu.co/~rpaez/index.html');
  }else{
    console.log('Verificando host de la peticion GET');
    console.log('No pertenece a un sitio web virtual' + '\n------------------\n');
    res.redirect(pagina);
  }
});

app.post('/', (req, res)=>{
  let pagina = req.query.url;
  let url_dividida = pagina.split('/');
  let host = url_dividida[2];
  
  if(host.includes('e.ruiz')){
    console.log('Verificando host de la peticion POST');
    console.log('Host identificado como sitio virtual: e.ruiz');
    console.log(`Redirigiendo petición http POST a http://sophia.javeriana.edu.co/~eruiz/index.html`)
    console.log('Datos encontrados: ' + JSON.stringify(req.body) + '\n------------------\n');
    res.redirect('http://sophia.javeriana.edu.co/~eruiz/index.html');
  }else if(host.includes('r.paez')){
    console.log('Verificando host de la peticion POST');
    console.log('Host identificado como sitio virtual: r.paez');
    console.log('Redirigiendo petición http POST a http://sophia.javeriana.edu.co/~rpaez/index.html')
    console.log('Datos encontrados: ' + JSON.stringify(req.body) + '\n------------------\n');
    res.redirect('http://sophia.javeriana.edu.co/~rpaez/index.html');
  }else{
    console.log('Verificando host de la peticion POST');
    console.log('No pertenece a un sitio web virtual' + '\n------------------\n');
    res.redirect(pagina);
  }
});

app.listen(5050, ()=> {console.log('Escuchando en el puerto 5050' + '\n------------------\n')});

const http = require('http');
const express = require('express');

const app = express();
app.use(express.json());

app.get('/', function (req, res) {

  let pagina = req.query.url;
  
  if(pagina.includes('e.ruiz')){
    console.log('Verificando host de la peticion GET');
    console.log('Host identificado como sitio virtual: e.ruiz');
    console.log(`Redirigiendo petición http GET a http://sophia.javeriana.edu.co/~eruiz/index.html`)
    res.redirect('http://sophia.javeriana.edu.co/~eruiz/index.html');
  }else if(pagina.includes('r.paez')){
    console.log('Verificando host de la peticion GET');
    console.log('Host identificado como sitio virtual: r.paez');
    console.log('Redirigiendo petición http GET a http://sophia.javeriana.edu.co/~rpaez/index.html')
    res.redirect('http://sophia.javeriana.edu.co/~rpaez/index.html');
  }else{
    console.log('Verificando host de la peticion GET');
    res.redirect(pagina);
  }
});

app.post('/', (req, res)=>{
  let pagina = req.query.url;
  
  if(pagina.includes('e.ruiz')){
    console.log('Verificando host de la peticion POST');
    console.log('Host identificado como sitio virtual: e.ruiz');
    console.log(`Redirigiendo petición http POST a http://sophia.javeriana.edu.co/~eruiz/index.html`)
    console.log('Datos encontrados: ' + JSON.stringify(req.body));
    res.redirect('http://sophia.javeriana.edu.co/~eruiz/index.html');
  }else if(pagina.includes('r.paez')){
    console.log('Verificando host de la peticion POST');
    console.log('Host identificado como sitio virtual: r.paez');
    console.log('Redirigiendo petición http POST a http://sophia.javeriana.edu.co/~rpaez/index.html')
    console.log('Datos encontrados: ' + JSON.stringify(req.body));
    res.redirect('http://sophia.javeriana.edu.co/~rpaez/index.html');
  }else{
    console.log('Verificando host de la peticion POST');
    res.redirect(pagina);
  }
});

app.listen(5050);

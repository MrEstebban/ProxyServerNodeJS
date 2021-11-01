const http = require('http');
const fs = require('fs');
const express = require('express');

const app = express();
app.use(express.json());

app.get('*', (req, res)=>{
    
  let hostName = req.hostname;
  let pathReq = req._parsedUrl.path;
  let infoPeticion = `${req.method} ${req.originalUrl} HTTP/ ${req.httpVersion} \nProxy-Connection: ${req.headers['proxy-connection']} \nUser-Agent: ${req.headers['user-agent']} \nCache-Control: ${req.headers['cache-control']} \nHost: ${hostName} \nAccept: ${req.headers.accept} \nAccept-Encoding: ${req.headers['accept-encoding']} \nAccept-Language: ${req.headers['accept-language']}`; 
  console.log(infoPeticion);
  anadirInfoArchivo(infoPeticion);
  
  if(hostName == 'e.ruiz'){    
    hostName = 'sophia.javeriana.edu.co';
    pathReq = '/~eruiz/index.html';
    infoPeticion = `\n\nHost identificado como sitio virtual: ${req.hostname} \nRedirigiendo petición http ${req.method} a http://${hostName}${pathReq}\n\n`;
    infoPeticion += `${req.method} http://${hostName}${pathReq} HTTP/ ${req.httpVersion} \nProxy-Connection: ${req.headers['proxy-connection']} \nUser-Agent: ${req.headers['user-agent']} \nCache-Control: ${req.headers['cache-control']} \nHost: ${hostName} \nAccept: ${req.headers.accept} \nAccept-Encoding: ${req.headers['accept-encoding']} \nAccept-Language: ${req.headers['accept-language']}\n-----------------------------------------\n`; 
    console.log(infoPeticion);
    anadirInfoArchivo(infoPeticion);
    
  }else if(hostName == 'r.paez'){
    hostName = 'sophia.javeriana.edu.co';
    pathReq = '/~rpaez/index.html';
    infoPeticion = `\n\nHost identificado como sitio virtual: ${req.hostname} \nRedirigiendo petición http ${req.method} a http://${hostName}${pathReq}\n\n`;
    infoPeticion += `${req.method} http://${hostName}${pathReq} HTTP/ ${req.httpVersion} \nProxy-Connection: ${req.headers['proxy-connection']} \nUser-Agent: ${req.headers['user-agent']} \nCache-Control: ${req.headers['cache-control']} \nHost: ${hostName} \nAccept: ${req.headers.accept} \nAccept-Encoding: ${req.headers['accept-encoding']} \nAccept-Language: ${req.headers['accept-language']}\n-----------------------------------------\n`; 
    console.log(infoPeticion);
    anadirInfoArchivo(infoPeticion);
    
  }else{
    console.log('\n\nNO pertenece a un sitio virtual\n-----------------------------------------\n');    
    anadirInfoArchivo('\n\nNO pertenece a un sitio virtual\n-----------------------------------------\n')
  }

  const options = {
    host: hostName,
    port: 80,
    path: pathReq,
    method: 'GET'
  }

  hacerPeticion(options)
  .then(data =>{
    res.status(data.statusCode)
    res.send(data.data);
  }) 
  .catch(e => console.log(e));

});

app.post('*', (req, res)=>{
  
  let hostName = req.hostname;
  let pathReq = req._parsedUrl.path;
  let infoPeticion = `${req.method} ${req.originalUrl} HTTP/ ${req.httpVersion} \nProxy-Connection: ${req.headers['proxy-connection']} \nUser-Agent: ${req.headers['user-agent']} \nCache-Control: ${req.headers['cache-control']} \nHost: ${hostName} \nAccept: ${req.headers.accept} \nAccept-Encoding: ${req.headers['accept-encoding']} \nAccept-Language: ${req.headers['accept-language']} \n\n${JSON.stringify(req.body)}`; 
  console.log(infoPeticion);
  anadirInfoArchivo(infoPeticion);
  
  if(hostName == 'e.ruiz'){    
    hostName = 'sophia.javeriana.edu.co';
    pathReq = '/~eruiz/index.html';
    infoPeticion = `\n\nHost identificado como sitio virtual: ${req.hostname} \nRedirigiendo petición http ${req.method} a http://${hostName}${pathReq}\n\n`;
    infoPeticion += `${req.method} http://${hostName}${pathReq} HTTP/ ${req.httpVersion} \nProxy-Connection: ${req.headers['proxy-connection']} \nUser-Agent: ${req.headers['user-agent']} \nCache-Control: ${req.headers['cache-control']} \nHost: ${hostName} \nAccept: ${req.headers.accept} \nAccept-Encoding: ${req.headers['accept-encoding']} \nAccept-Language: ${req.headers['accept-language']} \n\n${JSON.stringify(req.body)}\n-----------------------------------------\n`; 
    console.log(infoPeticion);
    anadirInfoArchivo(infoPeticion);
    
  }else if(hostName == 'r.paez'){
    hostName = 'sophia.javeriana.edu.co';
    pathReq = '/~rpaez/index.html';
    infoPeticion = `\n\nHost identificado como sitio virtual: ${req.hostname} \nRedirigiendo petición http ${req.method} a http://${hostName}${pathReq}\n\n`;
    infoPeticion += `${req.method} http://${hostName}${pathReq} HTTP/ ${req.httpVersion} \nProxy-Connection: ${req.headers['proxy-connection']} \nUser-Agent: ${req.headers['user-agent']} \nCache-Control: ${req.headers['cache-control']} \nHost: ${hostName} \nAccept: ${req.headers.accept} \nAccept-Encoding: ${req.headers['accept-encoding']} \nAccept-Language: ${req.headers['accept-language']} \n\n${JSON.stringify(req.body)}\n-----------------------------------------\n`; 
    console.log(infoPeticion);
    anadirInfoArchivo(infoPeticion);
    
  }else{
    console.log('\n\nNO corresponde a un sitio virtual\n-----------------------------------------\n');    
    anadirInfoArchivo('\n\nNO corresponde a un sitio virtual\n-----------------------------------------\n')
  }

  const options = {
    host: hostName,
    port: 80,
    path: pathReq,
    method: 'GET'
  }

  hacerPeticion(options)
  .then(data =>{
    res.status(data.statusCode)
    res.send(data.data);
  }) 
  .catch(e => console.log(e));

})

const anadirInfoArchivo = async(informacionNueva)=>{
    let nombreArchivo = './Log.txt';

    if(fs.existsSync(nombreArchivo)){
        //Archivo existe
        let informacion = '';
        try {
            const data = fs.readFileSync(nombreArchivo, 'utf8')
            informacion = data;
        } catch (error) {
            console.error(error)
        }
        
        informacion += informacionNueva;

        fs.writeFileSync(nombreArchivo, informacion);


    }else{
        // Archivo no existe
        fs.writeFileSync(nombreArchivo, informacionNueva);
    };


}

const hacerPeticion = async(options)=>{

  return new Promise((resolve, reject)=> {

    let output = '';

    const req = http.request(options, (res) => {

      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        output += chunk;
      });

      res.on('end', () => {
        resolve({statusCode: res.statusCode, data: output});
      });
    });

    req.on('error', (err) => {
      reject(err.message);
    });

    req.end();
  });

}

app.listen(5050, ()=> {console.log('Escuchando en el puerto 5050' + '\n------------------\n')});

const db = require('./lib/mongo');
db.dbUpdate();

const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');

// const urlMapone = "mongodb+srv://mimas:maselko88@cluster0.rwb9n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const {MongoClient} = require('mongodb');
// async function main(){
//     const uri="mongodb+srv://mimas:maselko88@cluster0.rwb9n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//     const client = new MongoClient(uri);
//     try {
//         await client.connect();
//     } catch (error) {
//         console.log(error);
//     }finally{
//         await client.close();
//     }
// }

// main();


const server = http.createServer(function(req,res){

    const parsedUrl = url.parse(req.url,true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g,'');

    const queryStringObject = parsedUrl.query;
    
    const method = req.method.toLocaleLowerCase();
    
    const headers = req.headers;

    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data',(data)=>{

        buffer += decoder.write(data);

    });
    req.on('end',()=>{
    buffer+= decoder.end();

    // console.log('typeof(router[trimmedPath])',typeof(router[trimmedPath]));
    // console.log('trimmedPath',trimmedPath);
    // console.log('router[trimmedPath]',router[trimmedPath]);
    // console.log('handlers.notFound',handlers.notFound);

    // if(trimmedPath == typeof(router[trimmedPath]))

    // let chosenHandler = typeof(router[trimmedPath]);
    var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;
    
    const data ={
        'trimmedPath':trimmedPath,
        'queryStringObject':queryStringObject,
        'method':method,
        'headers':headers,
        'payload':buffer,

    }

    const passedFunction = (statusCode,payload) => {
        
            statusCode = typeof(statusCode == 'number') ? statusCode : 200;
            payload = typeof(payload == 'object') ? payload : {};
    
            console.log(statusCode);
            var payloadString = JSON.stringify(payload);
    
            res.setHeader('Content-Type','application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
    }
    chosenHandler(data,passedFunction)


    // if(trimmedPath in router){

    //     handlers.sample=()=>{

    //     };

        // router[trimmedPath]().then((e)=>{
        //     console.log('aaa',e);
        //     res.writeHead(200,{"Content-Type":"text/html"});
        //     res.write(e.html);
        //     res.end();
        // });
    // }else{
    //     res.writeHead(404,'Not Found');
    //     res.end();
    //     // router[notFound]().then((e)=>{
    //     // })
    // }

    // chosenHandler(data,(statusCode,payload)=>{

    //     statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
    //     payload = typeof(payload) == 'object' ? payload : {};

    //     const payloadString = JSON.stringify(payload);

    //     res.writeHead(statusCode);
    //     res.end(payloadString);

    //     // console.log('Returning the response',statusCode,payloadString);
    // })

    
});


});



server.listen(config.port, ()=>{
    console.log(`Listening on ${config.port} in ${config.envName}`);
});

const handlers ={};
handlers.sample = (data,callback) =>{

    callback(200,{'name':'sample'})

}

handlers.main = (data,callback) =>{
    
    callback(200,{'michal':'michal'});

}

handlers.products = async (data,callback) =>{
    
    const product = await db.dbFind();
    callback(200,product);

}

handlers.notFound = (data,callback) => {
  
    callback(404);

}

const router = {
    'sample':handlers.sample,
    'main':handlers.main,
    'products':handlers.products,
    'notFound':handlers.notFound,
}


// import { MongoClient } from 'mongodb';
// const uri = 'mongodb+srv://mimas:maselko88@cluster0.rwb9n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

// MongoClient.connect(uri, (err,db)=>{

//     if(err) throw err;
//     const dbo = db.db('mapone');
//     dbo.collection('products').findOne({},(err,result)=>{
//         if(err) console.log(err);
//         console.log(result);
//         db.close();
//     });
// });
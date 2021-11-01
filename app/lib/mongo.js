const urlMapone = "mongodb+srv://mimas:maselko88@cluster0.rwb9n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const {MongoClient} = require('mongodb');
const uri=urlMapone;
const client = new MongoClient(uri);

async function dbConnect(){
        try {
            await client.connect();
        } catch (error) {
            console.log(error);
        }finally{
            client.close();
        }
}

async function dbFind(){
    try {
        await client.connect();
        const chosenDb = client.db('mapone');
        const product = await chosenDb.collection('products').find().toArray();
        return product;
    } catch (error) {
        console.log(error);
    }finally{
        client.close();
    }

}

async function dbAdd(){
    try {
        await client.connect();
        const chosenDb = client.db('mapone');
        const addProduct = await chosenDb.collection('products').insertOne(
            {
                'name':'Hoodie',
                'description':'It is one of the best hoodie',
                'price':{
                    '10-25':'30.50'
                },
                size:{
                    'xxs':{
                        'width':40.5,
                        'height':'60.50',
                    }
                },
                'keywords':'adadasd',
            })
        return addProduct;
        
    } catch (err) {
        console.log(err);
        
    }finally{
        client.close();
    }
}

async function dbUpdate(){
    try {
        await client.connect();
        const chosenDb = client.db('mapone');
        const updatedProduct = await chosenDb.collection('products').updateOne(
            {
            _id:ObjectId('61456bcfde7f6b3bdf0abae6'),
            },
            {
                $set:{
                    description:'To jest jeszcze lepszy opis', 
                }
            }
        );
        console.log(updatedProduct);
        
    } catch (error) {
        console.log(error)
    }finally{
        client.close();
    }
}

async function dbClose(){
    try {
        await client.close();
    } catch (error) {

        console.log(error);
        
    }
}





module.exports = {dbConnect,dbFind,dbClose,dbAdd,dbUpdate};



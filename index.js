const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xbkhg1t.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});



async function run() {
    try {
        await client.connect();
        const homeCollection = client.db("SahaReno").collection("Home");
        const certificateCollection = client.db("SahaReno").collection("Certificate");
        // const educationCollection = client.db("SahaReno").collection("Education");
        // const experienceCollection = client.db("SahaReno").collection("Experience");
        const articleCollection = client.db("SahaReno").collection("Article");

        //Article-------------------------------------------------------
        app.post('/article', async (req, res) => {
            const review = req.body;
            const c = await articleCollection.insertOne(review);
            res.send(c);
        });
        app.get('/article', async (req, res) => {
            let query = {};
            const cursor = articleCollection.find(query).limit(0);
            const a = await cursor.toArray();
            res.send(a);
        });
        app.get('/article/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const b = await articleCollection.findOne(query);
            res.send(b);
        });
        app.delete('/article/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };

            try {
                const result = await articleCollection.deleteOne(query);
                res.json(result);
            } catch (error) {
                console.error('Error deleting certificate:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });


        //Home----------------------------------------------------------
        app.post('/home', async (req, res) => {
            const review = req.body;
            const c = await homeCollection.insertOne(review);
            res.send(c);
        });
        app.get('/home', async (req, res) => {
            let query = {};
            const cursor = homeCollection.find(query).limit(0);
            const a = await cursor.toArray();
            res.send(a);
        });
        app.get('/home/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const b = await homeCollection.findOne(query);
            res.send(b);
        });
        app.delete('/home/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };

            try {
                const result = await homeCollection.deleteOne(query);
                res.json(result);
            } catch (error) {
                console.error('Error deleting certificate:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
  
        // CERTIFICATE PART ------------------------------------------------------------------------------
        app.post('/certificates', async (req, res) => {
            const review = req.body;
            const c = await certificateCollection.insertOne(review);
            res.send(c);
        });
        app.get('/certificates', async (req, res) => {
            let query = {};
            const cursor = certificateCollection.find(query).limit(0);
            const a = await cursor.toArray();
            res.send(a);
        });
        app.get('/certificates/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const b = await certificateCollection.findOne(query);
            res.send(b);
        });
        // app.put('/certificates/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) };
        //     const updatedData = req.body;

        //     try {
        //         const result = await certificateCollection.updateOne(query, { $set: updatedData });
        //         res.json(result);
        //     } catch (error) {
        //         console.error('Error updating certificate:', error);
        //         res.status(500).json({ error: 'Internal Server Error' });
        //     }
        // });
        app.delete('/certificates/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };

            try {
                const result = await certificateCollection.deleteOne(query);
                res.json(result);
            } catch (error) {
                console.error('Error deleting certificate:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });




    }
    finally {

    }
}

run().catch(console.dir);
app.get('/', (req, res) => {
    res.send('Saha Reno')
})

app.listen(port, () => {
    console.log(`Saha Reno on port ${port}`)
})
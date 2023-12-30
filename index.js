import express from 'express';
import path from 'path';
// Introduction of lowdb data storage solution
import { JSONFileSyncPreset } from 'lowdb/node'

const app = express();
const port = 3000;

// declare the static file folder for css
app.use(express.static('client'));

// initialize the database
const defaultData = {
    user:[],
    post:[]
}
const db = await JSONFileSyncPreset('data/db.json', defaultData);
await db.write();

// setting the app port
app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`);
})

// When listen the client conection, send the index.html to display
app.get('/', (req, res)=>{
   res.sendFile(__dirname + "/" + "client/" +"index.html");
})

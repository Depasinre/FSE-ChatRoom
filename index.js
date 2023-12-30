import express from 'express';
import path from 'path';
// Introduction of lowdb data storage solution
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import lodash from 'lodash'

const app = express();
const port = 3000;

// declare the static file folder for css
app.use(express.static('client'));

// setting the app port
app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`);
})

// When listen the client conection, send the index.html to display
app.get('/', (req, res)=>{
   res.sendFile(__dirname + "/" + "client/" +"index.html");
})

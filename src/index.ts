import express from 'express';
import path from 'path';

// Introduction of lowdb data storage solution
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import lodash from 'lodash'

// get the root folder for the project
const root = process.cwd();
const __dirname = root;

const app = express();
const port = 3000;

// declare the static file folder for css
app.use(express.static('client'));
// parse post parameter
app.use(express.urlencoded({extended:false}));

// initialize the database
type Post = {
    id: number
    userId: number
    timestamp: Date
    value: string
}
type User = {
    id: number
    username: string
    password: string
}
type Data ={
    posts: Post[]
    users: User[]
}
// Extend Low class with a new `chain` field
class LowWithLodash<T> extends Low<T> {
    chain: lodash.ExpChain<this['data']> = lodash.chain(this).get('data')
  }
const defaultData:Data = {
    users:[
        {
            id: -1,
            username: 'initial',
            password: 'initial'
        }
    ],
    posts:[]
}

const adapter = new JSONFile<Data>('data/db.json');
const db = new LowWithLodash(adapter, defaultData);
await db.write();

// setting the app port
app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`);
})

// When listen the client conection, send the index.html to display
app.get('/', (req, res)=>{
    // console.log(__dirname + "/" + "client/" +"index.html");
    res.sendFile(__dirname + "/client/" +"index.html");
})

// When listen the /GoToRegistration, send registration.html to display
app.get('/GoToRegistration', (req, res)=>{
    res.sendFile(__dirname + "/client/pages/Registration/Registration.html");
    // console.log(__dirname + "/client/pages/Registration/Registration.html");
})

// When listen the /register, registration the user
app.post('/register', (req, res) =>{
    let username = req.body.username;
    let password = req.body.password;
    let userInfo = {
        id: -1,
        username: username,
        password: password
    }
    res.writeHead(200, {
        'Content-Type': 'text/html;charset=utf-8'
      });
    db.read()
    let userArray = db.chain.get('users');
    if(userArray.find({username: username}).value() != undefined){
        console.log("fail due to duplicate")
        res.end("username already exist")

    } else {
        console.log("success")
        let newId = userArray.value()[userArray.value().length - 1].id + 1;
        console.log(newId)
        userInfo.id = newId;
        db.data.users.push(userInfo);
        db.write();
        res.end("registration successful")
    }

    
    


})

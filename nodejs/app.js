const client = require('./dbconnection')

const express = require("express");
const cors = require('cors')

const app = express();

app.use(cors())
app.use(express.json())

app.listen(3001, ()=>{
    console.log("server is starting to run with PORT NUMBER --> 3001")
})

client.connect(()=>{
    console.log("Connect to the PostgreSQL --> DB")
})


app.get('/get-all-todos', (req, res)=>{
    client.query(`Select * from todo`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})



app.post('/create-new-todo', (req, res)=>{
    
    const title = req.body.title;
    const discription = req.body.discription;
    const states = req.body.states;

    //duplicates check
    let duplicatesCheckQuery = `select id from todo where title = '${title}'`

    client.query(duplicatesCheckQuery, (err, result)=>{
        if(!err){
            var v = result.rows.length
            if(v > 0){
                res.send('have')
            }else{
                console.log(title)
                console.log(discription)
                console.log(states)
                let insertQuery = `insert into todo (title,discription,states) values ('${title}','${discription}','${states}')`;
                client.query(insertQuery, (err, result)=>{
                    if(!err){
                        res.send(result.rows);
                    }
                    else{
                        console.log(err.message)
                    }
                });
                client.end;

            }
            
        }
    });
    client.end;
})

app.post('/update-todo', (req, res)=> {
    const id = req.body.id;
    const states = req.body.states;
    let updateQuery = `update todo set states = '${states}' where id = ${id}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

app.post('/delete-todo', (req, res)=> {
    let insertQuery = `delete from todo where id=${req.body.id}`
    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})
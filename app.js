
const express = require('express')
const app = express()

app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'))

let items = ['Eat','Sleep','Code','Repeat'];
let workItems = [];

app.get('/',(req,res)=> {
    const today = new Date();

    let options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }
    const date = today.toLocaleDateString('en-US',options);
    res.render('list',{listTitle : date, newListItems: items})
})

app.post('/',(req,res)=> {
    let item = req.body.newItem;

    if(req.body.list === 'Work List') {
        workItems.push(item);
        res.redirect('/work');
    } else {
        items.push(item);
        res.redirect('/');
    }
})

app.get('/work',(req,res)=> {
    res.render('list',{listTitle:'Work List',newListItems: workItems})
})

app.post('/work',(req,res)=> {
    let workItem = req.body.newItem;
    workItems.push(workItem);
    res.redirect('/work');
})

app.listen(3000,()=> {
    console.log('Server is runing on port 3000...');
})
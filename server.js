const express  = require('express');
const path = require('path');
const port = process.env.PORT || 8000;
const app = express();

// setup static folder and middleware
// app.use(express.static(path.join(__dirname, 'public')));

let users =[
  {id: 1 , name: 'ET Doe'},
  {id: 2 , name: 'DR Ioe'},
  {id: 3 , name: 'RE Smith'},
  {id: 4 , name: 'Tow Nick'},
];

// get all users
app.get('/api/v1/users', (req, res) => {
  const limit = req.query.limit;
  // Check if limit is provided and valid
  if (limit === undefined || isNaN(limit) || parseInt(limit) <= 0) {
    res.status(200).json(users);
  } else {
    const filteredUsers = users.slice(0, parseInt(limit));
    res.json(filteredUsers);
  }
});


// get single user
app.get('/api/v1/users/:id' , (req , res) =>{
  const id = parseInt(req.params.id);
  const user = users.find(user => user.id === id);
  if(!user)return res.status(404).json({msg: `User id ${id} not found`});
  res.json(user);
})

app.listen(port ,() => console.log(`Server is running on port ${port}`));
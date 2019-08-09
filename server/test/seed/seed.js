const {ObjectID} = require("mongodb");
const jwt = require("jsonwebtoken");

const {Todo} = require("./../../models/todo");
const {User} = require("./../../models/user");

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
    _id: userOneId,
    email: "daily659@example.com",
    password: "userOnePass",
    tokens: [{
        access: "auth",
        token: jwt.sign({_id: userOneId, access: "auth"}, "abc123").toString()
    }]
}, {
    _id: userTwoId,
    email: "emma@eample.com",
    password: "userTwoPass",
}]

// we create a dummy todo
const todos = [{
    _id: new ObjectID(),
    text: "First todo test"
}, {
    _id: new ObjectID(),
    text: "Second todo test",
    completed: true,
    completedAt: new Date()
}];

const populateTodos = (done) => {
    Todo.remove({})    // wipes all of our Todos data
      .then(() => {    
         return  Todo.insertMany(todos)
      })
      .then(() => done())   // only moves to the test case once we call done() --- an expression syntax
      .catch((err) => console.log("Could not empty the Todo collection", err))
}

const populateUsers = (done) => {
    User.remove({})    // wipes all of our Users data
      .then(() => {    
        let userOne = new User(users[0]).save();
        let userTwo = new User(users[1]).save();
        // return [userOne, userTwo];
        return Promise.all([userOne, userTwo])
      })
      .then(() => done())   // only moves to the test case once we call done() --- an expression syntax
      .catch((err) => console.log("Could not empty the User collection", err))
}

module.exports = { todos, populateTodos, users, populateUsers };
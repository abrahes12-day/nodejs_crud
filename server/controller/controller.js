const UserDB = require('../model/model');

// create and save new user
exports.create = (req, res) => {
    // validate request
    if (!req.body){
        res.status(400).send({message: "Content can't be empty!"});
        return;
    }

    const user = new UserDB({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })
    
    // save to database
    user
    .save(user)
    .then(data => {
        //res.send(data)
        res.redirect('/add-user');
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while creating a create operation"
        });
    });

}

// retrive and return all users/ retrive and return a single user
exports.find = (req, res) => {
    if(req.query.id) {
        const id = req.query.id;
        UserDB.findById(id)
        .then( data => {
            if(!data){
                return res.status(404).send({
                    message: `User ${id} not found`
                })
            }

            return res.send(data);
        })
        .catch( err =>{
            res.status(500).send({
                message: `Error retriving user with id ${id}`
            })
        })
        return;
    } 
    
    UserDB.find()
    .then(user =>{
        res.send(user);
    })
    .catch( err => {
        res.status(500).send({
            message: err.message || "Some error occured while retriving user information"
        })
    })
    

    
}

// update a new identified user by user id
exports.update = (req, res) => {
    if(!req.body){
        return res.status(400).send({
            message: "Data to update can't be empty"
        })
    }

    const id = req.params.id;
    UserDB.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
    .then(data => {
        if(!data){
           return res.status(400).send({
                message: `Cannot update user with ${id}. Maybe user not found`
            });
        } 

        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: `Error update user information`
        })
    })
}

// delete a user with specified user id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    UserDB.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            return res.status(400).send({
                 message: `Cannot delete user with ${id}. Maybe id not found`
             });
         }

         res.send({message: `User was deleted successfully`})
    })
    .catch(err => {
        res.status(500).send({
            message: `Could not delete user with id = ${id}`
        })
    })
}

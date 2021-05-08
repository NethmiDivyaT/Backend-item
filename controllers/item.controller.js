const db = require("../models");
const Items = db.items;

// Create and Save a new Items
exports.create = (req, res) => {
    if(!req.body.title){
        res.status(400).send({
            message:"Content can not be empty!"
        });
    }

    const items = new Items({
        title:req.body.title,
        description:req.body.description,
        pubished:req.body.published ? req.body.published : false
    })

    items
        .save(items)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error Occurred."
            });
        });
};

// Retrieve all Items from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? {
            title: {
                $regex: new RegExp(title), $option: "1"
            }
        } : {};

        Items.find(condition)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Error Occurred."
                });
            });
};

// Find a single Item with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Items.findById(id)
        .then(data => {
            if(!data)
                res.status(404).send({
                    message: id + "Not Found"
                });
            else res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "error Occurred."
            });
        });

};

// Update a  Item by the id in the request
exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message : "Data to update cannot be empty!"
        });
    }

    const id = req.params.id;

    Items.findByIdAndUpdate(id, req.body, {useFindAndModify : false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: id + "Cannot Update."
                });
            } else res.send({
                message: "Item update successfully."
            });
        })
                .catch(err =>{
                    res.status(500).send({
                        message:id + "Error Occurred"
                    });
                });
        };

// Delete a Item with the specified id in the request
exports.delete = (req, res) => {
    const id = req.param.id;

    Items.findByIdAndRemove(id)
        .then(data =>{
            if(!data){
                res.status(404).send({
                    message : id + "Cannot delete."
                });
            }else {
                res.send({
                    message:"Item was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message:id + "could not delete"
            });
        });
};

// Delete all Items from the database.
exports.deleteAll = (req, res) => {
    Items.deleteMany({})
        .then(data => {
            res.send({
                message : ${data.deletedCount} + "Items were deleted."
            });
        })
        .catch(err => {
            res.status(500).send({
                message:err.message || "Error Occurred"
            });
        });
};

// Find all published Items
exports.findAllPublished = (req, res) => {
    Items.find({published : true})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message : err.message || "Error Occurred."
            });
        });
}


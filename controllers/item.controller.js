const item = require("../models/item.model.js");

// Create and Save a new Items
exports.create = (req, res) => {
    if(!req.body.title){
        res.status(400).send({
            message:"Content can not be empty!"
        });
    }

//create a item
const items = new item({
    itemId:req.body.itemId,
    ProductName:req.body.ProductName,
    Category:req.body.Category,
    Price:req.body.Price,
    Discount:req.body.Discount,
    description:req.body.description,
    });

//save in db
    items.save()
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
    item.find()
        .then(items => {
            res.send(items);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error Occurred."
            });
        });
};

//Retrieve single item
exports.findOne = (req, res) => {
    item.findById(req.params.itemId)
        .then(item =>{
            if(!item){
                return res.status(404).send({
                    message:  "Item not found"
                });
            }
            res.send(item);
        })
        .catch(err => {
            if(err.kind === 'ObjectId'){
                return res.status(404).send({
                    message:"Item not found"
                });
            }
            return res.status(500).send({
                message:"Error"
            });
        });
};

// Update a  Item by the id in the request
exports.update = (req, res) => {
    if(!req.body.content) {
        return res.status(400).send({
            message : "Data to update cannot be empty!"
        });
    }

    item.findByIdAndUpdate(req.params.itemId, {
        itemId: req.body.itemId,
        ProductName: req.body.ProductName,
        Category: req.body.Category,
        Price: req.body.Price,
        Discount: req.body.Discount,
        description: req.body.description
    }, {new:true})
    .then(items => {
            if (!items) {
                res.status(404).send({
                    message: "Cannot Update."
                });
            }
            res.send(items);
            }).catch(err => {
                if(err.kind === 'ObjectId'){
                    return res.status(404).send({
                        message:"Item not found"
                    });
                }
                return res.status(500).send({
                    message: "Error"
                });
    });
};

// Delete a Item with the specified id in the request
exports.delete = (req, res) => {
    item.findByIdAndRemove(req.params.itemId)
        .then(items =>{
            if(!items){
                return res.status(404).send({
                    message : "Cannot delete."
                });
            }
            res.send({message:"Item was deleted successfully!"});
        }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound'){
                return res.status(404).send({
                    message:"Item not found"
                });
            }
            return res.status(500).send({
                message : "Item not found"
            });
    });

};




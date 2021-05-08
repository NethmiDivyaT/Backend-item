module.export = app => {
    const items = require("../controllers/item.controller");

    var router = require("express").Router();

//create new item
    router.post("/", items.create);

//retrieve all items
    router.get("/", items.findAll);


//retrieve all published items
router.get("/published", items.findAllPublished);
..
//retrieve item
    router.get("/:id", items.findOne);

//Update item
    router.put("/id", items.update);

//delete item
    router.delete("/id", items.delete);

//delete all items
    router.delete("/", items.deleteAll);

app.use("/api/items", router);

};


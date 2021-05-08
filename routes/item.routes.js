module.export = app => {
    const items = require("../controllers/item.controller");

//create new item
app.post("/items", items.create);

//retrieve all items
app.get("/items", items.findAll);

//retrieve item
app.get("items/:id", items.findOne);

//Update item
app.put("items/id", items.update);

//delete item
app.delete("items/id", items.delete);

//delete all items
app.delete("/", items.deleteAll);

};


const Warehouse = require("../../models/wearhouse.model");
const cloudinary = require("cloudinary").v2;
const { handleErrors } = require("../../utils/errorHandler");

module.exports = function (io) {
    io.on("connection", (socket) => {

        // Returning the initial data of food menu from FoodItems collection
        socket.on("initial_Warehouse_data", async () => {
            const warehouse = await Warehouse.find({}).sort({ createdAt: 1 });
            io.sockets.emit("get_Warehouse_data",warehouse);
        });
        

        socket.on("check_all_Warehouse_notifications", async () => {
            
            const warehouses = await Warehouse.find({});

            warehouses.forEach((warehouse) => {
                warehouse.read = true;
            });
            console.log("check all notification warehouse")
            console.log(warehouses.length)

            await Warehouse.create(warehouses)

            io.sockets.emit("change_Warehouse_data");
        });

        // disconnect is fired when a client leaves the server
        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
    });

};

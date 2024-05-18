const Warehouse = require("../../models/wearhouse.model");
const Agent = require("../../models/agent.model");
const cloudinary = require("cloudinary").v2;
const { handleErrors } = require("../../utils/errorHandler");
const express = require("express");
const router = express.Router();


router.post("/post_data", async (req, res) => {
    try {
      const { phone, password, email, name, location, bankName, accNumber,tinNumber, // Added TIN Number
      businessLicenseNumber, // Added Business License Number
      nationalIDNumber} = req.body;
  
      console.log("postman:", location);
  
      const agent = await Agent.findOne({ phone });
  
      if (agent) {
        return res.status(409).json({ error: "Account already exists." });
      }
  
      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_KEY,
        api_secret: process.env.CLOUD_KEY_SECRET,
      });
  
      const folder = "kaps/AgentImage";
  
      let imgResult = { public_id: "", secure_url: "" };
      let filesResult = { public_id: "", secure_url: "" };
  
      let fileRes = [];
      const filesUrls = [];
  
      if (req.files && req.files["img"] && req.files["img"].length > 0) {
        imgResult = await cloudinary.uploader.upload(req.files["img"][0].path, {
          folder,
          quality: 70,
          timestamp: Date.now(), // Use current timestamp
        });
      }
  
      if (req.files && req.files["files"] && req.files["files"].length > 0) {
        for (i = 0; i < req.files["files"].length; i++) {
          const filesResultPromise = await cloudinary.uploader.upload(
            req.files["files"][i].path,
            {
              folder: "kaps",
              quality: 70,
              timestamp: Date.now(), // Use current timestamp
            }
          );
  
          const TempoData = [
            filesResultPromise.public_id,
            filesResultPromise.secure_url,
          ];
  
          fileRes.push(TempoData);
          console.log({ TempoData });
        }
  
        console.log({ fileRes });
      }
  
      // Loop through each TempoData and extract the URL
      for (const TempoData of fileRes) {
        filesUrls.push({
          public_id: TempoData[0],
          url: TempoData[1],
        });
      }
  
      const newAgentData = {
        phone,
        password,
        email,
        name,
        restriction: true,
        img: {
          public_id: imgResult.public_id,
          url: imgResult.secure_url,
        },
        files: filesUrls ? filesUrls : filesResult,
        location,
        bankName,
        accNumber,
        tinNumber, // Added TIN Number
        businessLicenseNumber, // Added Business License Number
        nationalIDNumber // Added National ID Number
      };
  
      const newAgent = new Agent(newAgentData);
  
      await newAgent.save();
  
      // Check if a warehouse already exists at the agent's location
      let existingWarehouse = await Data.findOne({ location: location });
  
      // Create a new warehouse if it doesn't exist
      if (existingWarehouse) {
        return res.status(240).json({ error: "Location already exists." });
      } else if (!existingWarehouse) {
        existingWarehouse = new Data({
          location,
        });
        await existingWarehouse.save();
      } else {
        return res.status(400).json({ error: "Location already exists." });
      }
      io.sockets.emit("change_data");
      io.sockets.emit("change_Warehouse_data")
      return res
        .status(200)
        .json({ agent: newAgent, warehouse: existingWarehouse });
    } catch (err) {
      handleErrors(err, res);
    }
    });

module.exports =router;
    
module.exports = function (io) {
    io.on("connection", (socket) => {
        console.log("New client connected" + socket.id);
        //console.log(socket);

        // Returning the initial data of food menu from FoodItems collection
        socket.on("initial_data", async () => {
            const data = await Agent.find({}).sort({ createdAt: -1 });
            io.sockets.emit("get_data", data);
        });


        // Placing the order, gets called from /src/main/PlaceOrder.js of Frontend
        socket.on("post_data", async (body) => {
            try {
                const { phone, password, email, name, location, bankName, accNumber } = body;

                console.log("Frontend:", location);

                const agent = await Agent.findOne({ phone });

                if (agent) {
                    return socket.emit("post_data_error", { error: "Account Already Existed" });
                }

              

                cloudinary.config({
                    cloud_name: process.env.CLOUD_NAME,
                    api_key: process.env.CLOUD_KEY,
                    api_secret: process.env.CLOUD_KEY_SECRET,
                });

                const folder = "kaps/AgentImage";

                let imgResult = { public_id: "", secure_url: "" };
                let filesResult = { public_id: "", secure_url: "" };

                let fileRes = [];
                const filesUrls = [];

                if (body.files && body.files["img"] && body.files["img"].length > 0) {
                    imgResult = await cloudinary.uploader.upload(body.files["img"][0].path, {
                        folder,
                        quality: 70,
                        timestamp: Date.now(), // Use current timestamp
                    });
                }

                if (body.files && body.files["files"] && body.files["files"].length > 0) {
                    for (i = 0; i < body.files["files"].length; i++) {
                        const filesResultPromise = await cloudinary.uploader.upload(
                            body.files["files"][i].path,
                            {
                                folder: "kaps",
                                quality: 70,
                                timestamp: Date.now(), // Use current timestamp
                            }
                        );

                        const TempoData = [
                            filesResultPromise.public_id,
                            filesResultPromise.secure_url,
                        ];

                        fileRes.push(TempoData);
                        console.log({ TempoData });
                    }

                    console.log({ fileRes });
                }

                // Loop through each TempoData and extract the URL
                for (const TempoData of fileRes) {
                    filesUrls.push({
                        public_id: TempoData[0],
                        url: TempoData[1],
                    });
                }

                const newAgentData = {
                    phone,
                    password,
                    email,
                    name,
                    restriction: true,
                    img: {
                        public_id: imgResult.public_id,
                        url: imgResult.secure_url,
                    },
                    files: filesUrls ? filesUrls : filesResult,
                    location,
                    bankName,
                    accNumber,
                };

                const newAgent = new Agent(newAgentData);

                await newAgent.save();
                io.sockets.emit("change_data");
                io.sockets.emit("change_Warehouse_data");

                  // Check if a warehouse already exists at the agent's location
                  let existingWarehouse = await Warehouse.findOne({ location: location });

                  if (existingWarehouse) {
                      console.log("Console:", "Location Already existed");
                      return socket.emit("post_data_success", { message: "Agent Registered Successfully in existed location" });
                  }

                existingWarehouse = new Warehouse({
                    location,
                });
                await existingWarehouse.save();
                
                io.sockets.emit("change_data");
                io.sockets.emit("change_Warehouse_data");

                return socket.emit("post_data_success", { message: "Agent registered successfully." });

            } catch (err) {
                console.log(err.message);
                return socket.emit("post_data_error", { error: "An error occurred while processing the data." });
            }
        });



        socket.on("check_all_notifications", async () => {
            const datas = await Agent.find({});

            datas.forEach((data) => {
                data.read = true;
            });
            console.log(datas.length)

            await Agent.create(datas)

            console.log("checked notification of agent")

            io.sockets.emit("change_data");

        });


        // disconnect is fired when a client leaves the server
        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
    });

    


};  
const Product = require("../../models/product.model");
const sharp = require("sharp");
const cloudinary = require("cloudinary").v2;
const uploadProduct = require("../../utils/multerConfigForProuduct");



const compressAndSaveImage = async (buffer, filename) => {
  try {
    console.log("Compressing and saving image...");
    const compressedImageBuffer = await sharp(buffer)
      .resize({ width: 800, fit: "inside" })
      .toBuffer();
    console.log("Image compressed successfully.");
    return compressedImageBuffer;
  } catch (error) {
    console.error("Error compressing image:", error);
    throw new Error(`Error compressing image: ${error.message}`);
  }
};

module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log("New client connected" + socket.id);
    //console.log(socket);

    // Returning the initial data of food menu from FoodItems collection
    socket.on("initial_Product_data", async () => {
      const product = await Product.find({}).sort({ createdAt: -1 });
      io.sockets.emit("get_Product_data", product);
    });


   
   socket.on("post_product_data", async (body) => {
    try {
      const { productname, productprice, agentphone } = body;
      // Check required fields
      const requiredFields = [productname, productprice, agentphone];
      const missingFields = requiredFields.filter(field => ![field]);
  
      if (missingFields.length > 0) {
        console.log("missingField: ", "1")
        return socket.emit("post_product_error", { error: `Missing value for ${missingFields.join(", ")}` });
      }
  
      // Check if file is provided
      if (!body.file) {
        console.log("body file error: ", "2")
        return socket.emit("post_product_error", { error: "No image file provided" });
      }

      if (!body.farmerfile) {
        console.log("body file error: ", "2")
        return socket.emit("post_product_error", { error: "No farmer image file provided" });
      }
  
      // Configure Cloudinary
      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_KEY,
        api_secret: process.env.CLOUD_KEY_SECRET,
      });
  
      let compressedImageBuffer;
      try {
        compressedImageBuffer = await compressAndSaveImage(
          body.file,
          body.file.originalname
        );
      } catch (compressionError) {
        return socket.emit("post_product_error", { error: "Invalid Product Image" });
      }
  
    
  
      // Upload all farmer file images to Cloudinary and store their results
      const uploadPromises = Object.keys(body.farmerfile).map((key) => {
        const imageBuffer = body.farmerfile[key];
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: "image", folder: "kaps/FarmerFile", timestamp: Date.now() },
            (error, resultFarmerFile) => {
              if (error) {
                reject("in the promise error", error);
              } else {
                resolve(resultFarmerFile);
              }
            }
          );
          uploadStream.end(imageBuffer);
        });
      });
  
      // Wait for all farmer image files uploads to complete
      const farmerFileResults = await Promise.all(uploadPromises);


        // Upload compressed image to Cloudinary
        cloudinary.uploader
        .upload_stream(
          { resource_type: "image", folder: "kaps/ProductImage", timestamp: Date.now() },
          (error, result) => {
            if (error) {
              console.error("Error uploading image to Cloudinary:", error);
              return socket.emit("post_product_error", { error: "Failed to upload product image to Cloudinary" });
            }
            // Create new product after image upload
            createProduct(result);
          }
        )
        .end(compressedImageBuffer);

        // Calculate itemPrice
    const itemPrice = body.productprice * body.quantity;

    // Calculate tax (15% of itemPrice)
    const tax = 0.15 * itemPrice;

    // Calculate serviceCharge (10% of itemPrice)
    const serviceCharge = 0.10 * itemPrice;

    // Extract deliveryFee from the request body
    const deliveryFee = parseFloat(body.deliveryFee) || 0; // Ensure parsing and default to 0 if not provided

    // Calculate totalPrice
    const totalPrice = itemPrice + tax + serviceCharge + deliveryFee;

    // Debugging calculations
    console.log("Debugging Calculations:");
    console.log("itemPrice:", itemPrice);
    console.log("tax:", tax);
    console.log("serviceCharge:", serviceCharge);
    console.log("deliveryFee:", deliveryFee);
    console.log("totalPrice:", totalPrice);

  
      // Create product object
      const createProduct = async (cloudinaryResult) => {
        const newProduct = {
          productname: body.productname,
          catagory: body.catagory,
          productprice: body.productprice,
          farmername: body.farmername,
          farmeraccount: body.farmeraccount,
          agentphone: body.agentphone,
          productdescription: body.productdescription,
          productlocation: body.productlocation,
          quantity: body.quantity,
          unit: body.unit,
          file: {
            public_id: cloudinaryResult.public_id,
            url: cloudinaryResult.secure_url,
          },
          farmerfile: farmerFileResults, // Remaining results are for additional images
          url: body.url,
          itemPrice: itemPrice,
          tax: tax,
          serviceCharge: serviceCharge,
          deliveryFee: deliveryFee,
          totalPrice: totalPrice,
        };
  
        // Create new product in the database
        const product = await Product.create(newProduct);
  
        // Emit socket event to notify clients
        io.sockets.emit("change_Product_data");
  
        // Emit success message
        return socket.emit("post_product_success", { message: "Item Product Added successfully." });
      };
  
    } catch (error) {
      return socket.emit("post_product_error", { error: "Internal server error" });
    }
  });

    socket.on("check_all_Product_notifications", async () => {
      const products = await Product.find({});

      products.forEach((data) => {
        data.read = true;
      });
      console.log(products.length)

      await Product.create(products)

      console.log("checked notification of product")

      io.sockets.emit("change_Product_data");

    });

    // disconnect is fired when a client leaves the server
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};  
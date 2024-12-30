// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const multer = require('multer');
// const AWS = require('aws-sdk');
// require('dotenv').config();

// // Import Schemas
// const Highlights = require('./Schemas/Highlight');
// const PastEvents = require('./Schemas/PastEvents');
// const Upcoming = require('./Schemas/Upcoming');
// const Webinar = require('./Schemas/Webinars');

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // AWS S3 Configuration
// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });

// // Multer Storage
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // MongoDB Connection
// const URI = "mongodb://localhost:27017/eventsDB";
// mongoose.connect(URI)
//   .then(() => {
//     console.log("Database Connected Successfully");
//   })
//   .catch((err) => {
//     console.error("Database Connection Error:", err);
//   });

// // Routes
// app.get('/', (req, res) => {
//   res.send("Form Events Insertion");
// });

// app.post("/uploads", upload.single('image'), async (req, res) => {
//   const { desc, pages } = req.body;
//   const file = req.file;

//   if (!file) {
//     return res.status(400).send("No files uploaded");
//   }

//   let bucketName;
//   let suffix="bucket"

//   // Determine the bucket based on the page type
//   switch (pages) {
//     case "highlights":
//       bucketName = "highlights"+bucket;
//       break;
//     case "pastevents":
//       bucketName = "pastevents"+bucket;
//       break;
//     case "upcoming":
//       bucketName = "upcoming"+bucket;
//       break;
//     case "webinar":
//       bucketName = "webinars"+bucket+"t";
//       break;
//     default:
//       return res.status(400).send("Invalid page type");
//   }

//   try {
//     // Upload file to the S3 bucket
//     const params = {
//       Bucket: bucketName,
//       Key: `${Date.now()}-${file.originalname}`,
//       Body: file.buffer,
//       ContentType: file.mimetype,
//     };

//     const s3Response = await s3.upload(params).promise();
//     const imageUrl = s3Response.Location;

//     // Save details to MongoDB based on the page type
//     if (pages === "highlights") {
//       const highlight = new Highlights({ images: imageUrl });
//       await highlight.save();
//       console.log(imageUrl);
//     } else if (pages === "pastevents") {
//       const pastEvent = new PastEvents({ desc, images: imageUrl });
//       await pastEvent.save();
//       console.log(desc,imageUrl);
//     } else if (pages === "upcoming") {
//       const upcomingEvent = new Upcoming({ desc });
//       await upcomingEvent.save();
//     } else if (pages === "webinar") {
//       const webinar = new Webinar({ desc, images: imageUrl });
//       await webinar.save();
//     }

//     res.status(200).send({ message: "File uploaded and data saved successfully", imageUrl });
//   } catch (error) {
//     console.error("Error uploading file or saving data:", error);
//     res.status(500).send("Internal server error");
//   }
// });

// // Start Server
// app.listen(8000, () => {
//   console.log("Server started on port 8000");
// });

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const AWS = require('aws-sdk');
require('dotenv').config();

// Import Schemas
const Highlights = require('./Schemas/Highlight');
const PastEvents = require('./Schemas/PastEvents');
const Upcoming = require('./Schemas/Upcoming');
const Webinar = require('./Schemas/Webinars');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// AWS S3 Configuration
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

// Multer Storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// MongoDB Connection
const URI = "mongodb://localhost:27017/eventsDB";
mongoose.connect(URI)
    .then(() => {
        console.log("Database Connected Successfully");
    })
    .catch((err) => {
        console.error("Database Connection Error:", err);
    });

// Routes
app.get('/', (req, res) => {
    res.send("Form Events Insertion");
});

app.post("/uploads", upload.single('image'), async (req, res) => {
  try {
      console.log("Request Body:", req.body);
      console.log("Uploaded File:", req.file);

      const { desc, page } = req.body;
      if (!page) {
          return res.status(400).send("Page type is required");
      }

      let bucketName;
      const suffix = "bucket";

      switch (page) {
          case "highlights":
              bucketName = "highlights" + suffix;
              break;
          case "pastevents":
              bucketName = "pastevents" + suffix;
              break;
          case "upcoming":
              bucketName = "upcoming" + suffix;
              break;
          case "webinar":
              bucketName = "webinar" + suffix;
              break;
          default:
              return res.status(400).send("Invalid page type");
      }

      let imageUrl = null;

      if (req.file) {
          console.log("Uploading file to S3...");
          const params = {
              Bucket: bucketName,
              Key: `${Date.now()}-${req.file.originalname}`,
              Body: req.file.buffer,
              ContentType: req.file.mimetype,
          };

          const s3Response = await s3.upload(params).promise();
          imageUrl = s3Response.Location;
          console.log("File uploaded to S3:", imageUrl);
      }

      if (page === "highlights") {
          const highlight = new Highlights({ desc, images: imageUrl });
          await highlight.save();
      } else if (page === "pastevents") {
          const pastEvent = new PastEvents({ desc, images: imageUrl });
          await pastEvent.save();
      } else if (page === "upcoming") {
          const upcomingEvent = new Upcoming({ desc });
          await upcomingEvent.save();
      } else if (page === "webinar") {
          const webinar = new Webinar({ desc, images: imageUrl });
          await webinar.save();
      }

      res.status(200).send({ message: "File uploaded and data saved successfully", imageUrl });
  } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Internal server error");
  }
});

// Start Server
app.listen(8000, () => {
    console.log("Server started on port 8000");
});
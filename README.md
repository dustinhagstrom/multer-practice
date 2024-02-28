# Image Upload Proof of Concept with Vite, Express, and PostgreSQL

## Introduction

This project serves as a proof of concept for uploading images from a React frontend, sending the image data to an Express server, temporarily storing the image in memory, and then saving it to a PostgreSQL database. The project aims to demonstrate the full cycle of image handling, including potential future functionality for retrieving images from the database and displaying them on the frontend.

## Table of Contents

- [Image Upload Proof of Concept with Vite, Express, and PostgreSQL](#image-upload-proof-of-concept-with-vite-express-and-postgresql)
  - [Introduction](#introduction)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Knowledge Bits](#knowledge-bits)
      - [The strategy utilized by this project is to use memory to hold image data.](#the-strategy-utilized-by-this-project-is-to-use-memory-to-hold-image-data)
    - [Server Setup](#server-setup)
    - [React Frontend](#react-frontend)
    - [Image Uploading](#image-uploading)
  - [Common Issues and Troubleshooting](#common-issues-and-troubleshooting)
  - [Dependencies](#dependencies)
  - [Configuration](#configuration)

## Installation

1. Ensure Node.js and PostgreSQL are installed on your machine.
2. Clone the repository to your local machine.
3. Install the necessary dependencies by running `npm install` in the project root directory.
4. Ensure your PostgreSQL database is running and create a database that matches the name defined in `server/modules/pool.js`.
5. Run the server using `npm run server` and the React app with `npm run dev`.

## Usage

### Knowledge Bits

There are 3 broad strategies for using Multer for image upload
1. You can simply use the local file system in directory that your project lives and reference those files to display images in your application.
2. You can use the disk storage of your machine that is hosting your server (whether localhost during dev, or a VM once deployed, etc.).
3. You can use the memory of the machine that is hosting your project to temporarily store image data.

#### The strategy utilized by this project is to use memory to hold image data.
- This works by specifying the storage object for the multer instance during instantiation
 ```js
 const upload = multer({ storage: multer.memoryStorage() });
 ```


### Server Setup

The server is set up in `server.js` and configured to listen on port 5001. It includes middleware for parsing JSON and URL-encoded data and routes for handling API requests related to image uploading.

### React Frontend

The React component `Picture` handles the image upload functionality. Users can select an image file, which is then sent to the server upon form submission.

### Image Uploading

The image is uploaded through a POST request handled by the Express router in `server/routes/pics.router.js`. The multer library is used for handling multipart/form-data, which includes the image. The image is temporarily stored in memory before being saved to the PostgreSQL database.

## Common Issues and Troubleshooting

- **Proxy Configuration**: Ensure the Vite configuration properly proxies API requests to the backend. Misconfiguration can prevent CRUD operations from reaching the correct endpoints.
- **Form Data Naming**: The name attribute for input fields and the first argument to `FormData.append()` must align with the `multer` configuration on the server.
  ```js
  // <------------------------- Picture.jsx ------------------------->

      <input
          id="file-upload"
          name="image_to_upload" // this string must match everywhere
          type="file"
          ref={fileInput}
          accept="image/*"
          onChange={handlePicOnChange}
      />

      // AND

      const handleSubmitPic = (e) => {
            ...
            data.append("image_to_upload", file);
            ...
        };


  // <------------------------- pics.router.js ------------------------->

      router.post("/", upload.single("image_to_upload"), (req, res) => {...} // synch function signature
      
      // OR

      router.post("/", upload.single("image_to_upload"), async (req, res) => {...} // asynch func sign
  
  ```
  
- **Database Connection**: Verify the database is running and accessible, with the correct database name as defined in `server/modules/pool.js`.
- **SQL Queries**: Ensure the table name in SQL queries, such as those in `server/modules/routes/pics.router.js`, matches your database schema.

## Dependencies

- React and Redux for frontend development.
- Express for the backend server.
- Multer for handling image uploads.
- PostgreSQL (`pg`) for database management.
- Vite for bundling and development server.

Refer to `package.json` for a complete list of dependencies and their versions.

## Configuration

Ensure the `.env` file (if used) is configured with the correct database credentials and any other environment-specific settings.
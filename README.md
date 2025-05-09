 GreenHouse
GreenHouse is a MERN stack e-commerce web app for selling plants online. Users can browse products, add them to cart, contact support, and place inquiries/bulk orders. Includes user authentication and an admin panel for managing products.
Technologies used:
*Frontend: React.js, Bootstrap

*Backend: Node.js, Express.js

*Database: MongoDB (Mongoose)

*Auth: JWT
 Features
 *User Signup/Login (JWT-based)

*Product List (Plants)
* Add to Cart
* Cart Component

* Articles Page (Info / Blogs)

* Contact Us with Inquiry Form

* Bulk Order Option

* Admin Access: Add/Remove Plants (reflected on UI)

project structure 

  client/          # React Frontend
  ├── components/
  ├── pages/
  └── App.js
server/          # Express Backend
  ├── models/
  ├── routes/
  ├── controllers/
  └── server.js

neccessry steps:
cd greenhouse
cd server
npm install

cd ../client
npm install
run the app
cd server
npm start
cd client
npm start
App runs on: http://localhost:3000

dependencies required:
verify in package.json
Server
1 express
2 mongoose
3cors
4 bcryptjs
5 jsonwebtoken
6 multer

Client

1 react
2 react-router-dom
3 axios
4 bootstrap





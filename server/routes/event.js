const express = require('express');
const app = express();
const router = express.Router();

const { isLoggedIn, catchAsync, isAdmin } = require('../middleware');

const dbURL = process.env.DBURL || 'mongodb://localhost:27017/nvcti';
const path = require('path');
const { MongoClient } = require("mongodb");
const client = new MongoClient(dbURL);
const database = client.db("nvcti");
const collection = database.collection("event");
const eventController = require('../controllers/eventFormControllers');

router.route('/')
    .get(eventController.getEvent); // admin

router.route('/submit')
    .post( catchAsync(eventController.submitPostByAdmin)); //admin
 
router.route('/formData') // admin & student
    .get(catchAsync(eventController.getFormData));

router.route('/apply')
    .get(catchAsync(eventController.getApply)); // student

router.route('/submitForm')
    .post(catchAsync(eventController.submitFormPostByStudents)); // student

module.exports = router;
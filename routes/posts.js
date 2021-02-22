// import required essentials
const express = require('express');
// create new router
const router = express.Router();
const db = require("../db");


// index
// this end-point of an API returns JSON data array
router.get('/', function (req, res) {
  db((err, connection) => {
    connection.query('SELECT * from posts', (error, rows) => {
      if (err) throw error;
      console.log('Posts info is: ', rows);
      res.status(200).send(rows);
    });
  });
});

// show
// this end-point returns an object from a data array find by id
// we get `id` from URL end-points
router.get('/:id', function (req, res) {
  db((err, connection) => {
    connection.query(`SELECT * from posts where id=${parseInt(req.params.id)}`, (error, rows) => {
      if (err) throw error;
      console.log('Post info is: ', rows);
      res.status(200).send(rows);
    });
  });
});

// create
// this api end-point add new object to post list
// that is add new object to `data` array
router.post('/', function (req, res) {
  // get postIds from data array
  let postIds = data.map(post => post.id);
  // get orderNums from data array
  let orderNums = data.map(post => post.order);

  // create new id (basically +1 of last post object)
  let newId = postIds.length > 0 ? Math.max.apply(Math, postIds) + 1 : 1;
  // create new order number (basically +1 of last post object)
  let newOrderNum = orderNums.length > 0 ? Math.max.apply(Math, orderNums) + 1 : 1;

  // create an object of new post
  let newPost = {
      id: newId, // generated in above step
      title: req.body.title, // value of `title` get from POST req
      order: newOrderNum, // generated in above step
      completed: false, // default value is set to false
      createdOn: new Date() // new date object
  };

  // push new post object to data array of posts
  data.push(newPost);

  // return with status 201
  // 201 means Created. The request has been fulfilled and 
  // has resulted in one or more new resources being created. 
  res.status(201).json(newPost);
});

// update
// this api end-point update an existing post object
// for that we get `id` and `title` from api end-point of post to update
router.put('/:id', function (req, res) {
  // get post object match by `id`
  let found = data.find(function (post) {
      return post.id === parseInt(req.params.id);
  });

  // check if post found
  if (found) {
      let updated = {
          id: found.id,
          title: req.body.title, // set value of `title` get from req
          order: req.body.order, // set value of `order` get from req
          completed: req.body.completed // set value of `completed` get from req
      };

      // find index of found object from array of data
      let targetIndex = data.indexOf(found);

      // replace object from data list with `updated` object
      data.splice(targetIndex, 1, updated);

      // return with status 204
      // success status response code 204 indicates
      // that the request has succeeded
      res.sendStatus(204);
  } else {
      res.sendStatus(404);
  }
});

// delete
// this api end-point delete an existing post object from
// array of data, match by `id` find post and then delete
router.delete('/:id', function (req, res) {
  // find post from array of data
  let found = data.find(function (post) {
      return post.id === parseInt(req.params.id);
  });

  if (found) {
      // if post found then find index at which the post is
      // stored in the `data` array
      let targetIndex = data.indexOf(found);

      // splice means delete post from `data` array using index
      data.splice(targetIndex, 1);
  }

  // return with status 204
  // success status response code 204 indicates
  // that the request has succeeded
  res.sendStatus(204);
});

module.exports = router;

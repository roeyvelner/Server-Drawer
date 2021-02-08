var express = require('express');
var router = express.Router();
var groups;
groups = [{ name: "Team1", users: new Array(0) },
    { name: "Team2", users: new Array(0) },
    { name: "Team3", users: new Array(0) },
    { name: "Team4", users: new Array(0) },
    { name: "Team5", users: new Array(0) }];
var bodyParser = require('body-parser');
router.use(bodyParser.json());
// router.use('/users',(req,res,next)=>{
//     console.log("got users");
//     next();
// })
router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
router.get('/', function (req, res) {
    res.send("Hello from Home!!");
});
router.get('/users/:groupId', function (req, res, next) {
    groups.forEach(function (element) {
        if (element.name == req.params.groupId) {
            res.json(element.users);
        }
    });
    res.json({});
});
router.get('/teams', function (req, res, next) {
    console.log("Get Teams");
    var teams;
    teams = new Array(0);
    groups.forEach(function (element) {
        teams.push(element.name);
    });
    res.json(teams);
});
router.post('/users/:groupId', function (req, res) {
    console.log("got post req");
    console.log(req.body.name);
    console.log(req.params.groupId);
    groups.forEach(function (element) {
        if (element.name == req.params.groupId) {
            element.users.push(req.body.name);
            res.json(element.users);
        }
    });
});
router["delete"]('/users/:groupId', function (req, res) {
    console.log("got delete req");
    console.log(req.body.name);
    console.log(req.params.groupId);
    groups.forEach(function (element) {
        if (element.name == req.params.groupId) {
            var index = element.users.indexOf(req.body.name, 0);
            if (index > -1) {
                element.users.splice(index, 1);
            }
            res.json(element.users);
        }
    });
});
var Pusher = require('pusher');
var pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: 'ap2'
});
router.post('/paint', function (req, res) {
    pusher.trigger('painting', 'draw', req.body);
    res.json(req.body);
});
// router.get('/users/:userId',async (req,res,next)=>{
//     try{
//         const user = await User.findById(req.params.userId);
//         res.json(user);
//     }
//     catch(err){
//         console.log(err);
//         res.json(err);
//     }
// })
// router.delete('/users/:userId',async (req,res,next)=>{
//     try{
//         const removedUser = await User.remove({_id : req.params.userId});
//         res.json(removedUser);
//     }
//     catch(err){
//         console.log(err);
//         res.json(err);
//     }
// })
// router.patch('/users/:userId',async (req,res,next)=>{
//     try{
//         const updatedUser = await User.updateOne(
//             {_id : req.params.userId},
//             { $set: {title : req.body.title}}
//         );
//         res.json(updatedUser);
//     }
//     catch(err){
//         console.log(err);
//         res.json(err);
//     }
// })
module.exports = router;

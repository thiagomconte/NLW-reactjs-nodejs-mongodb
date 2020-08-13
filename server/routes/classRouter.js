const router = require("express").Router();
const moment = require("moment");
const User = require("../models/UserModel");
const Class = require("../models/ClassesModel");
const ClassSchedule = require("../models/ClassScheduleModel");
const convertHourToMinutes = require("../utils/convertHourToMinutes");
const { populate } = require("../models/UserModel");

router.post("/create", async (req, res) => {
  const { name, avatar, whatsapp, bio, subject, cost, schedule } = req.body;

  const newUser = new User({
    name,
    avatar,
    whatsapp,
    bio,
  });

  try {
    const userInserted = await newUser.save();

    const newClass = new Class({
      user_id: userInserted._id,
      subject,
      cost: cost.toFixed(2),
    });

    const classInserted = await newClass.save();

    schedule.map(async (element) => {
      const classSchedule = new ClassSchedule({
        class_id: classInserted._id,
        week_day: element.week_day,
        from: convertHourToMinutes(element.from),
        to: convertHourToMinutes(element.to),
      });
      await classSchedule.save();
    });
    res.status(201);
  } catch (error) {
    res.status(400);
  }
});

router.get("/", async (req, res) => {
  const { week_day, subject, time } = req.query;
  if (!week_day || !subject || !time) {
    return res.status(400);
  } else {
    const timeInMinutes = convertHourToMinutes(time);
    const classFound = await Class.findOne({subject: subject})

    if(classFound){
      await ClassSchedule.find({
        week_day: week_day,
        from: { $lte: timeInMinutes },
        to: { $gt: timeInMinutes },
      }).populate({path:'class_id', match:{subject: subject}, populate:{path: 'user_id'}}).exec(function(err, result){
        res.send(result);
      })
    }else{
      res.status(400)
    }
  }
});

module.exports = router;

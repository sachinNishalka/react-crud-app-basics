const router = require("express").Router();
let Student = require("../models/student");
router.route("/add").post((req, res) => {
  const name = req.body.name;
  const age = Number(req.body.age);
  const address = req.body.address;

  const newStudent = new Student({
    name,
    age,
    address,
  });

  newStudent
    .save()
    .then(() => {
      res.json("Student Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/").get((req, res) => {
  Student.find()
    .then((students) => {
      res.json(students);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/update/:id").put(async (req, res) => {
  let userid = req.params.id;
  const { name, age, address } = req.body;
  const updateStudent = {
    name,
    age,
    address,
  };
  const update = await Student.findByIdAndUpdate(userid, updateStudent)
    .then(() => {
      res.status(200).send({ status: "User Updated!" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data!", error: err.message });
    });
});

router.route("/delete/:id").delete(async (req, res) => {
  let userid = req.params.id;
  await Student.findByIdAndDelete(userid)
    .then(() => {
      res.status(200).send({ status: "User Deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with delete user!", error: err.message });
    });
});

router.route("/get/:id").get(async (req, res) => {
  let userId = req.params.id;
  const user = await Student.findById(userId)
    .then((student) => {
      res.status(200).send({ status: "User Fetched", student });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ stats: "Error with user!", error: err.message });
    });
});

module.exports = router;

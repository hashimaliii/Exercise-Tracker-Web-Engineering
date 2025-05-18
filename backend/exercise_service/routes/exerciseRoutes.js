const router = require('express').Router();
const Exercise = require('../model/exerciseModel');
const protect = require('.././middleware/authMiddleware');
const allowedRoles = require('../middleware/allowedRoles');

router.get('/', (req, res) => {
    Exercise.find()
        .then((exercises) => res.json(exercises))
        .catch((err) => res.status(400).json('Error: ' + err));
});

router.post('/add', protect, (req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    });

    newExercise.save()
        .then(() => res.json("Exercise added!"))
        .catch((err) => res.status(400).json('Error: ' + err));
});

router.get('/:id', protect, (req, res) => {
    const id = req.params.id;
    Exercise.findById(id)
        .then((exercise) => res.json(exercise))
        .catch((err) => res.status(400).json('Error: ' + err));
});

router.delete('/:id', protect, (req, res) => {
    const id = req.params.id;
    Exercise.findByIdAndDelete(id)
        .then(() => res.json('Exercise deleted successfully!'))
        .catch((err) => res.status(400).json('Error' + err));
});

router.put('/:id', protect, (req, res) => {
    const id = req.params.id;

    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    Exercise.findByIdAndUpdate(id, { username, description, duration, date }, { new: true })
        .then((updatedUser) => res.json('Exercise updated successfully! ', updatedUser))
        .catch((err) => res.status(400).json('Error: ' + err));
});

// router.route('/update/:id').post((req, res) => {
//     const id = req.params.id;
//     Exercise.findById(id)
//         .then((exercise) => {
//             exercise.username = username;
//             exercise.description = description;
//             exercise.duration = duration;
//             exercise.date = date;

//             exercise.save()
//             .then(()=>res.json('Exercise updated successfully!'))
//             .catch((err)=>res.status(400).json('Error: ' + err));
//         })
//         .catch((err) => res.status(400).json('Error: ' + err));
// });

module.exports = router;
import { Router } from 'express';
import * as userHandler from '../request-handier/user.handdler.js';
import * as examHandler from '../request-handier/exam.handiler.js';

const router = Router();

// Routes for registering a user
router.route('/register/student').post(userHandler.St_register);
router.route('/register/trainer').post(userHandler.T_register);
router.route('/register/admin').post(userHandler.Ad_register);

// Routes for logging in a user
router.route('/login/student').post(userHandler.login);
router.route('/login/trainer').post(userHandler.login);
router.route('/login/admin').post(userHandler.login);

// Routes for exam handling
router.route('/create_exam').post(examHandler.createExam);
router.route('/exams').get(examHandler.getAllExams);
// router.route('/exam/:id').get(examHandler.getExamById);
router.route("/submit_exam").post(examHandler.submitExam);
router.route("/exam/:id").get(examHandler.getExamById);

router.route("/exam_results/:examId").get(examHandler.Allstudent_mark);
router.route("/api/exam_results/:examId/:studentId").get(examHandler.student_mark)

export default router;

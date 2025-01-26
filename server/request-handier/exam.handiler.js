import Exam from "../model/exam.model.js";
import Result from "../model/examAttemptModel.js";


export const createExam = async (req, res) => {
  const { title, duration, totalMarks, questions } = req.body;

  // Validate request payload
  if (!title || !duration || !totalMarks || !questions.length) {
    console.error("Validation Error: Missing required fields");
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Additional validation can be added here as needed
  
  try {
    const newExam = new Exam({ title, duration, totalMarks, questions });
    await newExam.save();
    res.status(201).json({ message: 'Exam created successfully' });
  } catch (error) {
    console.error("Server Error:", error.message);
    res.status(400).json({ message: 'Failed to create exam', error: error.message });
  }
};



export const submitExam = async (req, res) => {
  const { userId, examId, obtainedMarks, total_mark } = req.body;

  if (!userId || !examId || obtainedMarks === undefined) {
    return res.status(400).json({ error: "Invalid or incomplete data." });
  }

  try {
    // Save to database or process further
    const newResult =new Result({userId, examId, obtainedMarks , total_mark });
    await newResult.save();
    res.status(200).json({ message: "Exam submitted successfully!" });
  } catch (error) {
    console.error("Error saving submission:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};





export const getExamById = async (req, res) => {
  const { id } = req.params;
  try {
    const exam = await Exam.findById(id);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }
    res.status(200).json(exam);
  } catch (error) {
    console.error("Error fetching exam:", error.message);
    res.status(500).json({ message: "Error fetching exam", error: error.message });
  }
};


export const getAllExams=async (req, res) => {
  try {
    const exams = await Exam.find({}, { title: 1 }); // Fetch only the title and ID
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch exams" });
  }
};

export const Allstudent_mark = async (req, res) => {
  const { examId } = req.params;
  try {
    // Fetch data from the database
    const results = await Result.find({ examId })
      .populate('userId', 'name email') // Populate user data if needed
      .select('obtainedMarks submissionDate');
       console.log(userId);
       
    if (!results || results.length === 0) {
      return res.status(404).json({ message: 'No results found for this exam.' });
    }

    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching exam results:', error.message);
    res.status(500).json({ error: 'Failed to fetch exam results.' });
  }
};

export const student_mark =async (req, res) => {
  const { examId, userId } = req.params;

  try {
    // Find the student's submission for the given exam
    const result = await Result.findone({ examId,  userId,obtainedMarks })
      // .populate('userId', 'name email') // Populate user details
      // .select('obtainedMarks submissionDate'); // Select relevant fields

    if (!result) {
      return res.status(404).json({ message: 'Result not found for this student and exam.' });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching result:', error.message);
    res.status(500).json({ error: 'Failed to fetch the exam result.' });
  }
};



// export const getAllExams = async (req, res) => {
//   try {
//     const exams = await Exam.find();
//     res.status(200).json({ exams });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const getExamById = async (req, res) => {
//   try {
//     const { id } = req.params;  // Extract the 'id' from the URL parameters

//     const exam = await Exam.findById(id);  // Use the ID to find the exam in the database
//     if (!exam) {
//       return res.status(404).json({ message: "Exam not found" });
//     }

//     res.status(200).json({ exam });  // Send the exam data as the response
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


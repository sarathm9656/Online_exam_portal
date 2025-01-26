import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import ErrorPage from "./pages/error";
import TR_Register from "./pages/tr_register"
import Home from "./pages/Home";
import Admin from "./pages/admin_register";
import Student_Reg from "./pages/student_register"
import HomeDashboard from "./pages/student_dash";
import Auth from "./middilevare/auth";
import CreateExam from "./pages/create_exam";
import ShowExams from "./pages/ListExams";
// import ViewExamById from "./pages/examby_id";
import DashboardPage from "./pages/admin-dashpage";
import ExamAttend from "./pages/examattent";
import Mark_ExamList from "./pages/ListAll_exam_in-mark";
import ALL_stu_ExamResults from "./pages/All-students_mark";
import axios from "axios";

// Set Axios Base URL
if (import.meta.env.DEV) {
  axios.defaults.baseURL = `http://localhost:${import.meta.env.VITE_PORT}`;
} else {
  axios.defaults.baseURL = window.location.origin;
}

function App() {
  const userId = localStorage.getItem("userId");


  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register/student_reg" element={<Student_Reg />} />
          <Route path="/register/teacher_reg" element={<TR_Register />} />
          <Route path="/register/admin_reg" element={<Admin />} />

          <Route path="/login" element={<Login />} />
          {/* <Route path="/login/teacher_login" element={<Login />} />
          <Route path="/login/admin_login" element={<Login />} /> */}
          {/* <Route path="/traine"> */}
          <Route path="/traine" element = { <Auth> <DashboardPage/></Auth>}/>
          <Route path="/AddExam" element={<CreateExam/>}/>
           <Route path="/exams_mark" element={<Mark_ExamList/>}/>
           <Route path="/exam-results/:examId" element={<ALL_stu_ExamResults />} />

          {/* </Route> */}
          
          {/* <Route path="/student">  */}
          <Route path="/student" element={ <Auth> <HomeDashboard /> </Auth> } />
          <Route path="/view_exam" element={<ShowExams/>}/>
          <Route path="/attend-exam/:examId" element={<ExamAttend userId={userId} />} />

          {/* </Route> */}
            <Route path="/attent_exam" element={<ExamAttend/>}/>
          {/* <Route path="/exam" element={<ViewExamById/>}/> */}
          


          <Route path="/*" element={<ErrorPage />} />



        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

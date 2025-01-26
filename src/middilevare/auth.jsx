// import React from "react";
// import { Navigate } from "react-router-dom";

// export default function Auth({ children }) {
//     const token = localStorage.getItem("token");
//     // console.log("Token:", token); // Debugging to verify token presence
//     if (token) {
//         return <>{children}</>;
//     }
//     return <Navigate to="/login/student_login" replace={true} />;
// }
import React from "react";
import { Navigate } from "react-router-dom";

export default function Auth({ children }) {
    let token = localStorage.getItem("token");
    if (token) {
        return <>{children}</>;
    }
    return <Navigate to="/login" replace={true} />;
}

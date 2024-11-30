import React from "react";

/**
 * Defines the alert message to render if the specified error is truthy.
 * @param error
 *  an instance of an object with `.message` property as a string, typically an Error instance.
 * @returns {JSX.Element}
 *  a bootstrap danger alert that contains the message string.
 */

function ErrorAlert({ error }) {
  return (
    error && (
      <div className="alert alert-danger m-2">Error: {error.message}</div>
    )
  );
}
// function ErrorAlert({ errors }) {
//   console.log("ErrorAlert - errors: ",errors);
//   return (
//     errors &&
//     errors.length > 0 &&
//     errors.map((error, index) => {console.log("ErrorAlert - error: ", error, " error.message: ",error.message);
//         return(
//           <div key={index} className="alert alert-danger m-2">Error: {error}</div>
//     );})
//   );
// }
// function ErrorAlert({ errors }) {
//     console.log("ErrorAlert - errors: ", errors);
  
//     if (!errors || Object.keys(errors).length === 0) {
//       return null;  // Return null if there are no errors or the errors object is empty
//     }
  
//     return (
//       <div>
//         {Object.entries(errors).map(([key, error], index) => {
//           console.log(`ErrorAlert - ${key}: `, error);
//           return (
//             <div key={index} className="alert alert-danger m-2">
//               Error: {error}
//             </div>
//           );
//         })}
//       </div>
//     );
//   }
  

export default ErrorAlert;

import { useState } from 'react';
import { useHistory } from 'react-router-dom';

/**
 * Use this hook to handle form submissions.
 * 
 * @param {Function} apiFunction - The API function to call with formData.
 * @param {Function} validationFunction - Function to validate formData before submission.
 * @param {Function} onSuccess - Function that returns the path to redirect on successful submission.
 * @returns {Object} Contains the submitHandler function and any submission errors.
 */

function useSubmitHandler(apiFunction, validationFunction = () => ({}), onSuccess) {
  const [errors, setErrors] = useState(null);
  const history = useHistory();

  const submitHandler = async (event, formData) => {
    event.preventDefault();
    const abortController = new AbortController();

    // Use the passed validation function 
    const validationError = validationFunction(formData);
    if (validationError) {
      setErrors(validationError); 
      abortController.abort();
      return;
  }

    try {
      const response = await apiFunction(formData, abortController.signal);
      history.push(onSuccess(response));
    } catch (error) {
      console.error(`${apiFunction.name} error during form submission:`, error);
      // Create an error object with a message property
      // const errorMessage = error.response?.data?.error || error.message || "Unknown error occurred.";
      setErrors(error);
    } finally {
      abortController.abort();
    }
  };

  return { submitHandler, errors };
}

export default useSubmitHandler;

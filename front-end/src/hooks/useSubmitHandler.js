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
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const submitHandler = async (event, formData) => {
    event.preventDefault();
    const abortController = new AbortController();

    const validationErrors = validationFunction(formData);
        if (Object.keys(validationErrors).length > 0) {
            const errorMessages = Object.values(validationErrors).map(error => error.message || error);
            setErrors(errorMessages);
            abortController.abort();
            return;
        }

    try {
      const response = await apiFunction(formData, abortController.signal);
      history.push(onSuccess(response));
    } catch (error) {
      console.error(`${apiFunction.name} error during form submission:`, error);
      setErrors([error.response?.data?.error || error.message || "Unknown error occurred."]);
    }
    finally{
        abortController.abort();
    }

  };

  return { submitHandler, errors };

}

export default useSubmitHandler;

import React from 'react'
import { useHistory } from 'react-router-dom';

function Cancel() {
    const history = useHistory();

    const handleClick = () => {
        history.goBack();
    };

    return <button className="btn btn-secondary" onClick={handleClick}>Cancel</button>
};

export default Cancel;

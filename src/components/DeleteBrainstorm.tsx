import { useState } from "react";
import { deleteBrainstorm } from "../api";

function DeleteBrainstorm() {
    const [error, setError] = useState('');

    const handleOnClick = async() => {
        try {
            deleteBrainstorm(0);
        } catch (error) {
            console.log("Error");
            setError("Error deleting brainstorm.");
        }
    }

    return (
        <>
            <button onClick={handleOnClick}>Delete Brainstorm</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
    )
}

export default DeleteBrainstorm;
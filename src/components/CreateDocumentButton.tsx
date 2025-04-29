import { useNavigate } from "react-router-dom";
import { createDocument } from "../api";
import { Document } from "../models/Document";

function CreateDocumentButton() {
    //const [response, setResponse] = useState('');
    const navigate = useNavigate();

    const document: Document = {
        title: "",
        //contributors: [], // Empty array for contributors
        //brainstorms: {}   // Empty object (dictionary) for brainstorms
        created_at: new Date().toISOString(),
        last_updated: new Date().toISOString()
    };
    

    const handleOnClick = async () => {
        try {
            const documentResponse = await createDocument(document);
            const document_id = documentResponse.id;

            if (document_id) {
                navigate(`/doc/${document_id}`);
            }
            //setResponse("This document has been created with ID " + document_id);
        } catch (error) {
            console.log(error);
            //setResponse("Error creating document.");
        }
    };

    return (
        <>
            <button onClick={handleOnClick} className="btn btn-primary mb-3">Create new document</button>
            {/*response && <p>{response}</p>*/}
        </>
    );
}

export default CreateDocumentButton;
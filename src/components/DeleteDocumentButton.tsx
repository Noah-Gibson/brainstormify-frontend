import { deleteDocument } from "../api";
import { Document } from "../models/Document";

interface DeleteDocumentButtonProps {
    document: Document;
    onDelete: (documentId: string) => void;
}

function DeleteDocumentButton({document, onDelete}: DeleteDocumentButtonProps) {
    const handleOnClick = async () => {
        console.log(document.id)
        if (!document.id || typeof document.id !== "string") return;

        try {
            await deleteDocument(document.id);
            onDelete(document.id);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <button type="button" className="btn btn-outline-danger btn-sm" onClick={handleOnClick}>Delete</button>
    )
}

export default DeleteDocumentButton;
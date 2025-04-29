import { useState, useEffect } from "react";
import CreateDocumentButton from "../components/CreateDocumentButton";
import { Document } from "../models/Document";
import { getDocuments } from "../api";
import UsernameInput from "../components/UsernameInput";
import DocumentCard from "../components/DocumentCard";
import PageLoadSpinner from "../components/PageLoadSpinner";

function HomePage() {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [notFound, setNotFound] = useState<boolean>(false);

    useEffect(() => {
        async function fetchDocuments() {
            try {
                const data = await getDocuments();
                console.log("Documents: " + data);
                if (!data || data.length === 0) {
                    setNotFound(true);
                    return;
                }

                setDocuments(data);
            } catch (error: any) {
                setError(error.message || 'Failed to fetch documents');
            } finally {
                setLoading(false);
            }
        }

        fetchDocuments();
    }, []);

    const handleDelete = (documentId: string) => {
        setDocuments((prevDocs) => prevDocs.filter(doc => doc.id !== documentId));
    };

    if (loading) return <PageLoadSpinner/>;

    return (
        <div className="content">
            <h1>Documents</h1>
            <CreateDocumentButton/>

            {notFound ? (
                <p>No documents found.</p>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <ul className="document-grid">
                    {documents.map(doc => (
                        <DocumentCard key={doc.id} document={doc} onDelete={handleDelete}/>
                    ))}
                </ul>
            )}

            <UsernameInput/>
        </div>
    );
}

export default HomePage;
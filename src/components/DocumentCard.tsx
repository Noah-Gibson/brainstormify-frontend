import { Document } from "../models/Document";
import { formatDistanceToNow, format } from 'date-fns';
import { Link } from "react-router-dom";
import DeleteDocumentButton from "./DeleteDocumentButton";
import normalizeDate from "../utils/normalizeDate";

interface DocumentCardProps {
    document: Document;
    onDelete: (documentId: string) => void;
}

function DocumentCard({ document, onDelete }: DocumentCardProps) {
    const normalizedCreatedAt = document.created_at ? normalizeDate(document.created_at) : null;
    const formattedCreatedAt = normalizedCreatedAt
        ? format(new Date(normalizedCreatedAt), 'M/d/yy')
        : "Unknown date";
    
    const normalizedLastUpdated = document.created_at ? normalizeDate(document.last_updated) : null;
    const formattedLastUpdated = normalizedLastUpdated
        ? formatDistanceToNow(new Date(normalizedLastUpdated), { addSuffix: true })
        : "Unknown date";

    return (
        <main style={{flex: 1}}>
            <div className="card" style={{ marginBottom: '10px', width: '18rem'}}>
                <div className="card-header">
                    <h5 className="card-title">
                        <Link to={`/doc/${document.id}`} style={{ margin: '0'}}>{document?.title?.trim() ? document.title : "Untitled document"}</Link>
                    </h5>
                </div>
                <div className="card-body">
                    <p className="card-text mb-2">{`ID: ${document?.id ?? "Unknown ID"}`}</p>
                    <p className="card-text mb-0"><small className="text-body-secondary">Last updated {formattedLastUpdated}</small></p>
                    <p className="card-text"><small className="text-body-secondary">Created {formattedCreatedAt}</small></p>
                </div>
                <div className="card-footer d-flex justify-content-end">
                    <DeleteDocumentButton document={document} onDelete={onDelete}/>
                </div>
            </div>
        </main>
    )
}


export default DocumentCard;
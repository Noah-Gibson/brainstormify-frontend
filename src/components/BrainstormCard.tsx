import { Brainstorm } from "../models/Document";
import { formatDistanceToNow } from 'date-fns';
import normalizeDate from "../utils/normalizeDate";

interface BrainstormCardProps {
    brainstorm: Brainstorm;
}

function BrainstormCard({ brainstorm }: BrainstormCardProps) {
    const normalizedDate = brainstorm.created_at ? normalizeDate(brainstorm.created_at) : null;
    const formattedDate = normalizedDate
        ? formatDistanceToNow(new Date(normalizedDate), { addSuffix: true })
        : "Unknown date";

    return (
        <main style={{flex: 1}}>
            <div className="card mb-2">
                <div className="card-body">
                    <p className="card-text mb-1">{brainstorm.content}</p>
                    <p className="card-text"><small className="text-body-secondary">{`${brainstorm?.author ?? "Unknown author"}, ${formattedDate}`}</small></p>
                </div>
            </div>
        </main>
    )
}

export default BrainstormCard;
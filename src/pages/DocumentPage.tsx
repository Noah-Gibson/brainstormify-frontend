import BrainstormInput from '../components/BrainstormInput';
import BrainstormCard from '../components/BrainstormCard';
import { getBrainstorms } from '../api';
import { useEffect, useState } from 'react';
import '../styles/App.css';
import { Brainstorm } from '../models/Document';
import DocumentTitle from '../components/DocumentTitle';
import PageLoadSpinner from '../components/PageLoadSpinner';
import { useDocument } from '../contexts/DocumentContext';

function DocumentPage() {
    const { document, loading, error } = useDocument();
    const [brainstorms, setBrainstorms] = useState<Brainstorm[]>([]);
    const [activeComponent, setActiveComponent] = useState<string | null>(null);

    useEffect(() => {
        if (!document || !document.id) return;

        const fetchBrainstorms = async () => {
            try {
                const data = document.id ? await getBrainstorms(document.id) : [];
                console.log("Fetched brainstorms: " + data);
                setBrainstorms(data || []);
            } catch {
                console.error("Error fetching brainstorms.");
            }
        };

        fetchBrainstorms();
    }, [document]);

    if (loading) return <PageLoadSpinner />;
    if (error || !document) return <p style={{ color: 'red' }}>Problem loading document.</p>;

    return (
        <div className='content'>
            <DocumentTitle
                activeComponent={activeComponent}
                setActiveComponent={setActiveComponent}
                initialTitle={document.title}
                doc={document}
            />
            {Array.isArray(brainstorms) ? brainstorms.map(brainstorm => (
                <BrainstormCard key={brainstorm.id} brainstorm={brainstorm} />
            )): null}
            <BrainstormInput
                setBrainstorms={setBrainstorms}
                activeComponent={activeComponent}
                setActiveComponent={setActiveComponent}
                doc={document}
            />
        </div>
    );
}

export default DocumentPage;
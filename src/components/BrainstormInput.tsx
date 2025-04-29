import { useRef, useEffect } from "react";
import {createBrainstorm, updateDocument} from "../api";
import { Document, Brainstorm } from "../models/Document";

interface BrainstormInputProps {
    setBrainstorms: React.Dispatch<React.SetStateAction<Brainstorm[]>>;
    activeComponent: string | null;
    setActiveComponent: React.Dispatch<React.SetStateAction<string | null>>;
    doc: Document;
}

function BrainstormInput({
    setBrainstorms,
    activeComponent,
    doc
}: BrainstormInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    //const { docId } = useParams();

    const handleOnClick = async () => {
        if (inputRef.current && inputRef.current?.value.trim() !== '') {
            const newBrainstorm: Brainstorm = {
                id: Date.now(),
                content: inputRef.current.value,
                author: 'Noah',
                created_at: new Date().toISOString()
            }
            if (doc.id) {
                await createBrainstorm(doc.id, newBrainstorm);
                setBrainstorms((prevBrainstorms) => [...prevBrainstorms, newBrainstorm]);
                await updateDocument(doc.id, { last_updated: newBrainstorm.created_at });
            } else {
                console.error("documentId is undefined");
            }
            inputRef.current.value = ''; // Clear input box
        }
    }

    useEffect(() => {
        const handleGlobalKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Enter" && activeComponent === "brainstormInput") {
                handleOnClick();
            }
        };

        document.addEventListener("keydown", handleGlobalKeyDown);
        return () => document.removeEventListener("keydown", handleGlobalKeyDown);
    }, [activeComponent]);
 
    return (
        <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <main style={{flex: 1}}>
                {/* {brainstorms.map((brainstorm, index) => (
                    <div className="card" style={{ marginBottom: '10px'}}>
                        <div className="card-body">
                            <p style={{ margin: '0'}}>{brainstorm}</p>
                        </div>
                        <div className="card-footer">
                            Noah 11:06am
                        </div>
                    </div>
                ))} */}
            </main>
            <footer style={{position: 'sticky', bottom: '0'}}>
                <div className="input-group mb-3">
                    <input
                        ref={inputRef}
                        type="text"
                        className="form-control"
                        placeholder="Share your Brainstorm"
                        onKeyDown={(event) => event.key == "Enter" ? handleOnClick() : null}
                    >
                    </input>
                    <button
                        className="btn btn-primary"
                        onClick={handleOnClick}
                    >
                        Send
                    </button>
                </div>
            </footer>
        </div>
    )
}

export default BrainstormInput;
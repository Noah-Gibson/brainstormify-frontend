import { useState, useEffect, useRef } from "react";
import { updateDocument } from "../api";
import { Document } from "../models/Document";

interface DocumentTitleProps {
    activeComponent: string | null;
    setActiveComponent: React.Dispatch<React.SetStateAction<string | null>>;
    initialTitle: string;
    doc: Document | null;
}

function DocumentTitle({ activeComponent, setActiveComponent, initialTitle, doc }: DocumentTitleProps) {
    const [title, setTitle] = useState(initialTitle);
    const inputRef = useRef<HTMLInputElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleFocus = () => {
        setActiveComponent("documentTitle");
    };

    const handleBlur = () => {
        if (activeComponent === "documentTitle") {
            runCode();
            setActiveComponent(null);
        }
    };

    const runCode = async () => {
        if (!doc?.id || isSubmitting) return;
        await updateDocument(doc.id, { title });
        setIsSubmitting(false);
    };

    useEffect(() => {
        setTitle(initialTitle);
    }, [initialTitle])

    useEffect(() => {
        const handleGlobalKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Enter" && activeComponent === "documentTitle") {
                event.preventDefault();
                runCode();
                inputRef.current?.blur();
            }
        };
        document.addEventListener("keydown", handleGlobalKeyDown);
        return () => document.removeEventListener("keydown", handleGlobalKeyDown);
    }, [activeComponent]);

    return (
        <input
            ref={inputRef}
            className="form-control"
            type="text"
            placeholder='Untitled document'
            value={title}
            onFocus={handleFocus}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '25px'}}
        />
    )
}

export default DocumentTitle;
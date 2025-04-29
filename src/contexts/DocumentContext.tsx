import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDocument } from '../api';
import { Document } from '../models/Document';

interface DocumentContextType {
    document: Document | null;
    loading: boolean;
    error: boolean;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export const useDocument = () => {
    const context = useContext(DocumentContext);
    if (!context) throw new Error("Component needs to be wrapped in DocumentProvider");
    return context;
}

export function DocumentProvider({ children }: { children: ReactNode }) {
    console.log("Document provider rendered")
    const { documentId } = useParams<{ documentId: string }>();
    console.log(documentId);
    const navigate = useNavigate();
    const [document, setDocument] = useState<Document | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
  
    useEffect(() => {
      if (!documentId) {
        setError(true);
        setLoading(false);
        return;
      }
  
      const fetchDocument = async () => {
        try {
          const doc = await getDocument(documentId);
          if (!doc) throw new Error("Document not found");
          setDocument(doc);
        } catch {
          setError(true);
          navigate("/");
        } finally {
          setLoading(false);
        }
      };
  
      fetchDocument();
    }, [documentId, navigate]);

    return (
        <DocumentContext.Provider value={{ document, loading, error }}>
            {children}
        </DocumentContext.Provider>
    )
}
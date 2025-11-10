import React, { useState } from 'react';
import PDFViewer from '../components/PDFViewer';
import VideoPlayer from '../components/VideoPlayer'; // <-- New Import

const ResourceViewer = () => {
    // Example test links
    const TEST_PDF_URL = 'https://cors-anywhere.herokuapp.com/http://www.africau.edu/images/default/sample.pdf';
    const TEST_VIDEO_URL = 'https://www.youtube.com/watch?v=W_bf_nL9F00'; // Example educational video

    const [resourceType, setResourceType] = useState('PDF'); // State to switch between modes
    const [inputUrl, setInputUrl] = useState(TEST_VIDEO_URL);
    const [currentResourceUrl, setCurrentResourceUrl] = useState(TEST_VIDEO_URL);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setCurrentResourceUrl(inputUrl);
    };

    const handleTypeChange = (newType) => {
        setResourceType(newType);
        // Set a default value based on the type switch
        if (newType === 'PDF') {
            setInputUrl(TEST_PDF_URL);
            setCurrentResourceUrl(TEST_PDF_URL);
        } else {
            setInputUrl(TEST_VIDEO_URL);
            setCurrentResourceUrl(TEST_VIDEO_URL);
        }
    }

    return (
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            <h1>📚 Resource Viewer</h1>
            <p>Access your study materials here. Switch between document view and video tutorials.</p>

            <div style={{ marginBottom: '20px' }}>
                <button 
                    onClick={() => handleTypeChange('PDF')} 
                    style={{ fontWeight: resourceType === 'PDF' ? 'bold' : 'normal', marginRight: '10px' }}
                >
                    Document Viewer
                </button>
                <button 
                    onClick={() => handleTypeChange('VIDEO')}
                    style={{ fontWeight: resourceType === 'VIDEO' ? 'bold' : 'normal' }}
                >
                    Video Player
                </button>
            </div>
            
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                <input 
                    type="text"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder={`Enter ${resourceType} URL/Link`}
                    style={{ width: '70%', padding: '8px' }}
                />
                <button type="submit" style={{ padding: '8px 20px', marginLeft: '10px' }}>Load Resource</button>
            </form>

            {resourceType === 'PDF' ? (
                <PDFViewer fileUrl={currentResourceUrl} />
            ) : (
                <VideoPlayer videoUrl={currentResourceUrl} />
            )}
        </div>
    );
};

export default ResourceViewer;
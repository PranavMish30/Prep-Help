// client/src/components/PDFViewer.jsx (Iframe Version)
import React from 'react';

const PDFViewer = ({ fileUrl }) => {
  if (!fileUrl) {
    return <div>Please provide a valid PDF URL.</div>;
  }

  return (
    <iframe
      src={fileUrl}
      title="Document Viewer"
      width="100%"
      height="800px"
      style={{ border: '1px solid #ddd' }}
    />
  );
};

export default PDFViewer;
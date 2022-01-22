import React from 'react';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Col, Row, Button, Dropdown, ButtonGroup, Breadcrumb } from '@themesberg/react-bootstrap';

const GenericPdfDownloader = ({rootElementId , downloadFileName}) => {

    const downloadPdfDocument = () => {
        const input = document.getElementById(rootElementId);
        html2canvas(input, { scale:0.6 })
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'JPEG', 0, 0);
                pdf.save(`${downloadFileName}.pdf`);
            })
    }

    return <Button variant="outline-primary" size="sm" onClick={downloadPdfDocument}>Export</Button>

}

export default GenericPdfDownloader;
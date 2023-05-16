import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import './styles.css'

const MarketingMaterials: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState('');

    const handleFilterClick = (filter: string) => {
        setActiveFilter(filter);
    };

    const documents = [
        {
            id:1,
            name: 'Lorem Ipsum is simply',
            kind: 'Elevator Pitch',
            type: 'pdf',
            img: 'assets/svg/Dashboard/data-img.svg' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:2,
            name: 'Lorem Ipsum is simply',
            kind: 'Elevator Pitch',
            type: 'pdf',
            img: 'assets/svg/Dashboard/pdf-icon.png' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:3,
            name: 'Lorem Ipsum is simply',
            kind: 'Elevator Pitch',
            type: 'pdf',
            img: 'assets/svg/Dashboard/pyramid.svg' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:4,
            name: 'Lorem Ipsum is simply',
            kind: 'Elevator Pitch',
            type: 'pdf',
            img: 'assets/svg/Dashboard/strategy.svg' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:5,
            name: 'Lorem Ipsum is simply',
            kind: 'Elevator Pitch',
            type: 'pdf',
            img: 'assets/svg/Dashboard/ppt-icon.png' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:6,
            name: 'Lorem Ipsum is simply',
            kind: 'Elevator Pitch',
            type: 'pdf',
            img: 'assets/svg/Dashboard/ppt-icon.png' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:7,
            name: 'Lorem Ipsum is simply',
            kind: 'Elevator Pitch',
            type: 'pdf',
            img: 'assets/svg/Dashboard/strategy.svg'  ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:8,
            name: 'Lorem Ipsum is simply',
            kind: 'Elevator Pitch',
            type: 'pdf',
            img: 'assets/svg/Dashboard/pdf-icon.png' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:9,
            name: 'Lorem Ipsum is simply',
            kind: 'Elevator Pitch',
            type: 'pdf',
            img: 'assets/svg/Dashboard/data-img.svg' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:10,
            name: 'Lorem Ipsum is simply',
            kind: 'Elevator Pitch',
            type: 'pdf',
            img: 'assets/svg/Dashboard/pyramid.svg' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:11,
            name: 'Lorem Ipsum is simply',
            kind: 'Elevator Pitch',
            type: 'pdf',
            img: 'assets/svg/Dashboard/data-img.svg' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:12,
            name: 'Lorem Ipsum is simply',
            kind: 'Elevator Pitch',
            type: 'pdf',
            img: 'assets/svg/Dashboard/pdf-icon.png' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:13,
            name: 'Lorem Ipsum is simply',
            kind: 'Elevator Pitch',
            type: 'pdf',
            img: 'assets/svg/Dashboard/pyramid.svg' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:14,
            name: 'Lorem Ipsum is simply',
            kind: 'Elevator Pitch',
            type: 'pdf',
            img: 'assets/svg/Dashboard/strategy.svg' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:15,
            name: 'Lorem Ipsum is simply',
            kind: 'Elevator Pitch',
            type: 'pdf',
            img: 'assets/svg/Dashboard/ppt-icon.png' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:16,
            name: 'Lorem Ipsum is simply',
            kind: 'Prospect Reps',
            type: 'pdf',
            img: 'assets/svg/Dashboard/ppt-icon.png' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:17,
            name: 'Lorem Ipsum is simply',
            kind: 'Prospect Reps',
            type: 'pdf',
            img: 'assets/svg/Dashboard/ppt-icon.png' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:18,
            name: 'Lorem Ipsum is simply',
            kind: 'Prospect Reps',
            type: 'pdf',
            img: 'assets/svg/Dashboard/pdf-icon.png' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:19,
            name: 'Lorem Ipsum is simply',
            kind: 'Prospect Reps',
            type: 'pdf',
            img: 'assets/svg/Dashboard/ppt-icon.png' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:20,
            name: 'Lorem Ipsum is simply',
            kind: 'Prospect Reps',
            type: 'pdf',
            img: 'assets/svg/Dashboard/ppt-icon.png' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:21,
            name: 'Lorem Ipsum is simply',
            kind: 'Prospect Reps',
            type: 'pdf',
            img: 'assets/svg/Dashboard/ppt-icon.png' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:22,
            name: 'Lorem Ipsum is simply',
            kind: 'Prospect Reps',
            type: 'pdf',
            img: 'assets/svg/Dashboard/ppt-icon.png' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:23,
            name: 'Lorem Ipsum is simply',
            kind: 'Prospect Reps',
            type: 'pdf',
            img: 'assets/svg/Dashboard/pdf-icon.png' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:24,
            name: 'Lorem Ipsum is simply',
            kind: 'Prospect Reps',
            type: 'pdf',
            img: 'assets/svg/Dashboard/ppt-icon.png' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:25,
            name: 'Lorem Ipsum is simply',
            kind: 'Prospect Reps',
            type: 'pdf',
            img: 'assets/svg/Dashboard/pdf-icon.png' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:26,
            name: 'Lorem Ipsum is simply',
            kind: 'Prospect Clients',
            type: 'pdf',
            img: 'assets/svg/Dashboard/pyramid.svg' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:27,
            name: 'Lorem Ipsum is simply',
            kind: 'Partner BIOS',
            type: 'pdf',
            img: 'assets/svg/Dashboard/strategy.svg' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:28,
            name: 'Lorem Ipsum is simply',
            kind: 'Case Studies',
            type: 'pdf',
            img: 'assets/svg/Dashboard/pdf-icon.png' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:29,
            name: 'Lorem Ipsum is simply',
            kind: 'How to approach prospect clients',
            type: 'pdf',
            img: 'assets/svg/Dashboard/data-img.svg' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:30,
            name: 'Lorem Ipsum is simply',
            kind: 'Target Clients',
            type: 'pdf',
            img: 'assets/svg/Dashboard/pyramid.svg' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:31,
            name: 'Lorem Ipsum is simply',
            kind: 'Prospect Clients',
            type: 'pdf',
            img: 'assets/svg/Dashboard/pyramid.svg' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:32,
            name: 'Lorem Ipsum is simply',
            kind: 'Partner BIOS',
            type: 'pdf',
            img: 'assets/svg/Dashboard/strategy.svg' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:33,
            name: 'Lorem Ipsum is simply',
            kind: 'Case Studies',
            type: 'pdf',
            img: 'assets/svg/Dashboard/pdf-icon.png' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:34,
            name: 'Lorem Ipsum is simply',
            kind: 'How to approach prospect clients',
            type: 'pdf',
            img: 'assets/svg/Dashboard/data-img.svg' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:35,
            name: 'Lorem Ipsum is simply',
            kind: 'Target Clients',
            type: 'pdf',
            img: 'assets/svg/Dashboard/pyramid.svg' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:36,
            name: 'Lorem Ipsum is simply',
            kind: 'Prospect Clients',
            type: 'pdf',
            img: 'assets/svg/Dashboard/pyramid.svg' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:37,
            name: 'Lorem Ipsum is simply',
            kind: 'Partner BIOS',
            type: 'pdf',
            img: 'assets/svg/Dashboard/strategy.svg' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:38,
            name: 'Lorem Ipsum is simply',
            kind: 'Case Studies',
            type: 'pdf',
            img: 'assets/svg/Dashboard/pdf-icon.png' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:39,
            name: 'Lorem Ipsum is simply',
            kind: 'How to approach prospect clients',
            type: 'pdf',
            img: 'assets/svg/Dashboard/data-img.svg' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:40,
            name: 'Lorem Ipsum is simply',
            kind: 'Target Clients',
            type: 'pdf',
            img: 'assets/svg/Dashboard/pyramid.svg' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:41,
            name: 'Lorem Ipsum is simply',
            kind: 'Prospect Clients',
            type: 'pdf',
            img: 'assets/svg/Dashboard/pyramid.svg' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:42,
            name: 'Lorem Ipsum is simply',
            kind: 'Partner BIOS',
            type: 'pdf',
            img: 'assets/svg/Dashboard/strategy.svg' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:43,
            name: 'Lorem Ipsum is simply',
            kind: 'Case Studies',
            type: 'pdf',
            img: 'assets/svg/Dashboard/pdf-icon.png' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:44,
            name: 'Lorem Ipsum is simply',
            kind: 'How to approach prospect clients',
            type: 'pdf',
            img: 'assets/svg/Dashboard/data-img.svg' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:45,
            name: 'Lorem Ipsum is simply',
            kind: 'Target Clients',
            type: 'pdf',
            img: 'assets/svg/Dashboard/pyramid.svg' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:46,
            name: 'Lorem Ipsum is simply',
            kind: 'Prospect Clients',
            type: 'pdf',
            img: 'assets/svg/Dashboard/pyramid.svg' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:47,
            name: 'Lorem Ipsum is simply',
            kind: 'Partner BIOS',
            type: 'pdf',
            img: 'assets/svg/Dashboard/strategy.svg' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:48,
            name: 'Lorem Ipsum is simply',
            kind: 'Case Studies',
            type: 'pdf',
            img: 'assets/svg/Dashboard/pdf-icon.png' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:49,
            name: 'Lorem Ipsum is simply',
            kind: 'How to approach prospect clients',
            type: 'pdf',
            img: 'assets/svg/Dashboard/data-img.svg' ,
            preview: 'Lorem Ipsum is simply dummy...',
        },
        {
            id:50,
            name: 'Lorem Ipsum is simply',
            kind: 'Target Clients',
            type: 'pdf',
            img: 'assets/svg/Dashboard/pyramid.svg' ,
            preview: 'Lorem Ipsum is simply dummy...',
        }
    ];

    const filteredDocuments = activeFilter ? documents.filter((doc) => doc.kind === activeFilter) : documents;

    return (
        <div className="MarketingMaterials">
            <span className='textCustom'>Marketing Materials</span>
            <div className="MarketingMaterials-filters">
                {['Elevator Pitch', 'Prospect Reps', 'Prospect Clients', 'Partner BIOS', 'Case Studies', 'How to approach prospect clients', 'Target Clients'].map((filter) => (
                    <Button
                        key={filter}
                        className={`MarketingMaterials-filter-button${activeFilter === filter ? ' active-filter' : ''}`}
                        onClick={() => handleFilterClick(filter)}
                    >
                        {filter}
                    </Button>
                ))}
            </div>
            <div className="MarketingMaterials-documents">
                {filteredDocuments.map((doc) => (
                    <Card className="MarketingMaterials-document-card" key={doc.id}>
                        <div className="MarketingMaterials-document-icon">
                            <img src={doc.img} />
                        </div>
                        <div className="MarketingMaterials-document-details">
                            <div className="MarketingMaterials-document-name">{doc.name}</div>
                            <div className="MarketingMaterials-document-preview">{doc.preview}</div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default MarketingMaterials

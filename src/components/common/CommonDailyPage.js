import React, { useState } from 'react';
import ManageDailyCallLog from '../admin/ManageDailyCallLog';
import ManageHourlyLog from '../admin/ManageHourlyLog';
import ManageConsultation from '../admin/ManageConsultation'; 

const CommonDailyPage = () => {
    const [selectedCard, setSelectedCard] = useState(1);

    const cardData = [
        {
            id: 1,
            title: 'Mange Daily Call Log',
            content: <ManageDailyCallLog/>
        },
        {
            id: 2,
            title: 'Mange Daily Hour Log',
            content: <ManageHourlyLog/>
        },
        {
            id: 3,
            title: 'Mange Consultation',
            content: <ManageConsultation/>
        }
    ];

    const handleCardClick = (id) => {
        setSelectedCard(id);
    };

    return (
        <div className="site-wrapper overflow-hidden bg-default-2">
            <div className="dashboard-main-container mt-14" id="dashboard-body">
                <div className="container-fluid h-auto">
                                <div className="mb-4 align-items-center">
                                  <div className="page___heading">
                                    <h3 className="font-size-6 mb-0">Manage Daily Pages</h3>
                                  </div>
                                </div>
                    <div className="row justify-content-center mb-4 mt-5">
                        {cardData.map((card) => (
                            <div
                                key={card.id}
                                className={`col-12 col-md-4 mb-3`}
                            >
                                <div
                                    className={`card text-center h-100 shadow daily-page-card-hover ${selectedCard === card.id ? 'border-primary daily-page-selected' : ''
                                        }`}
                                    onClick={() => handleCardClick(card.id)}
                                    style={{ cursor: 'pointer', transition: 'transform 0.3s' }}
                                >
                                    <div className="card-body">
                                        <h5 className="card-title">{card.title}</h5>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="content-area daily-page-animated daily-page-fadeIn p-4 border rounded bg-light shadow-sm">
                        <h4>{cardData[selectedCard - 1].title}</h4>
                        <p>{cardData[selectedCard - 1].content}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommonDailyPage;

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Card from '../../components/ui/cards/card';
import './myResource.css';


const MyResources = () => {
    const [numberPagination, setNumberPagination] = useState(6)
    const [currentPagination, setCurrentPagination] = useState(0)

    const {
        resources: { myResources },
    } = useSelector((state) => state);

    const pagination = () => {
        return myResources?.slice(currentPagination, numberPagination);
    }

    return (
        <div className="container container-misRecursos">
            <h2 className="title-me-resources">Mis Recursos</h2>
            {/* <div className="container-row-arounds"> */}
            <div className="d-flex justify-content-center flex-wrap mt-5">
                {
                    pagination()?.map((resource) => {
                        return <Card
                            key={resource._id}
                            calificacion={resource.calificacion}
                            condition={resource.condition}
                            country={resource.country}
                            create={resource.create}
                            description={resource.description}
                            licence={resource.licence}
                            id={resource._id}
                            language={resource.language}
                            platform={resource.platform}
                            tags={resource.tags}
                            title={resource.title}
                            nameAuthor={resource.nameAuthor}
                            isAdmin={false}
                            // isPending={true}
                            university={resource.university}
                            category={resource.category}
                            specialty={resource.specialty}
                            usersLikes={resource.usersLikes}
                            comments={resource.comments}
                            author={resource.author}
                            nameResource={resource.nameResource}
                            urlResource={resource.urlResource}
                            originalNameResource={resource.originalNameResource}
                        />
                    })
                }

            </div>
            {
                myResources?.length > 6 ?
                    <div className="w-100 d-flex justify-content-center container-pagination">
                        {
                            currentPagination === 0 ?
                                <></>
                                :
                                <p onClickCapture={() => {
                                    setNumberPagination(numberPagination - 6);
                                    setCurrentPagination(currentPagination - 6)
                                    window.scroll({
                                        top: 0
                                    })
                                }}  ><i className="fas fa-chevron-left"></i> Anterior Página</p>
                        }
                        {
                            myResources.length <= numberPagination ?
                                <></>
                                : <p onClickCapture={() => {
                                    setNumberPagination(numberPagination + 6);
                                    setCurrentPagination(currentPagination + 6);
                                    window.scroll({
                                        top: 0
                                    })
                                }} >Siguiente Página <i className="fas fa-chevron-right"></i></p>
                        }

                    </div>
                    : <></>
            }
        </div>
    );
}

export default MyResources;
import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../../components/ui/cards/card';
// import './myResource.css';


const PendingResources = () => {

    const {
        resources: { pendingResources },
    } = useSelector((state) => state);

    return (
        <div className="container container-misRecursos">
            <h2 className="title-me-resources">Recursos Pendientes</h2>
            <div className="d-flex justify-content-center flex-wrap mt-5">
                {
                    pendingResources?.map((resource) => {
                        return <Card
                            calificacion={resource.calificacion}
                            condition={resource.condition}
                            country={resource.country}
                            create={resource.create}
                            description={resource.description}
                            id={resource._id}
                            language={resource.language}
                            licence={resource.licence}
                            platform={resource.platform}
                            tags={resource.tags}
                            title={resource.title}
                            nameAuthor={resource.nameAuthor}
                            isPending={true}
                            isAdmin={true}
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
            {/* <Cards /> */}
        </div>
    );
}

export default PendingResources;
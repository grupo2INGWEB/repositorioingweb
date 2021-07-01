import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../../components/ui/cards/card';
// import './myResource.css';


const PendingResources = () => {

    const {
        resources: { pendingResources },
    } = useSelector((state) => state);

    return (
        <div className="container">
            <h2 className="title-me-resources">Recursos Pendientes</h2>
            <div className="container-row-arounds">
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
                            plataform={resource.plataform}
                            tags={resource.tags}
                            title={resource.title}
                            nameAuthor={resource.nameAuthor}
                            isPending={true}
                            isAdmin={true}
                        />
                    })
                }

            </div>
            {/* <Cards /> */}
        </div>
    );
}

export default PendingResources;
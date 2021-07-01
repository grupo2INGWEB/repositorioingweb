import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../../components/ui/cards/card';
import './myResource.css';


const MyResources = () => {

    const {
        resources: { myResources },
    } = useSelector((state) => state);

    return (
        <div className="container">
            <h2 className="title-me-resources">Mis Recursos</h2>
            <div className="container-row-arounds">
                {
                    myResources?.map((resource) => {
                        return <Card
                            key={resource._id}
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

                        />
                    })
                }

            </div>
            {/* <Cards /> */}
        </div>
    );
}

export default MyResources;
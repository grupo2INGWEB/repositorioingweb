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
            {/* <Cards /> */}
        </div>
    );
}

export default MyResources;
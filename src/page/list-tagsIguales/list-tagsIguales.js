import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../../components/ui/cards/card';
import Fotter from '../footer-section/footer';
// import './listAll.css';


const ListTagsIguales = () => {

    const {
        resources: {
            listResourcesTags
        }
    } = useSelector((state) => state);

    return (
        <div className="container">
            <div className="separator-resouse"></div>
            {/* <h2 className="title-all-resources">{props.location.state}</h2> */}
            <div
                className=" text-secondary text-center"
                id="scrollspyHeading1"
            >
                <h1 className="fw-bold text-dark">Búsqueda de Tags iguales</h1>

            </div>
            <hr />
            <div className="d-flex justify-content-center flex-wrap pt-4">
                {
                    listResourcesTags?.map((resource) =>
                        <Card
                            calificacion={resource.calificacion}
                            condition={resource.condition}
                            country={resource.country}
                            create={resource.create}
                            description={resource.description}
                            licence={resource.licence}
                            id={resource._id}
                            language={resource.language}
                            nameAuthor={resource.nameAuthor}
                            platform={resource.platform}
                            tags={resource.tags}
                            title={resource.title}
                            university={resource.university}
                            category={resource.category}
                            specialty={resource.specialty}
                            isAdmin={true}
                            isPending={false}
                            key={resource._id}
                            usersLikes={resource.usersLikes}
                            comments={resource.comments}
                            author={resource.author}
                            nameResource={resource.nameResource}
                            urlResource={resource.urlResource}
                            originalNameResource={resource.originalNameResource}
                        />
                    )
                }
            </div>
            {/* <Fotter /> */}
        </div>
    );
}

export default ListTagsIguales;
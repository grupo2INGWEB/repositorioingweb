import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../../components/ui/cards/card';
import Cards from '../../components/ui/cards/cards';
import './listAll.css';


const ListAllResources = (props) => {

    console.log(props.location.state);

    const {
        resources: {
            listMostValued,
            listRecentResources,
            listSpecialty,
            listRecommended
        }
    } = useSelector((state) => state);
    return (
        <div className="container">
            <h2 className="title-all-resources">{props.location.state}</h2>
            <div className="container-row-arounds">
                {
                    props.location.state === "Más Valorados" ?
                        listMostValued.map((resource) =>
                            <Card
                                calificacion={resource.calificacion}
                                condition={resource.condition}
                                country={resource.country}
                                create={resource.create}
                                description={resource.description}
                                id={resource._id}
                                language={resource.language}
                                nameAuthor={resource.nameAuthor}
                                platform={resource.platform}
                                tags={resource.tags}
                                title={resource.title}
                                university={resource.university}
                                category={resource.category}
                                specialty={resource.specialty}
                                isAdmin={false}
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
                        : (props.location.state === "Recientes") ?
                            listRecentResources.map((resource) =>
                                <Card
                                    calificacion={resource.calificacion}
                                    condition={resource.condition}
                                    country={resource.country}
                                    create={resource.create}
                                    description={resource.description}
                                    id={resource._id}
                                    language={resource.language}
                                    nameAuthor={resource.nameAuthor}
                                    platform={resource.platform}
                                    tags={resource.tags}
                                    title={resource.title}
                                    isAdmin={false}
                                    isPending={false}
                                    key={resource._id}
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
                            ) : (props.location.state === "Recomendados") ?
                                listRecommended.length === 0 ?
                                    <h3>No hay recursos recomendados</h3> :
                                    listRecommended.map((resource) =>
                                        <Card
                                            calificacion={resource.calificacion}
                                            condition={resource.condition}
                                            country={resource.country}
                                            create={resource.create}
                                            description={resource.description}
                                            id={resource._id}
                                            language={resource.language}
                                            nameAuthor={resource.nameAuthor}
                                            platform={resource.platform}
                                            tags={resource.tags}
                                            title={resource.title}
                                            isAdmin={false}
                                            isPending={false}
                                            key={resource._id}
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
                                    ) :
                                (props.location.state === "Educación Infantil" || props.location.state === "Educación Primaria"
                                    || props.location.state === "Educación Secundaria" || props.location.state === "Educación Superior") ?
                                    listSpecialty.map((resource) =>
                                        <Card
                                            calificacion={resource.calificacion}
                                            condition={resource.condition}
                                            country={resource.country}
                                            create={resource.create}
                                            description={resource.description}
                                            id={resource._id}
                                            language={resource.language}
                                            nameAuthor={resource.nameAuthor}
                                            platform={resource.platform}
                                            tags={resource.tags}
                                            title={resource.title}
                                            isAdmin={false}
                                            isPending={false}
                                            key={resource._id}
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
                                    )
                                    : <h3>No hay Recursos</h3>
                }
            </div>
        </div>
    );
}

export default ListAllResources;
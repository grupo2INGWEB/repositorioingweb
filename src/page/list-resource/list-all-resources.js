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
            listRecentResources
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
                                plataform={resource.plataform}
                                tags={resource.tags}
                                title={resource.title}
                                isAdmin={false}
                                isPending={false}
                                key={resource._id}
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
                                    plataform={resource.plataform}
                                    tags={resource.tags}
                                    title={resource.title}
                                    isAdmin={false}
                                    isPending={false}
                                    key={resource._id}
                                />
                            ) : <h3>No hay Recursos Recomendados</h3>
                }
            </div>
        </div>
    );
}

export default ListAllResources;
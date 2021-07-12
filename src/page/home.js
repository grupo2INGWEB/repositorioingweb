import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../components/ui/cards/card';
// import Cards from '../components/ui/cards/cards';
import TitleSection from '../components/ui/title-section/title-section';

const Home = () => {

    const {
        resources: { listRecentResources, listMostValued, listRecommended }
    } = useSelector((state) => state);

    const shortRecent = () => {
        return listRecentResources.slice(0, 6);
    }
    const shortValued = () => {
        return listMostValued.slice(0, 6);
    }
    const shortRecommended = () => {
        return listRecommended.slice(0, 6);
    }

    return (
        <>
            {/* <LayoutHeader> */}
            <div className="container">
                <TitleSection nombre="Recientes" url='/all-resource' state="Recientes" mostrarBtn={true} />
                <div className="container-row-arounds">
                    {
                        listRecentResources.length === 0 ?
                            <h3>No hay Recursos recientes</h3>
                            : shortRecent().map((resource) =>
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
                                    isAdmin={true}
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


                    }
                </div>
                <TitleSection nombre="Más Valorados" url='/all-resource' state="Más Valorados" mostrarBtn={true} />
                <div className="container-row-arounds">
                    {
                        listMostValued.length === 0 ?
                            <h3>No hay Recursos recientes</h3>
                            : shortValued().map((resource) =>
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
                                    isAdmin={true}
                                    isPending={false}
                                    key={resource._id}
                                    usersLikes={resource.usersLikes}
                                    nameAdmin={resource.nameAdmin}
                                    comments={resource.comments}
                                    author={resource.author}
                                    nameResource={resource.nameResource}
                                    urlResource={resource.urlResource}
                                    originalNameResource={resource.originalNameResource}
                                />
                            )
                    }
                </div>
                <TitleSection nombre="Recomendados" url='/all-resource' state="Recomendados" mostrarBtn={true} />
                <div className="container-row-arounds">
                    {
                        listRecommended.length === 0 ?
                            <h3>No hay Recursos Recomendados</h3>
                            :
                            shortRecommended().map((resource) =>
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
                                    isAdmin={true}
                                    isPending={false}
                                    key={resource._id}
                                    usersLikes={resource.usersLikes}
                                    nameAdmin={resource.nameAdmin}
                                    comments={resource.comments}
                                    author={resource.author}
                                    nameResource={resource.nameResource}
                                    urlResource={resource.urlResource}
                                    originalNameResource={resource.originalNameResource}
                                />
                            )
                    }
                </div>
            </div>
            {/* </LayoutHeader> */}
        </>
    );
}

export default Home;
import React from 'react';
import Cards from '../../components/ui/cards/cards';
import './listAll.css'; 


const ListAllResources = (props) => {

    console.log(props.location.state);
    return (
        <div className="container">
            <h2 className="title-all-resources">{props.location.state}</h2>
            
            <Cards />
        </div>
     );
}
 
export default ListAllResources;
import React from 'react';
import Input from './inputForm';
import InputForm from './inputFormBorder';

const Formulario = () => {
    return (
        <div className="formulario">
            <InputForm 
                title="Título"
                id="title"
                name="title"
                placeholder="Escribe un título..."
            />
            <InputForm 
                title="Descripción"
                id="description"
                name="description"
                placeholder="Escribe una descripción..."
            />
            <div className="container-recurso">
                <p>Agregar Recurso</p>
                <div className="container-border-recurso">
                    <i class="fas fa-link"></i>
                    <p>Agregar Recurso</p>
                    <hr />
                    <p>Tipo: Documento</p>
                </div>
            </div>
            <div className="container-sb">
                <p>Agregar Tags</p>
                <div className="agg-tag">
                    <input type="text" name="tag" id="tag" placeholder="Escribe un Tag..." />
                    <button>Agregar Tag</button>
                </div>
            </div>
            <Input 
                id="especialidad"
                name="especialidad"
                placeholder="Escribe una especialidad..."
                value="Educación Infantil"
                title="Agregar Especialidad"
            />
            <Input 
                id="categoria"
                name="categoria"
                placeholder="Ej. Proyecto matemáticas, covid...."
                value=""
                title="Agregar una categoría"
            />
            <Input 
                id="lenguage"
                name="lenguage"
                placeholder="Específica el idioma..."
                value="Español"
                title="Lenguaje"
            />
            <Input 
                id="university"
                name="university"
                placeholder="Escribe la Universidad..."
                value=""
                title="Universidad"
            />
            <Input 
                id="country"
                name="country"
                placeholder="Escribe el país..."
                value="Ecuador"
                title="País"
            />
            <Input 
                id="plataform"
                name="plataform"
                placeholder="Escribe la plataforma..."
                value=""
                title="Plataforma"
            />
        </div>
    );
}

export default Formulario;
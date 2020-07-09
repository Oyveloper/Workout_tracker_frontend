import React, {useState} from 'react';
import '../../css/AddBtn.css';


export default function AddBtn(props) {
    const action = props.action;
    const description = props.description;
    return (
        <div className="add-btn" onClick={action} title={description}><i className="material-icons">add</i></div>
    );
}

import React from 'react';

import classes from './Input.module.css';

const input = ( props ) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];
    if (props.isvalid !== undefined && props.isvalid === false) {
        inputClasses.push(classes.Invalid);
    }
    if (props.elementType === "select") {
        inputElement = <select
                    className={classes.Select}
                    style={{textTransform: 'capitalize', display: props.displayEnabled ? 'block' : 'none'}}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
    } else {
        inputElement = <input
            id={props.id}
            className={inputClasses.join(' ')}
            style={{display: props.displayEnabled ? 'block' : 'none'}}
            onBlur={props.changed} 
            {...props.elementConfig}/>
            
    }

    return (
        <div className={classes.Input}>  
            <label 
                className={classes.Label}
                style={{display: props.displayEnabled ? 'block' : 'none'}}
                >{props.label}</label>    
            {inputElement}
        </div>
    );

};

export default input;
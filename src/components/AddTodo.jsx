import React from 'react';

// Komponente zum Hinzufügen einer neuen Aufgabe

function AddTodo(props) {
    return (
        <div className='container'>
            <div className='row m-5'>
                <div className='col-8 offset-2'>
                    <div className='input-group'>
                        <input onChange={props.handleChange}type='text' className='form-control' placeholder='new todo' value={props.newTodo}/>
                        <div className='input-group-apend'>
                            <button onClick={props.addNewTodo} className='btn btn-primary'>Add</button>


                        </div>                       

                    </div>

                </div>

            </div>
            
        </div>
    );
}

export default AddTodo;


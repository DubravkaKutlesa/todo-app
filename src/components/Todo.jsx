import React from 'react';

// Einzeleintragsvorlage - Komponente

function Todo(props) {

    return (
        <div className="col-4 mt-4">
            <div className="card text-center">
                <div className="card-header">
                    <h4>Todo: {props.index+1}</h4>
                </div>
                <div className="card-body">
                    <h3 className={props.done ? 'completed' : 'incompleted'}>{props.todoName}</h3>
                </div>
                <div className="card-footer">
                    <button onClick={() => props.markTodo(props.index)} className='btn btn-success float-start'>Mark</button>
                    <button onClick={() => props.deleteTodo(props.id)} className='btn btn-danger float-end'>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default Todo;
import React, { useEffect, useReducer } from 'react'
import { todoReducer } from './todoReducer'

import './styles.css'
import { useForm } from '../../hooks/useForm'



const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
    // return [{
    //     id: new Date().getTime(),
    //     desc: 'Aprende React',
    //     done: false
    // }]
}

export const TodoApp = () => {

    const [ todos, dispatch ] = useReducer(todoReducer, [], init);
    const [{ description }, handleInputChange, reset] = useForm({
        description: ''
    })

    useEffect( () => {
        localStorage.setItem('todos', JSON.stringify( todos ))
    }, [todos]);

    const handleDelete = ( todoId ) => {
        const deleteTodo = {
            type: 'delete',
            payload: todoId
        }

        dispatch(deleteTodo);
    }

    const handleToggle = (todoId) => {
        dispatch({
            type: 'toggle',
            payload: todoId
        })
    }
    
    const handlerSubmit = (e) => {
        e.preventDefault();
        if ( description.trim().length <= 1 ) {
            reset();
            return;
        } 
        const newTodo = {
            id: new Date().getTime(),
            desc: description,
            done: false
        }
        const addTodo = {
            type: 'add',
            payload: newTodo
        }
        dispatch(addTodo);
        reset();
    }

    return (
        <div>
            <h1>Todo app ( {todos.length} )</h1>
            <hr/>
            <div className="row">
                <div className="col-7">
                <ul
                className="list-group list-group-flush">
                {
                    todos.map( (todo, index) => (
                        <li
                            key={ todo.id }
                            className="list-group-item"
                        > 
                            <p 
                            className={`${ todo.done  && 'complete'}`}
                            onClick={() => handleToggle(todo.id)}>{ index + 1 } { todo.desc }</p>
                            <button 
                                className="btn btn-danger"
                                onClick={ () => handleDelete( todo.id ) }>
                                Borrar
                            </button>
                        </li>
                    ))
                }
            </ul>
                </div>

                <div className="col-5">
                    <h4>Agregar TODO</h4>
                    <hr/>

                    <form onSubmit={ handlerSubmit }>
                        <input 
                        className="form-control"
                        type="text" 
                        name="description" 
                        placeholder="aprender ..." 
                        autoComplete="off"
                        onChange={ handleInputChange }
                        value={ description }>
                        </input>
                            <button
                                type="submit"
                                className="btn btn-outline-primary mt-1 btn-block add-btn"
                            >
                                Agregar
                            </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

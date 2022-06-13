import { AnimatePresence, motion } from 'framer-motion'
import React, {useState} from 'react'
import { connect } from 'react-redux'
import { addTodos, completeTodos, removeTodos, updateTodos } from '../app/todoSlice'
import Todoitems from './Todoitems'


const mapStoreToProps = (state) => {
    return {
        todos: state,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTodo: (obj) => dispatch(addTodos(obj)),
        removeTodo: (id) => dispatch(removeTodos(id)),
        updateTodo: (obj) => dispatch(updateTodos(obj)),
        completeTodo: (id) => dispatch(completeTodos(id)),
    }
}

const DisplayTodos = (props) => {
    const [sort, setSort] = useState("active")
  return (
    <div className='displaytodos'>
        <div className='buttons'>
            <motion.button
             whileHover={{scale: 1.1}}
             whileTap={{scale: 0.9}}
             onClick={ () => setSort("active") }>Active</motion.button>
            <motion.button
              whileHover={{scale: 1.1}}
              whileTap={{scale: 0.9}}
             onClick={ () => setSort("completed") }>completed</motion.button>
            <motion.button 
             whileHover={{scale: 1.1}}
             whileTap={{scale: 0.9}}
            onClick={ () => setSort("all") }>All</motion.button>
        </div>
        <ul>
            <AnimatePresence>
            {props.todos.length > 0 && sort === "active" ? 
                props.todos.map(item => {
                    return (
                        item.completed === false &&
                        <Todoitems 
                          key={item.id}
                          item={item}
                          removeTodo={props.removeTodo}
                          updateTodo={props.updateTodo}
                          completeTodo={props.completeTodo}
                        />
                    )
                })
            : null}
            
            {props.todos.length > 0 && sort === "completed" ? 
                props.todos.map(item => {
                    return (
                        item.completed === true &&
                        <Todoitems 
                          key={item.id}
                          item={item}
                          removeTodo={props.removeTodo}
                          updateTodo={props.updateTodo}
                          completeTodo={props.completeTodo}
                        />
                    )
                })
            : null}

            {props.todos.length > 0 && sort === "all" ? 
                props.todos.map(item => {
                    return (
                        <Todoitems 
                          key={item.id}
                          item={item}
                          removeTodo={props.removeTodo}
                          updateTodo={props.updateTodo}
                          completeTodo={props.completeTodo}
                        />
                    )
                })
            : null}    
            </AnimatePresence>
        </ul>
    </div>
  )
}

export default connect(mapStoreToProps, mapDispatchToProps)(DisplayTodos)
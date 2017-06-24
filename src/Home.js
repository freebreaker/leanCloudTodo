import React, { Component } from 'react';
import logo from './logo.svg';                                       
import UserDialog from './UserDialog';
import './Home.css';
import {getCurrentUser,signOut,TodoModel} from './leanCloud';
import SideBar from './sideBar';
import TodoInput from './TodoInput';
import TodoInputs from './TodoInputs';
import TodoItem from './TodoItem';
import TodoItems from './TodoItems';




class Home extends Component {
  constructor(props){
    super(props)
    this.state={
        user: getCurrentUser() || {},
        newTodo:'',
        anotherTodo:'',
        todoList:[]

    }

  let user = getCurrentUser()
      if (user) {
        console.log(user)
        TodoModel.getByUser(user, (todos) => {
          let stateCopy = JSON.parse(JSON.stringify(this.state))
          stateCopy.todoList = todos
          this.setState(stateCopy)
        })

        //   TodoModel.getByUser(user, (newtodos) => {
        //   let stateCopy = JSON.parse(JSON.stringify(this.state))
        //   stateCopy.newTodoList = newtodos
        //   this.setState(stateCopy)
        // })
      }
  }


  render() {

    let todos=this.state.todoList.filter((item)=> !item.deleted && item.direction==="left").map((item,index)=>{
      return (<li key={index}>   
               <TodoItem todo={item} onToggle={this.toggle.bind(this)} 
               onDelete={this.delete.bind(this)}/>
            </li>)
    })


    let newtodos=this.state.todoList.filter((item)=> !item.deleted && item.direction==="right").map((item,index)=>{
      return (<li key={index}>   
               <TodoItems todo={item} onToggle={this.toggle.bind(this)} 
               onDelete={this.delete.bind(this)}/>
            </li>)
    })


    /*let completedTodos=this.state.todoList.filter((item)=>!item.deleted && item.status==='completed').map((item,index)=>{
      return (<li key={index}>   
               <TodoItems todo={item} onToggle={this.toggle.bind(this)} 
               onDelete={this.delete.bind(this)}/>
            </li>)
    })

    console.log(completedTodos)*/



    return (
      <div className='Home'>


          {/*{this.state.user.id ? null : <UserDialog onSignUp={this.onSignUpOrSignIn.bind(this)}
          onSignIn={this.onSignUpOrSignIn.bind(this)}/>}

          {this.state.user.id ? 
            <SideBar signOut={this.signOut.bind(this)}/>
          : null}*/}

          {/*{this.state.user.id ? */}
          <div className="TodoContent">
              <TodoInput  content={this.state.newTodo}
              onChange={this.changeInfo.bind(this)}
              onSubmit={this.addTodo.bind(this)}/>

              <ol className="TodoItem">
                {todos}
              </ol>
          </div>
          {/*: null}*/}

          {/*{this.state.user.id ? */}
          <div className="TodoContent">
              <TodoInputs  content={this.state.anotherTodo}
              onChange={this.changeAnotherInfo.bind(this)}
              onSubmit={this.addIpTodo.bind(this)}/>

              <ol className="TodoItem">  
                {newtodos}
              </ol>
          </div>
          {/*: null}  */}

          {/*{this.state.user.id ?
          <div className="TodoContent">
              <ol className="TodoItem">
                {completedTodos}
              </ol>
          </div>
          : null}*/}

          
      </div>   
    );
  }



  onSignUpOrSignIn(user){
      let stateCopy = JSON.parse(JSON.stringify(this.state)) 
      stateCopy.user = user
      this.setState(stateCopy)

      if (user) {
        TodoModel.getByUser(user, (todos) => {
          let stateCopy = JSON.parse(JSON.stringify(this.state))
          stateCopy.todoList = todos
          this.setState(stateCopy)
        })

        TodoModel.getByUser(user, (newtodos) => {
          let stateCopy = JSON.parse(JSON.stringify(this.state))
          stateCopy.newTodoList = newtodos
          this.setState(stateCopy)
        })
      
      }
  }

  changeInfo(e){
    this.setState({
      newTodo:e.target.value,
      todoList:this.state.todoList
    })
  }

  changeAnotherInfo(e){
    this.setState({
      anotherTodo:e.target.value,
      todoList:this.state.todoList
    })
  }

   addTodo(event){
    let newTodo = {
        title: event.target.value,
        status:'',
        deleted: false,
        direction:'left'
    }
    // this.setState({
    //     newTodo: '',
    //     todoList: this.state.todoList
    //   })
    //   console.log(this.state.todoList)
    TodoModel.create(newTodo, (id) => {
        newTodo.id = id
        this.state.todoList.push(newTodo)
        this.setState({
          newTodo: '',
          todoList: this.state.todoList
        })
      }, (error) => {
        console.log(error)
      })
  }

  addIpTodo(e){
    let IpTodo={
      title:e.target.value,
      status:'',
      deleted:false,
      direction:'right'
    }

    // TodoModel.create(IpTodo, (id) => {
    //   IpTodo.id = id
    //   this.state.newTodoList.push(IpTodo)
    //   this.setState({
    //     anotherTodo:'',
    //     newTodoList: this.state.newTodoList
    //   })
    // }, (error) => {
    //   console.log(error)
    // })
        TodoModel.create(IpTodo, (id) => {
        IpTodo.id = id
        this.state.todoList.push(IpTodo)
        this.setState({
          newTodo: '',
          todoList: this.state.todoList
        })
      }, (error) => {
        console.log(error)
      })
  }

    delete(event, todo){
        // todo.deleted = true
        // this.setState(this.state) 
      TodoModel.destroy(todo.id, () => {
        todo.deleted = true
        this.setState(this.state)
      })
    }

    toggle(e, todo){
        // todo.status = todo.status === 'completed' ? '' : 'completed'
        // this.setState(this.state)
      let oldStatus = todo.status
      todo.status = todo.status === 'completed' ? '' : 'completed'
      TodoModel.update(todo, () => {
        this.setState(this.state)
      }, (error) => {
        todo.status = oldStatus
        this.setState(this.state)
      })
    }
   signOut(){
      signOut()
      let stateCopy = JSON.parse(JSON.stringify(this.state))
      stateCopy.user = {}
      this.setState(stateCopy)
    }

    // componentDidUpdate(){
    //   localStore.save('todoList', this.state.todoList)
    // }
}
export default Home;
 
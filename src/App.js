import React, { Component } from 'react';
import UserDialog from './UserDialog';
import {getCurrentUser,signOut,TodoModel} from './leanCloud';
import SideBar from './sideBar';
import Home from './Home';




class App extends Component {
  constructor(props){
    super(props)
    this.state={
        user: getCurrentUser() || {},
        // newTodo:'',
        // anotherTodo:'',
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

          TodoModel.getByUser(user, (newtodos) => {
          let stateCopy = JSON.parse(JSON.stringify(this.state))
          stateCopy.newTodoList = newtodos
          this.setState(stateCopy)
        })
      }
  }
  


  render() {

    return (
      <div className='App'>

        {/*{this.state.user.id ? null : <UserDialog onSignUp={this.onSignUpOrSignIn.bind(this)}
          onSignIn={this.onSignUpOrSignIn.bind(this)}/>}*/}

          {this.state.user.id ? 
            <SideBar signOut={this.signOut.bind(this)}/>
          : null}

          {this.props.children || <Home/>}
      </div>   
    );
  }



//   onSignUpOrSignIn(user){
//       let stateCopy = JSON.parse(JSON.stringify(this.state)) 
//       stateCopy.user = user
//       this.setState(stateCopy)

//       if (user) {
//         TodoModel.getByUser(user, (todos) => {
//           let stateCopy = JSON.parse(JSON.stringify(this.state))
//           stateCopy.todoList = todos
//           this.setState(stateCopy)
//         })

//         TodoModel.getByUser(user, (newtodos) => {
//           let stateCopy = JSON.parse(JSON.stringify(this.state))
//           stateCopy.newTodoList = newtodos
//           this.setState(stateCopy)
//         })
      
//       }
//   }


   signOut(){
      signOut()
      let stateCopy = JSON.parse(JSON.stringify(this.state))
      stateCopy.user = {}
      this.setState(stateCopy)
    }

 }
export default App;
 
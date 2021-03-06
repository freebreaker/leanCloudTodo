import React,{Component} from 'react';
import './TodoInput.css'


export default class TodoInput extends React.Component{
    render(){
        return( 
        <input type="text" value={this.props.content}
         className="TodoInput" placeholder="紧急 请在此输入"
        onChange={this.changeTitle.bind(this)} 
        onKeyPress={this.submit.bind(this)}/>
        )
}

    submit(e){
      if (e.key === 'Enter') {
        if (e.target.value.trim() !== ''){
          this.props.onSubmit(e)
        }

      }
    }

    changeTitle(e){
      this.props.onChange(e)
  }



    toggle(e, todo){
         todo.status = todo.status === 'completed' ? '' : 'completed'
         this.setState(this.state) 
  }
}


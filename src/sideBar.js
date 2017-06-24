import React,{Component} from 'react'
import './sideBar.css';
// import {getCurrentUser,signOut} from './leanCloud';
import {Link} from 'react-router'
export default class SideBar extends Component{
    constructor(props){
       super(props)
       this.state={
         selected:'signUp',
         formData:{
           username:'',
           password:'',
         }
       }
    }


 
    render(){
        let leftSide=(
            <div className="sideBar">
                    <Link to="/">任务</Link>
                    <a className="item" href="" onClick={this.props.signOut.bind(this)}>登出</a>
                    <Link to="/completed">已完成</Link>
            </div>

        )
      
        return(
            <div className="Nav-Setting">
                {leftSide}
            </div>

        )
    }
}







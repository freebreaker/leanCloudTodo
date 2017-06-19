import React,{Component} from 'react'
import './sideBar.css';
import {getCurrentUser,signOut} from './leanCloud';

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
                    <a className="item" href="">任务</a>
                    <a className="item" href="" onClick={this.props.signOut.bind(this)}>登出</a>
                    <a className="item" href="">已完成</a>
                    <a className="item" href="">分享</a>
            </div>

        )
      
        return(
            <div className="Nav-Setting">
                {leftSide}
            </div>

        )
    }
}







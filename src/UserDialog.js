import React,{Component} from 'react'
import './UserDialog.css'
import {signUp, signIn, sendPasswordResetEmail} from './leanCloud';
import SignUpForm from './signUpForm';
import SignInForm from './SignInForm';
import ForgotPassword from './ForgotPassword'

export default class UserDialog extends Component{
    constructor(props){
       super(props)
       this.state={
         selected:'signIn',
         selectedTab: 'signInOrSignUp', 
         formData:{
           email:"",
           username:'',
           password:'',
         }
       }
    }


    signUp(e){
      e.preventDefault()
      let{email,username,password}=this.state.formData
      let success = (user)=>{
        this.props.onSignUp.call(null,user)
      }

        if(username.length<=3){
            alert('用户名长度至少三位，请更换用户名')
            return
        }
        if(password.length<6){
            alert('密码至少六位，请更换密码')
            return
        }
        if(email.search(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/) < 0){
            alert('邮箱格式错误，请重新注册')
            return
        }
      let error = (error)=>{
      switch(error.code){
         case 202:
           alert('用户名已被占用')
           break
        case  210:
           alert('用户名和密码不匹配')
           break
        case 200:
           alert('用户名不能为空')
           break
        case 211:
           alert('找不到该用户')
           break
         default:
           alert(error)
           break
          }
      }
      signUp(email,username, password, success, error)
    }


    signIn(e){
      e.preventDefault()
      let{username,password}=this.state.formData
      let success=(user)=>{
        this.props.onSignIn.call(null,user)
      }
      let error=(error)=>{
      switch(error.code){
         case 202:
           alert('用户名已被占用')
           break
        case  210:
           alert('用户名和密码不匹配')
           break
        case 200:
           alert('用户名不能为空')
           break
        case 211:
           alert('找不到该用户')
           break
         default:
           alert(error)
           break
          }
      }
      signIn(username,password,success,error)
    }  


    switch(e){
      this.setState({
        selected:e.target.getAttribute('value')
      })
      console.log(e.target.getAttribute("value")) 
    }


    showForgotPassword(){
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.selectedTab = 'forgotPassword'
        this.setState(stateCopy)
    }


    changeFormData(key,e){
      let stateCopy=JSON.parse(JSON.stringify(this.state))
      stateCopy.formData[key]=e.target.value
      this.setState(stateCopy)
    }

    resetPassword(e){
      e.preventDefault()
      sendPasswordResetEmail(this.state.formData.email)    
    }

    returnToSignIn(){
      let stateCopy = JSON.parse(JSON.stringify(this.state))
      stateCopy.selectedTab = 'signInOrSignUp'
      stateCopy.selected="signIn"
      this.setState(stateCopy)
    }
    render(){
        return(
        <div className="UserDialog-Wrapper">
            <div className="UserDialog">
                <h1>Welcome</h1>
                <div className="panes">
                    {this.state.selected === 'signUp' ? <SignUpForm
                    onSubmit={this.signUp.bind(this)}
                    onChange={this.changeFormData.bind(this)}
                    formData={this.state.formData}
                    ToSignIn={this.returnToSignIn.bind(this)}/>
                     : null}

                    {this.state.selected === 'signIn'&& this.state.selectedTab==="signInOrSignUp" ? <SignInForm
                    onSubmit={this.signIn.bind(this)}
                    onChange={this.changeFormData.bind(this)}
                    formData={this.state.formData}
                    showForgotPassword={this.showForgotPassword.bind(this)}
                    switch={this.switch.bind(this)}
                    /> : null}

                    {this.state.selectedTab === 'signInOrSignUp' ? null: <ForgotPassword
                    onSubmit={this.resetPassword.bind(this)}
                    onChange={this.changeFormData.bind(this)}
                    formData={this.changeFormData.bind(this)}
                    ToSignIn={this.returnToSignIn.bind(this)}
                    />}
                </div>
            </div>
        </div>
        )
    }
}



import React,{Component} from 'react'

export default class SignInForm extends Component{
    render(){
        return(
            <form className="ui form " onSubmit={this.props.onSubmit.bind(this)}> {/* 注册*/}
                <div className="field row">
                  <label>用户名</label> 
                  <input type="text" defaultValue={this.props.formData.username} onChange={this.props.onChange.bind(null,"username")} placeholder="Username"/>
                </div>
                <div className="field row">
                  <label>密码</label>
                  <input type="password" defaultValue={this.props.formData.password} onChange={this.props.onChange.bind(null,"password")} placeholder="Password"
                  />
                </div>
                <div className="row actions resendFloat">
                  <button className="ui button signup" type="submit">登 录</button>
                  <a href="javascript:;" value="signUp" onClick={this.props.switch.bind(this)}>还没有帐号？点击注册吧</a>
                  <a href="#" onClick={this.props.showForgotPassword.bind(this)}>忘记密码了？</a>
                </div>
              </form>
        )
    }
}
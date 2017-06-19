import React,{Component} from 'react'


export default class SignUpForm extends Component{
    render(){
        return(
              <form className="ui form" onSubmit={this.props.onSubmit.bind(this)}> {/* 注册*/}
                <div className="field row">
                  <label>用户名</label> 
                  <input type="text" defaultValue={this.props.formData.username} onChange={this.props.onChange.bind(null,"username")} placeholder="Username"/>
                </div>
                <div className="field row">
                  <label>密码</label>
                  <input type="password" defaultValue={this.props.formData.password} onChange={this.props.onChange.bind(null,"password")} placeholder="Password"
                  />
                </div>
                <div className="field row">
                  <label>邮箱</label> 
                  <input type="text" defaultValue={this.props.formData.email} onChange={this.props.onChange.bind(null, 'email')} placeholder="E-mail"/>
                </div>
                <div className="row actions resend">
                  <button className="ui button signup" type="submit">注 册</button>
                  <a href="#" onClick={this.props.ToSignIn.bind(this)}>返回登录</a>
                </div>
              </form>
        )
    }
}
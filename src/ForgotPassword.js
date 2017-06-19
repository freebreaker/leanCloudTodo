import React,{Component} from 'react'


export default class ForgotPassword extends Component{
    render(){
        return(
        <div className="forgotPassword">
          <form className="ui form" onSubmit={this.props.onSubmit.bind(this)}>
            <div className="field row">
              <input type="text" value={this.props.formData.email} placeholder="请输入注册邮箱"
                onChange={this.props.onChange.bind(null, 'email')}/>
            </div>
            <div className="row actions resend">
              <button type="submit">发送重置邮件</button>
              <a href="#" className="return" onClick={this.props.ToSignIn.bind(this)}>返回登录</a>
            </div>
          </form>
        </div>
        )
    }
}
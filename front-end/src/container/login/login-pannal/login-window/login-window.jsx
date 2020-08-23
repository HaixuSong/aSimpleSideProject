import React, { Component } from 'react'
import './login-window.scss'
import axios from 'axios'

export default class LoginWindow extends Component {
    state = {
        inputEmailValue: '',
        showReminder: false,
        isEmailSent: false,
        verifyButtonAble: true,
        timeRemaining: 60
    }

    refVerifyInput = React.createRef()
    refCodeInput = React.createRef()
    refEmailDiv = React.createRef()

    changeHandler = (e) => {
        let newValue = e.target.value
        if (newValue === '') { this.setState({ inputEmailValue: '' }) }
        else {
            this.setState({ inputEmailValue: newValue.split('@')[0] + '@stevens.edu' })
        }
    }

    sendVerify = () => {
        let data = { email: this.refVerifyInput.current.value }
        if (!data.email.endsWith('@stevens.edu')) {
            this.setState({
                showReminder: true,
                validEmail: false
            })
            return
        }
        axios.post('/login/send-verification', data)
            .then(value => {
                //which means the response is back
                console.log(value.data)
                console.log(this.refVerifyInput.current)
                if (value.data.sent) {
                    //which means the email is sent from the server
                    this.setState({
                        validEmail: true,
                        verifyButtonAble: false,
                        showReminder: true,
                        isEmailSent: true
                    })
                } else {
                    //which means the email is not sent from the server
                    this.setState({
                        validEmail: true,
                        verifyButtonAble: false,
                        showReminder: true,
                        isEmailSent: false
                    })
                }
            })
            .catch(err => {
                //which means the axios didn't get any response
                console.log(err)
                this.setState({
                    validEmail: true,
                    verifyButtonAble: false,
                    showReminder: true,
                    isEmailSent: false
                })
            })
        let c = setInterval(() => {
            this.setState({ timeRemaining: this.state.timeRemaining - 1 })
        }, 1000)
        //Set time out for 1 minute
        setTimeout(() => {
            clearInterval(c)
            this.setState({
                verifyButtonAble: true,
                timeRemaining: 60
            })
        }, 60 * 1000)

    }

    render() {
        return (
            <div id='login-window' >
                <h3>Login with your Stevens account</h3>
                <div ref={this.refEmailDiv} className={this.state.showReminder ? (this.state.validEmail ? (this.state.isEmailSent ? "showResultGood" : "showResultBad") : "showResultValid") : ""}>
                    <input id="inputEmail" type="text" onChange={this.changeHandler} list='ide' ref={this.refVerifyInput}
                        placeholder="youremail@stevens.edu" />
                    <datalist id="ide">
                        <option value={this.state.inputEmailValue}></option>
                    </datalist>
                    <button onClick={this.sendVerify} disabled={!this.state.verifyButtonAble}>{this.state.verifyButtonAble ? "Send Certificate" : `Try Again After ${this.state.timeRemaining}s`}</button>
                </div>
                <div>
                    <input type="text" placeholder="Certification Code" maxLength="6" ref={this.refCodeInput} />
                    <button>Login</button>
                </div>
            </div>
        )
    }
}
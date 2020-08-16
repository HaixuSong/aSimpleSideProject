import React, { Component } from 'react'
import './login-window.scss'

export default class LoginWindow extends Component {
    state = {
        inputEmailValue: ''
    }

    changeHandler = (e) => {
        let newValue = e.target.value
        if (newValue === '') { this.setState({ inputEmailValue: '' }) }
        else if (newValue.endsWith('@stevens.edu')) {
            this.setState({ inputEmailValue: newValue })
        }
        else {
            this.setState({ inputEmailValue: newValue + '@stevens.edu' })
        }

    }

    render() {
        return (
            <div id='login-window'>
                <h3>Login with your Stevens account</h3>
                <div>
                    <input id="inputEmail" type="text" onChange={this.changeHandler} list='ide'
                        placeholder="youremail@stevens.edu" />
                    <datalist id="ide">
                        <option value={this.state.inputEmailValue}></option>
                    </datalist>
                    <button>Send Certificate</button>
                </div>
                <div>
                    <input type="text" placeholder="Certification Code" maxLength="6" />
                    <button>Login</button>
                </div>
            </div>
        )
    }
}
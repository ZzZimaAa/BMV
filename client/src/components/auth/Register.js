import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { connect } from '../../store'
import { register } from '../../actions/auth'

const Register = ({ auth, history, register }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push('/')
    }
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    register({ name, email, password }, history)
  }

  return (
    <div className="row mt-4">
      <div className="col-4 mx-auto">
        <div className="card">
          <article className="card-body">
            <h4 className="card-title text-center mb-4 mt-1">Рэгістрацыя</h4>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-user"></i>
                    </span>
                  </div>
                  <input
                    className="form-control"
                    placeholder="Імя"
                    type="text"
                    name="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    pattern=".{3,20}"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-envelope"></i>
                    </span>
                  </div>
                  <input
                    className="form-control"
                    placeholder="Электронная пошта"
                    type="email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    pattern=".{5,30}"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-lock"></i>
                    </span>
                  </div>
                  <input
                    className="form-control"
                    placeholder="Пароль"
                    type="password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    pattern=".{6,30}"
                  />
                </div>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-dark btn-block">Рэгістрацыя</button>
              </div>
            </form>
          </article>
        </div>
      </div>
    </div>
  )
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({ auth: state.auth })

export default connect(mapStateToProps, { register })(Register)

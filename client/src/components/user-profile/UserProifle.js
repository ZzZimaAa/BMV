import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import { connect } from '../../store'
import { getUserById } from '../../actions/user'
import Loader from '../shared/Loader'
import PostForm from '../shared/PostForm'
import Posts from '../shared/Posts'
import ProfileImage from '../shared/ProfileImage'
import Subscription from './Subscription'

const UserProfile = ({ getUserById, match, history, user: { user, isLoading }, auth }) => {
  useEffect(() => getUserById(match.params.id, history), [])

  return !isLoading && user !== null ? (
    <React.Fragment>
      <div className="row mt-5">
        <div className="col-md-6 mx-auto">
          <div className="row">
            <div className="col-8">
              <h2 className="profile-username">{user.name}</h2>
              <p>
                <strong>Зарэгістраваны: </strong>
                {new Date(user.createdDate).getDate() }/{ new Date(user.createdDate).getMonth() + 1 }/{ new Date(user.createdDate).getFullYear() }
              </p>
            </div>
            <div className="col-4 text-center">
              <ProfileImage user={user} />
            </div>
          </div>
        </div>
      </div>
      {!(auth.user.id === user._id) && (
        <div className="row mt-4">
          <div className="col-md-12 text-center">
            <div className="col-4 mx-auto">
              <Subscription userId={user._id} />
            </div>
          </div>
        </div>
      )}
      <div className="row mt-4">
        <div className="col-md-6 mx-auto">
          {auth.user.id === user._id && <PostForm />}
          <Posts queryParams={{ user: user._id }} />
        </div>
      </div>
    </React.Fragment>
  ) : <Loader />
}

UserProfile.propTypes = {
  getUserById: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user,
  auth: state.auth
})

export default connect(mapStateToProps, { getUserById })(UserProfile)

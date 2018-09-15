import React from 'react'
import ReactLoading from 'react-loading'
import PropTypes from 'prop-types'

const Loading = (props) => {
    return props.isLoading && (
        <div className='loader-holder animated fadeIn'>
                <ReactLoading type={'spinningBubbles'} color={'#fff'} height={'15%'} width={'15%'} />
        </div>
    )
}

Loading.propTypes = {
    isLoading: PropTypes.bool.isRequired
}

export default Loading
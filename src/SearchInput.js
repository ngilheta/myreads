import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'

class SearchInput extends Component {
    state = {
        typingTimeOut: 500,
        timeOut: null,
        searchText: ''
    }

    static propTypes = {
        onSearch: PropTypes.func.isRequired,
        placeHolder: PropTypes.string.isRequired,
        isSearching: PropTypes.bool.isRequired
    }

    changeSearch = (event) => {
        this.setState({isLoading: true})
        if (this.state.timeOut){
            clearTimeout(this.state.timeOut)
        }
        this.setState({
            searchText: event.target.value,
            timeOut: setTimeout(()=> this.props.onSearch(this.state.searchText), this.state.typingTimeOut)
        })
    }

    render() {
        const { placeHolder, isSearching } = this.props
        return (
            <div>
                <input autoFocus={true} type="text" onChange={this.changeSearch} placeholder={placeHolder} />
                {
                    isSearching && (
                        <FontAwesome className='search-loader' size='2x' name='spinner' spin />
                    )
                }
            </div>
        )
    }
}

export default SearchInput
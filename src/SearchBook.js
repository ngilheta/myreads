import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import Loading from './Loading'
import SearchInput from './SearchInput'

class SearchBook extends Component {
    state = {
        booksList: [],
        isLoading: false,
        showBookShelfMessage: false,
        isSearching: false
    }

    static propTypes = {
        updateBookList: PropTypes.func.isRequired,
        bookShelfList: PropTypes.array.isRequired
    }

    setLoading = (isLoading) => {
        this.setState({ isLoading: isLoading })
    }

    updateSearchBookShelf = (searchBookList) => {
        searchBookList.forEach(book => {
            const shelfBook = book.shelf = this.props.bookShelfList.find(shelfBook => shelfBook.id === book.id)
            book.shelf = shelfBook ? shelfBook.shelf : book.shelf
        })
        return searchBookList
    }

    searchBook = (searchText) => {
        this.setState({isSearching: true})
        if (searchText && searchText.length > 0){
            searchText = searchText.trim()
            BooksAPI.search(searchText).then(
                res => {
                    const isArray = Array.isArray(res)
                    this.setState({ booksList: res && isArray ? this.updateSearchBookShelf(res) : [], showBookShelfMessage: true, isSearching: false })
                    !isArray && res && console.error(`Error on Function:'BooksAPI.search()', Params: 'searchText: ${searchText}', Error: '${res.error}'`)
                }
            ).catch(error => { console.error(error) })
        } else{
            this.setState({ booksList: [], showBookShelfMessage: false, isSearching: false })
        }
    }

    moveTo = (book) => {
        this.setLoading(true)
        const updateBookList = this.props.updateBookList
        BooksAPI.update(book, book.shelf).then(res => {
            updateBookList()
            this.setLoading(false)
        })
    }

    render() {
        return (
            <div className="search-books">
                <Loading isLoading={this.state.isLoading} />
                <div className="search-books-bar animated fadeInDown">
                    <Link to='/'
                        className='close-search'>
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <SearchInput onSearch={this.searchBook} isSearching={this.state.isSearching} placeHolder="Search by title or author" />
                    </div>
                </div>
                <ListBooks bookList={this.state.booksList} parentClassName='search-books-results' allowNone={true} moveTo={this.moveTo} showBookShelfMessage={this.state.showBookShelfMessage} />
            </div>
        )
    }
}

export default SearchBook
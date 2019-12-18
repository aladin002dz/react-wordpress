import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {Link} from 'react-router-dom'
import clientConfig from './client-config';

export class BookItem extends Component {

    state = {
        imgUrl: '',
        author:'',
        isLoaded:false
    }

    static propTypes = {
        book: PropTypes.object.isRequired
    };

    componentDidMount(){
        const {author} = this.props.book;
        const wordPressSiteUrl = clientConfig.siteUrl;

        axios.get(`${wordPressSiteUrl}/wp-json/wp/v2/users/${author}`)
        .then(res => this.setState({
            author: res.data.name,
            isLoaded: true
        }));
    }

    render() {
        const {id, title, excerpt} = this.props.book;
        const {author, isLoaded} = this.state;
        if(isLoaded){
            return (
                <li className="list-group-item d-flex align-items-baseline justify-content-between py-3 px-5">
                    <div className="d-flex align-items-baseline">
                        <h2>{title.rendered}</h2>
                        <small className="px-2">
                            Review by <strong>{author}</strong>
                        </small> 
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: excerpt.rendered }}></div>
                    <Link to={`/book/${id}`}>Read Review</Link>
                </li>
            )
        }
        return null;

    }
}

export default BookItem

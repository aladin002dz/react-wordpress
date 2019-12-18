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
        const {author, imgUrl, isLoaded} = this.state;
        if(isLoaded){
            return (
                <div>
                    <h2>{title.rendered}</h2>
                    <small>
                        Review by <strong>{author}</strong>
                    </small> 
                    <div dangerouslySetInnerHTML={{ __html: excerpt.rendered }}></div>
                    <Link to={`/book/${id}`}>Read Review</Link>
                    <hr />
                </div>
            )
        }
        return null;

    }
}

export default BookItem

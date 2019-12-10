import React, { Component, Fragment } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import clientConfig from './client-config';

export class BookPage extends Component {
    state = {
        book: {},
        imageUrl:'',
        isLoaded: false
    }

    wordPressSiteUrl = clientConfig.siteUrl;

    getImgUrl = (featured_media) => {
        axios.get(`${this.wordPressSiteUrl}/wp-json/wp/v2/media/${featured_media}`)
        .then(res =>
                this.setState({imgUrl: res.data.media_details.sizes.full.source_url})
            )
    }

    componentDidMount() {
        axios.get(`${this.wordPressSiteUrl}/wp-json/wp/v2/books/${this.props.match.params.id}`)        
        .then(res => {
                    this.setState({book: res.data, isLoaded:true});
                    this.getImgUrl(res.data.featured_media);
                    })
        .catch(err => console.log(err));
    }

    render() {
        const {book, isLoaded, imgUrl} = this.state;
        if(isLoaded){
            return (
                <Fragment>
                    <Link to='/'>Go Back</Link>
                    <hr/>
                    <h1>{book.title.rendered}</h1>
                    
                    <img style={{width:'30%'}} src ={imgUrl} alt={book.title.rendered}/>
                    <div dangerouslySetInnerHTML={{__html: book.content.rendered}}></div>
                </Fragment>
            )
        }
        return (<h3>Loading...</h3>)
    }
}

export default BookPage

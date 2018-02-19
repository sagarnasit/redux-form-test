import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from "../actions";
import _ from 'lodash';

import { Link } from 'react-router-dom';


class PostIndex extends Component {

    componentDidMount() {
        // console.log(this.props.posts);
        this.props.fetchPosts();
    }

    renderPosts(){
        return _.map(this.props.posts, (post) => {
            return(
                <li className='list-group-item' key={post.id}>
                     {post.title}
                </li>
            );
        });
    }
    render() {
        // console.log(this.props.posts);
        return (
            <div>
                <div className='text-xs-right'>
                    <Link to='/posts/new' className='btn btn-primary'>
                        Add a Post
                    </Link>
                </div>
                <h1>Posts</h1>
                <ul className='list-group'>
                    {this.renderPosts()}
                </ul>
          </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts
    }
}
export default connect(mapStateToProps, { fetchPosts })(PostIndex);
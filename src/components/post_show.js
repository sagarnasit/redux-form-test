import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from "../actions";

class ShowPost extends Component {

    componentDidMount(){
        const { id } = this.props.match.params;
        // console.log(this.props);
        this.props.fetchPost(id);
    }

    render() {

        const { post } = this.props;

        if(!post) {
            return <div>Loading...</div>
        }

        return (
          <div>
              <h1>{ post.title }t</h1>
              <h6>Categories: { post.categories }</h6>
              <p>{ post.content }</p>
          </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    console.log(state.posts);
    return { post: state.posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps,{ fetchPost })(ShowPost);
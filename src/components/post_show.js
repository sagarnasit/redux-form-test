import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from "../actions";

class ShowPost extends Component {

    componentDidMount(){
        if(!this.props. post) {
            const {id} = this.props.match.params;
            // console.log(this.props);
            this.props.fetchPost(id);
        }
    }

    deleteThePost() {
        const {id} = this.props.match.params;
        this.props.deletePost(id, () => {
            this.props.history.push('/');
        });
    }
    render() {


        const { post } = this.props;

        if(!post) {
            return <div>Loading...</div>
        }

        return (
          <div>
              <Link to='/'>Back to Index</Link>
              <button onClick={this.deleteThePost.bind(this)}
                      className='btn btn-danger pull-xs-right'
              >
                  Delete Post</button>
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

export default connect(mapStateToProps,{ fetchPost, deletePost })(ShowPost);
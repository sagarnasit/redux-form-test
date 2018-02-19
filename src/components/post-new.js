import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { createPost } from "../actions";
import { connect } from 'react-redux';

class PostNew extends Component {

    renderField(field){

        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={className}>

                <label>{field.label}</label>
                <input type='text' {...field.input} className='form-control' />
                <div className='text-help'>
                    { field.meta.touched? field.meta.error: '' }
                </div>

            </div>
        );
    }

    onFormSubmit(values) {
        this.props.createPost(values, ()=> {
            return this.props.history.push('/');
        });
    }

    render() {
        const { handleSubmit } = this.props;

        return (
          <div>
              <h1>New Post</h1>
              <form onSubmit={ handleSubmit(this.onFormSubmit.bind(this)) }>

                  <Field name='title' label='Title' component={this.renderField}/>

                  <Field name='categories' label='Categories' component={this.renderField}/>

                  <Field name='content' label='Post Content' component={this.renderField}/>

                  <button className='btn btn-primary' type='submit'>Submit</button>
                  <Link to='/' className='btn btn-danger'>Cancel</Link>
              </form>
          </div>
        );
    }
}

function validate(values) {
    const errors = { };
    // name of property and field name should be same.
    // otherwise redux-form will not show an error.
    if(!values.title) {
        errors.title = "Enter a Title";
    }

    if(!values.categories) {
        errors.categories = 'Enter Categories';
    }

    if(!values.content) {
        errors.content = 'Enter Content';
    }

    // If error is empty, the form is fine to submit.
    // If error has *any* properties, redux form assumes form is invalid.
    return errors;
}
export default reduxForm({
    validate,
    form: 'postnewform'
})(
    connect(null, { createPost })(PostNew)
);
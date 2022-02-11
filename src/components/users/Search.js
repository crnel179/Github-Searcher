import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Search extends Component {
    state = {
        text: '',
    };

    static propTypes = {
        searchUser: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.text === '') {
            this.props.setAlert('Field cannot be empty...', 'light');
        } else {
            this.props.searchUser(this.state.text);
            this.setState({ text: '' });
        }
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        const { showClear, clearUsers } = this.props;

        return (
            <div>
                <form onSubmit={this.onSubmit} className='form'>
                    <input
                        type='text'
                        name='text'
                        placeholder='Search Users...'
                        value={this.state.text}
                        onChange={this.onChange}
                    />
                    <input
                        type='submit'
                        value='search'
                        className='btn btn-primary btn-block'
                    />
                </form>
                {showClear && (
                    <button
                        className='btn btn-light btn-block my-1'
                        onClick={clearUsers}
                    >
                        Clear
                    </button>
                )}
            </div>
        );
    }
}

export default Search;

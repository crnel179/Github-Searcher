import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import { Alert } from './components/layout/Alert';
import axios from 'axios';
import './App.css';

class App extends Component {
    state = {
        users: [],
        loading: false,
        alert: null,
    };

    async componentDidMount() {
        console.log(process.env.REACT_APP_GITHUB_CLIENT_ID);
        this.setState({ loading: true });

        const res = await axios.get(
            `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );

        this.setState({ users: res.data, loading: false });
    }

    // Search Github users
    searchUser = async (text) => {
        this.setState({ loading: true });

        const res = await axios.get(
            `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );

        this.setState({ users: res.data.items, loading: false });
    };

    // clear users from state
    clearUsers = () => this.setState({ users: [], loading: false });

    // set alert
    setAlert = (msg, type) => {
        this.setState({ alert: { msg, type } });

        setTimeout(() => this.setState({ alert: null }), 3000);
    };

    render() {
        const { users, loading } = this.state;

        return (
            <div className='App'>
                <Navbar title=' Github Searcher ' icon='fab fa-github' />
                <div className='container'>
                    <Alert alert={this.state.alert} />
                    <Search
                        searchUser={this.searchUser}
                        clearUsers={this.clearUsers}
                        showClear={users.length > 0 ? true : false}
                        setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                </div>
            </div>
        );
    }
}

export default App;

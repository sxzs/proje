import React, { Component } from 'react';
import PostList from '../components/PostList';
import ItemModal from '../components/itemModal';

import { Container } from 'reactstrap';
import { Provider } from 'react-redux';
import store from '../store';
import { loadUser } from '../actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

class Home extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }
    pageHandler = (offset) => {
        this.setState(({ paging }) => ({
            paging: { ...paging, offset: offset }
        }));
    }
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <Container>
                        <ItemModal />
                        <PostList />
                    </Container>

                </div>
            </Provider >
        );
    }
}

export default Home;

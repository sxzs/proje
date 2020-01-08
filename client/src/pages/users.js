import React, { Component } from 'react';
import { Container } from 'reactstrap';

import MyTable from './userstable';


import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

class Userpage extends Component {
    render() {
        return (
            <Container>
                <div>
                    <h3>User page</h3>
                </div>
                <div>
                    <MyTable />
                </div>
            </Container>
        );
    }
}

export default Userpage;
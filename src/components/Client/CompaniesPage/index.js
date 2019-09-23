import React from 'react';
import {
    Container,
} from "@material-ui/core";
import {withServer} from "../../../Server";
import Executors from '../../shared/Executors';
import Footer from "../../shared/Footer";

class CompaniesPage extends React.Component {

    render() {

        return (
            <>
            <Container className='container py-5 mt-5'>
                <Executors/>
            </Container>
                <Footer>

                </Footer>
                </>
        )
    }
}

export default withServer(CompaniesPage)
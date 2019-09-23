import React from 'react'
import {Container, Divider, Typography, Button} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import {styles} from "./styles";
import Post from '../Post';
import {compose} from 'recompose';
import {withServer} from "../../../Server";
import Footer from "../../shared/Footer";
class PostsSearchPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            query: this.props.location.state.query
        }
    }

    componentDidMount() {
        this.props.server.searchPosts(this.state.query).then(res=>this.setState({data: res.data}))
    }


    render() {
        const classes = this.props.classes;
        const posts = this.state.data;
        return (
            <>
                {console.log(this.state.data)}
                <Container maxWidth={"md"} className='container py-5 mt-5'>
                    {Object.keys(posts).length > 0 &&
                    <div>
                        <br/>
                        <Typography variant='h6' align={'center'} className={classes.topCatHeader}><i><b>Хайлтын үр дүн</b></i></Typography>
                        <Container maxWidth="sm">
                            <Divider className={classes.divider}/>

                            {Object.keys(posts).map((key)=>(
                                <Post key={key}  post={posts[key]} id={key}/>
                            ))}
                        </Container>
                    </div>
                    }



                </Container>
                <Footer>

                </Footer>
            </>
        )
    }
}
export default compose(
    withStyles(styles),
    withServer
)(PostsSearchPage)
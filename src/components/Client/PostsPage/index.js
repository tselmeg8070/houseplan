import React from 'react';
import {Container, Divider, Typography, Button} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import {styles} from "./styles";
import TopPost from '../Post/TopPost';
import Post from '../Post';
import {compose} from 'recompose';
import {withServer} from "../../../Server";
import Footer from "../../shared/Footer";

const limit = 2;

class PostsPage extends React.Component {
    componentDidMount() {
        this.props.server.getPosts(0,limit).then(res=>this.setState({data: res.data, pager: limit}))
    }

    constructor(props) {
        super(props);
        this.state = {
            pager: 0,
            data: {},
        }
    }
    handleOnClickMore = () => {
        const pager = this.state.pager;
        this.props.server.getPosts(pager, limit).then(res =>
            this.setState((currentState) => {
                const list = Object.assign(currentState.data, res.data);
                return ({
                    pager: currentState.pager + limit,
                    data: list
                })
            })
        )
        // this.props.history.push(this.props.path+1);
    };

    render() {
        const classes = this.props.classes;
        const posts = this.state.data;
        return (
            <>
            <Container maxWidth={"md"} className='container py-5 mt-5'>
                {Object.keys(posts).length > 0 &&
                    <div>
                        <br/>
                        <Typography variant='h6'><i><b>Топ нийтлэл</b></i></Typography>
                        <Divider className={classes.divider}/>

                        <TopPost id={Object.keys(posts).sort((a,b) => posts[b].dateCreated - posts[a].dateCreated)[0]} post={posts[Object.keys(posts)[0]]}/>
                        <br/>
                        <br/>

                        <Typography variant='h6' align={'center'} className={classes.topCatHeader}><i><b>Сүүлд нэмэгдсэн</b></i></Typography>
                        <Container maxWidth="sm">
                            <Divider className={classes.divider}/>

                            {Object.keys(posts).sort((a,b) => posts[b].dateCreated - posts[a].dateCreated).map((key)=>(
                                <Post key={key}  post={posts[key]} id={key}/>
                            ))}
                            <Button fullWidth  onClick={this.handleOnClickMore} color='secondary' variant="outlined">Цааш үзэх</Button>
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
    withServer,
)(PostsPage)
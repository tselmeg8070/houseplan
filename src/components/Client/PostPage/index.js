import React from 'react';
import {Typography, Container} from "@material-ui/core";
import {withServer} from "../../../Server";
import {withStyles} from "@material-ui/styles";
import {styles} from "./styles";
import {compose} from "recompose";
import AdminButton from "../HelperComponents/AdminButton";
import Footer from "../../shared/Footer";

class PostPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blocks: []
        };
    }
    componentDidMount() {
        this.props.server.getPost(this.props.match.params.id).then(res => this.setState({...res.data}))
    }

    render() {
        const classes = this.props.classes;
        return (
            <>
            <Container maxWidth={'sm'} className='container py-5 mt-5'>
                <AdminButton name={'post'} id={this.props.match.params.id}/>
                {this.state.blocks.map((block)=> {
                    switch (block.type) {
                        case 'header':
                            return  (
                                <Typography variant={'h'+(block.data.level+2)} className={classes.textTitle}>{block.data.text.replace(/(<([^>]+)>)/ig,"")}</Typography>
                            );
                        case 'paragraph':
                            return (
                                <Typography variant='body1' className={classes.textPara} dangerouslySetInnerHTML={{__html:  block.data.text}}></Typography>
                            );
                        case 'image':
                            return (
                                <div>
                                    <img src={block.data.file.url} className={classes.image}/>
                                    <Typography className={classes.imageCaption}><i>{block.data.caption}</i></Typography>
                                </div>
                            );
                        case 'embed':
                            return (
                                <iframe className={classes.embed} src={block.data.embed}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen></iframe>
                            );
                        case 'delimiter':
                            return (
                                <div className={classes.divider}>---*---*---</div>
                            );
                        case 'quote':
                            return (
                                <div className={classes.quote}>
                                    <Typography variant={"body2"} className={classes.quoteText}>
                                        <i>"{block.data.text}"</i>
                                    </Typography>
                                    <div className={classes.quoteCaption}>
                                        {block.data.caption}
                                    </div>
                                </div>
                            );
                    }
                })}
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
    )(PostPage)
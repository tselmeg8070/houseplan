import React from 'react'
import {Typography} from "@material-ui/core";
import {timeConverter} from "../../../utils/HelperFunctions";
import Divider from "@material-ui/core/Divider";
import {compose} from 'recompose';
import {withStyles} from "@material-ui/styles";
import {styles} from './styles';
import {withRouter} from 'react-router-dom';
import * as ROUTERS from  '../../../constants/routes';

class Post extends React.Component {
    onClick = () => {
        this.props.history.push(ROUTERS.POST+this.props.id)
    };
    render() {
        const classes = this.props.classes;
        const post = this.props.post;
        return (
            <div onClick={this.onClick} className={classes.root}>

                <Typography variant='body2' color='secondary'><span className={classes.textDate}> {timeConverter(post.time)}</span></Typography>
                    {post.blocks.map((block)=>{
                        switch (block.type) {
                            case 'header':
                                return <Typography variant='h5' className={classes.textTitle}><b>{block.data.text.replace(/(<([^>]+)>)/ig,"")}</b></Typography>
                            case 'paragraph':
                                return <Typography variant='body1' className={classes.textPara} dangerouslySetInnerHTML={{__html:  block.data.text.slice(0,160)+'...'}}></Typography>
                            case 'image':
                                return <img src={block.data.file.url} width='100%'/>
                            case 'embed':
                                return <iframe width="100%" src={block.data.embed}
                                               frameBorder="0"
                                               allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                               allowFullScreen></iframe>
                        }
                    })}
                <Typography variant="body2" className={classes.textReadMore}>Цааг унших...</Typography>
                    <Divider className={classes.dividerStyle}/>
            </div>
        )
    }
}

export default compose(
    withRouter,
    withStyles(styles)
)(Post)
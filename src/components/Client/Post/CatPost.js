import React from 'react'
import Divider from "@material-ui/core/Divider";
import {Typography} from "@material-ui/core";
import {categoryConverter, timeConverter} from "../../utils/HelperFunctions";
import {Link} from "react-router-dom";
import * as ROUTERS from "../../constants/routes";
import Grid from "@material-ui/core/Grid";
import {withStyles} from "@material-ui/styles";
import {styles} from "./styles";

class CatPost extends React.Component {
    render() {
        const classes = this.props.classes;
        const post = this.props.post;
        const size = this.props.size;
        return (
            <Grid item xs={size}>
                <Divider />
                <Typography variant='body2' color='secondary' className={classes.topCatCategory}>{categoryConverter(post.value.category).toUpperCase()}</Typography>
                <Typography variant='body2' className={classes.topCatDate}>{timeConverter(post.value.time)}</Typography>
                <Link to={ROUTERS.POST+post.key} className={classes.topCatTitle}>
                    <Typography variant='h6'>
                        <b>{post.value.blocks.map(block => {
                            if(block.type === 'header') return block.data.text
                        })}</b>
                    </Typography>
                </Link>
                {post.value.blocks.map(block => {
                    if(block.type === 'image')
                        return <img className={classes.topCatImage} src={block.data.file.url}/>
                    else if (block.type == 'embed')
                        return <iframe className={classes.topCatEmbed} src={block.data.embed}
                                       frameBorder="0"
                                       allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                       allowFullScreen></iframe>
                })}
                <Typography variant='body1'>
                    {post.value.blocks.map(block => {
                        if(block.type === 'paragraph') return block.data.text.replace(/(<([^>]+)>)/ig,"").slice(0,100)+'...'
                    })}
                </Typography>
            </Grid>
        )
    }
    
}

export default withStyles(styles)(CatPost)
import React from 'react'
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { timeConverter} from "../../../utils/HelperFunctions";
import {withStyles} from "@material-ui/styles";
import {styles} from "./styles";
import * as ROUTES from "../../constants/routes";
import {withRouter} from 'react-router-dom';
import {compose} from 'recompose';

class CardPost extends React.Component {
    handleOnClick = (key) => {
        this.props.history.push(ROUTES.POST+key)
    };
    render () {
        const classes = this.props.classes;
        return (
            <Card>
                <CardActionArea onClick={()=>{
                    this.handleOnClick(this.props.post.key)
                }}>
                    {this.props.post.value.blocks.map((block) => {
                        if(block.type === 'image') {
                            return  <img src={block.data.file.url} className={classes.recImage}/>
                        } else if(block.type === 'embed') {
                            return <iframe className={classes.recEmbed} src={block.data.embed}
                                           frameBorder="0"
                                           allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                           allowFullScreen></iframe>
                        }
                    })}
                    <CardContent>
                        {this.props.post.value.blocks.map((block) => {
                            if (block.type === 'header') {
                                return <Typography variant='body1' className={classes.recTextTitle}><b>{block.data.text.replace(/(<([^>]+)>)/ig,"")}</b></Typography>
                            }
                        })}
                        <Typography variant='body2'>{timeConverter(this.props.post.value.time)}</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        )
    }
}

export default compose(
    withStyles(styles),
    withRouter
)(CardPost)


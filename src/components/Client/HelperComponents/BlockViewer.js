import React from 'react';
import {Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
const style = {
    embed: {
        marginTop: '15px',
        width: '100%',
        height: '300px',
    },
    embedCaption: {
        textAlign: 'center',
        color: '#424242',
        marginBottom: '15px',
    },

    image: {
        marginTop: '15px',
        width: '100%',
    },
    imageCaption: {
        textAlign: 'center',
        color: '#424242',
        marginBottom: '15px',
    },
    divider: {
        color: '#9e9e9e',
        marginTop: '10px',
        marginBottom: '10px',
        fontSize: '30px',
        textAlign: 'center',
    },
    quote: {
        marginTop: '15px',
        marginBottom: '15px',
    },
    quoteText: {
        textAlign: 'center',
        fontSize: '16px',
        color: '#424242',
    },
    quoteCaption: {
        marginTop: '5px',
        textAlign: 'center',
        fontSize: '20px',
        color: '#424242',
    },
    dividerStyle: {
        marginBottom: '20px',
    },
    textPara: {
        marginTop: '15px',
        marginBottom: '15px',
        color: '#424242',
    },
    textTitle: {
        marginTop: '15px',
        marginBottom: '5px',
        color: '#212121',
    },

};
class BlockViewer extends React.Component {
    render() {
        const classes = this.props.classes;
        return (
            <div>
                {this.props.blocks.map((block)=> {
                    switch (block.type) {
                        case 'header':
                            return  (
                                <Typography variant={'h5'} className={classes.textTitle}>{block.data.text.replace(/(<([^>]+)>)/ig,"")}</Typography>
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
            </div>
        )
    }
}
export default withStyles(style)(BlockViewer)
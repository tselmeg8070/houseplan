import React from 'react';
import {INITIAL_STATE} from "./initialState";
import {compose} from "recompose";
import {withServer} from "../../../Server";
import {Container, Grid, Typography} from "@material-ui/core";
import * as MATERIAL from "../../../constants/material";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import {withStyles} from "@material-ui/styles";
import {numberWithCommas} from "../../../utils/HelperFunctions";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import BlockViewer from "../HelperComponents/BlockViewer"
import AdminButton from "../HelperComponents/AdminButton";
import Footer from "../../shared/Footer";

const style = {
    code: {
        paddingBottom: '20px',
    },
    priceSellType: {
        fontSize: '15px'
    }
};

class MaterialPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = INITIAL_STATE
    }
    componentDidMount() {
        this.props.server.getMaterial(this.props.match.params.id).then(res => {
            this.setState({...res.data});
            this.setState({
                option: Object.keys(this.state.options)[0]
            })
        })
    }

    onChangeOption = (e) => {
        this.setState({
            option: e.target.value
        })
    };

    render() {
        const classes = this.props.classes;
        const images = [];
        this.state.images.map(image => {
            images.push({
                original: image,
                thumbnail: image
            })
        });
        const {name, code, options, category, sellType, option, blocks} = this.state;
        return (
            <div>


            <Container maxWidth={'md'} className='container py-5 mt-5'>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <ImageGallery items={images} showThumbnails={false} showPlayButton={false}/>
                    </Grid>
                    <Grid item xs={6}>
                        <AdminButton name={'material'} id={this.props.match.params.id}/>
                        <Typography variant={'caption'}>{MATERIAL.categories[category].text}</Typography>
                        <Typography variant={'h5'}><b>{name}</b></Typography>
                        <Typography variant={'caption'} className={classes.code}>Код: {code}</Typography><br/>
                        <br/>
                        <TextField
                            select
                            label="Төрөл"
                            margin="dense"
                            variant="outlined"
                            onChange={this.onChangeOption}
                            value={this.state.option}
                        >
                            {Object.keys(options).map((key)=> (
                                <MenuItem key={key} value={key}>{options[key].name}</MenuItem>
                            ))}

                        </TextField>
                        <Typography variant={'h4'} >
                            {option !== '' &&
                                <b>{numberWithCommas(options[option].price)}₮</b>
                            }
                            /<Typography variant={'captions'} className={classes.priceSellType}>{MATERIAL.sellType[sellType].text}</Typography></Typography>
                    </Grid>
                </Grid>
                <br/>
                <BlockViewer blocks={blocks}/>
            </Container>
                <Footer>

                </Footer>
            </div>
        )
    }
}
export default compose(
    withServer,
    withStyles(style)
)(MaterialPage)
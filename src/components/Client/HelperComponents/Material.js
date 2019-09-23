import React from 'react';
import {
    Grid,
    Card,
    CardActionArea,
    CardMedia,
    Typography,
    CardContent,
    Zoom,
    Divider
} from '@material-ui/core'
import {Link} from "react-router-dom";
import * as ROUTES from "../../../constants/routes";
import {withStyles} from "@material-ui/styles";
import {numberWithCommas} from "../../../utils/HelperFunctions";


const styles = {
    cardMedia: {
        position: 'relative',
    },
    caption: {
        position: 'absolute',
        top: '10px',
        right: '20px',
        color: '#ffffff',
    },
    titleInfo: {
        color: '#616161',
    },
    numberInfo: {
        color: '#757575',
        fontSize: '20px'
    },
    priceInfo: {
        paddingTop: '5px',
    }
};

class Material extends React.Component {
    render() {
        const {
            sizeXs,
            classes,
            id
        } = this.props;
        const {
            code,
            name,
            price,
            images
        } = this.props.data;
        return (
            <Zoom in={true}>
                <Grid item xs={sizeXs}>
                    <Card>
                        <CardActionArea>
                            <Link to={ROUTES.MATERIAL+id} style={{ textDecoration: 'none' }}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    component="img"
                                    alt={'#' + code}
                                    height="170"
                                    image={images}
                                    title={'#' + code}
                                />
                                <CardContent>
                                    <Grid container align="center">
                                        <Grid item xs={12}>
                                            <Typography className={classes.titleInfo}><b>{name}</b></Typography>
                                        </Grid>
                                        <Grid item xs={12} className={classes.priceInfo}>
                                            {price !== undefined &&
                                            <div className={classes.numberInfo}>{numberWithCommas(parseInt(price))}₮</div>
                                            }
                                        </Grid>
                                    </Grid>

                                </CardContent>
                            </Link>
                        </CardActionArea>
                    </Card>
                </Grid>

            </Zoom>
        )
    }
}
export default withStyles(styles)(Material)
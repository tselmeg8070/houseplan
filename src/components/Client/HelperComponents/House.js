import React, {Component} from 'react'
import { withStyles } from '@material-ui/styles';
import {Link, withRouter} from 'react-router-dom'
import {
    Grid,
    Card,
    CardActionArea,
    CardMedia,
    Typography,
    CardContent,
    Zoom
} from '@material-ui/core'
import * as HOUSE from '../../../constants/house'
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
    measureTitle: {
        fontSize: '10px'
    },
    companyTitle: {
        paddingTop: '5px',
        color: '#757575',
        fontSize: '14px'
    },
    priceInfo: {
        paddingTop: '5px',
    }
};

class House extends Component {



    render() {
        const {classes} = this.props;
        const {house} = this.props;
        const {sizeXs} = this.props;
        const key = this.props.id;
        const {code, images, area, rooms, floors, builtWith, price} = house;
        return (
            <Zoom in={true}>
                <Grid item xs={sizeXs}>
                    <Card>
                        <CardActionArea>
                            <Link to={`plan/${key}`} style={{ textDecoration: 'none' }}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    component="img"
                                    alt={'#' + code}
                                    height="140"
                                    image={images[0]}
                                    title={'#' + code}
                                />
                                <div className={classes.caption}><Typography variant="h5">#{code}</Typography></div>
                                <CardContent>
                                    <Grid container align="center">
                                        <Grid item xs={6}><b className={classes.titleInfo}>Талбайн хэмжээ</b><div className={classes.numberInfo}>{area}<span className={classes.measureTitle}>мкв</span></div></Grid>
                                        <Grid item xs={6}><b className={classes.titleInfo}>Өрөөний тоо</b><div className={classes.numberInfo}>{rooms}<span className={classes.measureTitle}>өрөө</span></div></Grid>
                                        <Grid item xs={6}><b className={classes.titleInfo}>Давхарын тоо</b><div className={classes.numberInfo}>{floors}<span className={classes.measureTitle}>дав</span></div></Grid>
                                        <Grid item xs={6}><b className={classes.titleInfo}>Хийц</b><div className={classes.numberInfo}><span className={classes.measureTitle}>{HOUSE.builtWith[builtWith].text}</span></div></Grid>
                                        <Grid item xs={12} className={classes.priceInfo}>
                                            <b className={classes.titleInfo}>Үнэ</b>
                                            <div className={classes.numberInfo}>{numberWithCommas(price)}₮</div>
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





export default withRouter(withStyles(styles)(House))
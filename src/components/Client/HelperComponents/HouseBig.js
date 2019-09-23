import React from 'react';
import {Card, CardContent, CardActionArea, CardMedia, Grid, Typography, Zoom} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import * as HOUSE from "../../../constants/house";
import {numberWithCommas} from "../../../utils/HelperFunctions";
import {Link} from "react-router-dom";

const style = {
    image: {
        width: '100%'
    },
    priceInfo: {
        paddingTop: '5px',
    },
    titleInfo: {
        color: '#616161',
    },
    numberInfo: {
        color: '#757575',
        fontSize: '20px'
    },
};

class Plans extends React.Component {
    render() {
        const classes = this.props.classes;
        const key = this.props.id;
        const {code, image, area, rooms, floors, builtWith, price} = this.props.house;
        return (
            <Zoom in={true}>
                <Card>
                    <CardActionArea>
                        <Link to={`plan/${key}`} style={{ textDecoration: 'none' }}>
                            <Grid container>

                                <Grid item xs={6}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        component="img"
                                        alt={'#' + code}
                                        height="140"
                                        image={image}
                                        title={'#' + code}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <CardContent>

                                        <Grid container align="center">
                                            <Grid item xs={12}>
                                                <Typography variant={'h4'} className={classes.titleInfo}>#DR0012<br/><br/></Typography>
                                            </Grid>
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

                                </Grid>

                            </Grid>
                        </Link>
                    </CardActionArea>
                </Card>
            </Zoom>
        )
    }
}
export default withStyles(style)(Plans)
import React from 'react';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import {
    Button,
    Typography,
    Grid, Divider
} from '@material-ui/core';
import {Link} from 'react-router-dom';
import * as COMPANY from '../../../constants/company'
import * as ROUTES from '../../../constants/routes'
import {numberWithCommas} from "../../../utils/HelperFunctions";

const useStyles = {
    membership: {
        margin: '10px',
    },
    name: {
        marginTop: '10px',
        cursor: 'pointer',
        textDecoration: 'none'
    },
    image: {
        width: '100%'
    },
    imageWrap: {
        margin: '10px'
    },
    activity: {
        cursor: 'pointer',
        '&:hover': {
            color: process.env.REACT_APP_PRIMARY_COLOR
        }
    },
    GOLD: {
        backgroundColor: '#ffd600',
        color: '#ffffff',
        marginBottom: '10px'
    },
    PLATINUM: {
        backgroundColor: '#263238',
        color: '#ffffff',
        marginBottom: '10px'
    },
    SILVER: {
        backgroundColor: '#9e9e9e',
        color: '#ffffff',
        marginBottom: '10px'
    },
    NORMAL: {
        marginBottom: '10px'
    }


};
class Company extends React.Component {
    render() {
        const classes = this.props.classes;
        const id = this.props.id;
        const {
            logo,
            name,
            membership
        } = this.props.data;
        const {price, description} = this.props.offer;
        return (
            <>
                <Grid container spacing={1}>
                    <Grid item xs={3}>
                        <div className={classes.imageWrap}>
                            <img className={classes.image}
                                 src={logo}/>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <Link to={ROUTES.COMPANY + id} className={classes.name}><Typography variant={'h6'} ><b>{name}</b></Typography></Link>
                        <Typography variant={'body2'}>
                            {description}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <div className={classes.membership}>
                            <Button size="small" variant="contained" className={classes[COMPANY.memberships[membership].text]} fullWidth>{COMPANY.memberships[membership].text}</Button>
                            <Typography variant={"h6"}>{numberWithCommas(price)+'₮'}</Typography>
                        </div>
                    </Grid>
                </Grid>
                <Divider />
            </>
        );
    }
}
export default withStyles(useStyles)(Company)
import React, {Component} from 'react';
import { withStyles } from '@material-ui/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import {Link} from 'react-router-dom';
import * as MATERIAL from '../../../constants/material';
import * as ROUTES from '../../../constants/routes';
const styles = {
    header: {
        paddingBottom: '2px',
        color: '#f06292',
    },
    formControl: {
        minWidth: '100%',
        marginTop: '10px',
    },
    category: {
        color: '#757575',
        textDecoration: 'none',
        marginTop: '5px',
        '&:hover': {
            color: '#f06292',
        },
    },
    parentCard: {
        maxWidth: '300px',
    }
};

class MaterialFilter extends Component {
    state = {
        company: 0,
        material: 0,

    };
    render() {
        const {classes} = this.props;
        return (
                <CardContent>
                    <Typography className={classes.header} variant="h5">Ангилал</Typography>
                    <FormControl variant="filled" className={classes.formControl} fullWidth margin={'normal'}>
                        {MATERIAL.categories.map(category => (
                            <Link onClick={()=>this.props.onClick(category.id)} className={classes.category}>
                                <Typography >{category.text.toUpperCase()}</Typography>
                            </Link>
                            )
                        )}
                    </FormControl>
                </CardContent>
        )
    }
}

export default withStyles(styles)(MaterialFilter)
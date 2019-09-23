import React from 'react';
import {INITIAL_STATE} from "./initialState";
import {withStyles, makeStyles} from '@material-ui/core/styles';
import {
    Container,
    Button,
    Typography,
    Grid, Divider
} from '@material-ui/core';
import * as COMPANY from '../../../constants/company'
import  {compose} from 'recompose'
import {withServer} from "../../../Server";
import BlockViewer from "../HelperComponents/BlockViewer";
import AdminButton from "../HelperComponents/AdminButton";

const useStyles = {
    membership: {
        margin: '10px',
    },
    name: {
        marginTop: '10px',
        marginBottom: '10px',
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
class CompanyPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
    }
    componentDidMount() {
        this.props.server.getCompany(this.props.match.params.id).then(res => this.setState({...res.data}));
    }

    render() {
        const classes = this.props.classes;
        const {logo, name, activities, phone, email, membership, website, location, blocks} = this.state;
        const id = this.props.match.params.id;
        return (
            <Container maxWidth={'md'} className='container py-5 mt-5'>
                <Grid container spacing={1}>
                    <Grid item xs={2}>
                        <div className={classes.imageWrap}>
                            <img className={classes.image}
                                 src={logo}/>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant={'h3'} className={classes.name} ><b>{name}</b></Typography>
                        <Typography variant={'body2'}>Үйл
                            ажиллагаа: {activities.map(activity => <Typography onClick={()=>this.props.onClick(activity)} variant={'caption'} className={classes.activity}>{COMPANY.activities[activity].text + ' | '}</Typography>)}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <div className={classes.membership}>
                            <Button size="small" variant="contained" className={classes[COMPANY.memberships[membership].text]} fullWidth>{COMPANY.memberships[membership].text}</Button>
                            <Typography variant={'caption'}>Утас: {phone}</Typography><br/>
                            <Typography variant={'caption'}>Цахим хаяг: {email}</Typography><br/>
                            <Typography variant={'caption'}>Цахим хуудас: {website}</Typography><br/>
                            <Typography variant={'caption'}>Хаяг: {location}</Typography>
                            <AdminButton name={'company'} id={this.props.match.params.id}/>
                        </div>
                    </Grid>
                </Grid>
                <Divider />
                <br/>
                <BlockViewer blocks={blocks}/>

            </Container>
        )
    }
}
export default compose(
    withStyles(useStyles),
    withServer
)(CompanyPage);
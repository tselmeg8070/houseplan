import React from 'react';
import {Card, CardContent, Typography} from "@material-ui/core";
import {withStyles} from '@material-ui/styles';
import * as COMPANY from '../../../constants/company';
const styles = {
    root: {
        width: '100%',
        maxWidth: 360,
    },
    activity: {
          
    },
};
class Filter extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <Card

                className={classes.root}
            >
                <CardContent>
                    <Typography variant={'h5'}>Үйл ажиллагаа</Typography>
                        {COMPANY.activities.map(activity =>
                            <Typography onClick={() => this.props.onClick(activity.id)} className={classes.activity}>
                                    {activity.text}
                            </Typography>
                        )}
                </CardContent>
            </Card>
        )
    }

}
export default withStyles(styles)(Filter)
import React, {Component} from 'react';
import { withStyles } from '@material-ui/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FilledInput from '@material-ui/core/FilledInput'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import * as HOUSE from '../../../constants/house'
const styles = {
    header: {
        paddingBottom: '10px'
    },
    formControl: {
        minWidth: '100%',
        marginTop: '10px',
    },
    formControlRange: {
        minWidth: '100%',
        marginTop: '10px',
        marginBottom: '15px',
    },
    parentCard: {
        marginTop: '10px',
        maxWidth: '300px',
        backgroundColor: '#fafafa',
    }
};

class Filter extends Component {
    state = {
        company: 0,
        material: 0,

    };
    render() {
        const {classes} = this.props;
        const {filter} = this.props;
        const {handleMaterialChange} = this.props;
        const {handleRoomChange} = this.props;
        const {handleAreaChange} = this.props;
        const {handleFloorChange} = this.props;
        const {handlePriceChange} = this.props;
        const {handleSubmit} = this.props;
        const {material, room, area, floor, price} = filter;
        return (
            <Card shadow={5} className={classes.parentCard}>
                <CardContent className={classes.parentCard}>
                    <Typography className={classes.header} align="center" variant="h5">Филтер</Typography>

                    <FormControl variant="filled" className={classes.formControl} fullWidth margin={'normal'}>
                        <InputLabel htmlFor="filled-age-simple">Хийцлэл</InputLabel>
                        <Select
                            value={material}
                            onChange={e => handleMaterialChange(e.target.value)}
                            input={<FilledInput name="material" id="material" />}
                        >
                            {HOUSE.builtWith.map(type=>
                                <MenuItem key={type.id} value={type.id}>{type.text}</MenuItem>
                            )}
                        </Select>
                    </FormControl>

                    <FormControl variant="filled" className={classes.formControlRange} fullWidth margin={'normal'}>
                        <Typography variant={'subtitle2'} gutterBottom>Талбайн хэмжээ(мкв)</Typography>
                            <Slider
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                max={140}
                                min={5}
                                value={area}
                                onChange={handleAreaChange}
                            />
                    </FormControl>

                    <FormControl variant="filled" className={classes.formControlRange} fullWidth margin={'normal'}>
                        <Typography variant={'subtitle2'} gutterBottom>Өрөөний тоо</Typography>
                            <Slider
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                max={30}
                                min={1}
                                value={room}
                                onChange={handleRoomChange}
                            />
                    </FormControl>


                    <FormControl variant="filled" className={classes.formControlRange} fullWidth margin={'normal'}>
                        <Typography variant={'subtitle2'} gutterBottom>Давхарын тоо</Typography>
                            <Slider
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                max={6}
                                min={1}
                                value={floor}
                                onChange={handleFloorChange}
                            />
                    </FormControl>
                    <FormControl variant="filled" className={classes.formControlRange} fullWidth margin={'normal'}>
                        <Typography variant={'subtitle2'} gutterBottom>Үнэ(Сая төгрөгөөр)</Typography>
                            <Slider
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                max={100}
                                min={0}
                                value={price}
                                onChange={handlePriceChange}
                            />
                    </FormControl>
                    <FormControl variant="filled" className={classes.formControlRange} fullWidth margin={'normal'}>
                       <Button fullWidth variant='contained' color={'secondary'} onClick={handleSubmit}>хайх</Button>
                    </FormControl>
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(Filter)
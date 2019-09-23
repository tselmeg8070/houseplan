import React from "react";
import {INITIAL_STATE} from "./initialState";
import MaterialFilter from "../HelperComponents/MaterialFilter";
import Material from "../HelperComponents/Material";
import {withServer} from "../../../Server";
import {
    Container,
    Grid,
    TextField,
    Button
} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import {compose} from "recompose";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Search from '@material-ui/icons/Search'
import Footer from "../../shared/Footer";

const styles = {
    main: {
        marginTop: '10px'
    },
    filterIcon: {
        marginTop: '0px',
    },
    filterText: {
        paddingTop: '8px',
        marginBottom: '8px',
    },
    buttonBack: {
        marginTop: '10px',
        marginLeft: '5px',

    },
    buttonNext: {
        marginTop: '10px',
        marginLeft: '5px',
    }
};
const limit = 2;
class MaterialPage  extends React.Component {
    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
    }

    componentDidMount() {
        this.props.server.getMaterials(0, limit, this.state.filter.category)
            .then(res => this.setState(current => ({
                data: res.data,
                filter: {
                    ...current.filter,
                    pager: limit
                }}))
            )
    }

    handleButtonNext = () => {
        const pager = this.state.filter.pager;
        this.props.server.getMaterials(pager, limit, this.state.filter.category).then(res=>
            this.setState(current => ({
                data: res.data,
                filter: {
                    ...current.filter,
                    pager: current.filter.pager+limit,
                }
            })))
    };
    handleButtonBack = () => {
        const pager = this.state.filter.pager;
        this.props.server.getMaterials(pager-limit, limit, this.state.filter.category).then(res=>
            this.setState(current => ({
                data: res.data,
                filter: {
                    ...current.filter,
                    pager: current.filter.pager-limit,
                }
            })))
    };

    onChangeSearch = (event) => {
        event.persist();
        this.setState(current => ({
            filter: {
                category: current.filter.category,
                search: event.target.value,
                pager: current.filter.pager
            }
        }))
    };

    onClickCategory = (id) => {
        this.props.server.getMaterials(0, limit, id).then(res=>
            this.setState(current => ({
                data: res.data,
                filter: {
                    ...current.filter,
                    pager: limit,
                    activity: id
                }
            })));
    };

    onClickClear = () => {
        this.props.server.getMaterials(0, limit, this.state.filter.category)
            .then(res => this.setState(current => ({
                data: res.data,
                filter: {
                    category: null,
                    search: '',
                    pager: limit,

                }}))
            );
    };

    onClickSearch = () => {
        this.props.server.searchMaterial(this.state.filter.search).then(res =>
            this.setState(current => ({
                data: res.data,
                filter: {
                    ...current.filter,
                    pager: 0,
                    category: null,
                }
            }))
        )
    };

    render() {
        const {classes} = this.props;
        const materials = this.state.data;
        return (
            <div>
            <Container className='container py-5 mt-3'>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <MaterialFilter onClick={this.onClickCategory}/>
                    </Grid>
                    <Grid item xs={9}>
                        <Grid container justify={'space-between'}  alignItems="center">
                            <Grid item alignContent={'center'}>
                                <Button variant={'outlined'} color={'primary'} onClick={this.onClickClear}>ШИНЭЧЛЭХ</Button>
                            </Grid>
                            <Grid item alignContent={'center'}>
                                <TextField
                                    id="outlined-name"
                                    label="Хайлт..."
                                    margin="dense"
                                    variant="outlined"
                                    value={this.state.filter.search}
                                    onChange={this.onChangeSearch}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    edge="end"
                                                    aria-label="toggle password visibility"
                                                    onClick={this.onClickSearch}
                                                >
                                                     <Search />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                            </Grid>
                        </Grid>
                        <br/>
                        <Grid container spacing={3}>
                            {Object.keys(materials).map(key => (
                                (this.state.filter.category === materials[key].category || this.state.filter.category === null) &&
                                <Material key={key} sizeXs={3} data={materials[key]} id={key}/>
                            ))}￼

                        </Grid>
                        <br/>
                        <Grid item xs={12}>
                            <Grid  justify="flex-end" container>
                                <Grid item>
                                    <Button color="default" className={classes.buttonBack}
                                               onClick={this.handleButtonBack}>
                                        Өмнөх
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="primary" className={classes.buttonNext}
                                                   onClick={this.handleButtonNext}>
                                        Дараах
                                    </Button>

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
                <Footer>

                </Footer>
            </div>

        )
    }
}

export default compose(
    withServer,
    withStyles(styles)
)(MaterialPage);
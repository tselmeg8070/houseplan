import {makeStyles} from "@material-ui/core";
import {fade} from "@material-ui/core/styles";
/** Todo(1) **/
const useStyles = makeStyles(theme=>({
    root: {
        flexGrow: 1,
        backgroundColor: '#1A535C'
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },


    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
    signInButton: {
        color: '#515052',
        marginLeft: '16px',
    },
    signOutButton: {
        color: '#515052',
        marginLeft: '16px',
    },
    logo: {
        width: '150px',
    },
    menuButton: {
        '&:hover': {
        menuButtonActive: {
            color: theme.palette.secondary.main,
            fontWeight: 'bold',
        },
        color: theme.palette.secondary.main,
        fontWeight: 'bold'
        }
    },
    menuButtonActive: {
        color: theme.palette.primary.main,
        fontWeight: 'bold',
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

export default useStyles;
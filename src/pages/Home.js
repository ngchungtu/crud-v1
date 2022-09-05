import React, { useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import { useDispatch, useSelector } from 'react-redux'
import { loadUsers, deleteUsers } from '../redux/actions'

import { useNavigate } from 'react-router-dom';

const useButtonStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const useStyles = makeStyles({
    table: {
        marginTop: 100,
        minWidth: 900,
    },
});

function Home(props) {
    const classes = useStyles();
    const buttonStyles = useButtonStyles();
    
    let navigate = useNavigate();
    let dispatch = useDispatch();

    const { users } = useSelector(state => state.data)

    useEffect(() => {
        dispatch(loadUsers());
    }, [])

    const handleDelete = (id) => {
        if(window.confirm('Are you sure you want to delete user')){
            dispatch(deleteUsers(id))
        }
    }

    return (
        <div>
            <div className={buttonStyles.root}>
            <Button variant="contained" color="primary" onClick={()=>navigate("/addUser")}>Add User</Button>
            </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="center">Email</StyledTableCell>
                            {/* <StyledTableCell align="center">Contacts</StyledTableCell> */}
                            <StyledTableCell align="center">Address</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users && users.map((user) => (
                            <StyledTableRow key={user.id}>
                                <StyledTableCell component="th" scope="row">
                                    {user.name}
                                </StyledTableCell>
                                <StyledTableCell align="center">{user.email}</StyledTableCell>
                                {/* <StyledTableCell align="center">{user.contact}</StyledTableCell> */}
                                <StyledTableCell align="center">{user.address}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <div className={buttonStyles.root}>
                                        <ButtonGroup variant="contained" aria-label="contained primary button group">
                                            <Button styles={{marginRight:"5px"}} color="primary" onClick={()=>navigate(`/editUser/${user.id}`)}>Edit</Button>
                                            <Button color="secondary" onClick={()=>handleDelete(user.id)}>Delete</Button>
                                        </ButtonGroup>
                                    </div>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Home;

// https://www.youtube.com/watch?v=hXpYQqykORU&list=WL&index=36&t=5s&ab_channel=CodeWithVishal 51:38
// https://v4.mui.com/components/button-group/
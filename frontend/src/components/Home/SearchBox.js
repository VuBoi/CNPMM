import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
// 
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';
// 
import '../../assets/css/Header.css';
const useStyles = makeStyles((theme) => ({
  searchIcon: {
    padding: theme.spacing(0),
    height: '100%',
    position: 'absolute',
  },
  inputRoot: {
    color: 'white',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(8)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '60ch',
    },
  }
}));
export default function SearchBox(props) {
  const classes = useStyles();
  // 
  const [name, setName] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push("/search/product?q=" + name);
  };
  return (
    <Form onSubmit={submitHandler} className="searchbox">
      <div className={classes.searchIcon}>
        <Button variant="contained" type="submit" className="btn-search">
          <SearchIcon />
        </Button>
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        value={name}
        type="text"
        // name="q"
        onChange={(e) => setName(e.target.value)}
        inputProps={{ 'aria-label': 'search' }}
      />
    </Form>
  )
}

import React, {useEffect} from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  makeStyles,
} from "@material-ui/core/";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {listCategory} from '../../actions/category.action';
const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  prgressColor: {
    color: "#fff",
  },
}));


export default function FilterBox(props) {
  const classes = useStyles();
  const categoryList = useSelector(state =>state.categoryList);
  const { categories } = categoryList;
  // 
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch((listCategory()));
    return () => {
      //
    };
  },[dispatch])
  // 
  const{ price, setPrice , setCategory, category, sort, handleSort} = props;
  return (
    <>
      <h6>FilterBox</h6>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">
          Category
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          onChange={(e) => setCategory(e.target.value)}
          label="Category"
          value= {category}
        >
          {
            categories.map(category => (
              <MenuItem key={category._id} value={category.name}>{category.name}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
      <h6>Sort By</h6>
      <FormControlLabel
            control={
              <Checkbox
                checked={sort.includes("name") ? true : false}
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
                value="name"
                onChange={(e) => handleSort(e.target.value)}
              />
            }
            label="Name"
          />
          <br/>
          <FormControlLabel
              control={
                <Checkbox
                  checked={price === "min" ? true : false}
                  color="primary"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                  value="min"
                  onChange={(e) => setPrice(e.target.value)}
                />
              }
              label="Min To Max Price"
            />
            <br/>
            <FormControlLabel
              control={
                <Checkbox
                  checked={price === "max" ? true : false}
                  color="primary"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                  value="max"
                  onChange={(e) => setPrice(e.target.value)}
                />
              }
              label="Max To Min Price"
            />
    </>
  )
}

import React from 'react';
import {
  CardProps,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  List,
  Select,
  InputLabel,FormControl,
  Grid,
  Box,MenuItem
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import  { SelectChangeEvent } from '@mui/material/Select';

interface Props extends CardProps {
  data: Object | null | undefined;
  handleCloseLesson: any;
}

function EditDashboardInfoLesson({ data, handleCloseLesson }: Props) {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  return (
    <>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleCloseLesson} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Sửa thông tin
          </Typography>
          <Button autoFocus color="inherit" onClick={handleCloseLesson}>
            Lưu thông tin
          </Button>
        </Toolbar>
      </AppBar>
      <List sx={{m: 2}}>
      <Typography fontSize={14}>Vui lòng điền đầy đủ thông tin cần thiết (*)</Typography>
        <Grid container>
          <Grid item xs={12} md={12}>
              <Typography sx={{padding: "10px 0"}} variant='h5'>Thông tin buổi học</Typography>
              <Grid item xs={6}>
              <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
              </Grid>
          </Grid>
          <Grid item xs={12} md={12}>
            <h1>123123</h1>
          </Grid>
        </Grid>
      </List>
    </>
  );
}

export default EditDashboardInfoLesson;

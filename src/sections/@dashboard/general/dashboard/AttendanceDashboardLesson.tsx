import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Card,
  Grid,
  Paper,
  TextField,
  MenuItem,
  Box,
  FormControl,
  InputLabel,
  Select,
  Chip,
  OutlinedInput,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
//theme
import { Theme, useTheme } from '@mui/material/styles';

type Props = {
  open: boolean;
  onClose: VoidFunction;
  // onCreateBilling: (address: ICheckoutBillingAddress) => void;
};
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const currencies = [
  {
    value: 'TNC9.2 - Toán nâng cao 9.2',
    label: 'TNC9.2 - Toán nâng cao 9.2',
  },
  {
    value: 'TNC9.4 - Toán nâng cao 9.4',
    label: 'TNC9.4 - Toán nâng cao 9.4',
  },
  {
    value: 'TNC9.2 - Toán nâng cao 9.2',
    label: 'TNC9.2 - Toán nâng cao 9.2',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function AttendanceDashboardLesson({ open, onClose }: Props) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  return (
    <Dialog fullScreen open={open} onClose={onClose}>
      <DialogTitle>Điểm danh ca học</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ boxShadow: theme.customShadows.dropdown, p: 2, borderRadius: 2 }}>
          <Grid container spacing={2}>
            <Grid xs={4} item>
              <TextField
                id="outlined-select-currency"
                select
                label="Lớp học"
                defaultValue="EUR"
                fullWidth
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid xs={8} item>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel id="demo-multiple-chip-label">Thời gian học</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={personName}
                  onChange={handleChange}
                  defaultValue={[names[0]]}
                  input={<OutlinedInput id="select-multiple-chip" label="Lịch học" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button color="inherit" variant="outlined" onClick={onClose}>
          Hủy bỏ
        </Button>
      </DialogActions>
    </Dialog>
  );
}

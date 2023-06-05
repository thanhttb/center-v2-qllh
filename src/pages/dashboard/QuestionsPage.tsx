import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Tooltip,
  Grid,
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
import { DataGrid } from '@mui/x-data-grid';
import {
  DataGridPro,
  GridRow,
  GridColumnHeaders,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
  GridToolbarDensitySelector,
  GridValueGetterParams,
  GridColDef
} from '@mui/x-data-grid-pro';
import { IconButton } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import AccessibilityNewRoundedIcon from '@mui/icons-material/AccessibilityNewRounded';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import QueueIcon from '@mui/icons-material/Queue';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
//theme
import { Theme, useTheme } from '@mui/material/styles';

import {
    randomCreatedDate,
    randomPrice,
    randomCurrency,
    randomCountry,
    randomCity,
    randomEmail,
    randomInt,
    randomAddress,
    randomCommodity,
  } from '@mui/x-data-grid-generator';

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

function getFullName(params: GridValueGetterParams) {
  return `${params.row.firstName || ''} ${params.row.lastName || ''}`;
}

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
    value: 'TNC9.1 - Toán nâng cao 9.1',
    label: 'TNC9.1 - Toán nâng cao 9.1',
  },
];
const rows = [
    {
      id: 1,
      customer: 'Matheus',
      email: randomEmail(),
      date: randomCreatedDate(),
      address: randomAddress(),
      country: randomCountry(),
      city: randomCity(),
      currency: randomCurrency(),
      products: generateProducts(),
    },
    {
      id: 2,
      customer: 'Olivier',
      email: randomEmail(),
      date: randomCreatedDate(),
      address: randomAddress(),
      country: randomCountry(),
      city: randomCity(),
      currency: randomCurrency(),
      products: generateProducts(),
    },
    {
      id: 3,
      customer: 'Flavien',
      email: randomEmail(),
      date: randomCreatedDate(),
      address: randomAddress(),
      country: randomCountry(),
      city: randomCity(),
      currency: randomCurrency(),
      products: generateProducts(),
    },
    {
      id: 4,
      customer: 'Danail',
      email: randomEmail(),
      date: randomCreatedDate(),
      address: randomAddress(),
      country: randomCountry(),
      city: randomCity(),
      currency: randomCurrency(),
      products: generateProducts(),
    },
    {
      id: 5,
      customer: 'Alexandre',
      email: randomEmail(),
      date: randomCreatedDate(),
      address: randomAddress(),
      country: randomCountry(),
      city: randomCity(),
      currency: randomCurrency(),
      products: generateProducts(),
    },
    {
      id: 6,
      customer: 'Minh',
      email: randomEmail(),
      date: randomCreatedDate(),
      address: randomAddress(),
      country: randomCountry(),
      city: randomCity(),
      currency: randomCurrency(),
      products: generateProducts(),
    },
  ];
function generateProducts() {
  const quantity = randomInt(1, 5);
  return [...Array(quantity)].map((_, index) => ({
    id: index,
    name: randomCommodity(),
    quantity: randomInt(1, 5),
    unitPrice: randomPrice(1, 1000),
  }));
}

export default function QuestionsPage() {
  const theme = useTheme();
  const [personName, setPersonName] = useState<string[]>([]);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [toolbarIcon, setToolbarIcon] = useState(false);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const handleSelectionChange = (selection: any) => {
    setSelectedRowIds(selection);

    // Kiểm tra nếu có hàng được chọn
    if (selection.length > 0) {
      setToolbarIcon(true);
    } else {
      setToolbarIcon(false);
    }
  };
  const columns: GridColDef[] = [
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: any) => {
        return (
          <>
            <Tooltip title="Chỉnh sửa">
              <IconButton>
                <CreateIcon />
              </IconButton>
            </Tooltip>
  
            <Tooltip title="Thêm ca học">
              <IconButton>
                <PlaylistAddIcon />
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
    { field: 'id', headerName: 'Order ID' },
    { field: 'customer', headerName: 'Customer', width: 200 },
    { field: 'date', type: 'date', headerName: 'Placed at' },
    { field: 'currency', headerName: 'Currency' },
    {
      field: 'total',
      type: 'number',
      headerName: 'Total',
      valueGetter: ({ row }) => {
        const subtotal = row.products.reduce(
          (acc: number, product: any) => product.unitPrice * product.quantity,
          0
        );
        const taxes = subtotal * 0.05;
        return subtotal + taxes;
      },
    },
  ];
  function MyToolbar() {
    return (
      <GridToolbarContainer sx={{ justifyContent: 'space-between' }}>
        <div>
          <h3>Danh Sách Câu Hỏi</h3>
        </div>
        <div>
          <GridToolbarQuickFilter placeholder="Tìm kiếm" />
          <GridToolbarExport />
        </div>
      </GridToolbarContainer>
    );
  }
  const [selectionModel, setSelectionModel] = React.useState([]);

  const handleSelectionModelChange = (newSelectionModel) => {
    setSelectionModel(newSelectionModel);
  };
  return (
    <>
    <Helmet>
    <title> Danh sách ghi danh</title>
  </Helmet>
    <Box sx={{ boxShadow: theme.customShadows.dropdown, p: 2, borderRadius: 2 }}>
      <Grid container spacing={2} mb={2}>
        <Grid xs={2} item>
          <TextField
            id="outlined-select-currency"
            select
            label="Lớp học"
            defaultValue="EUR"
            fullWidth
            size="small"
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid xs={2} item>
          <TextField
            id="outlined-select-currency"
            select
            label="Lớp học"
            defaultValue="EUR"
            fullWidth
            size="small"
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid xs={2} item>
          <TextField
            id="outlined-select-currency"
            select
            label="Lớp học"
            defaultValue="EUR"
            fullWidth
            size="small"
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid xs={6} item>
          <TextField
            id="outlined-select-currency"
            select
            label="Lớp học"
            defaultValue="EUR"
            fullWidth
            size="small"
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid xs={3} item>
          <TextField
            id="outlined-select-currency"
            select
            label="Lớp học"
            defaultValue="EUR"
            fullWidth
            size="small"
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid xs={9} item>
          <TextField
            id="outlined-select-currency"
            select
            label="Lớp học"
            defaultValue="EUR"
            fullWidth
            size="small"
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      <DataGridPro
        rows={rows}
        columns={columns}
        rowThreshold={0}
        loading={rows.length === 0}
        onRowSelectionModelChange={handleSelectionChange}
        // rowSelection={false}
        components={{
          Toolbar: MyToolbar,
        //   Row: MemoizedRow,
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pagination
        pageSizeOptions={[5, 10, 25, 50, 100]}
      />
    </Box>
    </>
  );
}

import * as React from 'react';
import {
  Container,
  Grid,
  Stack,
  Button,
  Tooltip,
  Card,
  CardHeader,
  Box,
  Typography,
  Paper,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import {
  DataGridPro,
  DataGridProProps,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
  GridToolbarDensitySelector,
  GridRow,
  GridColumnHeaders,
  GridRowParams,
} from '@mui/x-data-grid-pro';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import QueueIcon from '@mui/icons-material/Queue';
import FindReplaceIcon from '@mui/icons-material/FindReplace';
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

const MemoizedRow = React.memo(GridRow);

const MemoizedColumnHeaders = React.memo(GridColumnHeaders);

export default function TargetPage() {

  const columns: GridColDef[] = [
    {
      field: 'actions',
      headerName: '',
      width: 120,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: any) => {
        return (
          <>
            <Tooltip title="Xem random đề" >
              <IconButton>
                <FindReplaceIcon/>
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton>
                <EditIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Xóa">
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
    { field: 'id', headerName: 'Order ID' ,width: 200 },
    { field: 'customer', headerName: 'Customer', width: 200 },
    { field: 'date', type: 'date', headerName: 'Placed at',width: 200  },
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

  function MyToolbar() {
    return (
      <GridToolbarContainer title="Mục Tiêu Học Tập" sx={{ justifyContent: 'space-between' }}>
        <h2>Mục Tiêu Học Tập</h2>
        <div>
          <GridToolbarQuickFilter placeholder="Tìm kiếm" />
          <Tooltip title="Thêm mới">
            <IconButton>
              <QueueIcon />
            </IconButton>
          </Tooltip>
        </div>
      </GridToolbarContainer>
    );
  }

  function generateProducts() {
    const quantity = randomInt(1, 5);
    return [...Array(quantity)].map((_, index) => ({
      id: index,
      name: randomCommodity(),
      quantity: randomInt(1, 5),
      unitPrice: randomPrice(1, 1000),
    }));
  }

  type Customer = typeof rows[number];

  const theme = useTheme();
  let navigate = useNavigate();
  const [selectedRowId, setSelectedRowId] = React.useState(null);
  const [showClass, setShowClass] = React.useState(false);

  return (
    <>
      <Helmet>
        <title>Danh sách lớp học</title>
      </Helmet>
      <Grid
        item
        md={12}
        sx={{
          boxShadow: theme.customShadows.dropdown,
          borderRadius: 2,
          mt: 2,
        }}
      >
        <DataGridPro
          columns={columns}
          rows={rows}
          localeText={{
            toolbarDensity: 'Căn chỉnh ',
          }}
          rowThreshold={0}
          loading={rows.length === 0}
          rowSelection={false}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          components={{
            Toolbar: MyToolbar,
            Row: MemoizedRow,
            ColumnHeaders: MemoizedColumnHeaders,
          }}
          pagination
          pageSizeOptions={[5, 10, 25, 50, 100]}
          // getDetailPanelHeight={getDetailPanelHeight}
          // getDetailPanelContent={getDetailPanelContent}
        />
      </Grid>
    </>
  );
}

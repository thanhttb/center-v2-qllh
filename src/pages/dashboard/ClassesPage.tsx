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
import CreateIcon from '@mui/icons-material/Create';
import QueueIcon from '@mui/icons-material/Queue';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
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

export default function ClassesPage() {
  function DetailPanelContent({ row: rowProp }: { row: Customer }) {
    const theme = useTheme();

    return (
      // <Stack sx={{ py: 2, height: '100%', boxSizing: 'border-box' }} direction="column">
      <Paper sx={{ width: '50%', p: 2, boxShadow: theme.customShadows.dropdown, m: 2 }}>
        <Stack direction="column" spacing={1}>
          <Typography variant="h5">{`Lịch học lớp ${rowProp.id}`}</Typography>
          <DataGridPro
            density="compact"
            columns={[
              { field: 'name', headerName: 'Product' },
              {
                field: 'quantity',
                headerName: 'Quantity',
                align: 'center',
                type: 'number',
              },
              { field: 'unitPrice', headerName: 'Unit Price', type: 'number' },
              {
                field: 'total',
                headerName: 'Total',
                type: 'number',
                valueGetter: ({ row }) => row.quantity * row.unitPrice,
              },
            ]}
            rows={rowProp.products}
            // sx={{ flex: 1 }}
            hideFooter
          />
        </Stack>
      </Paper>
      // </Stack>
    );
  }

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
            <Tooltip title="Chỉnh sửa" onClick={handleShowAddLesson}>
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
      <GridToolbarContainer title="Danh Sách Lớp Học" sx={{ justifyContent: 'space-between' }}>
        <div>
          <h3>Danh Sách Lớp Học</h3>
        </div>
        <div>
          <GridToolbarQuickFilter placeholder="Tìm kiếm" />

          <GridToolbarDensitySelector />
          <Tooltip title="Xuất danh sách lớp học">
            <GridToolbarExport />
          </Tooltip>
          <Tooltip title="Thêm lớp học">
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

  const handleShowAddLesson = () => {
    // setShowClass(true);
    console.log('show add lesson');
  };
  const getDetailPanelContent = React.useCallback<
    NonNullable<DataGridProProps['getDetailPanelContent']>
  >(({ row }) => <DetailPanelContent row={row} />, []);

  const handleRowClick = (params: any) => {
    // if (showClass == false) {
    setSelectedRowId(params.id);
    // navigate(`/train/class/${params.id}`);
    // }
  };

  const getDetailPanelHeight = React.useCallback(() => 300, []);

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
          onRowClick={handleRowClick}
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
          getDetailPanelHeight={getDetailPanelHeight}
          getDetailPanelContent={getDetailPanelContent}
        />
      </Grid>
    </>
  );
}

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Stack, Button, Tooltip, Card, CardHeader, Box } from '@mui/material';
import {
  DataGridPro,
  GridRow,
  GridColumnHeaders,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
  GridFilterModel,
  GridToolbarDensitySelector,
  GridColDef,
  GridColumnHeaderParams,
  GridValueGetterParams,
} from '@mui/x-data-grid-pro';
import { useDemoData } from '@mui/x-data-grid-generator/';
import { IconButton } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import AccessibilityNewRoundedIcon from '@mui/icons-material/AccessibilityNewRounded';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import QueueIcon from '@mui/icons-material/Queue';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// _mock_
import {
  _appFeatured,
  _appAuthors,
  _appInstalled,
  _appRelated,
  _appInvoices,
} from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../components/settings';
// sections
import {
  DashboardWidgetSummary,
  DashboardSelectDate,
} from '../../sections/@dashboard/general/dashboard';
// assets
import { SeoIllustration } from '../../assets/illustrations';
import Typography from 'src/theme/overrides/Typography';

const MemoizedRow = React.memo(GridRow);

const MemoizedColumnHeaders = React.memo(GridColumnHeaders);

interface CustomColumnProps {
  name: string;
  email: string;
  phone: string;
}
// ----------------------------------------------------------------------

export default function GeneralDashboardPage() {
  const { user } = useAuthContext();
  const dateNow = new Date();
  const theme = useTheme();

  const [filterEndDate, setFilterEndDate] = useState<Date | null>(dateNow);

  const [filterStartDate, setFilterStartDate] = useState<Date | null>(dateNow);

  const { themeStretch } = useSettingsContext();

  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 20,
    maxColumns: 10,
  });

  const data_tuition_fee_list = useDemoData({
    dataSet: 'Employee',
    rowLength: 100,
    maxColumns: 10,
  });

  const rowsData = React.useMemo(() => {
    if (!data.rows || data.rows.length === 0) {
      return { rows: data.rows };
    }
    const [firstRow, secondRow, thirdRow, ...rows] = data.rows;
    return {
      rows,
      pinnedRows: {
        top: [firstRow],
        bottom: [secondRow, thirdRow],
      },
    };
  }, [data.rows]);

  const handleDelete = (id: any) => {
    console.log(`Xóa dòng có id ${id}`);
    // Xử lý xóa tại đây
  };

  const CustomColumn: React.FC<CustomColumnProps> = ({ name, email, phone }) => {
    return (
      <div style={{ flexDirection: 'column', display: 'flex' }}>
        <span style={{ fontSize: 11 }}>{name}</span>
        <span style={{ fontSize: 11 }}>{email}</span>
        <span style={{ fontSize: 11 }}>{phone}</span>
      </div>
    );
  };

  const columns = [
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      disableColumnFilter: true,
      disableColumnMenu: true,
      disableColumnSelector: true,
      renderCell: (params: any) => {
        return (
          <>
            <Tooltip title="Sửa ca học">
              <IconButton>
                <CreateIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Điểm danh ca học">
              <IconButton>
                <AccessibilityNewRoundedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Mở khóa khoa học">
              <IconButton aria-label="Xóa" onClick={() => handleDelete(params.id)}>
                <LockOpenIcon />
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
    {
      field: 'desk',
      headerName: 'Lớp',
      width: 120,
    },
    { field: 'commodity', headerName: 'Cơ sở', width: 120 },
    { field: 'traderName', headerName: 'Thời gian', width: 120 },
    { field: 'traderEmail', headerName: 'Giáo viên', width: 180 },
    { field: 'email', headerName: 'Tài liệu', width: 100 },
    { field: 'quantity', headerName: 'Sĩ số', width: 120 },
    { field: 'filledQuantity', headerName: 'Có mặt', width: 120 },
    { field: 'unitPrice', headerName: 'Vắng', width: 120 },
  ];

  const columns_tuition = [
   
    {
      field: 'actions',
      headerName: 'Actions',
      width: 60,
      sortable: false,
      disableColumnFilter: true,
      disableColumnMenu: true,
      disableColumnSelector: true,
      renderCell: (params: any) => {
        return (
          <>
            <Tooltip title="Xem bảng kê">
              <IconButton>
                <AttachMoneyIcon />
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
    {
      field: 'phone',
      headerName: 'Lớp',
      width: 100,
    },
    {
      field: 'name',
      headerName: 'Học sinh',
      width: 120,
    },
    {
      field: 'customColumn',
      headerName: 'Phụ huynh',
      width: 150,
      flex: 1,
      renderCell: (params: any) => (
        <CustomColumn
          {...params.row}
          name={params.row.name}
          email={params.row.email}
          phone={params.row.phone}
        />
      ),
      sortable: true,
      sortComparator: (v1: any, v2: any) => v1.email.localeCompare(v2.email), // Sắp xếp theo field2
      valueGetter: (params: any) => `${params.row.name} - ${params.row.email}`, // Kết hợp giá trị từ field1 và field2
    },
  ];

  function MyToolbar() {
    return (
      <GridToolbarContainer title="Danh Sách Ca Học" sx={{ justifyContent: 'space-between' }}>
        <div>
          <h3>Danh Sách Ca Học</h3>
        </div>
        <div>
          <GridToolbarQuickFilter placeholder="Tìm kiếm" />

          <GridToolbarDensitySelector />
          <GridToolbarExport />
          <Tooltip title="Thêm mới ca học">
            <IconButton>
              <QueueIcon />
            </IconButton>
          </Tooltip>
        </div>
      </GridToolbarContainer>
    );
  }

  function MyToolbarTuition() {
    return (
      <GridToolbarContainer title="Danh Sách Học Phí" sx={{ justifyContent: 'space-between' }}>
        <div>
          <h3>Danh Sách Học Phí</h3>
        </div>
        <div>
          <GridToolbarQuickFilter placeholder="Tìm kiếm" />
          <GridToolbarExport />
        </div>
      </GridToolbarContainer>
    );
  }

  return (
    <>
      <Helmet>
        <title> Bảng điều khiển</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={2}>
          {/* Header  */}
          <Grid item xs={12} md={4}>
            <DashboardSelectDate
              filterEndDate={filterEndDate}
              filterStartDate={filterStartDate}
              onFilterStartDate={(newValue) => {
                setFilterStartDate(newValue);
              }}
              onFilterEndDate={(newValue) => {
                setFilterEndDate(newValue);
              }}
            />
          </Grid>
          <Grid item xs={12} md={8} container spacing={2}>
            <Grid item xs={4} md={3}>
              <DashboardWidgetSummary
                title="Chưa điểm danh"
                percent={2.6}
                total={34}
                chart={{
                  colors: [theme.palette.primary.main],
                  series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
                }}
              />
            </Grid>
          </Grid>

          {/* Danh sách ca học  */}
          <Grid
            item
            md={12}
            sx={{
              boxShadow: theme.customShadows.dropdown,
              borderRadius: 2,
              mt: 2,
            }}
          >
            {/* <Card>
              <Box sx={{ width: '100%' }}> */}
            <DataGridPro
              {...data}
              rows={rowsData.rows}
              columns={columns}
              loading={data.rows.length === 0}
              rowSelection={false}
              initialState={{
                ...data.initialState,
                pagination: {
                  ...data.initialState?.pagination,
                  paginationModel: { pageSize: 5 },
                },
              }}
              components={{
                Toolbar: MyToolbar,
                Row: MemoizedRow,
                ColumnHeaders: MemoizedColumnHeaders,
              }}
              pagination
              pageSizeOptions={[5, 10, 25, 50, 100]}
            />
            {/* </Box>
            </Card> */}
          </Grid>
          {/* Danh sách học phí */}
          <Grid
            item
            sm={12}
            md={7}
            sx={{
              boxShadow: theme.customShadows.dropdown,
              borderRadius: 2,
              m: 2,
            }}
          >
            <DataGridPro
              rows={data_tuition_fee_list.data.rows}
              columns={columns_tuition}
              loading={data.rows.length === 0}
              initialState={{
                ...data_tuition_fee_list.data.initialState,
                pagination: { paginationModel: { pageSize: 5 } },
              }}
              components={{
                Toolbar: MyToolbarTuition,
                Row: MemoizedRow,
                ColumnHeaders: MemoizedColumnHeaders,
              }}
              pagination
              pageSizeOptions={[5, 10, 25, 50, 100]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

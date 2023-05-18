import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Tooltip, Slide, Dialog, makeStyles, useMediaQuery } from '@mui/material';
import {
  DataGridPro,
  GridRow,
  GridColumnHeaders,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
  GridToolbarDensitySelector,
  GridRowParams,
  GridCellParams,
} from '@mui/x-data-grid-pro';
import { useDemoData } from '@mui/x-data-grid-generator/';
import { IconButton } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import AccessibilityNewRoundedIcon from '@mui/icons-material/AccessibilityNewRounded';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import QueueIcon from '@mui/icons-material/Queue';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import { TransitionProps } from '@mui/material/transitions';
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
  EditDashboardInfoLesson,
  NewDashboardInfoLesson,
  AttendanceDashboardLesson
} from '../../sections/@dashboard/general/dashboard';
// assets

const MemoizedRow = React.memo(GridRow);

const MemoizedColumnHeaders = React.memo(GridColumnHeaders);

interface CustomColumnProps {
  name: string;
  email: string;
  phone: string;
}

const rows = [
  {
    id: 1,
    german: 'der Kuchen',
    english: 'cake',
    p_name: 'Nguyễn Minh Ngọc 1',
    p_phone: '098124234',
    p_email: 'bqminh30@gmail.com',
    pay: 0,
  },
  {
    id: 2,
    german: 'rot',
    english: 'red',
    p_name: 'Nguyễn Minh Ngọc 2',
    p_phone: '098124234',
    p_email: 'bqminh30@gmail.com',
    pay: 0,
  },
  {
    id: 3,
    german: 'das Auto',
    english: 'car',
    p_name: 'Nguyễn Minh Ngọc 3',
    p_phone: '098124234',
    p_email: 'bqminh30@gmail.com',
    pay: 0,
  },
  {
    id: 4,
    german: 'fliegend',
    english: 'flying',
    p_name: 'Nguyễn Minh Ngọc 4',
    p_phone: '098124234',
    p_email: 'bqminh30@gmail.com',
    pay: 0,
  },
  {
    id: 5,
    german: 'grün',
    english: 'green',
    p_name: 'Nguyễn Minh Ngọc 5',
    p_phone: '098124234',
    p_email: 'bqminh30@gmail.com',
    pay: 0,
  },
  {
    id: 6,
    german: 'der Hubschrauber Gun',
    english: 'helicopter',
    p_name: 'Nguyễn Minh Ngọc 6',
    p_phone: '098124234',
    p_email: 'bqminh30@gmail.com',
    pay: 0,
  },
  {
    id: 7,
    german: 'die Gabel',
    english: 'fork',
    p_name: 'Nguyễn Minh Ngọc 7',
    p_phone: '098124234',
    p_email: 'bqminh30@gmail.com',
    pay: 0,
  },
  {
    id: 8,
    german: 'das Hemd',
    english: 'shirt',
    p_name: 'Nguyễn Minh Ngọc 8',
    p_phone: '098124234',
    p_email: 'bqminh30@gmail.com',
    pay: 0,
  },
  {
    id: 9,
    german: 'tatsächlich',
    english: 'actual',
    p_name: 'Nguyễn Minh Ngọc 9',
    p_phone: '098124234',
    p_email: 'bqminh30@gmail.com',
    pay: 0,
  },
  {
    id: 10,
    german: 'der Bus',
    english: 'bus',
    p_name: 'Nguyễn Minh Ngọc 10',
    p_phone: '088888888',
    p_email: 'bqminh30@gmail.com',
    pay: 0,
  },
];

// ----------------------------------------------------------------------
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function GeneralDashboardPage() {
  const { user } = useAuthContext();
  const dateNow = new Date();
  const theme = useTheme();

  const [filterEndDate, setFilterEndDate] = useState<Date | null>(dateNow);

  const [filterStartDate, setFilterStartDate] = useState<Date | null>(dateNow);

  const [showLesson, setShowLesson] = useState(false);
  const [showAddLesson, setShowAddLesson] = useState(false);
  const [showAttendance, setShowAttendance] = useState(false);
  const [editValue, setEditValue] = useState<Object | null | undefined>();

  const [responsiveFullWidth, setResponsiveFullWidth] = useState(false);
  const isFullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setResponsiveFullWidth(!isFullScreen);
  }, [isFullScreen]);

  const { themeStretch } = useSettingsContext();

  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 20,
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
        <span style={{ fontSize: 12, fontWeight: 600 }}>{name}</span>
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
      renderCell: (params: GridCellParams) => {
        return (
          <>
            <Tooltip title="Sửa ca học">
              <IconButton onClick={() => handleShowLesson(params.row)}>
                <CreateIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Điểm danh ca học">
              <IconButton onClick={()=>handleAttendanceShow(params.row)}>
                <AccessibilityNewRoundedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Mở khóa khóa học">
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
      width: 100,
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
      field: 'english',
      headerName: 'Lớp',
      width: 100,
    },
    {
      field: 'german',
      headerName: 'Học sinh',
      width: 150,
    },
    {
      field: 'tags',
      headerName: 'Phụ huynh',
      width: 150,
      flex: 1,
      // type: "singleSelect",
      renderCell: (params: any) => (
        <CustomColumn
          {...params.row}
          name={params.row.p_name}
          email={params.row.p_email}
          phone={params.row.p_phone}
        />
      ),
      valueGetter: (params: any) =>
        `${params.row.p_name + params.row.p_email + params.row.p_phone}`,
      sortable: true,
      // sortComparator: tagsSortComparator,
      // filterOperators: tagsFilterOperators
    },
    { field: 'pay', headerName: 'Học phí', width: 100 },
  ];

  function MyToolbar() {
    return (
      <GridToolbarContainer sx={{ justifyContent: 'space-between' }}>
        <div>
          <h3>Danh Sách Ca Học</h3>
        </div>
        <div>
          <GridToolbarQuickFilter placeholder="Tìm kiếm" />

          <GridToolbarDensitySelector />
          <GridToolbarExport />
          <Tooltip title="Thêm mới ca học" onClick={handleShowAddLesson}>
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

  const handleShowLesson = (item: any) => {
    setShowLesson(true);
    setEditValue(JSON.stringify(item));
  };

  const handleCloseLesson = () => {
    setShowLesson(false);
  };

  const handleShowAddLesson = () => {
    setShowAddLesson(true)
  }

  const handleCloseAddlesson=() =>{
    setShowAddLesson(false);
  }

  const handleAttendanceShow = (item: any) => {
    setShowAttendance(true)
  }

  const handleCloseAttendance = () => {
    setShowAttendance(false)
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
            md={8}
            sx={{
              boxShadow: theme.customShadows.dropdown,
              borderRadius: 2,
              mt: 2,
            }}
          >
            <DataGridPro
              rows={rows}
              columns={columns_tuition}
              density={'comfortable'}
              // checkboxSelection
              disableRowSelectionOnClick
              loading={rows.length === 0}
              initialState={{
                // ...data_tuition_fee_list.data.initialState,
                pagination: { paginationModel: { pageSize: 10 } },
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

        <EditDashboardInfoLesson open={showLesson} onClose={handleCloseLesson} />
        <NewDashboardInfoLesson open={showAddLesson} onClose={handleCloseAddlesson} />
        <AttendanceDashboardLesson open={showAttendance} onClose={handleCloseAttendance} />
      </Container>
    </>
  );
}

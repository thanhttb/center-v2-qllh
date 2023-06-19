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
  EditDashboardInfoLesson,
  NewDashboardInfoLesson,
  AttendanceDashboardLesson,
} from '../../sections/@dashboard/general/dashboard';
import { type } from 'os';
// assets

const MemoizedRow = React.memo(GridRow);

const MemoizedColumnHeaders = React.memo(GridColumnHeaders);

const rooms = [
  {
    id: 3,
    name: 'VietElite Phạm Tuấn Tài'
  }, 
  {
    id: 2,
    name: 'VietElite Trần Duy Hưng'
  },
  {
    id: 1,
    name: 'VietElite Trụ sở điều hành'
  },
  {
    id: 4,
    name: 'VietElite Đỗ Quang'
  }
]
const rows = [
  {
    id: 1,
    name: 'KHU VỰC ĐỖ QUANG - TRẦN DUY HƯNG - TRUNG HOÀ',
    center_id: 2,
    status: 1,
    created_at: '2020-04-30 00:13:25',
  },
  {
    id: 2,
    name: '302',
    center_id: 2,
    status: 1,
    created_at: '2020-04-30 00:13:25',
  },
  {
    id: 3,
    name: '302',
    center_id: 1,
    status: 1,
    created_at: '2020-04-30 00:13:25',
  },
  {
    id: 4,
    name: '302',
    center_id: 3,
    status: 1,
    created_at: '2020-04-30 00:13:25',
  },
  {
    id: 5,
    name: '302',
    center_id: 4,
    status: 1,
    created_at: '2020-04-30 00:13:25',
  },
  {
    id: 6,
    name: '302',
    center_id: 2,
    status: 1,
    created_at: '2020-04-30 00:13:25',
  },
  {
    id: 7,
    name: '302',
    center_id: 2,
    status: 1,
    created_at: '2020-04-30 00:13:25',
  },
  {
    id: 8,
    name: '302',
    center_id: 2,
    status: 1,
    created_at: '2020-04-30 00:13:25',
  },
  {
    id: 9,
    name: '302',
    center_id: 2,
    status: 1,
    created_at: '2020-04-30 00:13:25',
  },
  {
    id: 10,
    name: '302',
    center_id: 2,
    status: 1,
    created_at: '2020-04-30 00:13:25',
  },
];

// ----------------------------------------------------------------------

export default function SettingRoomsPage() {
  const { user } = useAuthContext();
  const theme = useTheme();

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

  const handleDelete = (id: any) => {
    console.log(`Xóa dòng có id ${id}`);
    // Xử lý xóa tại đây
  };

 
  const columns = [
    {
      field: 'actions',
      headerName: '',
      width: 100,
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
              <IconButton onClick={() => handleAttendanceShow(params.row)}>
                <AccessibilityNewRoundedIcon />
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
    {
      field: 'name',
      headerName: 'Tên phòng',
      width: 300,
    },
    {
      field: 'center_id',
      headerName: 'Cơ sở',
      width: 240,
      type: 'string',
      renderCell: (params: GridCellParams) => (
        <p>{rooms.map((room, index) =>  room.id == params.row.center_id ? room.name : '' )}</p>
      ),
    },
    {
      field: 'status',
      headerName: 'Tình trạng',
      width: 240,
      type: 'string',
      renderCell: (params: GridCellParams) => (
        <ul>{params.row.status == 1 ? <p>Đang hoạt động</p> : <p>Chưa hoạt động</p>}</ul>
      ),
    },
    { field: 'create_at', headerName: 'Ngày tạo', width: 200 },
  ];

  function MyToolbar() {
    return (
      <GridToolbarContainer sx={{ justifyContent: 'space-between' }}>
        <div>
          <h3>Quản Lý Cơ Sở</h3>
        </div>
        <div>
          <GridToolbarQuickFilter placeholder="Tìm kiếm" />
          <Tooltip title="Thêm mới" onClick={handleShowAddLesson}>
            <IconButton>
              <QueueIcon />
            </IconButton>
          </Tooltip>
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
    setShowAddLesson(true);
  };

  const handleCloseAddlesson = () => {
    setShowAddLesson(false);
  };

  const handleAttendanceShow = (item: any) => {
    setShowAttendance(true);
  };

  const handleCloseAttendance = () => {
    setShowAttendance(false);
  };

  return (
    <>
      <Helmet>
        <title> Trung tâm</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
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
          <DataGridPro
            rows={rows}
            columns={columns}
            density={'comfortable'}
            loading={rows.length === 0}
            rowSelection={false}
            getRowHeight={() => 'auto'}
            getEstimatedRowHeight={() => 200}
            initialState={{
              // ...data.initialState,
              pagination: {
                // ...data.initialState?.pagination,
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
        </Grid>

        <EditDashboardInfoLesson open={showLesson} onClose={handleCloseLesson} />
        <NewDashboardInfoLesson open={showAddLesson} onClose={handleCloseAddlesson} />
        <AttendanceDashboardLesson open={showAttendance} onClose={handleCloseAttendance} />
      </Container>
    </>
  );
}

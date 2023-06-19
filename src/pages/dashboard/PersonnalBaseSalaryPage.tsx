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
import BlockIcon from '@mui/icons-material/Block';
import QueueIcon from '@mui/icons-material/Queue';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

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

// ----------------------------------------------------------------------
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PersonnalBaseSalaryPage() {
  const { user } = useAuthContext();
  const dateNow = new Date();
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

  const columns = [
    {
      field: 'actions',
      headerName: '',
      width: 200,
      sortable: false,
      disableColumnFilter: true,
      disableColumnMenu: true,
      disableColumnSelector: true,
      renderCell: (params: GridCellParams) => {
        return (
          <>
            <Tooltip title="Chỉnh sửa">
              <IconButton onClick={() => handleShowLesson(params.row)}>
                <CreateIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa">
              <IconButton onClick={()=>handleAttendanceShow(params.row)}>
                <DeleteOutlineIcon />
              </IconButton>
            </Tooltip>
           
          </>
        );
      },
    },
   
    { field: 'commodity', headerName: 'Bộ môn', width: 160 },
    { field: 'traderName', headerName: 'Cấp độ', width: 200 },
    { field: 'traderEmail', headerName: 'Lương tối thiểu', width: 200 },
    { field: 'filledQuantity', headerName: 'Ngày tạo', width: 160 },
  ];



  function MyToolbar() {
    return (
      <GridToolbarContainer sx={{ justifyContent: 'space-between' }}>
        <div>
          <h3>Quản Lý Lương Tối Thiểu</h3>
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
          </Grid>
         

        <EditDashboardInfoLesson open={showLesson} onClose={handleCloseLesson} />
        <NewDashboardInfoLesson open={showAddLesson} onClose={handleCloseAddlesson} />
        <AttendanceDashboardLesson open={showAttendance} onClose={handleCloseAttendance} />
      </Container>
    </>
  );
}

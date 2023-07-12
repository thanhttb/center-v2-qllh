import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Tooltip, Slide, Dialog, makeStyles, useMediaQuery } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from "@mui/material/Box";
import {
  DataGridPro,
  GridRow,
  GridColumnHeaders,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
  GridToolbarDensitySelector,
  GridRowId,
  GridCellParams,
  GridHeaderFilterCellProps,
  gridFilterModelSelector,
  useGridSelector,
  useGridApiContext,
} from '@mui/x-data-grid-pro';
import { useNavigate } from 'react-router-dom';

import { useDemoData } from '@mui/x-data-grid-generator/';
import { IconButton } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import QueueIcon from '@mui/icons-material/Queue';
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
// assets

const MemoizedRow = React.memo(GridRow);

const MemoizedColumnHeaders = React.memo(GridColumnHeaders);

interface CustomColumnProps {
  name: string;
  email: string;
  phone: string;
}

const getDefaultFilter = (field: string) => ({ field, operator: 'is' });

function AdminFilter(props: GridHeaderFilterCellProps) {
  const { colDef } = props;
  const apiRef = useGridApiContext();
  const filterModel = useGridSelector(apiRef, gridFilterModelSelector);
  const currentFieldFilters = React.useMemo(
    () => filterModel.items?.filter(({ field }) => field === colDef.field),
    [colDef.field, filterModel.items],
  );

  const handleChange = React.useCallback(
    (event: SelectChangeEvent) => {
      if (!event.target.value) {
        if (currentFieldFilters[0]) {
          apiRef.current.deleteFilterItem(currentFieldFilters[0]);
        }
        return;
      }
      apiRef.current.upsertFilterItem({
        ...(currentFieldFilters[0] || getDefaultFilter(colDef.field)),
        value: event.target.value,
      });
    },
    [apiRef, colDef.field, currentFieldFilters],
  );

  const value = currentFieldFilters[0]?.value ?? '';
  const label = !value ? 'Filter' : 'Is admin';

  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} fullWidth>
      <InputLabel id="select-is-admin-label">{label}</InputLabel>
      <Select
        labelId="select-is-admin-label"
        id="select-is-admin"
        value={value}
        onChange={handleChange}
        label={label}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="true">True</MenuItem>
        <MenuItem value="false">False</MenuItem>
      </Select>
    </FormControl>
  );
}
// ----------------------------------------------------------------------

export default function EventsPage() {
  const theme = useTheme();
  let navigate = useNavigate();

  const [showLesson, setShowLesson] = useState(false);
  const [showAddLesson, setShowAddLesson] = useState(false);
  const [showAttendance, setShowAttendance] = useState(false);
  const [editValue, setEditValue] = useState<Object | null>();
  const [loading, setLoading] = useState(false);

  const [responsiveFullWidth, setResponsiveFullWidth] = useState(false);
  const isFullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [detailPanelExpandedRowIds, setDetailPanelExpandedRowIds] = React.useState<
  GridRowId[]
>([]);

const handleDetailPanelExpandedRowIdsChange = React.useCallback(
  (newIds: GridRowId[]) => {
    setDetailPanelExpandedRowIds(newIds);
  },
  [],
);

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
      headerName: 'Actions',
      width: 80,
      sortable: false,
      disableColumnFilter: true,
      disableColumnMenu: true,
      disableColumnSelector: true,
      renderCell: (params: GridCellParams) => {
        return (
          <>
            <Tooltip title="Sửa ca học">
              <IconButton onClick={(event) => handleShowLesson(event, params.row)}>
                <CreateIcon />
              </IconButton>
            </Tooltip>
          
          </>
        );
      },
      renderHeaderFilter: () => null
    },
    {
      field: 'desk',
      headerName: 'Lớp',
      width: 150,
    },
    { field: 'commodity', headerName: 'Cơ sở', width: 150 },
    { field: 'traderName', headerName: 'Thời gian', width: 150 },
    { field: 'traderEmail', headerName: 'Giáo viên', width: 180 },
  
  ];


  function MyToolbar() {
    return (
      <GridToolbarContainer sx={{ justifyContent: 'space-between', padding: '0 !important' }}>
        <h2>Danh Sách Sự Kiện</h2>
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

  const handleShowLesson = (event, item) => {
    event.stopPropagation();
    setLoading(true)
    console.log('edit')
    setLoading(false)
    // setShowLesson(true);
    // setEditValue(JSON.stringify(item));
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

  const handleCloseAttendance = () => {
    setShowAttendance(false);
  };

  const handleRowSelection = (id: Object) => {
     navigate(`/train/event/${id}`)
 }

  return (
    <>
      <Helmet>
        <title> Quản lý sự kiện</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={2}>
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
              localeText={{
                toolbarDensity: 'Căn chỉnh ',
              }}
              columns={columns}
              loading={data.rows.length === 0}
              onRowSelectionModelChange = {handleRowSelection}
              initialState={{
                ...data.initialState,
                pagination: {
                  ...data.initialState?.pagination,
                  paginationModel: { pageSize: 10 },
                },
                columns: {
                  columnVisibilityModel: {
                    avatar: false,
                    id: false,
                  },
                },
              }}
              components={{
                Toolbar: MyToolbar,
                Row: MemoizedRow,
                ColumnHeaders: MemoizedColumnHeaders,
              }}
              pagination
              pageSizeOptions={[5, 10, 25, 50, 100]}
              disableColumnFilter
              unstable_headerFilters
              disableColumnMenu

              getDetailPanelContent={({ row }) => (
                <Box sx={{ p: 2 }}>{`Chưa cài đặt lịch học`}</Box>
              )}
              getDetailPanelHeight={() => 50}
              detailPanelExpandedRowIds={detailPanelExpandedRowIds}
              onDetailPanelExpandedRowIdsChange={handleDetailPanelExpandedRowIdsChange}
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

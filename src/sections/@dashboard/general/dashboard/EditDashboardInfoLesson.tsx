import * as Yup from 'yup';
import { DatePicker } from '@mui/x-date-pickers';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
// form
import { useFormContext, Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {
  Box,
  Stack,
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  TextField,
  InputAdornment,
  Typography,
  Chip,
  Grid,
  Card,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// @types
import { ICheckoutBillingAddress } from '../../../../@types/product';
import { CustomFile, Upload } from '../../../../components/upload';
// assets
import { countries } from '../../../../assets/data';
import FormProvider, {
  RHFSwitch,
  RHFSelect,
  RHFEditor,
  RHFUpload,
  RHFTextField,
  RHFRadioGroup,
  RHFAutocomplete,
} from '../../../../components/hook-form';
import { useEffect, useCallback, useState } from 'react';

// ----------------------------------------------------------------------

interface FormValuesProps extends ICheckoutBillingAddress {
  address: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  startDate: string;
  endDate: string;
  typeClass: string;
  students: string[];
  cover: CustomFile | string | null;
}

type Props = {
  open: boolean;
  onClose: VoidFunction;
  // onCreateBilling: (address: ICheckoutBillingAddress) => void;
};
const STATUS_OPTIONS = ['paid', 'unpaid', 'overdue', 'draft'];
const TYPE_OPTIONS = ['Chính khóa', 'Phụ đạo', 'Phụ đạo (Online)', 'Học bù', 'Kiểm tra định kỳ'];
const TAGS_OPTION = [
  'Toy Story 3',
  'Logan',
  'Full Metal Jacket',
  'Dangal',
  'The Sting',
  '2001: A Space Odyssey',
  "Singin' in the Rain",
  'Toy Story',
  'Bicycle Thieves',
  'The Kid',
  'Inglourious Basterds',
  'Snatch',
  '3 Idiots',
];

export default function CheckoutBillingNewAddressForm({ open, onClose }: Props) {
  const [preview, setPreview] = useState(false);
  const [files, setFiles] = useState<(File | string)[]>([]);

  const NewAddressSchema = Yup.object().shape({
    receiver: Yup.string().required('Fullname is required'),
    phone: Yup.string().required('Phone is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
  });

  const defaultValues = {
    addressType: 'Home',
    receiver: '',
    phone: '',
    address: 'draft',
    classroom: '',
    city: '',
    state: '',
    country: countries[0].label,
    zipcode: '',
    isDefault: true,
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    typeClass: 'Chính khóa',
    students: [TAGS_OPTION[0]],
    cover: null,
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewAddressSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    getValues,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // useEffect(() => {
  //   if (isEdit && currentProduct) {
  //     reset(defaultValues);
  //   }
  //   if (!isEdit) {
  //     reset(defaultValues);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isEdit, currentProduct]);

  const onSubmit = async (data: FormValuesProps) => {
    try {
      // onCreateBilling({
      //   receiver: data.receiver,
      //   phone: data.phone,
      //   fullAddress: `${data.address}, ${data.city}, ${data.state}, ${data.country}, ${data.zipcode}`,
      //   addressType: data.addressType,
      //   isDefault: data.isDefault,
      // });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!open) {
      setFiles([]);
    }
  }, [open]);

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setFiles([...files, ...newFiles]);
    },
    [files]
  );

  const handleUpload = () => {
    onClose();
    console.log('ON UPLOAD');
  };

  const handleRemoveFile = (inputFile: File | string) => {
    const filtered = files.filter((file) => file !== inputFile);
    setFiles(filtered);
  };

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  return (
    <Dialog fullWidth maxWidth="xl" open={open} onClose={onClose}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle bgcolor={'green'} color={'white'}>Sửa thông tin buổi học</DialogTitle>

        <DialogContent dividers>
          <Stack spacing={2}>
            <Typography variant="body2" sx={{ color: 'text.secondary', pt: 2 }}>Vui lòng điền đầy đủ thông tin cần thiết (*)</Typography>
            <Typography variant='h5'>Thông tin buổi học</Typography>
            <Box
              mt={2}
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFSelect
                fullWidth
                size='small'
                name="address"
                label="Cơ sở"
                InputLabelProps={{ shrink: true }}
                SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
              >
                {STATUS_OPTIONS.map((option) => (
                  <MenuItem
                    key={option}
                    value={option}
                    sx={{
                      mx: 1,
                      my: 0.5,
                      borderRadius: 0.75,
                      typography: 'body2',
                      textTransform: 'capitalize',
                      '&:first-of-type': { mt: 0 },
                      '&:last-of-type': { mb: 0 },
                    }}
                  >
                    {option}
                  </MenuItem>
                ))}
              </RHFSelect>

              <RHFSelect
                fullWidth
                size='small'
                name="classromm"
                label="Phòng học"
                InputLabelProps={{ shrink: true }}
                SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
              >
                {STATUS_OPTIONS.map((option) => (
                  <MenuItem
                    key={option}
                    value={option}
                    sx={{
                      mx: 1,
                      my: 0.5,
                      borderRadius: 0.75,
                      typography: 'body2',
                      textTransform: 'capitalize',
                      '&:first-of-type': { mt: 0 },
                      '&:last-of-type': { mb: 0 },
                    }}
                  >
                    {option}
                  </MenuItem>
                ))}
              </RHFSelect>

              <Box
                rowGap={3}
                columnGap={2}
                
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                }}
              >
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field }) => (
                    <MobileDateTimePicker
                      {...field}
                      onChange={(newValue: Date | null) => field.onChange(newValue)}
                      label="Bắt đầu"
                      inputFormat="dd/MM/yyyy hh:mm a"
                      renderInput={(params) => <TextField {...params} fullWidth size='small'/>}
                    />
                  )}
                />
                

                <Controller
                  name="endDate"
                  
                  control={control}
                  render={({ field }) => (
                    <MobileDateTimePicker
                      {...field}
                      
                      onChange={(newValue: Date | null) => field.onChange(newValue)}
                      label="Kết thúc"
                      inputFormat="dd/MM/yyyy hh:mm a"
                      renderInput={(params) => <TextField {...params} fullWidth size='small'/>}
                    />
                  )}
                />
              </Box>
              <RHFSelect
                fullWidth
                size='small'
                name="typeClass"
                label="Loại buổi học"
                InputLabelProps={{ shrink: true }}
                SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
              >
                {TYPE_OPTIONS.map((option) => (
                  <MenuItem
                    key={option}
                    value={option}
                    sx={{
                      mx: 1,
                      my: 0.5,
                      borderRadius: 0.75,
                      typography: 'body2',
                      textTransform: 'capitalize',
                      '&:first-of-type': { mt: 0 },
                      '&:last-of-type': { mb: 0 },
                    }}
                  >
                    {option}
                  </MenuItem>
                ))}
              </RHFSelect>

              <RHFSelect name="country" label="Country" size='small'>
                {countries.map((option) => (
                  <option key={option.code} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>

              <RHFAutocomplete
                name="tags"
                size='small'
                multiple
                // freeSolo
                onChange={(event, newValue) => setValue('students', newValue)}
                options={TAGS_OPTION.map((option) => option)}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                  ))
                }
                renderInput={(params) => <TextField label="Tags" {...params} />}
              />

              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                }}
              >
                <RHFTextField
                size='small'
                  name="tution"
                  type="number"
                  label="Price"
                  placeholder="0"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">VND</InputAdornment>,
                  }}
                />

                <RHFTextField
                size='small'
                  name="expense"
                  type="number"
                  label="Price"
                  placeholder="0"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">VND</InputAdornment>,
                  }}
                />
              </Box>

              <RHFTextField name="note" label="Ghi chú" size='small'/>
            </Box>
          </Stack>

          <Stack spacing={2} mt={2}>
            <Typography variant='h5'>Tài liệu và Bài tập về nhà</Typography>
            <Box
              mt={2}
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField size='small' name="note" label="Nội dung bài tập về nhà" />

              <RHFTextField size='small' name="note" label="Nội dung bài học" />

              {/* <Card> */}
                <Upload
                  multiple
                  thumbnail
                  files={files}
                  onDrop={handleDrop}
                  onRemove={handleRemoveFile}
                  onRemoveAll={handleRemoveAllFiles}
                  
                  onUpload={() => console.log('ON UPLOAD')}
                  title="Kéo thả bài tập về nhà (Ảnh, PDF, Word)"
                />
              {/* </Card> */}

              <RHFEditor simple name="content" />

              <Grid item xs={6}>
              <Upload
                multiple
                thumbnail
                files={files}
                onDrop={handleDrop}
                onRemove={handleRemoveFile}
                onRemoveAll={handleRemoveAllFiles}
                onUpload={() => console.log('ON UPLOAD')}
                title="Kéo thả tài liệu buổi học (Ảnh, PDF, Word)"
              />
              </Grid>

             
            </Box>
          </Stack>
        </DialogContent>

        <DialogActions>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Tạo mới buổi học
          </LoadingButton>

          <Button color="inherit" variant="outlined" onClick={onClose}>
            Hủy bỏ
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

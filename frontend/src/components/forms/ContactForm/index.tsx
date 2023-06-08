import { useMemo, useState } from "react";
import { BaseTextFieldProps, Box, FormControl, Grid, TextField, Typography } from "@mui/material"
import { LoadingButton } from '@mui/lab';
import { useForm, } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { QueryStatus } from "../../../types/form";
import useStyles from "./styles";
import { postContactUs } from "../../../services/contactUs";
import { Trans, useTranslation } from "react-i18next";

const usFlag = '/assets/svg/Contact/flag-us.svg'

type FormFieldSingleRow = {
  key: string;
  placeholder: string;
  type?: BaseTextFieldProps['type'];
  pattern?: RegExp;
  patternError?: string;
}
type FormFieldMultipleRow = FormFieldSingleRow & { flex: number }

type FormField = FormFieldMultipleRow[] | FormFieldSingleRow


function ContactForm(): JSX.Element {
  const [tr] = useTranslation()

  const t = (key: string) => tr(`contact-us.form.${key}`)

  const FORM_FIELDS: FormField[] = [
    {
      key: 'companyName',
      placeholder: t('company-name')
    },
    {
      key: 'businessType',
      placeholder: t('business-type')
    },
    [
      {
        key: 'address',
        placeholder: t('address'),
        flex: 5,
      },
      {
        key: 'zipcode',
        placeholder: t('zipcode'),
        type: 'number',
        flex: 2
      },
    ],
    {
      key: 'name',
      placeholder: t('name')
    },
    {
      key: 'phone',
      placeholder: t('phone'),
      type: 'number',
      pattern: /^[0-9]*$/,
      patternError: "Numerical characters only"
    },
    {
      key: 'email',
      placeholder: t('email'),
      type: 'email',
      pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      patternError: "Please enter a valid email address"
    },
    {
      key: 'linkedin',
      placeholder: t('linkedin')
    },
    {
      key: 'message',
      placeholder: t('message'),
    },
  ]

  const FORM_FIELDS_FLAT = FORM_FIELDS.flat(2);
  const FORM_FIELDS_FLAT_MAP = useMemo(() => (FORM_FIELDS_FLAT.reduce((map: any, obj: any) => {
      map[obj.key] = obj;
      return map
    }, {})
  ), [FORM_FIELDS_FLAT])

  const getValidationSchemaFromField = (field: FormFieldSingleRow) => {
    let schema = Yup.string().required("This field is required.");
    if (field.pattern) {
      schema = schema.matches(field.pattern, field.patternError)
    }
    return field.key === 'linkedin' ? Yup.string() : schema
  }

  const validationSchema = Yup.object().shape(FORM_FIELDS_FLAT.reduce((prev, field) => ({
    ...prev,
    [field.key]: getValidationSchemaFromField(FORM_FIELDS_FLAT_MAP[field.key])
  }), {}))

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset
  } = useForm({
    defaultValues: FORM_FIELDS_FLAT.map(field => ({
      key: (field as FormFieldSingleRow).key,
      value: ''
    })).reduce((map: any, obj: any) => {
      map[obj.key] = obj.value;
      return map
    }, {}),
    resolver: yupResolver(validationSchema)
  });

  const { classes } = useStyles()
  const [formStatus, setFormStatus] = useState<QueryStatus>(QueryStatus.IDLE)

  const onSubmit = async (data: any) => {
    try {
      setFormStatus(QueryStatus.LOADING)
      await postContactUs({ message: Object.entries(data).map(([k, v]) => `${k}: ${v}`).join('\n\n') })
      setFormStatus(QueryStatus.SUCCESS)
      reset();
    } catch (error) {
      setFormStatus(QueryStatus.FAILED)
    } finally {
      // give user some time to read confirmation/error message
      setTimeout(() => {
        setFormStatus(QueryStatus.IDLE)
      }, 2000);
    }
  }

  const renderFormField = (field: FormField) => {

    const renderInnerField = (innerField: FormField, idx: number) => {
      if (Array.isArray(innerField)) {
        return null
      }
      return (
        <Box
          key={innerField.key}
          style={{ flex: (innerField as FormFieldMultipleRow).flex, marginLeft: idx > 0 ? '5%' : 0 }}>
          {renderFormField(innerField)}
        </Box>
      )

    }

    if (Array.isArray(field)) {
      return (
        <Box style={{ display: 'flex' }} key={field.map(inner => (inner as FormFieldSingleRow).key).join('')}>
          {field.map(renderInnerField)}
        </Box>
      )
    }
    return (
      <div key={field.key} style={{ width: "100%", }}>
        <TextField
          variant="outlined"
          placeholder={field.placeholder}
          className={classes.input}
          InputProps={{
            classes: {
              root: classes.input,
              focused: classes.focusedInput,
              notchedOutline: classes.notchedOutline,
            },
            inputMode: 'numeric',
          }}
          {...register(field.key)}
          style={{ width: "100%" }}
        />
        <div style={{ marginBottom: '2%', marginTop: '1%' }}>
          {errors && errors[field.key]?.type === 'required' && (
            <Typography color="error">
              This field is required
            </Typography>
          )}
          {errors && errors[field.key]?.type === 'matches' && (
            <Typography color="error">
              {field.patternError}
            </Typography>
          )}
        </div>
      </div>
    )
  }

  return (
    <div>
      <Typography className={classes.title}>
        {t('title')}
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <FormControl onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            {FORM_FIELDS.map(renderFormField)}
            <LoadingButton
              loading={formStatus === QueryStatus.LOADING}
              loadingPosition='center'
              className={classes.submitBtn}
              variant='contained'
              loadingIndicator="Submitting..."
              onSubmit={handleSubmit(onSubmit)}
              onClick={handleSubmit(onSubmit)}>
              <Typography>
                Submit
              </Typography>
            </LoadingButton>
            {formStatus === QueryStatus.SUCCESS && (
              <Typography className={classes.confirmationMessage}>
                {t('success-message')}
              </Typography>
            )}
            {formStatus === QueryStatus.FAILED && (
              <Typography className={classes.confirmationMessage}>
                {t('error-message')}
              </Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.contactInfo}>
          <br />
          <Typography className={classes.contactInfoTitle}>
            {tr('contact-us.offices')}
          </Typography>
          <Typography className={classes.contactInfoText}>
            <Trans i18nKey="contact-us.address" components={{ br: <br /> }} />
          </Typography>
          <Typography className={classes.contactInfoTitle}>
            {tr('contact-us.inquiries')}
          </Typography>
          <Typography className={classes.contactInfoText}>
            <img src={usFlag} />
            {' '}
            {tr('contact-us.phone')}
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}

export default ContactForm

import { useMemo, useState } from "react";
import { Done } from "@mui/icons-material";
import { FormControl, Grid, Typography, Box, TextField, Button, BaseTextFieldProps } from "@material-ui/core"
import { useForm, } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import useStyles from "./styles";

const ukFlag = '/svg/Contact/flag-uk.svg'
const usFlag = '/svg/Contact/flag-us.svg'

type FormFieldSingleRow = {
	key: string;
	placeholder: string;
	type?: BaseTextFieldProps['type'];
	pattern?: RegExp;
	patternError?: string;
}
type FormFieldMultipleRow = FormFieldSingleRow & { flex: number }

type FormField = FormFieldMultipleRow[] | FormFieldSingleRow

const FORM_FIELDS: FormField[] = [
	{
		key: 'companyName',
		placeholder: 'Your Company Name'
	},
	{
		key: 'businessType',
		placeholder: 'Nature of Business'
	},
	[
		{
			key: 'address',
			placeholder: 'Address',
			flex: 5,
		},
		{
			key: 'zipcode',
			placeholder: 'Postcode',
			type: 'number',
			flex: 2
		},
	],
	{
		key: 'name',
		placeholder: 'Contact Name'
	},
	{
		key: 'phone',
		placeholder: 'Contact Phone',
		type: 'number',
		pattern: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
		patternError: "Numerical characters only"
	},
	{
		key: 'email',
		placeholder: 'email@gmail.com',
		type: 'email',
		pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
		patternError: "Please enter a valid email address"
	},
	{
		key: 'linkedin',
		placeholder: 'Linkedin'
	},
	{
		key: 'message',
		placeholder: 'Let\s talk about your idea'
	},
]



function ContactForm(): JSX.Element {
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
		return schema
	}

	const validationSchema = Yup.object().shape(FORM_FIELDS_FLAT.reduce((prev, field) => ({ ...prev, [field.key]: getValidationSchemaFromField(FORM_FIELDS_FLAT_MAP[field.key]) }), {}))
	const {
		control,
		formState: { errors },
		register,
		handleSubmit
	} = useForm({
		defaultValues: FORM_FIELDS_FLAT.map(field => ({ key: (field as FormFieldSingleRow).key, value: '' })).reduce((map: any, obj: any) => {
			map[obj.key] = obj.value;
			return map
		}, {}),
		resolver: yupResolver(validationSchema)
	});

	const classes = useStyles()

	const [email, setEmail] = useState('')

	const onSubmit = (data: any) => console.log(data);

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
				</Box >
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
							root: classes.cssOutlinedInput,
							focused: classes.cssFocused,
							notchedOutline: classes.notchedOutline,
						},
						inputMode: 'numeric',
					}}
					{...register(field.key)}
					style={{ width: "100%" }}
				/>
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
		)
	}

	return (
		<div>
			<Typography className={classes.title}>
				Fill out the form below and BM Allies will reach out to you as soon as possible!
			</Typography>
			<Grid container>
				<Grid item xs={12} sm={6}>
					<FormControl onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
						{FORM_FIELDS.map(renderFormField)}
						<Button
							className={classes.submitBtn}
							variant='contained'
							onSubmit={handleSubmit(onSubmit)}
							onClick={handleSubmit(onSubmit)}>
							<Typography>
								Submit
							</Typography>
						</Button>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={6} className={classes.contactInfo}>
					<br />
					<Typography className={classes.contactInfoTitle}>
						Offices
					</Typography>
					<Typography className={classes.contactInfoText}>
						2500 Chandler Ave, Suite 11
						<br />
						Las Vegas, Nevada 89120
					</Typography>
					<Typography className={classes.contactInfoTitle}>
						For Quick Inquiries
					</Typography>
					<Typography className={classes.contactInfoText}>
						<img src={usFlag} />
						{' '}+1 714-651-9510
					</Typography>
					<Typography className={classes.contactInfoTitle}>
						Would you like to join our newsletter?
					</Typography>
					<Grid container>
						<Grid item xs={8}>
							<TextField
								variant="outlined"
								placeholder='Email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className={classes.input}
								InputProps={{
									classes: {
										root: classes.cssOutlinedInput,
										focused: classes.cssFocused,
										notchedOutline: classes.notchedOutline,
									},
									inputMode: 'numeric',
								}}
								style={{ width: "90%", marginBottom: 0 }}
							/>

						</Grid>
						<Grid item alignItems="stretch" style={{ display: "flex" }} xs={4}>
							<Button variant="contained" className={classes.submitEmailBtn}>
								<Done style={{ color: "#FFFFFF" }} />
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</div>
	)
}

export default ContactForm
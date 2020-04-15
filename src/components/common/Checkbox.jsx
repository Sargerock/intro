import React from "react";
import PropTypes from "prop-types";
import { Field } from "formik";

const Checkbox = ({ name, label, ...rest }) => {
	return (
		<Field name={name}>
			{({ field, form }) => (
				<label>
					<input
						type="checkbox"
						{...rest}
						checked={field.value}
						onChange={() => form.setFieldValue(name, !field.value)}
					/>
					{label}
				</label>
			)}
		</Field>
	);
};

Checkbox.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
};

export default Checkbox;

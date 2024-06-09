import * as yup from "yup";

const transactionSchema = yup.object().shape({
	name: yup.string().required("Name is required."),
	type: yup.string().required().oneOf(["income", "expense"]),
	amount: yup
		.string()
		.required("Amount is required.")
		.matches(/^[1-9]+[0-9]*$/, "Amount is invalid."),

	createdAt: yup.date().required(),
});

export default transactionSchema;

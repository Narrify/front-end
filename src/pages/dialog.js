import React from "react";
import Layout from "../components/Layout";
import withAuth from "../components/withAuth";
import DialogInput from "../components/DialogInput";


const Dialog = () => {

	return (
		<Layout>
			<DialogInput/>
		</Layout>
	);
};

export default withAuth(Dialog);

import React from "react";
import Layout from "../components/Layout";
import HistoryComponent from "../components/History";
import withAuth from "../components/withAuth";

const History = () => {

	return (
		<Layout>
			<HistoryComponent />
		</Layout>
	);
};

export default withAuth(History);

import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import useHistory from "../hooks/useHistory";
import PromptList from "../components/ResponseList";
import withAuth from "../components/withAuth";

const History = () => {
	const { responses, fetchHistory, error } = useHistory();
	const [selectedResponse, setSelectedResponse] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem("AuthToken");

		if (token) {
			fetchHistory(token);
		} else {
			console.error("No token found");
		}
	}, [fetchHistory]);

	const closeModal = () => {
		setSelectedResponse(null);
	};

	return (
		<Layout>
			<div className="max-w-2xl mx-auto p-6 my-20">
				<div>
					{error && <p className="text-red-500">{error}</p>}
					<PromptList responses={responses} onPromptClick={setSelectedResponse} />
				</div>
			</div>
		</Layout>
	);
};

export default withAuth(History);

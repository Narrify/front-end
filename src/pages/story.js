import React from "react";
import Layout from "../components/Layout";
import withAuth from "../components/withAuth";
import StoryInput from "../components/StoryInput";

const Story = () => {

	return (
		<Layout>
			<StoryInput/>
		</Layout>
	);
};

export default withAuth(Story);

import React from "react";

import Layout from "../components/Layout";
import { Link } from "gatsby";

const Index = () => {
	return (
		<Layout>
			<div className="flex items-center justify-center h-screen bg-gray-100">
				<div className="space-x-4">
					<Link to="/story">
						<button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
							Story Generator
						</button>
					</Link>
					<Link to="/dialog2">
						<button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300">
							Dialog Generator
						</button>
					</Link>
				</div>
			</div>
		</Layout>
	);
};

export default Index;
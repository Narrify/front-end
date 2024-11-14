import * as Sentry from "@sentry/gatsby";
import React from "react";
import Layout from "../components/Layout";
import DashboardComponent from "../components/Dashboard";

const Index = () => {
  return (
    <Layout>
      <DashboardComponent />
    </Layout>
  );
};

export default Index;

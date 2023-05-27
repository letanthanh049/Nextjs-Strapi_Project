import React, { Component } from "react";
import LayoutAdmin from "../components/admin/Layout/layoutadmin";
import { Content } from "../components/admin/content";
export default function Home() {
    return (
        <LayoutAdmin>
            <Content />
        </LayoutAdmin>
    );
  }

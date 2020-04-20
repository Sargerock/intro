import React from "react";

import PostsList from "./PostsList";
import withProfileLayout from "../hoc/withProfileLayout";

const Notifications = () => <PostsList/>;

export default withProfileLayout(Notifications);

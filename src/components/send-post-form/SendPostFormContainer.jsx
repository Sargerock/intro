import { connect } from "react-redux";

import SendPostForm from "./SendPostForm";
import { createPost } from "../../store/posts/posts-thunks";

export default connect(null, createPost)(SendPostForm);

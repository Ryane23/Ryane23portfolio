import { Link } from "react-router-dom";
import RyanMark from "@/components/RyanMark";

const EditorialNotFound = () => <div className="not-found section-pad"><RyanMark className="not-found-mark" /><span className="meta-label">ERROR / 404</span><h1>PAGE NOT FOUND.</h1><p>The requested room does not exist in this archive.</p><Link className="solid-action" to="/en">RETURN HOME →</Link></div>;

export default EditorialNotFound;

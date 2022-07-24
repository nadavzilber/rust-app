import React from "react";
import { Link, useMatch, useResolvedPath} from "react-router-dom";
import '../style.css'

const CustomLink = ({children, to, ...props}) => {
    const resolved = useResolvedPath(to);
    const match = useMatch({ path: resolved.pathname, end: true });
    const className = match ? 'active-link' : ''

    return (
        <div>
            <Link className={className} to={to} {...props}>
                {children}
            </Link>
        </div>
    )
}

export default CustomLink
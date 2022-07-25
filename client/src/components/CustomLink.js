import React from "react";
import { Link, useMatch, useResolvedPath} from "react-router-dom";
import '../style.css'

const CustomLink = ({children, to, isProtected, ...props}) => {
    const resolved = useResolvedPath(to);
    const match = useMatch({ path: resolved.pathname, end: true });
    let className = match ? 'active-link' : ''
    if (isProtected) className += ' protected'

    return (
        <div>
            <Link className={className} to={to} {...props}>
                {children}
            </Link>
        </div>
    )
}

export default CustomLink
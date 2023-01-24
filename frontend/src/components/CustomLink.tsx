import { Link, useMatch, useResolvedPath } from 'react-router-dom';

type CustomLink = {
  to: string;
  children: JSX.Element;
  style: string;
  isActiveStyle: string;
};

function CustomLink({ to, children, style, isActiveStyle }: CustomLink) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? isActiveStyle : ''}>
      <Link to={to} className={style}>
        {children}
      </Link>
    </li>
  );
}

export default CustomLink;

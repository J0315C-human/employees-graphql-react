import * as React from 'react';
import { withRouter, RouteComponentProps, LinkProps, Link } from 'react-router-dom';

type CustomLinkProps = RouteComponentProps<{}, any, { prevPath: string }> & LinkProps;

const CustomLink: React.FunctionComponent<CustomLinkProps> = props => {
  const to = { pathname: props.to, state: { prevPath: props.location.pathname } } as LinkProps['to'];
  return (
    <Link to={to} style={props.style} className={props.className}>
      {props.children}
    </Link>
  );
};

export default withRouter(CustomLink);

import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export default class RouteEmployee extends React.Component<RouteComponentProps<{ id: string }>> {
  public render() {
    const id = this.props.match.params.id;
    return <div>EMPLOYEE # {id}</div>;
  }
}

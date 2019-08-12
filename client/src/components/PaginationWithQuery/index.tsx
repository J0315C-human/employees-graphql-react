import * as React from 'react';
import { Query } from 'react-apollo';
import ReactPaginate from 'react-paginate';

interface PaginationWithQueryProps {
  query: object;
  search: string;
  limitPerPage: number;
  resultKey: string;
  onPageChange: (curPage: any) => void;
}

/** TODO: is there an elegant way to make this more typesafe? */
const PaginationWithQuery: React.FunctionComponent<PaginationWithQueryProps> = props => {
  return (
    <Query<any> query={props.query} variables={{ limitPerPage: props.limitPerPage, search: props.search }}>
      {({ data }) => {
        if (data && data[props.resultKey]) {
          return (
            <ReactPaginate
              pageCount={data[props.resultKey]}
              pageRangeDisplayed={4}
              marginPagesDisplayed={2}
              initialPage={0}
              onPageChange={props.onPageChange}
            />
          );
        } else return null;
      }}
    </Query>
  );
};

export default PaginationWithQuery;

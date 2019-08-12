import * as React from 'react';
import { Query } from 'react-apollo';
import ReactPaginate from 'react-paginate';
import { makeStyles } from '@material-ui/styles';
import { Theme, createStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import styleProps from '../../constants/styleProps';

interface PaginationWithQueryProps {
  query: object;
  status?: string;
  search: string;
  limitPerPage: number;
  resultKey: string;
  onPageChange: (curPage: any) => void;
}

const useStyles = makeStyles((theme: Theme) => {
  const pageStyle = {
    padding: theme.spacing(1),
    listStyleType: 'none',
    color: theme.palette.primary.main,
    borderRadius: 5,
    '&:hover': {
      cursor: 'pointer',
    },
  };
  return createStyles({
    container: {
      ...styleProps.rowWrapCentered,
      padding: 0,
    },
    page: {
      ...pageStyle,
    },
    nav: {
      ...pageStyle,
    },
    disabled: {
      opacity: 0.5,
      pointerEvents: 'none',
    },
    current: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      pointerEvents: 'none',
    },
  });
});

/** TODO: is there an elegant way to make this more typesafe? */
const PaginationWithQuery: React.FunctionComponent<PaginationWithQueryProps> = props => {
  const styles = useStyles();
  return (
    <Query<any>
      query={props.query}
      variables={{ limitPerPage: props.limitPerPage, search: props.search, status: props.status }}
    >
      {({ data }) => {
        if (data && data[props.resultKey]) {
          return (
            <Typography component="span">
              <ReactPaginate
                key={data[props.resultKey]}
                pageCount={data[props.resultKey]}
                pageRangeDisplayed={4}
                marginPagesDisplayed={2}
                initialPage={0}
                onPageChange={props.onPageChange}
                containerClassName={styles.container}
                pageClassName={styles.page}
                breakClassName={styles.page}
                previousClassName={styles.nav}
                nextClassName={styles.nav}
                disabledClassName={styles.disabled}
                activeClassName={styles.current}
              />
            </Typography>
          );
        } else return null;
      }}
    </Query>
  );
};

export default PaginationWithQuery;

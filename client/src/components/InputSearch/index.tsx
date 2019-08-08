import * as React from 'react';
import { TextField, InputAdornment, makeStyles, Theme, createStyles, Grid } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

interface InputSearchProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
  }),
);

const InputSearch: React.FunctionComponent<InputSearchProps> = props => {
  const styles = useStyles();
  return (
    <div className={styles.margin}>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>
          <SearchIcon />
        </Grid>
        <Grid item>
          <TextField label="Search" onChange={props.onChange} />
        </Grid>
      </Grid>
    </div>
  );
};

export default InputSearch;

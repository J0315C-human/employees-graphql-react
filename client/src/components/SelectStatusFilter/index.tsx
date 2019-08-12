import * as React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

interface SelectStatusFilterProps {
  onChange: (e: React.ChangeEvent<any>) => void;
  value: string;
}

const SelectStatusFilter: React.FunctionComponent<SelectStatusFilterProps> = props => {
  return (
    <FormControl style={{ width: 170 }}>
      <InputLabel htmlFor="filter">Filter By Status</InputLabel>
      <Select value={props.value} onChange={props.onChange}>
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="flagged">Flagged</MenuItem>
        <MenuItem value="resolved">Resolved</MenuItem>
        <MenuItem value="unresolved">Unresolved</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectStatusFilter;

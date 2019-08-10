import * as React from 'react';
import { Call } from '../../typings/api';
import { Grid, Container } from '@material-ui/core';
import styleProps from '../../constants/styleProps';
import TitleSubsection from '../TitleSubsection';
import { getCallDetails } from './helpers';
import InfoDetail from '../InfoDetail';
import TranscriptMessage from '../TranscriptMessage';

interface CallDetailsProps {
  call: Call;
}

const CallDetails: React.FunctionComponent<CallDetailsProps> = props => {
  const { call } = props;
  const { length, dateTime } = getCallDetails(call);
  return (
    <div style={styleProps.rowWrapCentered}>
      <TitleSubsection>Details</TitleSubsection>
      <Grid container spacing={2} justify="center">
        <InfoDetail title="caller" value={call.caller} />
        <InfoDetail title="employee" value={call.employee} />
        <InfoDetail title="date/time" value={dateTime} />
        <InfoDetail title="duration" value={length} />
        <InfoDetail title="status" value={call.status} />
      </Grid>
      <TitleSubsection>Call Transcript</TitleSubsection>
      <Container>
        {call.transcript.map((msg, i) => (
          <TranscriptMessage speaker={msg.speaker} message={msg.message} isAgent={msg.speaker !== call.caller} />
        ))}
      </Container>
    </div>
  );
};

export default CallDetails;

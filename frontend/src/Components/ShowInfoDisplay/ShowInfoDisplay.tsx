import * as React from "react";
import { Stack } from "react-bootstrap";
import { SeriesInfo } from "../../Classes/ShowInfo";

export interface IShowInfoProps {
  series: SeriesInfo;
}

export interface IShowInfoState {}

export default class ShowInfo extends React.Component<
  IShowInfoProps,
  IShowInfoState
> {
  constructor(props: IShowInfoProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return this.props.series !== null ? (
      <div>
        <Stack>
          <div>Total seasons: {this.props.series.number_of_seasons}</div>
          <div>Total episodes: {this.props.series.number_of_episodes}</div>
        </Stack>
      </div>
    ) : (
      <div></div>
    );
  }
}

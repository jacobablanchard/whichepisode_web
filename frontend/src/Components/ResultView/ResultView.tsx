import * as React from "react";
import { TVSearchResult } from "../../Classes/TVSearchResult";

export interface IResultViewProps {
  show: TVSearchResult;
}

export interface IResultViewState {}

export default class ResultView extends React.Component<
  IResultViewProps,
  IResultViewState
> {
  constructor(props: IResultViewProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return <div>{this.props.show.name}</div>;
  }
}

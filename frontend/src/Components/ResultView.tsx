import * as React from "react";

export interface IResultViewProps {
  showID?: number;
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
    return <div></div>;
  }
}

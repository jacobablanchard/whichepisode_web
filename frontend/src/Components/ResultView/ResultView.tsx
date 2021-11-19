import * as React from "react";
import { TVSearchResult } from "../../Classes/TVSearchResult";
import "./ResultView.css";

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
    return (
      <div className="resultView">
        <h1 className="movieTitle">{this.props.show.name}</h1>
      </div>
    );
  }
}

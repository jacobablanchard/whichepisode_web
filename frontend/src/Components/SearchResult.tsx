import * as React from "react";
import { Stack } from "react-bootstrap";
import { TVSearchResult } from "../Classes/TVSearchResult";

export interface ISearchResultProps {
  data: TVSearchResult;
}

export interface ISearchResultState {}

export default class SearchResult extends React.Component<
  ISearchResultProps,
  ISearchResultState
> {
  constructor(props: ISearchResultProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return <div>{this.props.data.name}</div>;
  }
}

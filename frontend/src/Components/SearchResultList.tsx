import * as React from "react";
import SearchResult from "./SearchResult";
import { TVSearchResponse } from "../Classes/TVSearchResponse";

export interface ISearchResultListProps {
  searchResponse: TVSearchResponse;
}

export interface ISearchResultListState {}

export default class SearchResultList extends React.Component<
  ISearchResultListProps,
  ISearchResultListState
> {
  constructor(props: ISearchResultListProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return this.props.searchResponse.results.map((object, i) => (
      <SearchResult data={object} key={i} />
    ));
  }
}

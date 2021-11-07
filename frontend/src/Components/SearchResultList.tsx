import * as React from "react";
import SearchResult from "./SearchResult/SearchResult";
import { TVSearchResponse } from "../Classes/TVSearchResponse";
import { TVSearchResult } from "../Classes/TVSearchResult";

export interface ISearchResultListProps {
  searchResponse: TVSearchResponse;
  newShowSelectedCallback: (index: number, data: TVSearchResult) => void;
  selectedShowIndex: number | null;
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

  public onShowClicked(selectedKey: number, selectedResult: TVSearchResult) {
    console.log(`key ${selectedKey} was clicked`);
    if (
      this.props.selectedShowIndex === null ||
      this.props.selectedShowIndex !== selectedKey
    ) {
      this.props.newShowSelectedCallback(selectedKey, selectedResult);
    }
  }

  public render() {
    return this.props.searchResponse.results.map((object, i) => (
      <SearchResult
        data={object}
        key={i}
        myKey={i}
        isSelected={
          this.props.selectedShowIndex !== null &&
          this.props.selectedShowIndex === i
        }
        showSelectedCallback={(a: number, b: TVSearchResult) =>
          this.onShowClicked(a, b)
        }
      />
    ));
  }
}

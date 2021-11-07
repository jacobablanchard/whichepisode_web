import * as React from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import axios from "axios";
import { TVSearchResponse } from "../Classes/TVSearchResponse";
import SearchResultList from "./SearchResultList";
import { TVSearchResult } from "../Classes/TVSearchResult";

async function getSearchResult(searchParam: string): Promise<TVSearchResponse> {
  const url =
    process.env.NODE_ENV === "development"
      ? `http://localhost:8000/api/search/${searchParam}`
      : `http://localhost:8000/api/search/${searchParam}`;
  const { data } = await axios.get<TVSearchResponse>(encodeURI(url));
  return data;
}

export interface ISearchContainerProps {
  newShowSelectedCallback: (a: TVSearchResult) => void;
}

export interface ISearchContainerState {
  searchString: string;
  searchResponse: TVSearchResponse;
  selectedIndex: number | null;
}

export default class SearchContainer extends React.Component<
  ISearchContainerProps,
  ISearchContainerState
> {
  constructor(props: ISearchContainerProps) {
    super(props);

    this.state = {
      searchString: "",
      searchResponse: new TVSearchResponse(),
      selectedIndex: null,
    };
  }

  private async onSearchStringChanged(newString: string) {
    const data = await getSearchResult(newString);
    this.setState({
      searchResponse: data,
      searchString: newString,
      selectedIndex: null,
    });
  }

  private onNewShowSelected(newIndex: number, newData: TVSearchResult) {
    this.setState({
      selectedIndex: newIndex,
    });
  }

  public render() {
    return (
      <div className="searchcontainer">
        <InputGroup className="mb-3">
          <FormControl
            placeholder="TV Show Name"
            aria-label="TV Show Name"
            aria-describedby="basic-addon2"
            onChange={(e) => {
              this.onSearchStringChanged(e.target.value);
            }}
          />
          <Button variant="outline-secondary" id="button-addon2">
            Search
          </Button>
        </InputGroup>
        <SearchResultList
          searchResponse={this.state.searchResponse}
          newShowSelectedCallback={(index: number, data: TVSearchResult) =>
            this.onNewShowSelected(index, data)
          }
          selectedShowIndex={this.state.selectedIndex}
        />
      </div>
    );
  }
}

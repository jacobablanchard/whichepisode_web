import * as React from "react";
import { Stack } from "react-bootstrap";
import { TVSearchResult } from "../../Classes/TVSearchResult";
import { ResolvedURL } from "../../Classes/ResolvedURL";
import PosternotFound from "./PosterNotFound.png";
import axios from "axios";

import "./SearchResult.css";
import globals from "../../globals";

export interface ISearchResultProps {
  data: TVSearchResult;
  myKey: number;
  isSelected: boolean;
  showSelectedCallback: (
    myKey: number,
    searchResultData: TVSearchResult
  ) => void;
}

export interface ISearchResultState {
  posterURL: string;
}

export default class SearchResult extends React.Component<
  ISearchResultProps,
  ISearchResultState
> {
  constructor(props: ISearchResultProps) {
    super(props);

    this.state = {
      posterURL: "",
    };
  }

  private async updateImageURL() {
    if (this.props.data.poster_path === null) {
      return;
    }
    const url =
      globals.backendServer +
      `/lookup/poster_url${this.props.data.poster_path}`;

    const { data } = await axios.get<ResolvedURL>(encodeURI(url));
    this.setState({
      posterURL: data.resolvedURL,
    });
  }

  async componentDidUpdate(prevProps: ISearchResultProps) {
    if (prevProps.data.poster_path !== this.props.data.poster_path)
      this.updateImageURL();
  }

  async componentDidMount() {
    this.updateImageURL();
  }

  onClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    console.log("click happened");
    this.props.showSelectedCallback(this.props.myKey, this.props.data);
  };

  public render() {
    const myData = this.props.data;
    return (
      <div onClick={this.onClick}>
        <Stack
          direction="horizontal"
          className={this.props.isSelected ? "SearchResultSelected" : ""}
        >
          <img
            src={
              this.state.posterURL === ""
                ? PosternotFound
                : this.state.posterURL
            }
            alt="TV Show Poster"
            className="posterImage"
          />
          <div>{myData.name}</div>
        </Stack>
      </div>
    );
  }
}

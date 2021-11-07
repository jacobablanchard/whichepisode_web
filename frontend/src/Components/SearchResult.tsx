import * as React from "react";
import { Stack } from "react-bootstrap";
import { TVSearchResult } from "../Classes/TVSearchResult";
import { ResolvedURL } from "../Classes/ResolvedURL";
import axios from "axios";

export interface ISearchResultProps {
  data: TVSearchResult;
  key: number;
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
      process.env.NODE_ENV === "development"
        ? `http://localhost:8000/api/lookup/poster_url${this.props.data.poster_path}`
        : `http://localhost:8000/api/lookup/poster_url${this.props.data.poster_path}`;
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

  public render() {
    const myData = this.props.data;
    return (
      <div>
        <Stack direction="horizontal">
          <img src={this.state.posterURL} alt="TV Show Poster" />
          <div>{myData.name}</div>
        </Stack>
      </div>
    );
  }
}

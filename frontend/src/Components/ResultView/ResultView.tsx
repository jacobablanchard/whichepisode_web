import * as React from "react";
import { TVSearchResult } from "../../Classes/TVSearchResult";
import { ResolvedURL } from "../../Classes/ResolvedURL";
import axios from "axios";
import globals from "../../globals";
import "./ResultView.css";

export interface IResultViewProps {
  show: TVSearchResult;
}

export interface IResultViewState {
  bannerURL: string | null;
}

export default class ResultView extends React.Component<
  IResultViewProps,
  IResultViewState
> {
  constructor(props: IResultViewProps) {
    super(props);

    this.state = {
      bannerURL: null,
    };
  }

  async componentDidMount() {
    //this.updateImageURL();
  }

  async componentDidUpdate(prevProps: IResultViewProps) {
    if (prevProps.show.backdrop_path !== this.props.show.backdrop_path)
      this.updateImageURL();
  }

  private async updateImageURL() {
    if (this.props.show.backdrop_path === null) {
      return;
    }
    const url =
      globals.backendServer +
      `/lookup/backdrop_url${this.props.show.backdrop_path}`;

    const { data } = await axios.get<ResolvedURL>(encodeURI(url));
    this.setState({
      bannerURL: data.resolvedURL,
    });
  }

  public render() {
    return (
      <div className="resultView">
        <h1 className="movieTitle">{this.props.show.name}</h1>
        <img
          src={this.state.bannerURL === null ? "" : this.state.bannerURL}
          alt="The banner image of the show"
          className="backdropImage"
        ></img>
      </div>
    );
  }
}

import * as React from "react";
import { ResolvedURL } from "../../Classes/ResolvedURL";
import axios from "axios";
import globals from "../../globals";
import "./ResultView.css";
import ShowInfoDisplay from "../ShowInfoDisplay/ShowInfoDisplay";
import { SeriesInfo } from "../../Classes/SeriesInfo";
import { Button } from "react-bootstrap";

export interface IResultViewProps {
  showID: number;
}

export interface IResultViewState {
  bannerURL: string | null;
  the_show: SeriesInfo | null;
}

export default class ResultView extends React.Component<
  IResultViewProps,
  IResultViewState
> {
  constructor(props: IResultViewProps) {
    super(props);

    this.state = {
      bannerURL: null,
      the_show: null,
    };
  }

  async componentDidMount() {
    await this.get_new_seriesInfo();
    await this.updateImageURL();
  }

  async componentDidUpdate(prevProps: IResultViewProps) {
    if (prevProps.showID !== this.props.showID) {
      await this.get_new_seriesInfo();
      await this.updateImageURL();
    }
  }

  private async updateImageURL() {
    if (this.state.the_show?.backdrop_path === "") {
      return;
    }
    const url =
      globals.backendServer +
      `/lookup/backdrop_url${this.state.the_show?.backdrop_path}`;

    const { data } = await axios.get<ResolvedURL>(encodeURI(url));
    this.setState({
      bannerURL: data.resolvedURL,
    });
  }

  private async get_new_seriesInfo() {
    const url =
      globals.backendServer + `/lookup/tv_series_info/${this.props.showID}`;

    const { data } = await axios.get<SeriesInfo>(encodeURI(url));
    this.setState({
      the_show: data,
    });
  }

  private onGenerateButtonClicked() {
    const numElements = this.state.the_show?.seasons?.length;
    if (numElements === undefined) return;
    const random = Math.floor(Math.random() * numElements);
  }

  public render() {
    return this.state.the_show !== null ? (
      <div className="resultView">
        <h1 className="movieTitle">{this.state.the_show.name}</h1>
        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt*/}
        <img
          src={this.state.bannerURL === null ? "" : this.state.bannerURL}
          alt="The banner image of the show"
          className="backdropImage"
        ></img>
        <ShowInfoDisplay series={this.state.the_show} />
        <div className="d-grid gap-2">
          <Button
            variant="primary"
            size="lg"
            onClick={() => this.onGenerateButtonClicked}
          >
            Get me an episode!
          </Button>
        </div>
      </div>
    ) : (
      <div />
    );
  }
}

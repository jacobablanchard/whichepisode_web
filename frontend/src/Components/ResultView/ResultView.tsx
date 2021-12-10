import * as React from "react";
import { ResolvedURL } from "../../Classes/ResolvedURL";
import axios from "axios";
import globals from "../../globals";
import "./ResultView.css";
import ShowInfoDisplay from "../ShowInfoDisplay/ShowInfoDisplay";
import { SeriesInfo } from "../../Classes/SeriesInfo";
import { Button } from "react-bootstrap";
import { Season } from "../../Classes/Season";
import { Episode } from "../../Classes/Episode";
import EpisodeView from "../EpisodeView/EpisodeView";

export interface IResultViewProps {
  showID: number;
}

export interface IResultViewState {
  bannerURL: string | null;
  the_show: SeriesInfo | null;
  generatedEpisode: Episode | null;
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
      generatedEpisode: null,
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
      this.setState({
        generatedEpisode: null,
      });
    }
  }

  private async updateImageURL() {
    if (
      this.state.the_show?.backdrop_path === "" ||
      this.state.the_show?.backdrop_path === null
    ) {
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

  private async onGenerateButtonClicked() {
    if (this.state.the_show === null) return;
    const numSeasons = this.state.the_show?.seasons?.length;
    if (numSeasons === undefined) return;
    const chosen_season = Math.floor(Math.random() * numSeasons);

    const url =
      globals.backendServer +
      `/lookup/tv_season_info/${this.props.showID}/season/${this.state.the_show.seasons[chosen_season].season_number}`;
    const { data } = await axios.get<Season>(encodeURI(url));

    if (data === undefined || data === null) return;
    if (data.episodes === undefined || data.episodes === null) return;
    const numEpisodes = data.episodes?.length;
    if (numEpisodes === undefined) return;
    const chosen_episode_index = Math.floor(Math.random() * numEpisodes);
    this.setState({
      generatedEpisode: data.episodes[chosen_episode_index],
    });
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
            onClick={() => this.onGenerateButtonClicked()}
          >
            Get me an episode!
          </Button>
        </div>
        <EpisodeView episode={this.state.generatedEpisode} />
      </div>
    ) : (
      <div />
    );
  }
}

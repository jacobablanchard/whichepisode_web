import * as React from "react";
import NoImage from "./NoImage.png";
import { Episode } from "../../Classes/Episode";
import globals from "../../globals";
import axios from "axios";
import { ResolvedURL } from "../../Classes/ResolvedURL";
import "./EpisodeView.css";

export interface IEpisodeViewProps {
  episode: Episode | null;
}

export interface IEpisodeViewState {
  imageURL: string | null;
}

export default class EpisodeView extends React.Component<
  IEpisodeViewProps,
  IEpisodeViewState
> {
  constructor(props: IEpisodeViewProps) {
    super(props);

    this.state = {
      imageURL: null,
    };
  }

  async componentDidMount() {
    await this.updateImageURL();
  }

  async componentDidUpdate(prevProps: IEpisodeViewProps) {
    if (prevProps.episode !== this.props.episode) {
      await this.updateImageURL();
    }
  }

  private async updateImageURL() {
    if (this.props.episode === null) return;

    const url =
      globals.backendServer +
      `/lookup/still_url${this.props.episode.still_path}`;

    const { data } = await axios.get<ResolvedURL>(encodeURI(url));
    this.setState({
      imageURL: data.resolvedURL,
    });
  }

  public render() {
    return this.props.episode === null ? (
      <div></div>
    ) : (
      <div>
        <div>{this.props.episode.name}</div>
        <div>
          {"Season " +
            this.props.episode.season_number +
            ", Episode " +
            this.props.episode.episode_number}
        </div>
        <img
          src={this.state.imageURL === null ? NoImage : this.state.imageURL}
          className="episodeImage"
        />
        <div>Summary:</div>
        <div>{this.props.episode.overview}</div>
      </div>
    );
  }
}

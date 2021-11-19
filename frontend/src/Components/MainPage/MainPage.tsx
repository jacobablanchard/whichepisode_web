import * as React from "react";
import ResultView from "../ResultView/ResultView";
import SearchContainer from "../SearchContainer/SearchContainer";
import { Stack } from "react-bootstrap";
import { TVSearchResult } from "../../Classes/TVSearchResult";
import "./MainPage.css";

export interface IMainPageProps {}

export interface IMainPageState {
  selectedShow: TVSearchResult;
}

export default class MainPage extends React.Component<
  IMainPageProps,
  IMainPageState
> {
  constructor(props: IMainPageProps) {
    super(props);

    this.state = {
      selectedShow: new TVSearchResult(),
    };
  }

  private onNewShowSelected(show: TVSearchResult) {
    this.setState({
      selectedShow: show,
    });
  }

  public render() {
    return (
      <div>
        <div>Which Episode?</div>
        <div>
          Allows you to pick a random episode from a show of your choice
        </div>
        <Stack direction="horizontal">
          <div className="searchContainer">
            <SearchContainer
              newShowSelectedCallback={(show) => this.onNewShowSelected(show)}
            ></SearchContainer>
          </div>
          <div className="border-right" />
          <div className="resultView">
            <ResultView show={this.state.selectedShow}></ResultView>
          </div>
        </Stack>
      </div>
    );
  }
}

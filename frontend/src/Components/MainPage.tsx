import * as React from "react";
import ResultView from "./ResultView";
import SearchContainer from "./SearchContainer";
import { Stack } from "react-bootstrap";
import { TVSearchResult } from "../Classes/TVSearchResult";

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
          <SearchContainer
            newShowSelectedCallback={this.onNewShowSelected}
          ></SearchContainer>
          <div className="border-right" />
          <ResultView show={this.state.selectedShow}></ResultView>
        </Stack>
      </div>
    );
  }
}

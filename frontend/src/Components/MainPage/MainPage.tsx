import * as React from "react";
import ResultView from "../ResultView/ResultView";
import SearchContainer from "../SearchContainer/SearchContainer";
import { Container, Row, Col } from "react-bootstrap";
import { TVSearchResult } from "../../Classes/TVSearchResult";
import "./MainPage.css";

export interface IMainPageProps {}

export interface IMainPageState {
  selectedShow: TVSearchResult | null;
}

export default class MainPage extends React.Component<
  IMainPageProps,
  IMainPageState
> {
  constructor(props: IMainPageProps) {
    super(props);

    this.state = {
      selectedShow: null,
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
        <Container fluid>
          <Row>
            <Col
              {...(this.state.selectedShow !== null
                ? { xs: "3", lg: "3" } // Only apply column size limiting here if there's no show selected
                : {})}
            >
              <div className="searchContainer">
                <SearchContainer
                  newShowSelectedCallback={(show) =>
                    this.onNewShowSelected(show)
                  }
                ></SearchContainer>
              </div>
            </Col>
            {this.state.selectedShow !== null ? (
              <Col>
                <div className="resultView">
                  <ResultView showID={this.state.selectedShow.id}></ResultView>
                </div>
              </Col>
            ) : (
              <div />
            )}
          </Row>
        </Container>
      </div>
    );
  }
}

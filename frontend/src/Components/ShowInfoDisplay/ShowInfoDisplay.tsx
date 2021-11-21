import * as React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { SeriesInfo } from "../../Classes/SeriesInfo";

export interface IShowInfoDisplayProps {
  series: SeriesInfo;
}

export interface IShowInfoDisplayState {}

export default class ShowInfoDisplay extends React.Component<
  IShowInfoDisplayProps,
  IShowInfoDisplayState
> {
  constructor(props: IShowInfoDisplayProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return this.props.series !== null ? (
      <div>
        <Container>
          <Row>
            <Col>
              <div>Total seasons: {this.props.series.number_of_seasons}</div>
              <div>Total episodes: {this.props.series.number_of_episodes}</div>
            </Col>
            <Col>
              <div>
                First Aired:
                {" " +
                  new Date(this.props.series.first_air_date).toLocaleDateString(
                    "en-US",
                    { month: "long", day: "numeric", year: "numeric" }
                  )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    ) : (
      <div></div>
    );
  }
}

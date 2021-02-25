import React, { Component } from "react";
import TopNav from "./TopNav";
import Ovals from "./Ovals";
import NetworkManager from "./NetworkManager";
import "./ArtistDetails.css";
import AlbumsList from "./AlbumsList";

import ArtistImage from "./images/300x300.gif";
import PlaceholderImage from "./images/thumbPlaceholder.jpg";
import AlarmIcon from "./images/ic_alarm_on_48px.svg";
import SortIcon from "./images/ic_sort_24px.svg";
import LinkIcon from "./images/ic_link_24px.svg";
import HouseIcon from "./images/ic_store_mall_directory_48px.svg";

export default class ArtistDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoaded: false,
    };
  }
  getArtistData() {
    const networkManager = new NetworkManager();
    networkManager.getArtistData(this.props.artistId).then((json) => {
      if (json.artists === null) {
        return;
      }
      this.setState({
        data: json,
        isLoaded: true,
      });
    });
  }
  componentDidMount() {
    this.getArtistData();
  }
  render() {
    return (
      <div className="grid">
        <Ovals />
        <TopNav />
        <div>
          <div>
            <div className="entry-information">
              <div className="entry-information-name">
                <h1>
                  {this.state.isLoaded
                    ? this.state.data.artists[0].strArtist
                    : "Fetching..."}
                </h1>
              </div>

              <div className="entry-information-image">
                {this.state.isLoaded ? (
                  <img
                    className="entry-information-image"
                    src={
                      this.state.data.artists[0].strArtistThumb === ""
                        ? { PlaceholderImage }
                        : this.state.data.artists[0].strArtistThumb
                    }
                    alt="artist"
                  />
                ) : (
                  <img
                    className="entry-information-image"
                    src={ArtistImage}
                    alt="artist"
                  />
                )}
              </div>

              <div className="entry-information-details">
                <div className="entry-information-row">
                  <img
                    src={AlarmIcon}
                    className="entry-information-row-icon alarm"
                    alt="Alarm Icon"
                  />

                  <div className="entry-information-row-text">
                    <h4>Year formed </h4>
                    <small>Official year of artist activity</small>
                  </div>
                  <div className="entry-information-row-data">
                    <h4 className="secondary">
                      {this.state.isLoaded
                        ? this.state.data.artists[0].intFormedYear
                        : "Fetching..."}
                    </h4>
                  </div>
                </div>

                <div className="entry-information-row">
                  <img
                    src={HouseIcon}
                    className="entry-information-row-icon country"
                    alt="House Icon"
                  />

                  <div className="entry-information-row-text">
                    <h4>City/Country</h4>
                    <small>Origins of the artist</small>
                  </div>
                  <div className="entry-information-row-data">
                    <h4 className="secondary">
                      {this.state.isLoaded
                        ? this.state.data.artists[0].strCountry
                        : "Fetching..."}
                    </h4>
                  </div>
                </div>

                <div className="entry-information-row">
                  <img
                    src={SortIcon}
                    className="entry-information-row-icon genre"
                    alt="Sort Icon"
                  />

                  <div className="entry-information-row-text">
                    <h4>Genre</h4>
                    <small>Artist style</small>
                  </div>
                  <div className="entry-information-row-data">
                    <h4 className="secondary">
                      {this.state.isLoaded
                        ? this.state.data.artists[0].strGenre === ""
                          ? "N/A"
                          : this.state.data.artists[0].strGenre
                        : "Fetching"}
                    </h4>
                  </div>
                </div>

                <div className="entry-information-row">
                  <img
                    src={LinkIcon}
                    className="entry-information-row-icon website"
                    alt="Link Icon"
                  />

                  <div className="entry-information-row-text">
                    <h4>Website</h4>
                    <small>Official website</small>
                  </div>
                  <div className="entry-information-row-data">
                    <h4 className="secondary">
                      {this.state.isLoaded
                        ? this.state.data.artists[0].strWebsite === ""
                          ? "N/A"
                          : this.state.data.artists[0].strWebsite
                        : "Fetching..."}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <AlbumsList featuredArtistId={this.props.artistId} />
            <p className="about-entry">
              <strong>About the artist</strong>
            </p>
            <p className="entry-description">
              {this.state.isLoaded
                ? this.state.data.artists[0].strBiographyEN
                : "Fetching..."}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

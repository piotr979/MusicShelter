import React, { Component } from "react";
import NetworkManager from "./NetworkManager";
import "./FeaturedArtist.css";
import ArtistImage from "./images/300x300.gif";
import { Link } from "react-router-dom";
import AlbumsList from "./AlbumsList";

export default class FeaturedArtist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoaded: false,
    };

    this.reloadArtistAction = this.reloadArtistAction.bind(this);
  }
  componentDidMount() {
    this.getArtistData();
  }
  reloadArtistAction() {
    window.location.reload();
  }
  getArtistData() {
    const networkManager = new NetworkManager();
    networkManager.getArtistData(this.props.featuredArtistId).then((json) => {
      // undefined is read-only now
      if (json.artists === null || json.artists === undefined) {
        window.alert("Connection error. Please refresh the page");
        return;
      }
      this.setState({
        data: json,
        isLoaded: true,
      });
    });
  }

  render() {
    const isLoaded = this.state.isLoaded;
    return (
      <div>
        <div className="featured-artist">
          <div className="artist-frame">
            <Link
              to={
                this.state.isLoaded
                  ? `/artistDetails/${this.state.data.artists[0].idArtist}`
                  : "646546"
              }
            >
              {isLoaded ? (
                <img
                  src={this.state.data.artists[0].strArtistThumb}
                  className="artists-image"
                  alt=""
                />
              ) : (
                <img src={ArtistImage} className="artists-image" alt="Artist" />
              )}
            </Link>
          </div>
          <div className="artist-welcome">
            {isLoaded ? (
              <h1>{this.state.data.artists[0].strArtist}</h1>
            ) : (
              <h1>Fetching data...</h1>
            )}

            {isLoaded ? (
              <p>
                {" "}
                This time the featured artist is{" "}
                {this.state.data.artists[0].strArtist}. Welcome to Music Shelter
                - the simple database where you can find information about
                musicians and bands. Discover more with my app.
              </p>
            ) : (
              <p>Fetching data...</p>
            )}

            <div className="buttons-group">
              <Link
                to={
                  this.state.isLoaded
                    ? `/artistDetails/${this.state.data.artists[0].idArtist}`
                    : ""
                }
              >
                <button className="button-primary">About artist</button>{" "}
              </Link>
              <div></div>
              <button
                onClick={this.reloadArtistAction}
                className="button-secondary "
              >
                Next artist
              </button>
            </div>
          </div>
        </div>
        {this.state.isLoaded ? (
          <AlbumsList featuredArtistId={this.state.data.artists[0].idArtist} />
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

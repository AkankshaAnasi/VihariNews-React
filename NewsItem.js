import React from "react";

const NewsItem = (props)=> {
  
    let { title, description, imageurl, url, author, date } = props;
    return (
      <div>
        <div className="card">
          <img
            src={
              imageurl
                ? imageurl
                : "https://www.pngall.com/wp-content/uploads/2016/05/Newspaper-Free-Download-PNG.png"
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}....</h5>
            <p className="card-text">{description}....</p>
            <p className="card-text">
              <small className="text-primary">
                {" "}
                By {!author ? "Unknown Author" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a href={url} className="btn -sm btn-dark">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }


export default NewsItem;

import React, { Component } from 'react'
class NewsItem extends Component {

  render() {
    let {title,description,imageUrl,newsUrl} = this.props
    return (
        <div className="card"  style={{width : "18 rem"}}>
        <img src={!imageUrl?"https://o.aolcdn.com/images/dims3/GLOB/legacy_thumbnail/1062x597/format/jpg/quality/100/https://s.aolcdn.com/os/ab/_cms/2022/10/14112759/2023-Nissan-Ariya-18.jpg":imageUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <a href={newsUrl}  className="btn btn-primary">Read More</a>
        </div>
      </div>
    )
  }
}

export default NewsItem
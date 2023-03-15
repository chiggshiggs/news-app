import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import propTypes from 'prop-types'

class News extends Component {
  static defaultProps = {
    category : 'general'
  }

  static propTypes = {
    category: propTypes.string
  }
  articles = [];

  constructor(props) {
    super(props);

    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
      
    };
    document.title = `${this.props.category} - NewsMonkey`
  }

  async componentDidMount() {
    try {
      let url =
        `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=1d4048e1af8f43dab7ca96d8dfb5d74b`;
      this.setState({loading:true})
        const res = await fetch(url);
      const data = await res.json();
      this.setState({
        articles: data.articles,
        totalResults: data.totalResults,
        loading:false
      });
    } catch (e) {
      console.log("something is not working");
    }
  }

  handleNextClick = async ()=>{
   
 if(this.state.page + 1<=Math.ceil(this.state.totalResults/20)){
    try {
      let url =
        `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=1d4048e1af8f43dab7ca96d8dfb5d74b&page=${this.state.page + 1}&pageSize=20`;
        this.setState({loading:true})
      const res = await fetch(url);
      const data = await res.json();
      this.setState({
        articles: data.articles,
        page: this.state.page + 1,
        loading:false
      });
    } catch (e) {
      console.log("something is not working");
    }
  }else{

  }
  }

   handlePrevClick = async ()=>{
    try {
      let url =
        `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=1d4048e1af8f43dab7ca96d8dfb5d74b&page=${this.state.page - 1}&pageSize=20`;
      this.setState({loading : true})
        const res = await fetch(url);
      const data = await res.json();
      this.setState({
        articles: data.articles,
        page: this.state.page - 1,
        loading : false
      });
    } catch (e) {
      console.log("something is not working");
    }
  }

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">Top Headlines</h2>
       { this.state.loading && <Spinner/>}

        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-md-3" key={element.url}>
                <NewsItem
                  title={element?element.title:""}
                  description={element?element.description:""}
                  imageUrl={element?element.urlToImage:""}
                  newsUrl={element?element.url:""}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" onClick={this.handlePrevClick} class="btn btn-dark">
          &larr; Previous
          </button>
          <button disabled={this.state.page + 1>Math.ceil(this.state.totalResults/20)} type="button" onClick={this.handleNextClick} class="btn btn-dark">
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;

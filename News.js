import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

const News= (props)=>{

  const[articles,setArticles] = useState([])
  const[loading,setLoading] = useState(true)
  const[page,setPage] = useState(1)
  const[totalResults,setTotalResults] = useState(0)
   
  
   const capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
   }


 
  
    
 

  const updateNews=async()=>{

    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=831edca879b345e3ba53625a7fb67388&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    props.setProgress(70);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false) 
    
    props.setProgress(100); 
  


 }

  useEffect( ()=>{
    document.title = `ViHariNews - ${capitalizeFirstLetter(props.category)}`
    updateNews(); //eslint-disable-next-line
  },[])

    


  
  const handlePrevClick = async ()=>{
   
    
    
      setPage(page-1)

      updateNews()
  }


  const handleNextClick = async ()=>{
    setPage(page+1)
  updateNews()
}

// fetch more data is used when we use infinite scroll instead of next and previous buttons by importing infnitescrollss

//  const fetchMoreData = async () => {
  
//   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=831edca879b345e3ba53625a7fb67388&page=${page+1}&pageSize=${props.pageSize}`;
//   setPage(page+1)
//     let data = await fetch(url);
//     let parsedData = await data.json()
    
    
//     setArticles(articles.concat(parsedData.articles))
//     setTotalResults(parsedData.totalResults)

// };


  

  


  
    return (
      < >
      <div className="container my-5">
        <h1 className="text-center  mb-5" style={{marginTop:'90px'}}>ViHari News - Top {capitalizeFirstLetter(props.category)}  Headlines</h1>
        
        {loading && <Spinner/>}
        <div className="row">
        {articles && articles.map((element)=>{
          return <div className="col-md-4 mb-5" key={element.url}>
          <NewsItem  title={element.title?element.title: ""} description={element.description?element.description: ""}  imageurl = {element.urlToImage} url={element.url} author={element.author} date={element.publishedAt} />
        </div>

        })}
          
        </div>
        <div className="cont d-flex justify-content-between mx-5 my-5" >
        <button disabled={page<=1}  type="button" className="btn btn-dark" onClick= {handlePrevClick} > &larr; Previous</button>
        <button disabled= {(page + 1 > Math.ceil(totalResults/props.pageSize))}type="button" className="btn btn-dark" onClick= {handleNextClick} >Next &rarr;</button>
      </div>
      </div>
      </>
    )
      }
    
  




News.defaultProps = {
  country: 'in',
  pagesize: 12,
  category : 'general',
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category : PropTypes.string,
}

export default News

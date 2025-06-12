import React, { useEffect, useState } from "react";
import Card from "./Article";
import Loader from "./Loader";  
import { Carousel } from "react-bootstrap";

const Newsapp = () => {
  const [inputValue, setInputValue] = useState("india");
  const [search, setSearch] = useState("india");
  const [newsData, setNewsData] = useState(null);
  const [trendingNews, setTrendingNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [check, setCheck] = useState(false);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const APIkey = "2c48b2bf9c9c4075aaf5f3420a652efa";
  const [userName, setUserName] = useState("");
  const [userCountry, setUserCountry] = useState("");

  const getdata = async () =>
     {
    setLoading(true);
    setCheck(false);
    setNewsData(null);
    console.log(`Fetching news for: ${search}`);
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${search}&apiKey=${APIkey}`
      );
      const jsonData = await response.json();
      if (jsonData.articles && jsonData.articles.length === 0) {
        setCheck(true);
      } else { setNewsData(jsonData.articles);  }
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    } finally {  setLoading(false); }};

  const getTrendingNews = async () => {
    setLoading(true);
    try {
      const response = await   
       fetch( `https://newsapi.org/v2/everything?q=top-headlines&apiKey=${APIkey}`); 
     const jsonData = await response.json();
      if (jsonData.articles && jsonData.articles.length > 0) { setTrendingNews(jsonData.articles.slice(0, 10));}
       else {setError("No articles found.");} }
        catch (err) {setError("Failed to fetch data. Please try again.");}
         finally {setLoading(false);}};
        
  useEffect(() => {
    const loggedInUserName = localStorage.getItem("userName");
    const loggedInUserCountry = localStorage.getItem("userCountry");
     if (loggedInUserName) {
      setUserName(loggedInUserName);
       }
      if (loggedInUserCountry) {
        
        setUserCountry(loggedInUserCountry);
        setInputValue(loggedInUserCountry);
        setSearch(loggedInUserCountry);
     
      }
    }, []);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    setUserName("");
    localStorage.removeItem("userCode");
    setUserCountry("");
    setInputValue("india")
    setSearch("india")
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setActiveCategory(null);
  };
 
  const handleSearchClick = () => {
    setSearch(inputValue);
    setActiveCategory(null);
  };

  const userInput = (category) => {
    setInputValue(category);
    setSearch(category);
    setActiveCategory(category);
  };

  useEffect(() => {
    getTrendingNews();
  }, []);

  useEffect(() => {
    getdata();
  }, [search]);
 
  return (
    <div>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <img
                src="/logo.png"
                alt="logo"
                width="280px"
                height="260px"
                className="pt-3 mt-4"
              />
            </div>

            <div className="d-flex align-items-center">
              <input className="form-control mr-2" type="search" placeholder="Search News" aria-label="Search" value={inputValue} onClick={() => setInputValue("")} onChange={handleInputChange} />
              <button
                className="btn btn-success mr-2"
                type="button"
                onClick={handleSearchClick}>
                Search
              </button>

              {userName ? (
                <div className="d-flex align-items-center">
                  <button className=" btn btn-transparent rounded-pill text-white px-4 py-2 border-white mr-2">
                    <b> {userName}</b>
                  </button>
                  <button
                    className="btn btn-danger px-4 py-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <a href="/login">
                    <button className="btn btn-transparent rounded-pill text-white px-4 py-2 border-white mr-2">
                      Login
                    </button>
                  </a>
                  <a href="/register">
                    <button className="btn btn-transparent rounded-pill text-white border-white px-4 py-2">
                      Register
                    </button>
                  </a>
                </>
              )}
            </div>
          </div>
        </nav>
      </div> 

      {!userName && (
  <>
    <h3 className="m-4 text-decoration-underline">
      Stay Updated With Top Headlines
    </h3>
    {loading ? (
      <Loader />
    ) : (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-12">
            <Carousel className="custom-carousel">
              {trendingNews.map((article, index) => (
                <Carousel.Item key={index}>
                  {article.urlToImage && (
                    <img
                      className="d-block w-100"
                      src={article.urlToImage}
                      alt={article.title}
                      style={{ height: "360px", objectFit: "cover" }}
                    />
                  )}
                  <Carousel.Caption>
                    <h5
                      style={{ color: "#FFFF00" }}
                      onClick={() => window.open(article.url)}
                    >
                      <b>{article.title}</b>
                    </h5>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    )}
  </>
)}
 
      <div className="mt-5">
        <h3 className="text-decoration-underline">
          The Most Searched News Categories
        </h3>
        {[
          "sports",
          "politics",
          "entertainment",
          "health",
          "fitness",
          "lifestyle",
          "technology",
          "education",
        ].map((category) => (
          <button
            key={category}
            className={`category btn shadow ${
              activeCategory === category ? "btn-primary" : ""
            }`}
            onClick={() => userInput(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div>
        {loading ? (
          <Loader />
        ) : error ? (
          <h3>{error}</h3>
        ) : check ? (
          <h3>No Results found</h3>
        ) : (
          <Card data={newsData} />
        )}
      </div>

      <footer
        className=" text-center py-3"
        style={{
          backgroundImage:
            " linear-gradient(178.7deg,rgba(126,184,253,1)5.6%, rgba(2,71,157,1)95.3%)",
          color: "black",
        }}
      >
        <div className="container p-4">
          <section className="mb-3">
          <a className="btn btn-outline btn-floating m-1" role="button">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a className="btn btn-outline btn-floating m-1" role="button">
              <i className="fab fa-twitter"></i>
            </a>
            <a className="btn btn-outline btn-floating m-1" role="button">
              <i className="fab fa-google"></i>
            </a>
            <a className="btn btn-outline btn-floating m-1" role="button">
              <i className="fab fa-instagram"></i>
            </a>
            <a className="btn btn-outline btn-floating m-1" role="button">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a className="btn btn-outline btn-floating m-1" role="button">
              <i className="fab fa-github"></i>
            </a>
          </section>

          <section className="mb-4">
            <p>
              FastTrack News is a Hindi-language news channel owned by the TV
              Today Network, a part of the New Delhi-based media conglomerate
              Living Media group (India Today Group).It has faced criticism for
              reporting misinformation on various occasions.By the time the
              channel came into existence, it had a reach of 52 lakh households.
              It now broadcasts to three crore households and its viewership in
              news channels is 56%.
            </p>
          </section>
        </div>

        <div className="text-center p-3">
          Copyright © 2024 Living Media India Limited
        </div>
      </footer>

    </div>
  
  );
};

export default Newsapp;

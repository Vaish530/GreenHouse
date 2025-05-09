
import ArticlesData from "../data/ArticlesData";
import "../styles/Articles.css";
  export default function Articles() {
    return (
      <div className="Articles-page">
        {ArticlesData.map((article, idx) => (
          <div className="article-container" key={idx}>
            <h1>{article.title}</h1>
            <img src={article.image} className="article-image" alt={article.title} />
            <div className="article-content">
              {article.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
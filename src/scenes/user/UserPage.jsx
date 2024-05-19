import React, { useState, useEffect } from "react";

const UserPage = ({ userId }) => {
  const [allBooks, setAllBooks] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all books
    fetch("http://localhost:4000/api/all-books")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setAllBooks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching all books: ", error);
        setError(error);
        setLoading(false);
      });

    // Fetch recommended books
    const recommendedBooksUrl = `http://localhost:4000/book/${userId}`;
    fetch(recommendedBooksUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setRecommendedBooks(data);
      })
      .catch((error) => {
        console.error("Error fetching recommended books: ", error);
      });
  }, [userId]);

  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div style={styles.error}>Error: {error.message}</div>;
  }

  return (
    <div style={styles.container}>
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Recommended Books</h2>
        <div style={styles.grid}>
          {recommendedBooks.map((book, index) => {
            // Validate the rating value
            const rating = Number(book.rating);
            const validRating = !isNaN(rating) && rating >= 0 && rating <= 5;

            return (
              <div key={index} style={styles.card}>
                <img
                  src={book.cover}
                  alt={book.title}
                  style={styles.cardImage}
                />
                <h3 style={styles.cardTitle}>{book.title}</h3>
                <p style={styles.cardAuthor}>{book.author}</p>
                {validRating && (
                  <div style={styles.rating}>
                    {Array(Math.round(rating))
                      .fill("")
                      .map((_, i) => (
                        <span key={i} style={styles.star}>
                          ★
                        </span>
                      ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>All Books</h2>
        <div style={styles.grid}>
          {allBooks.map((book, index) => {
            // Validate the rating value
            const rating = Number(book.rating);
            const validRating = !isNaN(rating) && rating >= 0 && rating <= 5;

            return (
              <div key={index} style={styles.card}>
                <img
                  src={book.cover}
                  alt={book.title}
                  style={styles.cardImage}
                />
                <h3 style={styles.cardTitle}>{book.title}</h3>
                <p style={styles.cardAuthor}>{book.author}</p>
                {validRating && (
                  <div style={styles.rating}>
                    {Array(Math.round(rating))
                      .fill("")
                      .map((_, i) => (
                        <span key={i} style={styles.star}>
                          ★
                        </span>
                      ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f0f0f0",
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
  },
  section: {
    marginTop: "20px",
  },
  sectionTitle: {
    fontSize: "22px",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    transition: "transform 0.3s",
    textAlign: "center",
  },
  cardImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  cardTitle: {
    marginTop: "15px",
    fontSize: "18px",
    fontWeight: "bold",
  },
  cardAuthor: {
    color: "#555",
    marginTop: "5px",
  },
  rating: {
    marginTop: "10px",
    color: "#FFD700",
  },
  star: {
    fontSize: "16px",
  },
  loading: {
    textAlign: "center",
    marginTop: "20px",
  },
  error: {
    textAlign: "center",
    color: "red",
    marginTop: "20px",
  },
};

export default UserPage;

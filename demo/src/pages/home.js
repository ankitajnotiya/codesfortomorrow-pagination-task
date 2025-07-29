import React, { useEffect, useState } from 'react';
import '../styles/home.css';

const fallbackImage = '/assets/dummy-image.png'; // Make sure this image exists

const initialCards = [
  {
    title: "Sed volutpat vitae id eleifend. Commodo...",
    description: "Interdum pretium porttitor nibh cursus...",
    timestamp: "Mon, 21 Dec 2020 14:57 GMT",
    img: "../assets/sed-img.png",
    alt: "Business meeting"
  },
  {
    title: "Risus natoque porta eget vestibulum...",
    description: "Nec facilisis duis venenatis nulla porta...",
    timestamp: "Mon, 21 Dec 2020 14:57 GMT",
    img: "../assets/risus-img.png",
    alt: "Person with tablet"
  },
  {
    title: "Magnis quisque non ullamcorper mus...",
    description: "Amet vitae rhoncus nisl tellus eget ut vulputate...",
    timestamp: "Mon, 21 Dec 2020 14:57 GMT",
    img: "../assets/magnis-img.png",
    alt: "Modern building"
  },
  {
    title: "Eu pellentesque aenean vel commodo in. Nibh...",
    description: "Nullam tempus nisl laoreet arcu sit eget...",
    timestamp: "Mon, 21 Dec 2020 14:57 GMT",
    img: "../assets/eu-img.png",
    alt: "Woman in car"
  },
  {
    title: "Ut vestibulum amet orci lacus potenti eu cras...",
    description: "Nulla gravida id quam rutrum. Aenean tempus...",
    timestamp: "Mon, 21 Dec 2020 14:57 GMT",
    img: "../assets/ut-img.png",
    alt: "People working"
  },
  {
    title: "Pretium duis dolor morbi rhoncus eleifend. Puru...",
    description: "At vulputate ultricies sed euismod nulla. Sed...",
    timestamp: "Mon, 21 Dec 2020 14:57 GMT",
    img: "../assets/magnis-img.png",
    alt: "Person in office"
  }
];

const totalPages = 3;

const CardsGrid = () => {
  const [cards, setCards] = useState(initialCards);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    animateCards();
  }, [currentPage]);

  const removeCard = (indexToRemove) => {
    const newCards = [...cards];
    newCards.splice(indexToRemove, 1);
    setCards(newCards);

    if (newCards.length === 0) {
      setTimeout(() => {
        setCards([]);
      }, 300);
    }
  };

  const changePage = (page) => {
    if (page === currentPage) return;
    setCurrentPage(page);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      changePage(currentPage + 1);
    }
  };

  const animateCards = () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
        card.style.transition = 'all 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 100);
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' && currentPage > 1) {
        changePage(currentPage - 1);
      } else if (e.key === 'ArrowRight' && currentPage < totalPages) {
        changePage(currentPage + 1);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  return (
    <div className="container">
      <div className="cards-grid" id="cardsGrid">
        {cards.length > 0 ? (
          cards.map((card, index) => {
            const imageSrc = card.img || fallbackImage;
            return (
              <div className="card" key={index}>
                <div className="card-header">
                  <button className="close-btn" onClick={() => removeCard(index)}>&times;</button>
                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-description">{card.description}</p>
                  <div className="card-timestamp">{card.timestamp}</div>
                </div>
                <img
                  src={imageSrc}
                  alt={card.alt || 'Card image'}
                  className="card-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = fallbackImage;
                  }}
                />
              </div>
            );
          })
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666', fontSize: '16px' }}>
            No more articles to display
          </div>
        )}
      </div>

      <div className="pagination">
        {[1, 2, 3].map((pageNum) => (
          <button
            key={pageNum}
            className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
            onClick={() => changePage(pageNum)}
          >
            {pageNum}
          </button>
        ))}
        <button className="pagination-btn next" onClick={nextPage}>›</button>
      </div>
    </div>
  );
};

export default CardsGrid;

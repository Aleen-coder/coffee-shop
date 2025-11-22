function CoffeeCard({ image, name, origin, description, popularity, recommendedServing, price }) {
  return (
    <div className="coffee-card">
      <img src={image} alt={name} className="coffee-image" />
      <h3 className="coffee-name">{name}</h3>
      <p className="coffee-origin">{origin}</p>
      <p className="coffee-description">{description}</p>
      <p className="coffee-serving">Serving: {recommendedServing}</p>
      <p className="coffee-popularity">Popularity: {popularity}</p>
      <p className="coffee-price">{price}</p>
    </div>
  );
}
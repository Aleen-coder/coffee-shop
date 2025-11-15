import React from "react";

function CoffeeCard({ image, name, origin, description, popularity, recommendedServing, price }) {
    return (
        <div className="menuItem">
            <div
                style={{
                    backgroundImage: `url(${image})`
                }}
            >
            </div>

            <h1>{name}</h1>

            <p>{origin}</p>
            <p>{description}</p>
            <p>Popularity: {popularity}/10</p>
            <p>Best Served: {recommendedServing}</p>
            <p>{price}</p>
        </div>
    );
}

export default CoffeeCard;
import React, { Component } from 'react';


class MealDescription extends Component {
  render() {
    return (
      <div className="meal-description-wrapper">
        <form  action="SAVE ROUTE HERE" method="POST">
          <input type="submit" class="save-meal-btn" />
        </form>
        <p className="meal-description">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias aliquam, id impedit voluptas corrupti commodi numquam rerum natus veritatis temporibus hic aut libero expedita repellat qui ut delectus! Reprehenderit, ab!
        </p>
      </div>
    );
  }
}

export default MealDescription;
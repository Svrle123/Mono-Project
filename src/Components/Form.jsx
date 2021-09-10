import React from "react";

function Form() {
  return (
    <div>
      <form action="">
        <label htmlFor="make">
          What is the name of your make?
          <input type="text" name="make" placeholder="Make here..." />
        </label>
        <label htmlFor="make">
          What is the abbreviation of your make?
          <input type="text" name="make" placeholder="Abrv here..." />
        </label>
      </form>
    </div>
  );
}

export default Form;

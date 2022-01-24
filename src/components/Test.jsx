import React from "react";

function ThemeSelect() {
  const [theme, setTheme] = React.useState('day');

  function handleChange(e) {
    console.log(e.target);
    setTheme(e.target.value);
  }

  return (
        <select onChange={handleChange} className={theme}>
      <option value="day">День</option>
      <option value="night">Ночь</option>
    </select>
  );
}
export default ThemeSelect;
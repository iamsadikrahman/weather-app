// function named getWeatherData that takes a location as a parameter and retrieves the current weather information using the API.

// Display Info - temperature, description, humidity
const getWeatherData = async () => {
  const searchButton = document.getElementById("search-btn");
  const inputText = document.getElementById("input-data");
  const errorMessage = document.getElementById("error-message");
  const listElement = document.getElementById("list");

  searchButton.addEventListener("click", async () => {
    errorMessage.textContent = "";
    listElement.innerHTML = "";

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${inputText.value}&appid=665be07afc05c091196a664a6bbe5e67`
      );
      console.log(response);
      displayWeatherData("Search Location: ", response.data.name);
      displayWeatherData("Temperature: ", response.data.main.temp);
      displayWeatherData("Humidity: ", response.data.main.humidity);
      displayWeatherData("Country: ", response.data.sys.country);
      displayWeatherData("Description: ", response.data.weather[0].description);
      inputText.value = "";
      errorMessage.classList.add("d-none");
    } catch (error) {
      if (error.request.status === 404) {
        errorMessage.textContent = "This Place Doesn't Exist!";
      } else {
        errorMessage.textContent = "An error occurred. Please try again.";
      }
      errorMessage.classList.remove("d-none");
      inputText.value = "";
    }
  });
};

const displayWeatherData = (label, data) => {
  const listItem = document.createElement("li");
  listItem.className = "list-group-item";
  listItem.textContent = `${label} ${data}`;
  document.getElementById("list").appendChild(listItem);
};

getWeatherData();

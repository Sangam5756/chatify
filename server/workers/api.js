import  https from "https";


// Function to make a GET request and log the URL
export const fetchData = () => {
    https.get(url, (response) => {
      console.log(`Called URL: ${url}`); // Log the called URL
      response.on("data", (chunk) => {
        // Optionally, you can log the data if needed
        // console.log(chunk.toString());
      });
    }).on("error", (error) => {
      console.error("Error fetching data:", error);
    });
  };

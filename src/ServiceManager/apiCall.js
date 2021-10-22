import React from "react";

class ServiceManager extends React.Component {
  async getAPI(strURL) {
    return fetch(strURL)
      .then(response => {
        if (!response.ok) {
          this.handleResponseError(response);
        }
        return response.json();
      })
      .then(json => {
        console.log("Response:");
        console.log(json);
        return json;
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  async postAPI(url, parameter) {
    return fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(parameter)
    })
      .then(response => {
        return response.json();
      })
      .catch(error => {
        console.log(error);
      });
  }

  async deleteAPI(url) {
    return fetch(url, { method: 'DELETE'})
      .then(response => {
        if (!response.ok) {
          this.handleResponseError(response);
        }
        return response.json();
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  handleResponseError(response) {
    throw new Error("HTTP error, status = " + response.status);
  }

  handleError(error) {
    console.log(error.message);
  }
}
export default ServiceManager;
export default class Response {
  #statusCode = 200;
  #res;

  constructor(res) {
    this.#res = res;
  }

  status(code) {
    this.#statusCode = code;
  }

  setHeader(...props) {
    this.#res.setHeader(...props);
  }

  /**
   * Sends a success response with the given data. If data is an array with a single element,
   * the element is sent directly. If data is null, the data field is excluded from the response.
   *
   * @param {*} [data=null] - The data to include in the response. If an array with a single
   * element is provided, only the element is included. Defaults to null.
   *
   * @returns {void}
   */
  success(data = null) {
    const responseData =
      Array.isArray(data) && data.length === 1 ? data[0] : data;

    const response = {
      status: "success",
      statusCode: this.#statusCode,
    };

    if (responseData !== null) {
      response.data = responseData;
    }

    this.#sendResponse(response);
  }

  /**
   * Sends an error response with the given message, details, and additional data.
   * Sets the content type to "application/problem+json" and includes
   * the error details in the response body.
   *
   * @param {Object} params - The parameters for the error response.
   * @param {string} [params.message] - A description of the error.
   * @param {string} [params.details] - Additional details about the error.
   * @param {...*} [params.data] - Any additional data to include in the error response.
   *
   * @returns {void}
   */
  error({ message, details, ...data }) {
    this.setHeader("content-type", "application/problem+json");

    this.#sendResponse({
      status: "error",
      statusCode: this.#statusCode,
      error: {
        message: message || null,
        details: details || null,
        timestamp: new Date(),
        data,
      },
    });
  }

  #sendResponse(responseObject) {
    this.#res.status(this.#statusCode).json(responseObject);
  }
}

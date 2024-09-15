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

  success(data = null) {
    const responseData =
      Array.isArray(data) && data.length === 1 ? data[0] : data;

    this.#sendResponse({
      status: "success",
      statusCode: this.#statusCode,
      data: responseData,
    });
  }

  error(data) {
    this.setHeader("content-type", "application/problem+json");

    const { message, details, ...furhterData } = data;

    this.#sendResponse({
      status: "error",
      statusCode: this.#statusCode,
      error: {
        message: message || null,
        details: details || null,
        timestamp: new Date(),
        data: furhterData,
      },
    });
  }

  #sendResponse(responseObject) {
    this.#res.status(this.#statusCode).json(responseObject);
  }
}

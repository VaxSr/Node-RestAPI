import supabase from "../config/supabase.js";
import checkIsbn from "../utils/checkIsbn.js";

export default class Book {
  constructor(isbn, title, publication_date, pages) {
    this.isbn = isbn;
    this.title = title;
    this.publication_date = publication_date || null;
    this.pages = +pages;

    this.sanitize();
  }

  async save() {
    const { data, error } = await supabase.from("book").insert(this).select();

    if (error) {
      console.error("Error fetching data:", error);

      /* TODO: improve error handling
    res.status(409);
    res.setHeader("content-type", "application/problem+json");
    res.send({
      message: "Resource already exists.",
      detail: "",
    });
    */

      return error;
    } else {
      console.log("Data:", data);
      return data;
    }
  }

  static async deleteByIsbn(bookIsbn) {
    const { data, error } = await supabase
      .from("book")
      .delete()
      .eq("isbn", bookIsbn)
      .select();

    if (error) {
      console.error("Error fetching data:", error);
      return error;
    } else {
      console.log("Data:", data);
      return data;
    }
  }

  static async updateByIsbn(bookIsbn, newBookData) {
    if (newBookData.isbn) {
      delete newBookData.isbn;
    }

    const { data, error } = await supabase
      .from("book")
      .update(newBookData)
      .eq("isbn", bookIsbn)
      .select();

    if (error) {
      console.error("Error fetching data:", error);
      return error;
    } else {
      console.log("Data:", data);
      return data;
    }
  }

  static async replaceBookByIsbn(bookIsbn, newBookData) {
    const { data, error } = await supabase
      .from("book")
      .update(newBookData)
      .eq("isbn", bookIsbn)
      .select();

    if (error) {
      console.error("Error fetching data:", error);
      return error;
    } else {
      console.log("Data:", data);
      return data;
    }
  }

  static async fetchByIsbn(bookIsbn) {
    const { data, error } = await supabase
      .from("book")
      .select("*")
      .eq("isbn", bookIsbn);

    if (error) {
      console.error("Error fetching data:", error);
      return error;
    } else {
      console.log("Data:", data);
      return data;
    }
  }

  static async fetchAll() {
    const { data, error } = await supabase.from("book").select("*");
    if (error) {
      console.error("Error fetching data:", error);
      return error;
    } else {
      console.log("Data:", data);
      return data;
    }
  }

  isValid() {
    if (!this.isbn && typeof this.isbn !== "string" && !checkIsbn(this.isbn)) {
      return false;
    }

    if (!this.title && typeof this.title !== "string") {
      return false;
    }

    if (
      !this.publication_date &&
      (!(this.publication_date instanceof Date) ||
        this.publication_date !== null)
    ) {
      return false;
    }

    if (!this.pages && typeof this.pages !== "number") {
      return false;
    }

    return true;
  }

  sanitize() {
    this.isbn = this.isbn?.replace(/-/g, "");
    this.publication_date = new Date(this.publication_date);
  }

  static checkAllProperties(newBookData) {
    const dbProperties = ["isbn", "title", "publication_date", "pages"];
    const keys = Object.keys(newBookData);
    const keysLength = keys.length;

    if (keysLength > dbProperties.length || keysLength < dbProperties.length) {
      // TODO: return status code and message
      return { isValid: false, body: "Too many or too few properties" };
    }

    const includesAllProperties = keys.every((key) =>
      dbProperties.includes(key)
    );

    if (!includesAllProperties) {
      // TODO: return status code and message
      return { isValid: false, body: "Wrong properties" };
    }
    return { isValid: true };
  }
}

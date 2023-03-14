// Import methods to save and get data from the indexedDB database in './database.js'
import { getDb, putDb } from "./database";
import { header } from "./header";

export default class {
  constructor() {
    // Get local data from localStorage
    const localData = localStorage.getItem("content");

    // Check if CodeMirror is loaded
    if (typeof CodeMirror === "undefined") {
      throw new Error("CodeMirror is not loaded");
    }

    // Create a new instance of CodeMirror
    this.editor = CodeMirror(document.querySelector("#main"), {
      value: "",
      mode: "javascript",
      theme: "monokai",
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    // When the editor is ready, set the value to the content stored in indexeddb.
    // If there is no data in indexeddb, fall back to localData (from localStorage).
    // If neither is available, set the value to header.
    getDb().then((data) => {
      console.info("Loaded data from IndexedDB, injecting into editor");
      this.editor.setValue(data || localData || header);
    });

    // Save the content of the editor to localStorage when it changes
    this.editor.on("change", () => {
      localStorage.setItem("content", this.editor.getValue());
    });

    // Save the content of the editor to indexeddb when it loses focus
    this.editor.on("blur", () => {
      console.log("The editor has lost focus");
      putDb(localStorage.getItem("content"));
    });
  }
}

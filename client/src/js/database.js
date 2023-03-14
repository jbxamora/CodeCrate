import { openDB } from "idb";

// Initialize the database
const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      // Check if the object store already exists
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      // Create a new object store with auto-incrementing keys
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// PUT function to add data to the database
export const putDb = async (id, value) => {
  console.log("PUT request to update the jateDB");
  // Connect to the database
  const jateDb = await openDB("jate", 1);
  // Create a new transaction with read-write privileges
  const tx = jateDb.transaction("jate", "readwrite");
  // Open the object store
  const objStore = tx.objectStore("jate");
  // Use the .put() method to add content to the object store
  const req = objStore.put({ id: id, value: value });
  // Wait for the request to complete and log the result
  const res = await req;
  console.log("data saved to the jateDB", res);
};

// GET function to retrieve all data from the database
export const getDb = async () => {
  console.log("Getting data from the jateDB");
  // Connect to the database
  const jateDb = await openDB("jate", 1);
  // Create a new transaction with read-only privileges
  const tx = jateDb.transaction("jate", "readonly");
  // Open the object store
  const objStore = tx.objectStore("jate");
  // Use the .getAll() method to retrieve all content from the object store
  const req = objStore.getAll();
  // Wait for the request to complete and log the result
  const res = await req;
  console.log("data retrieved from the jateDB", res);
};

// Initialize the database when the module is imported
initdb();

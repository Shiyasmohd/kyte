"use client";
import { Database } from "@tableland/sdk";

const tableName: string = "crowdfundproject_80001_7527"; // Our pre-defined health check table

interface Project {
  id: number;
  name: string;
  description: string;
  website: string;
  twitter: string;
  owner: string;
  file:string;
  contributors: number;
  totalRaised: number;
}
export default function Test() {
  const createData = async () => {
    // Default to grabbing a wallet connection in a browser
    const db = new Database<Project>();

    // This is the table's `prefix`; a custom table value prefixed as part of the table's name
    const prefix: string = "crowdfundproject";

    const { meta: create } = await db
      .prepare(
        `CREATE TABLE ${prefix} (id integer primary key, name text, description text, website text, twitter text, owner text, file text, contributors integer, totalRaised integer);`
      )
      .run();

    // The table's `name` is in the format `{prefix}_{chainId}_{tableId}`
    console.log(create.txn?.name); // e.g., my_sdk_table_80001_311
  };

  const readData = async () => {
    const db = new Database<Project>();

    // Type is inferred due to `Database` instance definition.
    // Or, it can be identified in `prepare`.
    // const { results } = await db.prepare<Mail>(`SELECT * FROM ${tableName};`).all();
    const { results } = await db
      .prepare<Project>(`SELECT * FROM ${tableName};`)
      .all();

    console.log(results);
  };

  const writeData = async () => {
    // Insert a row into the table
    const db = new Database<Project>();

    const { meta: insert } = await db
      .prepare(
        `INSERT INTO ${tableName} (id, name, description, website, twitter, owner, file, contributors, totalRaised) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`
      )
      .bind(
        74484218,
        "xDevLabs",
        "Project aimed to win hackathons",
        "www.metainc.in",
        "www.twitter.com/0xHashir",
        "0x379AB0b69d7fbB5834741543245836Dd2B3E7C8A",
        "jngfjsnvjrfnenvjg34ndjvnjddjvn",
        5,
        150
      )
      .run();
    console.log(insert.txn);

    // Wait for transaction finality
    await insert.txn?.wait();

    // Perform a read query, requesting all rows from the table
    const { results } = await db.prepare(`SELECT * FROM ${tableName};`).all();
    console.log(results);
  };

  return (
    <div>
      <br />
      <button onClick={createData}>Create</button>
      <br />
      <button onClick={readData}>Read</button>
      <br />
      <button onClick={writeData}>Write</button>
      <br />
    </div>
  );
}

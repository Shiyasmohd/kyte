"use client";
import { Database } from "@tableland/sdk";

const tableNameProject: string = "crowdfundproject_80001_7527"; // Our pre-defined health check table
const tableNameContribution: string = "crowdfundcontributor_80001_7536";

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

interface Contribution {
  id: number;
  projectId: number;
  contributor: string;
  amount: number;
}

export default function Test() {
  const createProject = async () => {
    // Default to grabbing a wallet connection in a browser
    const db = new Database<Project>();

    // This is the table's `prefix`; a custom table value prefixed as part of the table's name
    const prefix: string = "crowdfundcontributor";

    const { meta: create } = await db
      .prepare(
        `CREATE TABLE ${prefix} (id integer primary key, name text, description text, website text, twitter text, owner text, file text, contributors integer, totalRaised integer);`
      )
      .run();

    // The table's `name` is in the format `{prefix}_{chainId}_{tableId}`
    console.log(create.txn?.name); // e.g., my_sdk_table_80001_311
  };

  const readProject = async () => {
    const db = new Database<Project>();

    // Type is inferred due to `Database` instance definition.
    // Or, it can be identified in `prepare`.
    // const { results } = await db.prepare<Mail>(`SELECT * FROM ${tableName};`).all();
    const { results } = await db
      .prepare<Project>(`SELECT * FROM ${tableNameProject};`)
      .all();

    console.log(results);
  };

  const writeProject = async () => {
    // Insert a row into the table
    const db = new Database<Project>();

    const { meta: insert } = await db
      .prepare(
        `INSERT INTO ${tableNameProject} (id, name, description, website, twitter, owner, file, contributors, totalRaised) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`
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
    const { results } = await db.prepare(`SELECT * FROM ${tableNameProject};`).all();
    console.log(results);
  };

   const createContribution = async () => {
     // Default to grabbing a wallet connection in a browser
     const db = new Database<Contribution>();

     // This is the table's `prefix`; a custom table value prefixed as part of the table's name
     const prefix: string = "crowdfundcontributor";

     const { meta: create } = await db
       .prepare(
         `CREATE TABLE ${prefix} (id integer primary key, projectId integer, contributor text, amount integer);`
       )
       .run();

     // The table's `name` is in the format `{prefix}_{chainId}_{tableId}`
     console.log(create.txn?.name); // e.g., my_sdk_table_80001_311
   };

   const readContribution = async () => {
     const db = new Database<Contribution>();

     // Type is inferred due to `Database` instance definition.
     // Or, it can be identified in `prepare`.
     // const { results } = await db.prepare<Mail>(`SELECT * FROM ${tableName};`).all();
     const { results } = await db
       .prepare<Project>(`SELECT * FROM ${tableNameContribution};`)
       .all();

     console.log(results);
   };

   const writeContribution = async () => {
     // Insert a row into the table
     const db = new Database<Contribution>();

     const { meta: insert } = await db
       .prepare(
         `INSERT INTO ${tableNameContribution} (id, projectId, contributor, amount) VALUES (?, ?, ?, ?);`
       )
       .bind(
        1211212,
         74484218,
         "0x379AB0b69d7fbB5834741543245836Dd2B3E7C8A",
         150
       )
       .run();
     console.log(insert.txn);

     // Wait for transaction finality
     await insert.txn?.wait();

     // Perform a read query, requesting all rows from the table
     const { results } = await db.prepare(`SELECT * FROM ${tableNameContribution};`).all();
     console.log(results);
   };

  return (
    <div>
      <br />
      <button onClick={createProject}>Create Project</button>
      <br />
      <button onClick={readProject}>Read Project</button>
      <br />
      <button onClick={writeProject}>Write Project</button>
      <br />
      <button onClick={createContribution}>Create Contribution</button>
      <br />
      <button onClick={readContribution}>Read Contribution</button>
      <br />
      <button onClick={writeContribution}>Write Contribution</button>
      <br />
    </div>
  );
}

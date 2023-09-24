import { Database } from "@tableland/sdk";
import { Web3Storage, getFilesFromPath, File } from "web3.storage";

const TABLE_NAME_PROJECT = "crowdfundproject_80001_7540";
const TABLE_NAME_CONTRIBUTION = "crowdfundcontributor_80001_7536";

export type Project = {
  id: number;
  name: string;
  description: string;
  website: string;
  twitter: string;
  owner: string;
  file: string;
  contributors: number;
  totalRaised: number;
};

export type Contribution = {
  id: number;
  projectId: number;
  contributor: string;
  amount: number;
};

export async function addProject(
  name: string,
  description: string,
  website: string,
  twitter: string,
  owner: string,
  file: any
) {
  console.log({ name, description, website, twitter, owner, file });
  // Insert a row into the table
  const db = new Database<Project>();
  let id = generateRandomNumber();
  const contributors: number = 0;
  const totalRaised: number = 0;
  let fileUrl = "";
  if (file) {
    fileUrl = await storeFiles(file);
    fileUrl = fileUrl + `/${file[0].name}`
    console.log({ fileUrl });
  }

  const { meta: insert } = await db
    .prepare(
      `INSERT INTO ${TABLE_NAME_PROJECT} (id, name, description, website, twitter, owner, file, contributors, totalRaised) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`
    )
    .bind(id, name, description, website, twitter, owner, fileUrl, contributors, totalRaised)
    .run();
  console.log(insert.txn);

  // Wait for transaction finality
  let res = await insert.txn?.wait();
  console.log({ res })

  // Perform a read query, requesting all rows from the table
  //   const { results } = await db
  //     .prepare(`SELECT * FROM ${TABLE_NAME_PROJECT};`)
  //     .all();
  //   console.log(results);
  return true;
}

export async function getProjects(): Promise<Project[]> {
  const db = new Database<Project>();

  // Type is inferred due to `Database` instance definition.
  // Or, it can be identified in `prepare`.
  const { results } = await db
    .prepare<Project>(`SELECT * FROM ${TABLE_NAME_PROJECT};`)
    .all();
  console.log(results);
  return results;
}

export async function getProjectById(id: number): Promise<Project[]> {
  const db = new Database<Project>();

  // Type is inferred due to `Database` instance definition.
  // Or, it can be identified in `prepare`.
  const { results } = await db
    .prepare<Project>(`SELECT * FROM ${TABLE_NAME_PROJECT} WHERE id=${id};`)
    .all();
  console.log(results);
  return results;
}

export async function addContribution(
  projectId: number,
  amount: number
) {
  console.log({ projectId, amount });
  // Insert a row into the table
  const db = new Database<Contribution>();

  //   const { meta: insert } = await db
  //     .prepare(
  //       `INSERT INTO ${TABLE_NAME_CONTRIBUTION} (id, projectId, contributor, amount) VALUES (?, ?, ?, ?);`
  //     )
  //     .bind(id, projectId, contributor, amount)
  //     .run();
  const { meta: insert } = await db
    .prepare(
      `UPDATE ${TABLE_NAME_PROJECT} SET contributors=contributors+1, totalRaised=totalRaised+${amount} WHERE id=${projectId};`
    )
    .run();

  console.log(insert.txn);

  // Wait for transaction finality
  await insert.txn?.wait();

  // Perform a read query, requesting all rows from the table
  const { results } = await db
    .prepare(`SELECT * FROM ${TABLE_NAME_CONTRIBUTION};`)
    .all();
  console.log(results);
  return true;
}

export async function getAllContributions(): Promise<Contribution[]> {
  const db = new Database<Contribution>();

  // Type is inferred due to `Database` instance definition.
  // Or, it can be identified in `prepare`.
  const { results } = await db
    .prepare<Contribution>(`SELECT * FROM ${TABLE_NAME_CONTRIBUTION};`)
    .all();
  console.log(results);
  return results;
}

export async function getContributionsByProject(
  projectId: number
): Promise<Contribution[]> {
  const db = new Database<Contribution>();

  // Type is inferred due to `Database` instance definition.
  // Or, it can be identified in `prepare`.
  const { results } = await db
    .prepare<Contribution>(
      `SELECT * FROM ${TABLE_NAME_CONTRIBUTION} WHERE projectId=${projectId};`
    )
    .all();
  console.log(results);
  return results;
}

export function generateRandomNumber(): number {
  const min = 10000000; // Minimum 8-digit number (inclusive)
  const max = 99999999; // Maximum 8-digit number (inclusive)

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getAccessToken() {
  // If you're just testing, you can paste in a token
  // and uncomment the following line:
  // return 'paste-your-token-here'

  // In a real app, it's better to read an access token from an
  // environement variable or other configuration that's kept outside of
  // your code base. For this to work, you need to set the
  // WEB3STORAGE_TOKEN environment variable before you run your code.
  return process.env.NEXT_PUBLIC_WEB3_STORAGE_KEY as string;
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

export async function storeFiles(files: any) {
  console.log("upload started...");
  const client = makeStorageClient();
  const cid = await client.put(files);
  console.log("stored files with cid:", cid);
  return `https://ipfs.io/ipfs/${cid}`;
}

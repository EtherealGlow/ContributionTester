import { Octokit } from "octokit";
import { config } from "dotenv";
config();
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export async function checkIfRepoExists(owner: string, repo: string): Promise<boolean> {
  try {
    await octokit.rest.repos.get({ owner, repo });
    return true; // If the repository exists, the request will be successful
  } catch (error) {
    return false;
  }
}

export async function getComment(owner: string, repo: string, commentId: number) {
  return await octokit.request("GET /repos/{owner}/{repo}/issues/comments/{comment_id}", {
    owner: owner,
    repo: repo,
    comment_id: commentId,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
}

export async function userExists(username: string) {
  try {
    const response = await octokit.rest.users.getByUsername({
      username: username,
    });
    return response.status === 200;
  } catch (error) {
    console.log("Couldnt find user");
    return false;
  }
}

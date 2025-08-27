import * as dotenv from 'dotenv';
import { BskyAgent } from "@atproto/api"

function makeCode(){
	if(Math.random() < 0.85){
		const number = parseInt(Math.random() * 1_000_000);
		return number.toString().padStart(6, "0");
	} else {
		const number = parseInt(Math.random() * 100_000_000);
		return number.toString().padStart(8, "0");
	}
}

dotenv.config();

const agent = new BskyAgent({
	service: "https://bsky.social"
});

async function main() {
	console.log("This is the username", process.env.BLUESKY_USERNAME)
	await agent.login({
		identifier: process.env.BLUESKY_USERNAME,
		password: process.env.BLUESKY_PASSWORD
	});
	await agent.post({
		text: `Your code is ${makeCode()}.`
	});
	console.log("posted")
}

main();
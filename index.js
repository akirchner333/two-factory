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

function text(){
	const r = Math.random()
	if(r < 0.2){
		return `Your code is ${makeCode()}. NEVER share this code.`
	} else if (r < 0.4){
		return `DON'T share. Your code is ${makeCode()}.`
	} else if(r < 0.6){
		return `Your code is ${makeCode()}.`
	}else{
		return makeCode();
	}
}

dotenv.config();

const agent = new BskyAgent({
	service: "https://bsky.social"
});

async function main() {
	await agent.login({
		identifier: process.env.BLUESKY_USERNAME,
		password: process.env.BLUESKY_PASSWORD
	});
	await agent.post({
		text: text()
	});
	console.log("posted")
}

main();
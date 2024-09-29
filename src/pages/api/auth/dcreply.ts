import {  type APIRoute } from "astro";
import { discord_data } from "../firebase.astro";

export const GET: APIRoute = async ({
  params,
  request,
  redirect,
  cookies,
}) => {
  var hash;
  var myJson = {};
  var url = request.url;
  var hashes = url.slice(url.indexOf("?") + 1).split("&");
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split("=");
    myJson[hash[0]] = hash[1];
    // If you want to get in native datatypes
    // myJson[hash[0]] = JSON.parse(hash[1]);
  }
  if(myJson.id == ("undefined" || undefined || null)) return redirect("/")
  var ne1 = await discord_data(myJson.id)
  delete(ne1).JSON_discord_channel
  delete(ne1).JSON_discord_user
  delete(ne1).JSON_discord_cc_server
  cookies.set('discord', JSON.stringify(ne1) ,{ path:'/'})
  console.log(ne1.newuser)
  return ((ne1.newuser == (undefined || true)) ? redirect("/welcome") : redirect("/course"))
  // console.log(JSON.parse(JSON.stringify(Object.fromEntries(await request.headers))))
};
// https://auth.shalify.eu.org/auth/discord/renew?id=905931663937253376
export const POST: APIRoute = async ({ request, redirect }) => {
  // console.log(await request.json());
  if (request.headers.get("Content-Type") === "application/json") {
    const body = await request.json();
    // console.log(body);
    const name = body.name;

    return new Response(
      JSON.stringify({
        message: "Your name was: " + name,
      }),
      {
        status: 200,
      }
    );
    // return new Response(null, { status: 300 });
  }
};

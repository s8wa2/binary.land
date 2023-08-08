import { redirect, type LoaderArgs } from "@remix-run/node"
import isbot from "isbot";
import { getClientIPAddress } from "remix-utils";

export async function loader({ params, request, context }: LoaderArgs) {
  const { env } = context;
  const { link } = params;
  if (!link || typeof link !== 'string') {
    throw new Response(null, {
      status: 404,
    })
  }
  if (typeof env !== 'object' || env === null) {
    throw new Response(null, {
      status: 404,
    })
  }
  const agent = request.headers.get('User-Agent');
  const isBotResult = isbot(agent);
  const ip = getClientIPAddress(request.headers);
  console.log({
    resource: `/out/${link}`,
    method: request.method,
    ip: ip,
    userAgent: agent,
    isBot: isBotResult,
  });
  if (isBotResult) {
    throw new Response(null, {
      status: 404,
    })
  }
  const url = (env as Record<string, string | undefined>)[`LINKS_${link.toUpperCase()}`];
  if (!url) {
    throw new Response(null, {
      status: 404,
    })
  }
  return redirect(url);
};
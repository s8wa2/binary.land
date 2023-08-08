import { redirect, type LoaderArgs } from '@remix-run/node';
import isbot from 'isbot';

export async function loader({ params, request, context }: LoaderArgs) {
  const { env } = context;
  const { link } = params;
  if (!link || typeof link !== 'string') {
    throw new Response(null, {
      status: 404,
    });
  }
  if (typeof env !== 'object' || env === null) {
    throw new Response(null, {
      status: 404,
    });
  }
  const agent = request.headers.get('User-Agent');
  const isBotResult = isbot(agent);

  if (isBotResult) {
    throw new Response(null, {
      status: 404,
    });
  }
  const url = (env as Record<string, string | undefined>)[
    `LINKS_${link.toUpperCase()}`
  ];
  if (!url) {
    throw new Response(null, {
      status: 404,
    });
  }
  return redirect(url);
}

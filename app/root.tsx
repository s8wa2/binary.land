import type {
  LinkDescriptor,
  LinksFunction,
  MetaFunction,
} from '@remix-run/cloudflare';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

import styles from '~/styles/tailwind.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
];
export default function App() {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        {/* Favicons */}

        {/* Dark */}
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          media='(prefers-color-scheme: dark)'
          href='/icons/dark/apple-touch-icon.png'
        />
        <link
          rel='manifest'
          media='(prefers-color-scheme: dark)'
          href='/icons/dark/site.webmanifest'
        />
        <link
          rel='mask-icon'
          media='(prefers-color-scheme: dark)'
          href='/icons/dark/safari-pinned-tab.svg'
          color='#3e3e3e'
        />
        <link
          rel='shortcut icon'
          media='(prefers-color-scheme: dark)'
          href='/icons/dark/favicon.ico'
        />
        <meta
          name='msapplication-TileColor'
          media='(prefers-color-scheme: dark)'
          content='#603cba'
        />
        <meta
          name='msapplication-config'
          media='(prefers-color-scheme: dark)'
          content='/icons/dark/browserconfig.xml'
        />
        <meta
          name='theme-color'
          media='(prefers-color-scheme: dark)'
          content='#3e3e3e'
        />

        {/* Light */}
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          media='(prefers-color-scheme: light)'
          href='/icons/light/apple-touch-icon.png'
        />
        <link
          rel='manifest'
          media='(prefers-color-scheme: light)'
          href='/icons/light/site.webmanifest'
        />
        <link
          rel='mask-icon'
          media='(prefers-color-scheme: light)'
          href='/icons/light/safari-pinned-tab.svg'
          color='#5bbad5'
        />
        <link
          rel='shortcut icon'
          media='(prefers-color-scheme: light)'
          href='/icons/light/favicon.ico'
        />
        <meta
          name='msapplication-TileColor'
          media='(prefers-color-scheme: light)'
          content='#603cba'
        />
        <meta
          name='msapplication-config'
          media='(prefers-color-scheme: light)'
          content='/icons/light/browserconfig.xml'
        />
        <meta
          name='theme-color'
          media='(prefers-color-scheme: light)'
          content='#ffffff'
        />

        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

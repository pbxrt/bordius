import { createTheme, NextUIProvider } from '@nextui-org/react'
import Head from 'next/head'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

const theme = createTheme({
    type: 'dark', // it could be "light" or "dark"
    theme: {
        colors: {
            text: '#fff'
        },
        borderWeights: {
            thin: '1px',
            medium: '2px',
            think: '4px'
        }
    }
})

export default function App({ Component, pageProps }: AppProps) {
    return (
        <NextUIProvider theme={theme}>
            <Head>
                <title>照片加圆角</title>
                <meta name="description" content="照片加圆角" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <Component {...pageProps} />
        </NextUIProvider>
    );
}

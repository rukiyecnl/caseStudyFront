import localFont from "next/font/local";

export const avenir = localFont({
  src: [
    {
      path: "./Fonts/avenir/Avenir-Book.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-avenir",
});

export const montserrat = localFont({
  src: [
    {
      path: "./Fonts/montserat/Montserrat-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Fonts/montserat/Montserrat-Medium.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-montserat",
});

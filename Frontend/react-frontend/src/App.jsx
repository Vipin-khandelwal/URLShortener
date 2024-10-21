import * as React from "react";
import { Analytics } from "@vercel/analytics/react";
import Form from "./components/Form";
import { Chip } from "@nextui-org/react";

function App() {

  // Main Image of Website. Onclick will re-navigate to the website
  const TitleImage = () => {
    return (
      <a
        href="https://links.aryanranderiya.com"
        className="w-screen flex justify-center"
      >
        <img
          src="banner.png"
          alt="Project Banner"
          className="h-auto max-w-md px-6"
        ></img>
      </a>
    );
  };

  return (
    <>
      <Analytics /> {/* Vercel Analytics */}
      <div className="h-screen w-screen flex flex-col justify-center items-center text-center dark text-foreground bg-background">
        <TitleImage />
        <Form />
      </div>
    </>
  );
}

export default App;

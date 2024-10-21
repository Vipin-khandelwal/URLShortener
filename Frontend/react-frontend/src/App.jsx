import * as React from "react";
import { Analytics } from "@vercel/analytics/react";
import Form from "./components/Form";
import { Chip } from "@nextui-org/react";


const remoteUrl= process.env.REACT_APP_REMOTE_URL
function App() {

    const [allURLs, setAllURLs] = React.useState([]);

    React.useEffect(() => {
      (async() => {
          const d= await fetch(remoteUrl+ '/get-all-urls');
          if(d.ok){
            setAllURLs(await d.json())
          }
      })()
    }, [])


    const deleteURl= async(shorturl) => {
      const d= await fetch(remoteUrl + "/delete-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({short_code: shorturl}), // Convert the formData to json strings
      })

      if(d.ok){
        alert("Url deleted");
        window.location.reload();
      }
    }

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
      <div className="h-screen w-screen flex flex-col md:flex-row justify-center items-center text-center text-foreground">
      {/* Left Column */}
      <div className="flex flex-col justify-center items-center md:w-1/2 py-4">
        <TitleImage />
        <Form />
      </div>

      {/* Right Column - Table */}
      <div className="md:w-1/2 py-4 md:mt-0">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Sr. No.</th>
              <th className="border border-gray-300 px-4 py-2">Url Label</th>
              <th className="border border-gray-300 px-4 py-2">Long Url</th>
              <th className="border border-gray-300 px-4 py-2">Sort Url</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Example Rows */}
            {allURLs.map((data, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{index+1}</td>
                <td className="border border-gray-300 px-4 py-2">{data?.urlLabel}</td>
                <td className="border border-gray-300 px-4 py-2">{data?.longURL}</td>
                <td className="border border-gray-300 px-4 py-2"><a href={remoteUrl+ "/l/"+ data?.shortURL } target="_blank">{remoteUrl+ "/l/"}{data?.shortURL}</a></td>
                <td className="border border-gray-300 px-4 py-2"><button onClick={() => deleteURl(data?.shortUrl)} style={{backgroundColor: "blue", color: 'white'}}>delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}

export default App;

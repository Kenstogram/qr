
import { Card, Title } from "@tremor/react";
import Iframe from "react-iframe";

export default function Builder() {

  return (
    <div className="grid gap-6">
      <Card>
      <Title>Try Our New QR Builder!</Title>
         <div className="relative w-full rounded-lg overflow-hidden md:rounded-lg mb-2 mt-2">
                  <Iframe
                    url="https://qrbuild.vercel.app/"
                    width="100%"
                    height="900px"
                    id="Free QR Experiences"
                    display="block"
                    position="relative"
                  />
                </div>
      </Card>
    </div>
  );
}

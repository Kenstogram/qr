
import { Card, Title } from "@tremor/react";
import Iframe from "react-iframe";

export default function Stylist() {

  return (
    <div className="grid gap-6">
      <Card>
        <Title>Classic QR Styler</Title>
         <div className="relative w-full rounded-lg overflow-hidden md:rounded-lg mb-2 mt-2">
                  <Iframe
                    url="https://domainqr.com"
                    width="100%"
                    height="860px"
                    id="Free QR Experiences"
                    display="block"
                    position="relative"
                  />
                </div>
      </Card>
    </div>
  );
}

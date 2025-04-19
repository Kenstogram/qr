
import { Card, Title } from "@tremor/react";
import ColorfulQR from '@/components/ColorfulQR'; // Adjust the path as needed

export default function Mosaic() {
  return (
    <div className="grid gap-6">
      <Card>
        <Title>Create a Mosaic QR!</Title>
          <ColorfulQR />
      </Card>
    </div>
  );
}

import { useState } from "react";
import PixelImage3D from "./lib/PixelImage3D";
import { PixelArtDiiage1, PixelArtDiiage2, PixelArtDiiage3, PixelArtDiiage4, PixelArtDiiage5, PixelArtDiiage6 } from "./assets";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const images = [
  { id: 1, name: "PixelArtDiiage1", src: PixelArtDiiage1 },
  { id: 2, name: "PixelArtDiiage2", src: PixelArtDiiage2 },
  { id: 3, name: "PixelArtDiiage3", src: PixelArtDiiage3 },
  { id: 4, name: "PixelArtDiiage4", src: PixelArtDiiage4 },
  { id: 5, name: "PixelArtDiiage5", src: PixelArtDiiage5 },
  { id: 6, name: "PixelArtDiiage6", src: PixelArtDiiage6 }
];

export default function App() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">🎨 Pixel Art Gallery</h1>

      {/* Side by side layout */}
      <div className="flex gap-8">
        {/* Table of selectable images */}
        <div className="w-1/3">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {images.map((img) => (
                <TableRow
                  key={img.id}
                  className={`cursor-pointer ${
                    selected?.id === img.id ? "bg-gray-200 dark:bg-gray-700" : ""
                  }`}
                  onClick={() => setSelected(img)}
                >
                  <TableCell>{img.id}</TableCell>
                  <TableCell>{img.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Canvas preview */}
        <div className="flex-1 flex items-center justify-center">
          {selected ? (
            <PixelImage3D
              src={selected.src}
              pixelated={true}
              speed={0.02}
              background="#111"
            />
          ) : (
            <div className="flex items-center justify-center h-64 border rounded-lg text-gray-500 w-full">
              Select an image from the table 👆
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

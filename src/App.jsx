import { useState } from "react";
import PixelImage3D from "./lib/PixelImage3D";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  PixelArtDiiage1,
  PixelArtDiiage2,
  PixelArtDiiage3,
  PixelArtDiiage4,
  PixelArtDiiage5,
  PixelArtDiiage6,
} from "./assets";

const images = [
  { id: 1, src: PixelArtDiiage1, description: "First team pixel art." },
  { id: 2, src: PixelArtDiiage2, description: "Second team pixel art." },
  { id: 3, src: PixelArtDiiage3, description: "Third team pixel art." },
  { id: 4, src: PixelArtDiiage4, description: "Fourth team pixel art." },
  { id: 5, src: PixelArtDiiage5, description: "Fifth team pixel art." },
  { id: 6, src: PixelArtDiiage6, description: "Sixth team pixel art." },
];

export default function App() {
  const [selected, setSelected] = useState(null);
  const [teamNames, setTeamNames] = useState({}); // store names per card

  const handleNameChange = (id, value) => {
    setTeamNames((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">🎨 Pixel Art Teams</h1>

      {/* Grid of cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img) => (
          <div
            key={img.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer"
            onClick={() => setSelected(img)}
          >
            <img
              src={img.src}
              alt={`Pixel art ${img.id}`}
              className="w-full h-40 object-contain mb-3"
            />

            {/* Team name input */}
            <Input
              placeholder="Enter team name"
              value={teamNames[img.id] || ""}
              onChange={(e) => handleNameChange(img.id, e.target.value)}
            />
          </div>
        ))}
      </div>

      {/* Overlay / Dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-4xl">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>
                  {teamNames[selected.id] || "Unnamed Team"}
                </DialogTitle>
                <DialogDescription>
                  {selected.description}
                </DialogDescription>
              </DialogHeader>

              <div className="flex gap-6">
                {/* 3D Pixel Art */}
                <div className="flex-1">
                  <PixelImage3D
                    src={selected.src}
                    pixelated={true}
                    speed={0.01}
                    background="#111"
                  />
                </div>

                {/* Team details */}
                <div className="w-1/3 space-y-4">
                  <h2 className="font-semibold">Team Info</h2>
                  <p><strong>Name:</strong> {teamNames[selected.id] || "Not set"}</p>
                  <p><strong>Description:</strong> {selected.description}</p>
                  <Button onClick={() => setSelected(null)}>Close</Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

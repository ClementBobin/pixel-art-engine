import { useState, useEffect, useRef } from "react";
import PixelImage3D from "./lib/PixelImage3D";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

import {
  PixelArtDiiage1,
  PixelArtDiiage2,
  PixelArtDiiage3,
  PixelArtDiiage4,
  PixelArtDiiage5,
  PixelArtDiiage6,
  PixelArtDiiage7,
  PixelArtDiiage8,
  song1,
  song2,
  song3,
  song4,
  song5
} from "./assets";

// Flatten all works into a single array for the grid
const works = [
  { id: 1, team: "Greenwall", title: "Déchéance", src: PixelArtDiiage1, description: "Les dérives de la montée du numérique", authors: [] },
  { id: 2, team: "Black Hat", title: "Post Apo", src: PixelArtDiiage5, description: "", authors: [] },
  { id: 3, team: "Black Hat", title: "Cyber Punk", src: PixelArtDiiage6, description: "", authors: [] },
  { id: 4, team: "Dev'Art", title: "AI rt'ificial Dependency", src: PixelArtDiiage4, description: "Vision dystopique de l'évolution de l'IA", authors: [] },
  { id: 5, team: "Les MOATs", title: "MG", src: PixelArtDiiage3, description: "Hommage au directeur du Diiage, Michel Girard", authors: [] },
  { id: 6, team: "Les Flammand", title: "Les Flammand", src: PixelArtDiiage2, description: "Équipe Rose donc le nom paraissait évident, notre équipe a essayé d'innover", authors: [] },
  { id: 7, team: "Red Hat", title: "Beautiful Screen Of Diiage", src: PixelArtDiiage7, description: "Ecran qui représente le passé, qui nous permet de ne pas oublie d'où on vient et ce qu'on a surmonté. La future est brillant, lumineux. C'est le Beautif Screen et Diiage.", authors: [] },
  { id: 8, team: "Les petis poulains", title: "Pari d'Avenir", src: PixelArtDiiage8, description: "Cette oeuvre est soit un une critique de l'avenir incertain dû à l'intelligence articiciel, soit une moquerie des gens qui critique ce dernier en pensant que c'est une fianlité. à méditer", authors: [] }
];

// Playlist with song names for display
const playlist = [
  { src: song1, name: "Energetic Chiptune" },
  { src: song2, name: "Exploration Adventure" },
  { src: song3, name: "Pixel Dreams" },
  { src: song4, name: "Pixel Pulse" },
  { src: song5, name: "Retro Adventure" },
];

export default function App() {
  const [selected, setSelected] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setCurrentSongIndex((prev) => (prev + 1) % playlist.length);
    };

    audio.addEventListener("ended", handleEnded);
    audio.play();

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSongIndex]);

  useEffect(() => {
    // Whenever the song index changes, update audio src and play
    if (audioRef.current) {
      audioRef.current.src = playlist[currentSongIndex].src;
      audioRef.current.play().catch(() => {});

      // Show Sonner toast
      toast(`🎵 Now Playing: ${playlist[currentSongIndex].name}`);
    }
  }, [currentSongIndex]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">🎨 Pixel Art Works</h1>

      {/* Grid of works */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {works.map((work) => (
          <div
            key={work.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer"
            onClick={() => setSelected(work)}
          >
            <img
              src={work.src}
              alt={work.title}
              className="w-full h-40 object-contain mb-2"
            />
            <p className="text-sm text-center text-gray-400">{work.team}</p>
          </div>
        ))}
      </div>

      {/* Overlay / Dialog */}
      <Dialog className="w-2/3 max-w-[1200px]" open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent>
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>{selected.title}</DialogTitle>
                <DialogDescription>{selected.description || ""}</DialogDescription>
              </DialogHeader>

              <div className="flex gap-6">
                <div className="flex-1">
                  <PixelImage3D
                    src={selected.src}
                    pixelated={true}
                    speed={0.01}
                    background="#111"
                  />
                </div>

                <div className="w-1/3 space-y-4">
                  <p><strong>Team:</strong> {selected.team}</p>
                  <p><strong>Title:</strong> {selected.title}</p>
                  <p><strong>Description:</strong> {selected.description || "—"}</p>
                  <p><strong>Authors:</strong> {(selected.authors || []).join(", ") || "—"}</p>
                  <Button onClick={() => setSelected(null)}>Close</Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Hidden audio element for background music */}
      <audio ref={audioRef} src={playlist[currentSongIndex].src} autoPlay loop={false} />

      {/* Sonner toast system */}
      <Toaster position="bottom-center" richColors />
    </div>
  );
}

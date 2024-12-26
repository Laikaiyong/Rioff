"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

const DuelPage = () => {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  // const [playerStats, setPlayerStats] = useState(null);

  const fetchPlayerStats = async () => {
    try {
      // const [name, tagLine] = userId.split("#");
      // const response = await fetch(`/api/valorant?userId=${name}&tagLine=${tagLine}`, {
      //   method: "GET",
      // });

      // if (response.ok) {
      //   const stats = await response.json();
      //   setPlayerStats(stats);
      // }
    } catch (error) {
      console.error("Error fetching player stats:", error);
    }
  };

  useEffect(() => {
    const fetchStats = async () => {
      if (userId) {
        try {
          const [newName, newTagLine] = userId.split("#");
          setName(newName);
          setTagLine(newTagLine);

        } catch (error) {
          console.error(error);
        }
        await fetchPlayerStats();
      }
    };
    fetchStats();
  }, [userId]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-sm p-4">
        <div className="max-w-7xl mx-auto text-center items-center">
          <WalletMultiButton />
          {userId && !(name && tagLine) && (
            <div className="mt-4">
              <p>Loading stats for {userId}...</p>
            </div>
          )}
          {name && tagLine && (
          <iframe
            src={`https://tracker.gg/valorant/profile/riot/${name}%23${tagLine}/overview`}
            className="w-full h-[600px] mt-4 rounded-lg"
            title="Valorant Stats"
          />
          )}
        </div>
      </nav>

      {/* Main Content */}
        <div className="max-w-2xl mx-auto mt-10 px-4">
          <Card className="bg-white p-6 rounded-lg">
            <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Share Blink</h2>
          <div className="bg-red-50 rounded-lg p-4">
            <div className="relative">
              <img
            src="https://media.assettype.com/afkgaming/import/media/images/13974-fd9b45e17c5887653166de9fbe97437f.jpeg?w=1200&h=675&auto=format%2Ccompress&fit=max"
            alt="Blink Preview"
            className="w-full rounded-lg"
              />
            </div>
          </div>
            </div>

            <form className="space-y-4" onSubmit={async (e) => {
          e.preventDefault();
          try {
            if (!window.solana || !window.solana.signMessage) {
              throw new Error("Solana wallet not connected");
            }
            
            const message = new TextEncoder().encode(
              `Claiming Blink with Valorant ID: ${userId}`
            );
            
            const signature = await window.solana.signMessage(message, "utf8");
            console.log("Message signed:", signature);
            
            // Here you can add additional logic to handle the signature
            
          } catch (error) {
            console.error("Error signing message:", error);
            alert("Failed to sign message. Make sure your wallet is connected.");
          }
            }}>
          <input
            type="text"
            placeholder="Your Valorant UserID (include #)"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full p-3 border rounded"
          />

          <input
            type="text"
            placeholder="Your Solana Wallet Address"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className="w-full p-3 border rounded"
          />

          <button
            type="submit"
            className="w-full bg-gray-800 text-white p-3 rounded hover:bg-gray-700">
            Claim
          </button>

          <div className="text-center text-sm text-gray-500">
            powered by Dialect
          </div>
            </form>
          </Card>
        </div>
          </div>
        );
      };

export default DuelPage;

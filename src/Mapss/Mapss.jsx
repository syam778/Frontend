/*import { useEffect } from "react";
import L from "leaflet";
import io from "socket.io-client";
import "leaflet/dist/leaflet.css";


export default function MapPage() {
  useEffect(() => {
    // Connect socket.io
    const socket = io("http://localhost:3001");

    // Create map
    const map = L.map("map").setView([0, 0], 10);

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "syama",
    }).addTo(map);

    // Store markers
    const markers = {};

    // Send location
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          socket.emit("send-location", {
            id: socket.id,
            latitude,
            longitude,
          });
        },
        (error) => console.log(error),
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    }

    // Receive other users' locations
    socket.on("receive-location", (data) => {
      const { id, latitude, longitude } = data;

      map.setView([latitude, longitude], 10);

      if (markers[id]) {
        markers[id].setLatLng([latitude, longitude]);
      } else {
        markers[id] = L.marker([latitude, longitude]).addTo(map);
      }
    });

    // Remove marker when user disconnects
    socket.on("User disconnected", (id) => {
      if (markers[id]) {
        map.removeLayer(markers[id]);
        delete markers[id];
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div
      id="map"
      style={{
        height: "100vh",
        width: "100%",
      }}
    >
      map
    </div>
  );
}

*/



/*import { useEffect } from "react";
import './Mapss.css';
import L from "leaflet";
import io from "socket.io-client";
import "leaflet/dist/leaflet.css";

export default function MapPage() {
  useEffect(() => {
    const socket = io("http://localhost:3001");

    const map = L.map("map").setView([0, 0], 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "OpenStreetMap",
    }).addTo(map);

    socket.on("receive-location", (data) => {
      console.log("Location received:", data);
    });
  }, []);

  return (
    <div id="map" style={{ width: "100%", height: "100vh" }}></div>
  );
}
*/


import { useEffect, useRef } from "react";
import L from "leaflet";
import io from "socket.io-client";
import "leaflet/dist/leaflet.css";
import './MapPage.css'

// Fix default icon paths for bundlers (Vite/CRA/etc)
/*
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});
*/
export default function MapPage() {
  const mapRef = useRef(null);
  const socketRef = useRef(null);
  const markersRef = useRef({}); // store markers by socket id
  const watchIdRef = useRef(null);

  useEffect(() => {
    // 1) create map
    mapRef.current = L.map("map", { zoomControl: true }).setView([0, 0], 2);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(mapRef.current);

    // 2) connect socket (explicit backend URL)
    // Make sure your backend server is running on port 3001
    socketRef.current = io("http://localhost:3001", {
      transports: ["websocket", "polling"],
    });

    // 3) only start geolocation and emit after socket connected
    socketRef.current.on("connect", (id) => {
      console.log("socket connected", socketRef.current.id);

      // start sending location (watchPosition) after socket connect
      if ("geolocation" in navigator) {
        watchIdRef.current = navigator.geolocation.watchPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;

            // emit the position to server
            socketRef.current.emit("send-location", {
              id: socketRef.current.id,
              latitude,
              longitude,
              
            });
          },
          (err) => {
            console.warn("geolocation error:", err);
          },
          {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 10000,
          }
        );
      } else {
        console.warn("Geolocation not available in this browser");
      }
    });

    // 4) receive other users' locations and update/create markers
    socketRef.current.on("receive-location", (data) => {
      // expected data: { id, latitude, longitude, ... }
      if (!data || !("id" in data)) return;
      const { id, latitude, longitude } = data;

      // create or move marker
      if (markersRef.current[id]) {
        markersRef.current[id].setLatLng([latitude, longitude]);
      } else {
        const m = L.marker([latitude, longitude]);
        m.addTo(mapRef.current);
        markersRef.current[id] = m;
      }

      // optional: set view only the first time or when it's this client
      // comment/uncomment as you prefer:
      // mapRef.current.setView([latitude, longitude], 13);
    });

    // 5) handle disconnect event from server (other users)
    // your server emits "User disconnected" with socket id
    socketRef.current.on("User disconnected", (id) => {
      if (markersRef.current[id]) {
        mapRef.current.removeLayer(markersRef.current[id]);
        delete markersRef.current[id];
      }
    });

    // 6) cleanup on unmount
    return () => {
      // stop geolocation watch
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }

      // remove all markers
      Object.keys(markersRef.current).forEach((k) => {
        try {
          mapRef.current.removeLayer(markersRef.current[k]);
        } catch (e) {}
      });
      markersRef.current = {};

      // disconnect socket
      if (socketRef.current) {
        socketRef.current.disconnect();
      }

      // remove map
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div id="map" style={{height: "100vh",
        width: "100%", color:"blue",}} >
      
    </div>
  );
}



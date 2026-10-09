"use client"

import { useEffect, useState } from "react";

export default function Home() {
  const [message,setMessage] = useState<string>("")

  useEffect(()=>{
    const checkHealth = async()=>{
      const res = await fetch('http://localhost:8000/api/health');
      const data = await res.json();
      setMessage(data?.status);
    }
    checkHealth();
  },[])
  return (
    <div>
      {message}
    </div>
  );
}

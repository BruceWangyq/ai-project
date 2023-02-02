import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { isConstructorDeclaration, JSDocNullableType } from "typescript";
import Layout from "../components/layout";

interface Prediction {
  id: string;
  status: string;
  output: string[];
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function Home() {
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: e.target.prompt.value,
      }),
    });
    let prediction = await response.json();
    if (response.status !== 201) {
      setError(prediction.detail);
      return;
    }
    setPrediction(prediction);

    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      await sleep(1000);
      const response = await fetch("/api/predictions/" + prediction.id);
      prediction = await response.json();
      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }
      console.log({ prediction });
      setPrediction(prediction);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col">
        <h1 className="mt-8 bg-gradient-to-br from-black via-slate-500 to-slate-400 dark:from-white dark:via-[#f5eaef] dark:to-[#5f4a54] bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
          A little AI Project that you can use!
        </h1>
      </div>
    </Layout>
  );
}

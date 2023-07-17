"use client";
import styles from "./page.module.css";
import { useState } from "react";
import { Input, Button } from '@nextui-org/react';
import axios from 'axios';
import { OpenAIApi, Configuration } from 'openai'

const configuration = new Configuration({
  apiKey: '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',
});

const openaiInstance = new OpenAIApi(configuration);

export default function Home() {
  const [question, setQuestion] = useState('');
  const [responses, setResponses] = useState([]);


  const handleInputChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = async (event) => {
    //event.preventDefault();

    const response = await openaiInstance.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: "Soy tu asistente virtual personal"},
        { role: 'user', content: question }
      ],
    });

    const obj = {
      pregunta: question,
      respuesta: response.data.choices[0].message.content
    }

    setResponses([...responses,obj ]);
    setQuestion('');
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.responsesContainer}>
      {responses.map((response, index) => (
        <>
          <p key={index} className={styles.response}>P: {response.pregunta}</p>
          <p key={index} className={styles.response}>R: {response.respuesta}</p>
          </>
        ))}
      </div>
      
      <form  className={styles.formContainer}>
        <Input 
          size="lg"
          placeholder="Escriba su pregunta aquí..."
          value={question}
          onChange={handleInputChange}
          className={styles.input}
        />
        <Button
          auto
          color="success"
          size="lg"
          shadow
          onClick={handleSubmit}
        >
          Enviar
        </Button>
      </form>
    </div>
  );
}

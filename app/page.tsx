"use client";
import { useState } from "react";
import { NextPage } from "next";
import styled from "styled-components";

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
`;

const Title = styled.h1`
    font-size: 1.5rem;
    color: #333;
    font-family: sans-serif;
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
`;

const StyledInput = styled.input`
    padding: 0.5rem;
    font-size: 1rem;
    width: 100%;
    max-width: 300px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-family: sans-serif;
`;

const StyledButton = styled.button`
    padding: 0.5rem 1rem;
    font-size: 1rem;
    background-color: #00796b;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;

const ResultText = styled.p`
    margin-top: 0.5rem;
    font-size: 1rem;
    font-family: sans-serif;
`;

const Home: NextPage = () => {
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch("/api/shorten", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url, alias }),
        });

        if (response.ok) {
            const data = await response.json();
            setShortenedUrl(`${window.location.origin}/${data.alias}`);
        } else {
            alert("Error: Alias may already be taken or URL is invalid");
        }
    };

    return (
        <StyledDiv>
            <Title>URL Shortener</Title>
            <StyledForm onSubmit={handleSubmit}>
                <StyledInput 
                    type="url" 
                    placeholder="Enter URL" 
                    value={url} 
                    onChange={(e) => setUrl(e.target.value)} 
                    required 
                />
                <StyledInput 
                    type="text" 
                    placeholder="Enter Alias" 
                    value={alias} 
                    onChange={(e) => setAlias(e.target.value)} 
                    required 
                />
                <StyledButton type="submit">Shorten URL</StyledButton>
            </StyledForm>
            {shortenedUrl && (
                <ResultText>Shortened URL: <a href={shortenedUrl}>{shortenedUrl}</a></ResultText>
            )}
        </StyledDiv>
    );
};

export default Home;

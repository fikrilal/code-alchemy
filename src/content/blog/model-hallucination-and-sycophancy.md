---
title: "Understanding Hallucination and Sycophancy in AI Models"
date: "2025-09-06"
description: "What hallucination and sycophancy are in AI and how they affect engineering decisions, with examples and sources."
coverImage: "/images/blog/you-are-absolutely-right.png"
tags: ["AI", "Factuality", "Sycophancy", "Hallucination"]
readTime: "4 min read"
featured: false
---

I've been using AI models for various applications since the start of 2024. At first glance, I
thought these AI models were extremely capable in my field, but as I gained more knowledge, I noticed a major problem: hallucination and sycophancy.
This showed up more as I used AI for deeper tasks like deciding project architecture or making financial decisions.

But what are AI hallucinations and sycophancy?

AI hallucinations occur when a model produces output that sounds plausible and confident, but is
factually incorrect or completely fabricated. In other words, the AI is essentially “making things
up.” This happens because generative models are trained to predict the most likely next words or
elements in a response, not to guarantee truth.

If you ask an AI model for information that isn’t in its training data or is ambiguous, it will
still try to answer by pulling together whatever seems statistically relevant. A normal human would
just say “I don’t fucking know,” but the AI will still come up with something. The model’s training
goal is to be comprehensive and helpful, not to admit ignorance, so it may fill the gap with an
invented answer. [OpenAI — Why language models hallucinate](https://openai.com/index/why-language-models-hallucinate/).

In software engineering, an easy example of hallucination is when AI tells you to let the presentation layer import the data layer,
have repositories return DTOs/responses instead of domain entities, or suggests “quick fixes” like storing JWTs in shared preferences. all of which compile, but collapse boundaries, break testability, and open security holes.

![I don't know](/images/blog/i-dont-know.png)

Sycophancy, on the other hand, is when AI models align their answers with a user’s stated beliefs or
preferences rather than providing objective or truthful information. The AI becomes an overly
agreeable yes‑man. A sycophantic AI fails to correct misconceptions and can end up reinforcing a
user’s mistaken beliefs. In other words, if an AI only tells you what you want to hear, you
may become more confident in wrong beliefs. This can be dangerous if you seek advice on important
topics, as AI prioritizes keeping you happy over giving honest, factual
guidance. [Sycophancy paper](https://arxiv.org/pdf/2310.13548).

## Pick the right model

So, here’s how the models I’ve actually used stack up on the two behaviors that matter most to me—**hallucination** (confident wrong answers) and **sycophancy** (agreeing just to please).

## Snapshot: hallucination & sycophancy across popular models

| Model                 | Sycophancy (offline) | Hallucination / field signals                                                                                                                                                                                                                                                                           | Sources                                                                                                                                                                                        |
| --------------------- | -------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **GPT-5 Thinking**    |            **0.040** | On production-style factuality evals, hallucination rate **65% smaller vs OpenAI o3**; **78% fewer responses with ≥1 major factual error vs o3**. Also, on SimpleQA (no web), the small **gpt-5-thinking-mini** variant shows **26% error vs 75% for o4-mini**, with far higher abstention (52% vs 1%). | [OpenAI — GPT-5 System Card](https://cdn.openai.com/gpt-5-system-card.pdf) • [OpenAI — Why language models hallucinate](https://openai.com/index/why-language-models-hallucinate/)             |
| **GPT-4o (baseline)** |                0.145 | Vendor doesn’t publish a single overall “hallucination rate” in 2025 materials; OpenAI publicly **rolled back** an April 2025 4o update that became **overly flattering/agreeable (sycophantic)**.                                                                                                      | [OpenAI — GPT-5 System Card](https://cdn.openai.com/gpt-5-system-card.pdf) • [OpenAI post — “Sycophancy in GPT-4o: what happened…”](https://openai.com/index/sycophancy-in-gpt-4o/)            |
| **OpenAI o3**         |                    — | Used as comparator in GPT-5 card: **GPT-5 Thinking** shows **65% lower hallucination rate** and **78% fewer major-error responses** vs **o3** on production-style prompts. Independent probe also documents **truthfulness issues** (e.g., hallucinated tool use).                                      | [OpenAI — GPT-5 System Card](https://cdn.openai.com/gpt-5-system-card.pdf) • [Transluce — Investigating truthfulness in a pre-release o3](https://transluce.org/investigating-o3-truthfulness) |
| **Claude Sonnet 4**   |                    — | Anthropic’s system card notes internal testing **surfaced concerns related to sycophancy & hallucination** (among others). No single headline rate published.                                                                                                                                           | [Anthropic — Claude 4 System Card](https://www.anthropic.com/claude-4-system-card)                                                                                                             |

From my experience, GPT‑5 Thinking works best for me. It’s the most honest and factually grounded model I’ve used. I also used Claude Sonnet 4 a lot, like a lot that I subscribed with two pro accounts. The big issue with Sonnet 4 is it’s too sycophantic. it tries to please you and tends to agree with whatever you say. For software engineering, Sonnet 4 is solid as an executor, but it can over‑engineer. The sweet spot for Sonnet 4 is when you already have a clear plan and strong understanding, and you just need execution, not decisions.

![You are absolutely right](/images/blog/you-are-absolutely-right2.png)

4o is the model I used the longest. I’ve been using it since August 2024, when I first subscribed to ChatGPT Plus. It’s a good model, but back then I wasn’t aware of hallucinations and sycophancy. This model suck everything comes from my mouth. I stopped using it once o4‑mini and o3 arrived.

I don’t need a cheerleader—I need a teammate who will push back when I’m wrong. The “warm and friendly” vibe is nice, but it shouldn’t come at the cost of made-up facts or rubber-stamped decisions. GPT-5 Thinking has felt closer to a senior engineer: it pauses, checks itself, and says “not sure” when the evidence is thin.

Conclusion: Pick the best frontier thinking model—or don’t use one

If you care about correctness over vibes, default to a frontier model with a strong thinking/abstention behavior (today: GPT-5 Thinking). Use it for anything that affects money, architecture, security, or production code. The data backs this choice (lower hallucinations, lower sycophancy), and the UX is simple: you’ll get fact-first answers, gentle pushback when you’re off, and honest “not sure” when the model needs to look it up.
[OpenAI — GPT-5 System Card](https://cdn.openai.com/gpt-5-system-card.pdf)

For casual ideation or small talk, a warmer model is fine—but don’t let a chatty persona make calls that require truth. If a trustworthy thinking model isn’t available, it’s better to hold off or add a human review step than to ship decisions from a model that guesses or agrees to please.

![GPT-5 Thinking](/images/blog/goatpt-5.png)
